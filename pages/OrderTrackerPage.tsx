import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOrderStatus } from '../services/api';
import { Order, OrderStatus } from '../types';
import { Loader2, Search, CheckCircle2, Clock, XCircle, CreditCard } from '../components/icons';
import OrderStatusStepper from '../components/OrderStatusStepper';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusInfo = {
        [OrderStatus.Pending]: { text: 'Pending Payment', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
        [OrderStatus.Paid]: { text: 'Paid, Awaiting Processing', icon: CreditCard, color: 'bg-blue-100 text-blue-800' },
        [OrderStatus.Processing]: { text: 'Processing', icon: Loader2, color: 'bg-indigo-100 text-indigo-800' },
        [OrderStatus.Done]: { text: 'Completed', icon: CheckCircle2, color: 'bg-green-100 text-green-800' },
        [OrderStatus.Cancelled]: { text: 'Cancelled', icon: XCircle, color: 'bg-red-100 text-red-800' },
    };

    const { text, icon: Icon, color } = statusInfo[status];
    const isProcessing = status === OrderStatus.Processing;
    
    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-lg ${color}`}>
            <Icon className={isProcessing ? 'animate-spin' : ''} />
            <span>{text}</span>
        </div>
    )
}


const OrderTrackerPage: React.FC = () => {
    const { orderCode: paramOrderCode } = useParams();
    const navigate = useNavigate();
    const [orderCode, setOrderCode] = useState(paramOrderCode || '');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (paramOrderCode) {
            handleSearch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramOrderCode]);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!orderCode.trim()) return;
        
        setLoading(true);
        setError('');
        setSearched(true);
        setOrder(null);

        // Update URL without page reload
        navigate(`/order/${orderCode}`, { replace: true });
        
        const data = await getOrderStatus(orderCode);
        if (data) {
            setOrder(data);
        } else {
            setError('Order not found. Please check the code and try again.');
        }
        setLoading(false);
    };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-[#2d2d2d] mb-2">Track Your Order</h1>
            <p className="text-lg text-gray-600">Enter your order code to see its current status.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <input 
                type="text" 
                value={orderCode}
                onChange={e => setOrderCode(e.target.value)}
                placeholder="Enter your order code (e.g., LNVFY-12345)"
                className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8c0ff]"
            />
            <button type="submit" disabled={loading} className="p-4 bg-gradient-to-r from-[#b8c0ff] to-[#a0aaff] text-white rounded-lg shadow hover:scale-105 transform transition-transform duration-300 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" /> : <Search />}
            </button>
        </form>

        <div className="min-h-[24rem] flex items-center justify-center">
        {loading ? (
            <Loader2 className="animate-spin text-[#b8c0ff]" size={48} />
        ) : error ? (
            <div className="text-center bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
                <XCircle size={40} className="mx-auto mb-2"/>
                <p className="font-semibold">{error}</p>
            </div>
        ) : order ? (
            <motion.div initial={{opacity: 0, y:10}} animate={{opacity:1, y:0}} className="w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Order Status</h2>
                    <p className="font-mono text-gray-500">{order.order_code}</p>
                </div>

                <div className="flex justify-center mb-8">
                    <StatusBadge status={order.status} />
                </div>

                <div className="mb-8">
                    <OrderStatusStepper currentStatus={order.status} />
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-3">
                     <h3 className="text-xl font-semibold mb-3 text-gray-700">Order Details</h3>
                     <div className="flex justify-between items-center py-2">
                        <span className="text-gray-500">Service:</span>
                        <span className="font-semibold text-right">{order.service.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 bg-gray-50/50 px-3 rounded-md">
                        <span className="text-gray-500">Quantity:</span>
                        <span className="font-semibold">{order.quantity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-500">Total Price:</span>
                        <span className="font-semibold">${order.total_price.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between items-center py-2 bg-gray-50/50 px-3 rounded-md">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-semibold">{new Date(order.created_at).toLocaleString()}</span>
                    </div>
                </div>
            </motion.div>
        ) : searched ? null : (
             <div className="text-center text-gray-500">
                <Search size={48} className="mx-auto mb-4 opacity-50"/>
                <p>Your order status will appear here.</p>
             </div>
        )}
        </div>

      </div>
    </PageWrapper>
  );
};

export default OrderTrackerPage;