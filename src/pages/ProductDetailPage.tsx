
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, products, categories } from '@/data/products';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ShoppingCart, 
  ClipboardList,
  Pill,
  AlertTriangle,
  Clock
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ProductList from '@/components/products/ProductList';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : null;
  
  // Rediriger vers la page 404 si le produit n'existe pas
  React.useEffect(() => {
    if (!product && id) {
      navigate('/404');
    }
  }, [product, id, navigate]);
  
  if (!product) {
    return null;
  }
  
  const category = categories.find(c => c.id === product.category);
  
  // Produits similaires (même catégorie)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/products" className="hover:text-medical-primary">
              Médicaments
            </Link>
            <span className="mx-2">/</span>
            <Link 
              to={`/products?category=${product.category}`}
              className="hover:text-medical-primary"
            >
              {category?.name || product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium truncate">
              {product.name}
            </span>
          </div>
          <Link 
            to="/products" 
            className="inline-flex items-center text-medical-primary hover:underline mt-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour aux produits
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {category?.name || product.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
                {product.requiresPrescription && (
                  <Badge className="bg-amber-500">
                    <ClipboardList className="h-3 w-3 mr-1" />
                    Ordonnance requise
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <p className="text-gray-600">{product.description}</p>
              
              <div className="flex items-center">
                <div className="text-2xl font-bold text-medical-primary">
                  {product.price.toFixed(2)} €
                </div>
                {product.inStock ? (
                  <Badge variant="outline" className="ml-4 text-green-600 border-green-200 bg-green-50">
                    En stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-4 text-red-600 border-red-200 bg-red-50">
                    Rupture de stock
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 py-4">
                <Button 
                  size="lg" 
                  onClick={handleAddToCart} 
                  disabled={!product.inStock || product.requiresPrescription}
                  className="flex-grow sm:flex-grow-0"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </Button>
                
                {product.requiresPrescription && (
                  <Link to="/prescription" className="flex-grow sm:flex-grow-0">
                    <Button size="lg" variant="outline" className="w-full">
                      <ClipboardList className="mr-2 h-5 w-5" />
                      Envoyer une ordonnance
                    </Button>
                  </Link>
                )}
              </div>
              
              {/* Informations supplémentaires */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                {product.dosage && (
                  <div className="flex">
                    <Pill className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="font-medium text-sm">Dosage</div>
                      <div className="text-gray-600">{product.dosage}</div>
                    </div>
                  </div>
                )}
                
                {product.requiresPrescription && (
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                    <div>
                      <div className="font-medium text-sm">Ordonnance médicale requise</div>
                      <div className="text-gray-600">Ce médicament nécessite une prescription médicale valide.</div>
                    </div>
                  </div>
                )}
                
                <div className="flex">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <div className="font-medium text-sm">Livraison</div>
                    <div className="text-gray-600">Livraison standard : 24-48h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="composition">Composition</TabsTrigger>
              <TabsTrigger value="sideEffects">Effets secondaires</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                {product.dosage && (
                  <>
                    <h3>Posologie</h3>
                    <p>La posologie standard pour ce médicament est de {product.dosage}. Veuillez suivre les instructions de votre médecin ou les indications de la notice.</p>
                  </>
                )}
                <h3>Conservation</h3>
                <p>À conserver à température ambiante, à l'abri de l'humidité et hors de portée des enfants.</p>
              </div>
            </TabsContent>
            <TabsContent value="composition" className="p-4">
              <div className="prose max-w-none">
                <h3>Composition</h3>
                <p>
                  {product.composition || "Informations sur la composition non disponibles. Veuillez consulter la notice du médicament pour plus de détails."}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="sideEffects" className="p-4">
              <div className="prose max-w-none">
                <h3>Effets indésirables potentiels</h3>
                <p>
                  {product.sideEffects || "Comme tous les médicaments, celui-ci peut provoquer des effets indésirables, mais ils ne surviennent pas systématiquement chez tout le monde. Veuillez consulter la notice pour une liste complète des effets indésirables."}
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded p-4 mt-4">
                  <p className="text-amber-800 font-medium">Attention</p>
                  <p className="text-amber-700">
                    Si vous ressentez des effets indésirables graves ou inhabituels, consultez immédiatement un médecin ou un pharmacien.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <ProductList products={similarProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
