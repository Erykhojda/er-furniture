// firebase/orders.ts
import {
    collection,
    addDoc,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from './config';
import type { CartItem, Order, OrderItem } from '../types';

const ORDERS_COLLECTION = 'orders';

interface CreateOrderData {
    customerEmail: string;
    customerName: string;
    cartItems: CartItem[];
    totalAmount: number;
    shippingFee: number;
}

export const createOrder = async (orderData: CreateOrderData): Promise<{ success: boolean; orderId?: string; message: string }> => {
    try {
        const orderItems: OrderItem[] = orderData.cartItems.map(item => ({
            productName: item.name,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
            selectedMaterial: item.selectedMaterial,
            selectedUpholstery: item.selectedUpholstery,
            selectedExtendable: item.selectedExtendable,
            quantity: item.amount,
            unitPrice: item.price,
            totalPrice: item.price * item.amount
        }));

        const order: Omit<Order, 'id'> = {
            customerEmail: orderData.customerEmail,
            customerName: orderData.customerName,
            items: orderItems,
            totalAmount: orderData.totalAmount,
            shippingFee: orderData.shippingFee,
            finalAmount: orderData.totalAmount + orderData.shippingFee,
            orderDate: new Date(),
            status: 'pending'
        };

        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...order,
            orderDate: serverTimestamp()
        });

        console.log('Order created with ID:', docRef.id);

        await sendOrderNotificationEmail(docRef.id, order);

        return {
            success: true,
            orderId: docRef.id,
            message: 'Zamówienie zostało złożone pomyślnie!'
        };

    } catch (error) {
        console.error('Error creating order:', error);
        return {
            success: false,
            message: 'Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.'
        };
    }
};

const sendOrderNotificationEmail = async (orderId: string, order: Omit<Order, 'id'>): Promise<void> => {
    try {
        const emailData = {
            to: 'erykhojda79@gmail.com',
            subject: `Nowe zamówienie #${orderId} - Er-Furniture`,
            html: generateOrderEmailHTML(orderId, order)
        };

        await addDoc(collection(db, 'email_queue'), {
            ...emailData,
            createdAt: serverTimestamp(),
            status: 'pending'
        });

        console.log('Email notification queued successfully');

    } catch (error) {
        console.error('Error queuing email notification:', error);
    }
};

const generateOrderEmailHTML = (orderId: string, order: Omit<Order, 'id'>): string => {
    const formatPrice = (price: number) => {
        return (price / 100).toLocaleString('pl-PL', {
            style: 'currency',
            currency: 'PLN'
        });
    };

    const formatDateTime = (date: Date) => {
        return date.toLocaleString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Nowe zamówienie Er-Furniture</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #ef4444; color: white; padding: 20px; text-align: center; }
            .order-info { background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .item { border-bottom: 1px solid #dee2e6; padding: 10px 0; }
            .total { background-color: #e9ecef; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .options { color: #6c757d; font-size: 14px; margin-top: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Er-Furniture</h1>
                <h2>Nowe zamówienie #${orderId}</h2>
            </div>

            <div class="order-info">
                <h3>Informacje o kliencie:</h3>
                <p><strong>Imię i nazwisko:</strong> ${order.customerName}</p>
                <p><strong>Email:</strong> ${order.customerEmail}</p>
                <p><strong>Data zamówienia:</strong> ${formatDateTime(order.orderDate)}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            </div>

            <h3>Zamówione produkty:</h3>
            ${order.items.map(item => `
                <div class="item">
                    <h4>${item.productName}</h4>
                    <p><strong>Ilość:</strong> ${item.quantity} szt.</p>
                    <p><strong>Cena jednostkowa:</strong> ${formatPrice(item.unitPrice)}</p>
                    <div class="options">
                        <p><strong>Wybrane opcje:</strong></p>
                        <ul>
                            <li>Kolor: ${item.selectedColor}</li>
                            <li>Rozmiar: ${item.selectedSize}</li>
                            ${item.selectedMaterial ? `<li>Materiał: ${item.selectedMaterial}</li>` : ''}
                            ${item.selectedUpholstery ? `<li>Tapicerka: ${item.selectedUpholstery}</li>` : ''}
                            ${item.selectedExtendable !== undefined ? `<li>Rozkładanie: ${item.selectedExtendable ? 'Tak' : 'Nie'}</li>` : ''}
                        </ul>
                    </div>
                    <p><strong>Łącznie za produkt:</strong> ${formatPrice(item.totalPrice)}</p>
                </div>
            `).join('')}

            <div class="total">
                <h3>Podsumowanie zamówienia:</h3>
                <p><strong>Suma produktów:</strong> ${formatPrice(order.totalAmount)}</p>
                <p><strong>Koszt wysyłki:</strong> ${formatPrice(order.shippingFee)}</p>
                <p style="font-size: 18px;"><strong>ŁĄCZNA KWOTA:</strong> ${formatPrice(order.finalAmount)}</p>
            </div>

            <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
                Ten email został wygenerowany automatycznie przez system Er-Furniture.
            </p>
        </div>
    </body>
    </html>
  `;
};

export const getAllOrders = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};