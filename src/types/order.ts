
import { Product } from './product';

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'confirmed' 
  | 'preparing' 
  | 'shipping' 
  | 'delivered' 
  | 'cancelled';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded';

export type DeliveryMethod = 
  | 'standard' 
  | 'express';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  estimatedDelivery?: string; // ISO date string
  prescriptionId?: string;
  trackingCode?: string;
}
