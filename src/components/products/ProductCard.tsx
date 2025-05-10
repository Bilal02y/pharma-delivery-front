
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { ClipboardList, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="flex-grow flex flex-col">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="object-cover w-full h-full"
          />
          {product.requiresPrescription && (
            <Badge className="absolute top-2 right-2 bg-amber-500">
              <ClipboardList className="h-3 w-3 mr-1" />
              Ordonnance
            </Badge>
          )}
        </div>
        
        <CardContent className="flex-grow p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
          </div>
          <Badge variant="outline" className="mb-2 text-xs">
            {product.brand}
          </Badge>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            {product.description}
          </p>
          <div className="text-lg font-bold text-medical-primary">
            {product.price.toFixed(2)} €
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full" 
          disabled={!product.inStock || (product.requiresPrescription)}
        >
          {product.requiresPrescription ? (
            <>Nécessite ordonnance</>
          ) : !product.inStock ? (
            <>Rupture de stock</>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> 
              Ajouter au panier
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
