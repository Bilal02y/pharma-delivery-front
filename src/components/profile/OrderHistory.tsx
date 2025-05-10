
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from '@/types/order';
import { ChevronRight } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Vous n'avez pas encore de commandes.</p>
            <Link to="/products">
              <Button className="mt-4">Explorer les médicaments</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'preparing':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'shipping':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En traitement';
      case 'confirmed':
        return 'Confirmée';
      case 'preparing':
        return 'En préparation';
      case 'shipping':
        return 'En livraison';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des commandes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium">
                      Commande #{order.id}
                    </h3>
                    <Badge className={`${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <Link to={`/orders/${order.id}`}>
                  <Button variant="ghost" size="sm" className="text-medical-primary">
                    <span>Détails</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="font-medium">{order.totalAmount.toFixed(2)} €</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Produits</span>
                  <span className="text-sm">{order.items.length} article(s)</span>
                </div>
                
                {order.trackingCode && (
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Suivi</span>
                    <span className="text-sm font-mono">{order.trackingCode}</span>
                  </div>
                )}
                
                {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Livraison estimée</span>
                    <span className="text-sm">
                      {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
