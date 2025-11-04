
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { OrderDetails, Service } from '../types';

interface OrderContextType {
  order: OrderDetails | null;
  setOrderDetails: (service: Service, quantity: number, targetAccount: string, customerEmail: string) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<OrderDetails | null>(null);

  const setOrderDetails = (service: Service, quantity: number, targetAccount: string, customerEmail: string) => {
    const totalPrice = (service.price_per_1000 / 1000) * quantity;
    setOrder({
      service,
      quantity,
      totalPrice,
      targetAccount,
      customerEmail,
    });
  };

  const clearOrder = () => {
    setOrder(null);
  };

  return (
    <OrderContext.Provider value={{ order, setOrderDetails, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
