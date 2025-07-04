import React from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import { Navbar, Sidebar } from './components/navigation';
import { Footer } from './components/Footer';
import { OneTimeSetup } from './components/OneTimeSetup';
import {
  HomePage,
  AboutPage,
  ProductsPage,
  SingleProductPage,
  CartPage,
  ErrorPage,
  LoginPage,
  CheckoutPage,
  ContactPage
} from './pages';

const AppContent: React.FC = () => {
  const { currentPage, products, productsLoading, productsError } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage />;
      case 'single-product':
        return <SingleProductPage />;
      case 'cart':
        return <CartPage />;
      case 'login':
        return <LoginPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <ErrorPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Sidebar />
      {renderPage()}
      <Footer />

      {/* Pokaż OneTimeSetup gdy brak produktów i skończono ładowanie */}
      {!productsLoading && products.length === 0 && productsError && (
        <OneTimeSetup />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;