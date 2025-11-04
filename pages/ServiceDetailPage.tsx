
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getServiceBySlug } from '../services/api';
import { Service } from '../types';
import { useOrder } from '../context/OrderContext';

import { Loader2, ShoppingCart } from '../components/icons';
import QuantitySelector from '../components/QuantitySelector';
import { PlatformIcon, ServiceTypeIcon } from '../components/PlatformIcon';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setOrderDetails } = useOrder();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1000);
  const [targetAccount, setTargetAccount] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      setLoading(true);
      const data = await getServiceBySlug(slug);
      if (data) {
        setService(data);
        setQuantity(data.min_qty);
      } else {
        // Handle not found, maybe redirect
      }
      setLoading(false);
    };
    fetchService();
  }, [slug]);

  const totalPrice = useMemo(() => {
    if (!service) return 0;
    return (service.price_per_1000 / 1000) * quantity;
  }, [service, quantity]);
  
  const handleCheckout = () => {
    if (!service) return;
    if (!targetAccount.trim()) {
        setError('Please enter the target username or link.');
        return;
    }
     if (!customerEmail.trim() || !/\S+@\S+\.\S+/.test(customerEmail)) {
        setError('Please enter a valid email address.');
        return;
    }
    setError('');
    setOrderDetails(service, quantity, targetAccount, customerEmail);
    navigate('/checkout');
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin text-[#b8c0ff]" size={48} />
      </div>
    );
  }

  if (!service) {
    return <div className="text-center text-xl">Service not found.</div>;
  }

  return (
    <PageWrapper>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side: Service Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <PlatformIcon platform={service.platform} className="text-[#b8c0ff]" size={32} />
              <h1 className="text-3xl md:text-4xl font-bold text-[#2d2d2d]">{service.name}</h1>
            </div>
             <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1 mb-6 w-fit">
                <ServiceTypeIcon type={service.type} size={16} />
                <span>{service.type}</span>
            </div>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <div className="space-y-4 text-sm">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Price per 1,000:</span>
                    <span className="font-bold">${service.price_per_1000.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Min Quantity:</span>
                    <span className="font-bold">{service.min_qty.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Max Quantity:</span>
                    <span className="font-bold">{service.max_qty.toLocaleString()}</span>
                </div>
            </div>
          </div>

          {/* Right Side: Order Form */}
          <div className="bg-[#f7f4f9] p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center">Place Your Order</h2>
            <div className="space-y-6">
                <div>
                    <label className="font-semibold mb-2 block">Target (Username/Link)</label>
                    <input type="text" value={targetAccount} onChange={e => setTargetAccount(e.target.value)} placeholder="e.g., @username or https://..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8c0ff]"/>
                </div>
                 <div>
                    <label className="font-semibold mb-2 block">Your Email</label>
                    <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="e.g., you@example.com" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8c0ff]"/>
                </div>
                <div>
                    <label className="font-semibold mb-2 block">Quantity</label>
                    <div className="flex justify-center">
                        <QuantitySelector value={quantity} onChange={setQuantity} min={service.min_qty} max={service.max_qty} step={service.min_qty}/>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div className="text-center bg-white p-4 rounded-lg shadow-inner">
                    <p className="text-gray-600">Total Price</p>
                    <p className="text-4xl font-extrabold text-[#2d2d2d]">${totalPrice.toFixed(2)}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Bottom Bar on Mobile */}
      <div className="lg:hidden h-24"></div> {/* Spacer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t p-4 lg:hidden z-40">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
            <button onClick={handleCheckout} className="flex items-center justify-center bg-gradient-to-r from-[#b8c0ff] to-[#a0aaff] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300">
                <ShoppingCart size={20} className="mr-2"/>
                Checkout
            </button>
        </div>
      </div>
       {/* Button on Desktop */}
       <div className="hidden lg:flex justify-end mt-8">
           <button onClick={handleCheckout} className="flex items-center justify-center bg-gradient-to-r from-[#b8c0ff] to-[#a0aaff] text-white font-bold py-4 px-10 text-lg rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300">
                <ShoppingCart size={24} className="mr-3"/>
                Proceed to Checkout
            </button>
       </div>
    </PageWrapper>
  );
};

export default ServiceDetailPage;
