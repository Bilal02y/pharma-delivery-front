
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

const CartSummary: React.FC = () => {
  const { total, totalItems, items, needsPrescription } = useCart();
  const navigate = useNavigate();
  
  const deliveryFee = total > 35 ? 0 : 4.95;
  const finalTotal = total + deliveryFee;
  
  const handleCheckout = () => {
    if (needsPrescription) {
      navigate('/prescription');
    } else {
      navigate('/checkout');
    }
  };
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Résumé de la commande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Produits ({totalItems})</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        
        <div className="flex justify-between">
          <span>Livraison</span>
          <span>
            {deliveryFee === 0 ? (
              <span className="text-green-600">Gratuite</span>
            ) : (
              `${deliveryFee.toFixed(2)} €`
            )}
          </span>
        </div>
        
        {deliveryFee > 0 && (
          <div className="text-xs text-gray-500">
            Livraison gratuite à partir de 35€ d'achat
          </div>
        )}
        
        <Separator />
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{finalTotal.toFixed(2)} €</span>
        </div>
        
        {needsPrescription && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 flex items-start space-x-2">
            <ClipboardList className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Ordonnance requise</p>
              <p className="text-sm">Votre panier contient des médicaments nécessitant une ordonnance.</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleCheckout}
        >
          {needsPrescription ? 'Continuer et télécharger l\'ordonnance' : 'Procéder au paiement'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
