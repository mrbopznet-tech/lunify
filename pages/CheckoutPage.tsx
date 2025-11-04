
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import { createOrder } from '../services/api';

import { PlatformIcon } from '../components/PlatformIcon';
import { Loader2 } from '../components/icons';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const CheckoutPage: React.FC = () => {
  const { order } = useOrder();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!order) {
      navigate('/services');
    }
  }, [order, navigate]);

  const handlePayment = async () => {
    if (!order) return;
    setLoading(true);
    setError('');
    try {
        const result = await createOrder({
            serviceId: order.service.id,
            quantity: order.quantity,
            email: order.customerEmail,
            target: order.targetAccount
        });

        if (result.success && result.paymentUrl) {
            // In a real app, this would redirect
            // window.location.href = result.paymentUrl;
            alert(`Redirecting to payment gateway for order ${result.orderCode}...`);
            navigate(`/order/${result.orderCode}`);
        } else {
            setError(result.message || 'Failed to create order. Please try again.');
        }

    } catch(err) {
        setError('An unexpected error occurred.');
    } finally {
        setLoading(false);
    }
  };

  if (!order) {
    return null; // Or a loading spinner while redirecting
  }

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-[#2d2d2d] mb-2">Order Summary</h1>
            <p className="text-lg text-gray-600">Please review your order details before payment.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="flex items-center space-x-4 pb-6 border-b">
                <PlatformIcon platform={order.service.platform} size={40} className="text-[#b8c0ff]"/>
                <div>
                    <h2 className="text-2xl font-bold">{order.service.name}</h2>
                    <p className="text-gray-500">{order.service.platform} - {order.service.type}</p>
                </div>
            </div>
            
            <div className="space-y-3 text-lg">
                <div className="flex justify-between">
                    <span className="text-gray-600">Target:</span>
                    <span className="font-semibold text-right break-all">{order.targetAccount}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold text-right break-all">{order.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{order.quantity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Price per 1,000:</span>
                    <span className="font-semibold">${order.service.price_per_1000.toFixed(2)}</span>
                </div>
            </div>

            <div className="pt-6 border-t text-center">
                 <p className="text-gray-600 text-lg">Total Amount</p>
                 <p className="text-5xl font-extrabold text-[#2d2d2d] my-2">${order.totalPrice.toFixed(2)}</p>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            
            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full flex items-center justify-center bg-gradient-to-r from-[#ffd6a5] to-[#ffb367] text-[#2d2d2d] font-bold py-4 px-8 text-xl rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-70 disabled:cursor-wait"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin mr-3"/>
                        Processing...
                    </>
                ) : (
                    'Proceed to Payment'
                )}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">You will be redirected to Tripay to complete your payment securely.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CheckoutPage;
