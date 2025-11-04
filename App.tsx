
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { OrderProvider } from './context/OrderContext';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackerPage from './pages/OrderTrackerPage';
import NotFoundPage from './pages/NotFoundPage';

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/service/:slug" element={<ServiceDetailPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order" element={<OrderTrackerPage />} />
                    <Route path="/order/:orderCode" element={<OrderTrackerPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

function App() {
  return (
    <OrderProvider>
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </OrderProvider>
  );
}

export default App;
