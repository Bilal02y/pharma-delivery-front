
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { items, total, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">
              Vous n'avez pas encore ajouté de produits à votre panier.
            </p>
            <Link to="/products">
              <Button size="lg">
                Explorer les médicaments
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Articles ({items.length})
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Vider le panier
                </Button>
              </div>
              
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem 
                    key={item.id}
                    product={item}
                    quantity={item.quantity}
                  />
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <Link to="/products">
                  <Button variant="outline">
                    Continuer les achats
                  </Button>
                </Link>
                
                <Link to="/checkout">
                  <Button>
                    Procéder au paiement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:w-1/3">
            <CartSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
