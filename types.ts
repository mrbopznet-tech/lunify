
export enum Platform {
  Instagram = 'Instagram',
  TikTok = 'TikTok',
  YouTube = 'YouTube',
  X = 'X',
  Facebook = 'Facebook',
  Telegram = 'Telegram'
}

export enum ServiceType {
  Likes = 'Likes',
  Followers = 'Followers',
  Views = 'Views',
  Comments = 'Comments',
  Subscribers = 'Subscribers'
}

export interface Service {
  id: number;
  slug: string;
  platform: Platform;
  type: ServiceType;
  name: string;
  description: string;
  price_per_1000: number;
  min_qty: number;
  max_qty: number;
  status: 'active' | 'inactive';
}

export enum OrderStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Processing = 'Processing',
  Done = 'Done',
  Cancelled = 'Cancelled'
}

export interface Order {
  id: number;
  order_code: string;
  service: Service;
  quantity: number;
  total_price: number;
  customer_email: string;
  target_account: string; // e.g. Instagram username or video URL
  status: OrderStatus;
  created_at: string;
}

export interface OrderDetails {
  service: Service;
  quantity: number;
  totalPrice: number;
  targetAccount: string;
  customerEmail: string;
}
