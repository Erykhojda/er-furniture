# Er-Furniture - Platforma E-commerce do sprzedaży mebli

![Version](https://img.shields.io/badge/version-1.0.0-red)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.14.1-orange)
![Stripe](https://img.shields.io/badge/Stripe-17.5.0-purple)

## 📋 Spis Treści

- [O Projekcie](#-o-projekcie)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Funkcjonalności](#-funkcjonalności)
- [Instalacja](#-instalacja)
- [Struktura Projektu](#-struktura-projektu)
- [Skrypty](#-skrypty)

---

## 🏠 O Projekcie

**Er-Furniture** to nowoczesna aplikacja e-commerce do sprzedaży mebli z litego drewna, stworzona jako projekt inżynierski. Aplikacja oferuje pełną funkcjonalność sklepu internetowego z integracją płatności Stripe, systemem zarządzania produktami w Firebase oraz automatycznymi powiadomieniami email.

### ✨ Kluczowe Funkcje

- 🛒 **Koszyk zakupowy** - Real-time updates, persystencja state
- 💳 **Płatności Stripe** - Karty, BLIK, Przelewy24
- 🔥 **Firebase Backend** - Firestore + Authentication
- 📧 **Email notifications** - Automatyczne potwierdzenia
- 🎨 **Konfigurator produktów** - Kolor, rozmiar, materiał, tapicerka
- 🇵🇱 **100% po polsku** - Pełna lokalizacja
- 📱 **Responsive** - Mobile-first design

---

## 🎥 Demo

🔗 **Live Demo:** [er-furniture.vercel.app](https://er-furniture.vercel.app) *(wkrótce)*

### Screenshot

<img width="1707" height="1051" alt="Zrzut ekranu 2025-12-26 o 22 49 02" src="https://github.com/user-attachments/assets/cbec8919-88bf-4fd6-89fd-543297f9fa78" />


### Testowe Dane Stripe
```
Karta: 4242 4242 4242 4242
Data: 12/34 (dowolna przyszła)
CVC: 123 (dowolne 3 cyfry)
```

---

## 🛠 Tech Stack

### Frontend
- React 18.3.1
- TypeScript 5.6.2
- Vite 6.0.5
- Tailwind CSS 3.4.17

### Backend
- Node.js + Express 4.21.2
- Stripe SDK 17.5.0
- Nodemailer 6.9.16
- Firebase Admin 13.0.2

### Services
- Firebase Firestore (Database)
- Firebase Authentication
- Stripe Payment Gateway
- Gmail SMTP

---

## ✨ Funkcjonalności

### Dla Klientów

✅ Katalog produktów z filtrowaniem (kategoria, cena, nazwa)  
✅ Wyszukiwanie tekstowe  
✅ Konfigurator produktów:
  - 7 kolorów wykończenia
  - Wybór rozmiaru
  - 8 materiałów drewna  
  - 8 rodzajów tapicerki
  - Opcja rozkładania
  
✅ Koszyk z edycją ilości  
✅ Checkout z Stripe Payment Element  
✅ Płatności: Karty / BLIK / Przelewy24  
✅ Email z potwierdzeniem zamówienia  
✅ Rejestracja i logowanie (Email/Google)  

### Dla Właściciela

✅ Automatyczne powiadomienia email o zamówieniach  
✅ Pełne dane zamówienia (produkty, opcje, ceny)  
✅ Historia zamówień w Firebase Firestore  
✅ Dashboard Stripe z płatnościami  
✅ Lista subskrybentów newslettera  

---

## 🚀 Instalacja

### Wymagania

- Node.js 18.x+
- npm 9.x+
- Konta: Firebase, Stripe, Gmail

### Quick Start
```bash
# 1. Klonowanie
git clone https://github.com/justeryk/er-furniture.git
cd er-furniture

# 2. Instalacja zależności
npm install
cd server && npm install && cd ..

# 3. Konfiguracja (zobacz sekcję poniżej)
cp .env.example .env
cp server/.env.example server/.env

# 4. Uruchomienie
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

Aplikacja: **http://localhost:5173**

### Szczegółowa Konfiguracja

<details>
<summary><b>1️⃣ Firebase Setup</b></summary>

**A. Utwórz projekt:**
1. [Firebase Console](https://console.firebase.google.com) → Add project
2. Nazwa: `er-furniture`
3. Wyłącz Analytics

**B. Włącz Firestore:**
```
Firestore Database → Create → Production mode → europe-central2
```

**C. Włącz Authentication:**
```
Authentication → Sign-in method → Enable Email/Password + Google
```

**D. Pobierz klucze:**

Frontend (`src/firebase/config.ts`):
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ...
};
```

Backend:
```
Project Settings → Service accounts → Generate new private key
→ Zapisz jako: server/firebase-adminsdk.json
```

</details>

<details>
<summary><b>2️⃣ Stripe Setup</b></summary>

1. [Stripe Dashboard](https://dashboard.stripe.com) → Developers → API keys
2. Skopiuj:
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`

3. Włącz metody płatności:
```
Settings → Payment methods → Enable: Cards, BLIK, Przelewy24
```

</details>

<details>
<summary><b>3️⃣ Gmail SMTP Setup</b></summary>

1. Włącz weryfikację 2-etapową: [Google Account Security](https://myaccount.google.com/security)
2. Wygeneruj hasło aplikacji: [App Passwords](https://myaccount.google.com/apppasswords)
   - App: Mail
   - Device: Other → "Er-Furniture"
3. Skopiuj 16-znakowe hasło (bez spacji)

</details>

<details>
<summary><b>4️⃣ Environment Variables</b></summary>

**Frontend `.env`:**
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_51SZE9Z...
```

**Backend `server/.env`:**
```env
STRIPE_SECRET_KEY=sk_test_51SZE9Z...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=16-char-app-password
EMAIL_TO=your-email@gmail.com
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-adminsdk.json
PORT=3001
```

⚠️ Dodaj do `.gitignore`:
```
.env
server/.env
server/firebase-adminsdk.json
```

</details>

---

## 📁 Struktura Projektu
```
er-furniture/
├── src/
│   ├── components/
│   │   ├── auth/          # Login, Register
│   │   ├── cart/          # CartItem, CartColumns
│   │   ├── filters/       # Filters, Sort, ProductList
│   │   ├── payment/       # CheckoutForm (Stripe)
│   │   ├── product/       # Product, ProductImages, ProductInfo
│   │   └── ui/            # Navbar, Footer, Loading
│   ├── context/
│   │   ├── AppContext.tsx # Global state
│   │   ├── CartReducer.ts # Cart logic
│   │   └── useApp.ts      # Custom hook
│   ├── firebase/
│   │   ├── config.ts      # Firebase init
│   │   ├── auth.ts        # Auth functions
│   │   └── products.ts    # Firestore CRUD
│   ├── pages/             # Page components
│   ├── types/             # TypeScript definitions
│   └── utils/             # Helper functions
│
├── server/
│   ├── index.js           # Express API
│   ├── firebase-adminsdk.json
│   └── .env
│
└── package.json
```

---

## 🎯 Skrypty

### Frontend
```bash
npm run dev      # Dev server (localhost:5173)
npm run build    # Production build → ./dist/
npm run preview  # Preview production build
npm run lint     # ESLint check
```

### Backend
```bash
npm run dev      # Dev server with nodemon (localhost:3001)
npm start        # Production server
```

---







