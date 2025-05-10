
import { Order } from '@/types/order';

export const orders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        product: {
          id: '1',
          name: 'Paracétamol 500mg',
          description: 'Analgésique et antipyrétique',
          price: 5.99,
          imageUrl: 'https://placehold.co/300x300?text=Paracétamol',
          category: 'antidouleur',
          brand: 'Générique',
          requiresPrescription: false,
          inStock: true,
        },
        quantity: 2,
        unitPrice: 5.99
      },
      {
        product: {
          id: '5',
          name: 'Loratadine 10mg',
          description: 'Antihistaminique non sédatif',
          price: 8.95,
          imageUrl: 'https://placehold.co/300x300?text=Loratadine',
          category: 'allergies',
          brand: 'Générique',
          requiresPrescription: false,
          inStock: true,
        },
        quantity: 1,
        unitPrice: 8.95
      }
    ],
    totalAmount: 20.93,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    deliveryMethod: 'standard',
    deliveryAddress: '123 Rue de Paris, 75001 Paris',
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-09-15T14:45:00Z',
    estimatedDelivery: '2023-09-16T17:00:00Z',
    trackingCode: 'TRACK123456'
  },
  {
    id: '2',
    userId: '1',
    items: [
      {
        product: {
          id: '3',
          name: 'Amoxicilline 500mg',
          description: 'Antibiotique',
          price: 12.80,
          imageUrl: 'https://placehold.co/300x300?text=Amoxicilline',
          category: 'antibiotique',
          brand: 'Générique',
          requiresPrescription: true,
          inStock: true,
        },
        quantity: 1,
        unitPrice: 12.80
      }
    ],
    totalAmount: 12.80,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'paypal',
    deliveryMethod: 'express',
    deliveryAddress: '123 Rue de Paris, 75001 Paris',
    createdAt: '2023-10-02T09:15:00Z',
    updatedAt: '2023-10-02T11:20:00Z',
    estimatedDelivery: '2023-10-02T18:00:00Z',
    prescriptionId: 'PRESC12345',
    trackingCode: 'TRACK654321'
  },
  {
    id: '3',
    userId: '1',
    items: [
      {
        product: {
          id: '7',
          name: 'Vitamine D3 1000UI',
          description: 'Supplément vitaminique',
          price: 15.20,
          imageUrl: 'https://placehold.co/300x300?text=Vitamine+D3',
          category: 'supplements',
          brand: 'NaturaSanté',
          requiresPrescription: false,
          inStock: true,
        },
        quantity: 1,
        unitPrice: 15.20
      },
      {
        product: {
          id: '12',
          name: 'Crème hydratante',
          description: 'Crème hydratante pour peau sèche',
          price: 14.50,
          imageUrl: 'https://placehold.co/300x300?text=Crème',
          category: 'dermatologie',
          brand: 'DermaSoin',
          requiresPrescription: false,
          inStock: true,
        },
        quantity: 1,
        unitPrice: 14.50
      }
    ],
    totalAmount: 29.70,
    status: 'shipping',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    deliveryMethod: 'standard',
    deliveryAddress: '123 Rue de Paris, 75001 Paris',
    createdAt: '2023-11-01T14:20:00Z',
    updatedAt: '2023-11-01T15:45:00Z',
    estimatedDelivery: '2023-11-03T17:00:00Z',
    trackingCode: 'TRACK789012'
  },
  {
    id: '4',
    userId: '1',
    items: [
      {
        product: {
          id: '6',
          name: 'Oméprazole 20mg',
          description: 'Inhibiteur de la pompe à protons',
          price: 9.50,
          imageUrl: 'https://placehold.co/300x300?text=Oméprazole',
          category: 'digestif',
          brand: 'Générique',
          requiresPrescription: true,
          inStock: true,
        },
        quantity: 2,
        unitPrice: 9.50
      }
    ],
    totalAmount: 19.00,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    deliveryMethod: 'standard',
    deliveryAddress: '123 Rue de Paris, 75001 Paris',
    createdAt: '2023-11-10T11:30:00Z',
    updatedAt: '2023-11-10T11:35:00Z',
    estimatedDelivery: '2023-11-12T17:00:00Z',
    prescriptionId: 'PRESC67890',
    trackingCode: 'TRACK345678'
  }
];

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};
