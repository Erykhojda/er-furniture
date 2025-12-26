require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const path = require('path');

console.log('🔑 Stripe key loaded:', !!process.env.STRIPE_SECRET_KEY);
console.log('📧 Email configured:', !!process.env.EMAIL_USER);

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ ERROR: STRIPE_SECRET_KEY is missing!');
    process.exit(1);
}

// Inicjalizacja Firebase Admin
try {
    const serviceAccountPath = path.join(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'er-furniture-firebase-adminsdk.json');
    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
    console.log('⚠️  Continuing without Firebase...');
}

const db = admin.firestore();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Konfiguracja Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
        emailConfigured: !!process.env.EMAIL_USER,
        firebaseConfigured: !!admin.apps.length
    });
});

// Create Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
    const { amount, cart, customerEmail } = req.body;

    if (!amount || amount < 50) {
        return res.status(400).json({ error: 'Invalid amount. Minimum is 0.50 PLN' });
    }

    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    try {
        // Skrócone metadata (tylko najważniejsze info)
        const orderSummary = cart.map(item =>
            `${item.name} x${item.amount}`
        ).join(', ');

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'pln',
            payment_method_types: ['card', 'blik', 'p24'],
            metadata: {
                // ✅ Krótkie metadata (poniżej 500 znaków każde)
                customer_email: customerEmail || 'guest',
                order_summary: orderSummary.substring(0, 490), // Max 490 znaków
                total_items: cart.reduce((sum, item) => sum + item.amount, 0).toString(),
                unique_products: cart.length.toString(),
                order_total_pln: (amount / 100).toFixed(2),
                order_date: new Date().toISOString(),
                // Pełne dane są w Firebase, nie w Stripe metadata
            }
        });

        console.log('✅ Payment Intent created:', paymentIntent.id);

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Potwierdzenie zamówienia + zapis do Firebase
app.post('/api/order-confirmation', async (req, res) => {
    const { paymentIntentId, cart, customerEmail } = req.body;

    console.log('📦 Przetwarzanie potwierdzenia zamówienia...');

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ error: 'Payment not completed' });
        }

        const orderId = `ORD-${Date.now()}`;
        const totalAmount = paymentIntent.amount / 100;
        const orderDate = new Date();

        // 🔥 ZAPISZ ZAMÓWIENIE DO FIREBASE
        try {
            const orderData = {
                orderId: orderId,
                paymentIntentId: paymentIntentId,
                customerEmail: customerEmail || 'guest@er-furniture.pl',
                items: cart.map(item => ({
                    name: item.name,
                    selectedColor: item.selectedColor,
                    selectedSize: item.selectedSize,
                    selectedMaterial: item.selectedMaterial || null,
                    selectedUpholstery: item.selectedUpholstery || null,
                    selectedExtendable: item.selectedExtendable || null,
                    quantity: item.amount,
                    pricePerUnit: item.price / 100,
                    totalPrice: (item.price * item.amount) / 100
                })),
                totalAmount: totalAmount,
                currency: 'PLN',
                paymentMethod: paymentIntent.payment_method_types[0],
                status: 'completed',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                createdAtLocal: orderDate.toISOString(),
                source: 'website'
            };

            await db.collection('orders').doc(orderId).set(orderData);
            console.log('✅ Zamówienie zapisane w Firebase:', orderId);
        } catch (firebaseError) {
            console.error('⚠️ Błąd zapisu do Firebase:', firebaseError);
            // Kontynuuj mimo błędu Firebase
        }

        // 📧 EMAIL DO WŁAŚCICIELA
        const ownerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ef4444; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .order-details { background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .product-item { 
            border: 2px solid #e5e7eb; 
            padding: 20px; 
            margin: 15px 0; 
            border-radius: 8px;
            background-color: white;
          }
          .product-header {
            background-color: #fef2f2;
            padding: 12px;
            margin: -20px -20px 15px -20px;
            border-radius: 6px 6px 0 0;
            font-size: 18px;
            font-weight: bold;
            color: #991b1b;
          }
          .spec-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 15px 0;
          }
          .spec-item {
            padding: 10px;
            background-color: #f9fafb;
            border-left: 3px solid #ef4444;
            border-radius: 4px;
          }
          .spec-label { 
            font-size: 12px; 
            color: #6b7280; 
            text-transform: uppercase; 
            font-weight: 600;
          }
          .spec-value { 
            font-size: 15px; 
            color: #1f2937; 
            font-weight: bold; 
            margin-top: 4px;
          }
          .total { 
            background-color: #fef2f2; 
            padding: 20px; 
            margin-top: 20px; 
            font-size: 20px; 
            font-weight: bold;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #ef4444;
          }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          .highlight { background-color: #fff7ed; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛒 Nowe Zamówienie!</h1>
            <p style="margin: 5px 0;">Er-Furniture</p>
          </div>
          
          <div class="order-details">
            <h2 style="margin-top: 0;">📋 Szczegóły zamówienia</h2>
            <table>
              <tr>
                <td style="width: 200px;"><strong>Numer zamówienia:</strong></td>
                <td><strong style="color: #ef4444;">${orderId}</strong></td>
              </tr>
              <tr>
                <td><strong>Data:</strong></td>
                <td>${orderDate.toLocaleString('pl-PL')}</td>
              </tr>
              <tr class="highlight">
                <td><strong>Email klienta:</strong></td>
                <td><strong>${customerEmail || 'Nie podano'}</strong></td>
              </tr>
              <tr>
                <td><strong>Payment Intent ID:</strong></td>
                <td style="font-family: monospace; font-size: 12px;">${paymentIntentId}</td>
              </tr>
              <tr>
                <td><strong>Metoda płatności:</strong></td>
                <td><strong>${paymentIntent.payment_method_types[0].toUpperCase()}</strong></td>
              </tr>
            </table>
          </div>

          <h2>🛋️ Zamówione meble:</h2>
          
          ${cart.map((item, index) => `
            <div class="product-item">
              <div class="product-header">
                ${index + 1}. ${item.name}
              </div>
              
              <div class="spec-grid">
                <div class="spec-item">
                  <div class="spec-label">🎨 Kolor</div>
                  <div class="spec-value">${item.selectedColor || 'Nie określono'}</div>
                </div>
                
                <div class="spec-item">
                  <div class="spec-label">📏 Wymiary</div>
                  <div class="spec-value">${item.selectedSize || 'Standard'}</div>
                </div>
                
                ${item.selectedMaterial ? `
                  <div class="spec-item">
                    <div class="spec-label">🌳 Materiał</div>
                    <div class="spec-value">${item.selectedMaterial}</div>
                  </div>
                ` : ''}
                
                ${item.selectedUpholstery ? `
                  <div class="spec-item">
                    <div class="spec-label">🪑 Tapicerka</div>
                    <div class="spec-value">${item.selectedUpholstery}</div>
                  </div>
                ` : ''}
                
                <div class="spec-item">
                  <div class="spec-label">📦 Ilość</div>
                  <div class="spec-value">${item.amount} szt.</div>
                </div>
                
                <div class="spec-item">
                  <div class="spec-label">💰 Cena jednostkowa</div>
                  <div class="spec-value">${(item.price / 100).toFixed(2)} PLN</div>
                </div>
              </div>
              
              <div style="background-color: #fef2f2; padding: 15px; margin-top: 15px; border-radius: 6px; text-align: center;">
                <div style="font-size: 14px; color: #6b7280;">SUMA ZA POZYCJĘ</div>
                <div style="font-size: 22px; font-weight: bold; color: #991b1b;">
                  ${((item.price * item.amount) / 100).toFixed(2)} PLN
                </div>
              </div>
            </div>
          `).join('')}

          <div class="total">
            💰 SUMA CAŁKOWITA: ${totalAmount.toFixed(2)} PLN
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 4px;">
            <p>🔗 <a href="https://dashboard.stripe.com/payments/${paymentIntentId}">Sprawdź w Stripe</a></p>
            <p>🔥 <a href="https://console.firebase.google.com/project/er-furniture/firestore">Zobacz w Firebase</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

        await transporter.sendMail({
            from: `"Er-Furniture Orders" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `🛒 Zamówienie ${orderId} - ${totalAmount.toFixed(2)} PLN`,
            html: ownerEmailHtml,
        });

        console.log('✅ Email wysłany');

        // Email do klienta (opcjonalnie)
        if (customerEmail && customerEmail !== 'guest@er-furniture.pl') {
            const customerEmailHtml = `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <div style="background: #ef4444; color: white; padding: 20px; text-align: center;">
            <h1>✅ Dziękujemy za zamówienie!</h1>
          </div>
          <div style="padding: 20px;">
            <p>Numer zamówienia: <strong>${orderId}</strong></p>
            <p>Suma: <strong>${totalAmount.toFixed(2)} PLN</strong></p>
            <p>Skontaktujemy się wkrótce!</p>
          </div>
        </div>
      `;

            await transporter.sendMail({
                from: `"Er-Furniture" <${process.env.EMAIL_USER}>`,
                to: customerEmail,
                subject: `Potwierdzenie zamówienia ${orderId}`,
                html: customerEmailHtml,
            });
        }

        res.json({ success: true, orderId });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ error: 'Failed to process order' });
    }
});

// Newsletter
app.post('/api/newsletter-subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    try {
        // Zapisz do Firebase
        await db.collection('newsletter').add({
            email: email,
            subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
            subscribedAtLocal: new Date().toISOString()
        });

        // Email do Ciebie
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: '📰 Nowy subskrybent newslettera',
            html: `<p>Email: <strong>${email}</strong></p><p>Data: ${new Date().toLocaleString('pl-PL')}</p>`
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Newsletter error:', error);
        res.status(500).json({ error: 'Failed' });
    }
});

// Contact form
app.post('/api/send-contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields required' });
    }

    try {
        await transporter.sendMail({
            from: `"Er-Furniture Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `Kontakt: ${subject}`,
            html: `<p><strong>Od:</strong> ${name} (${email})</p><p>${message}</p>`,
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
});

// Endpoint do pobierania zamówień (opcjonalnie - panel admin)
app.get('/api/orders', async (req, res) => {
    try {
        const snapshot = await db.collection('orders')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log(`✅ Stripe: ${!!process.env.STRIPE_SECRET_KEY}`);
    console.log(`📧 Email: ${!!process.env.EMAIL_USER}`);
    console.log(`🔥 Firebase: ${!!admin.apps.length}`);
});