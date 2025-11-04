import { Service, Order, Platform, ServiceType, OrderDetails } from '../types';

const API_BASE_URL = '/api'; // Relative path works well for cPanel deployment

export const getServices = async (filters: { platform?: Platform, type?: ServiceType } = {}): Promise<Service[]> => {
  const params = new URLSearchParams();
  if (filters.platform) {
    params.append('platform', filters.platform);
  }
  if (filters.type) {
    params.append('type', filters.type);
  }
  
  const response = await fetch(`${API_BASE_URL}/get_services.php?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'API returned an error');
  }
  return data.services;
};

export const getServiceBySlug = async (slug: string): Promise<Service | undefined> => {
    const response = await fetch(`${API_BASE_URL}/get_service.php?slug=${slug}`);
    if (!response.ok) {
        throw new Error('Failed to fetch service details');
    }
    const data = await response.json();
    if (!data.success) {
      return undefined;
    }
    return data.service;
};

export const createOrder = async (orderDetails: { serviceId: number, quantity: number, email: string, target: string }): Promise<{ success: boolean; orderCode?: string; paymentUrl?: string; message?: string }> => {
    const response = await fetch(`${API_BASE_URL}/create_order.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
    });
    
    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
};

export const getOrderStatus = async (orderCode: string): Promise<Order | null> => {
    const response = await fetch(`${API_BASE_URL}/get_order_status.php?order_code=${orderCode}`);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    if (!data.success) {
        return null;
    }
    // The API returns the service object nested, which matches the Order type
    return data.order;
};
