
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, categories } from '@/data/products';
import ProductList from '@/components/products/ProductList';
import { Search, ChevronRight, Clock, ShoppingCart, FileCheck, Check } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.filter(p => !p.requiresPrescription).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Vos médicaments livrés <span className="text-medical-primary">directement</span> chez vous
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Commandez vos médicaments en ligne et recevez-les à domicile en toute sécurité. Service rapide et ordonnances prises en charge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg">Explorer les médicaments</Button>
                </Link>
                <Link to="/prescription">
                  <Button variant="outline" size="lg">Envoyer une ordonnance</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://placehold.co/600x400?text=Pharmacie+en+ligne" 
                alt="Livraison de médicaments" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Rechercher un médicament..."
                className="pl-12 py-6 text-lg rounded-full border-gray-200 focus-visible:ring-medical-primary"
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full">
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Catégories populaires</h2>
            <p className="text-gray-600 mt-2">Parcourez nos différentes catégories de médicaments</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="flex flex-col items-center p-6 rounded-lg bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1 text-center"
              >
                <span className="text-3xl mb-3">{category.icon}</span>
                <span className="text-gray-900 font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="outline">
                Toutes les catégories <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Produits populaires</h2>
            <Link to="/products" className="text-medical-primary flex items-center hover:underline">
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <ProductList products={featuredProducts} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Comment ça fonctionne</h2>
            <p className="text-gray-600 mt-2">Commandez vos médicaments en quelques étapes simples</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-medical-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Recherchez</h3>
              <p className="text-gray-600">Trouvez vos médicaments dans notre large catalogue</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-medical-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Commandez</h3>
              <p className="text-gray-600">Ajoutez au panier et passez commande en toute simplicité</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-medical-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Recevez</h3>
              <p className="text-gray-600">Soyez livré rapidement et en toute sécurité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prescription Section */}
      <section className="py-16 bg-medical-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Besoin d'une ordonnance ?</h2>
              <p className="text-gray-600 mb-6">
                Téléchargez facilement votre ordonnance pour commander des médicaments sur prescription. Nos pharmaciens vérifieront votre ordonnance avant de valider votre commande.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-medical-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="ml-3 text-gray-700">Téléchargez une photo ou un scan de votre ordonnance</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-medical-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="ml-3 text-gray-700">Validation par nos pharmaciens qualifiés</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-medical-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="ml-3 text-gray-700">Livraison discrète et sécurisée</p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/prescription">
                  <Button>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Envoyer une ordonnance
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://placehold.co/500x400?text=Ordonnance" 
                alt="Télécharger une ordonnance" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Ce que disent nos clients</h2>
            <p className="text-gray-600 mt-2">Découvrez pourquoi ils nous font confiance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Service rapide et pratique ! J'ai reçu mes médicaments le lendemain de ma commande. Le site est facile à utiliser et le service client très efficace."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Client {i}</p>
                    <p className="text-sm text-gray-500">Client depuis 2023</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-medical-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à commander vos médicaments ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits et profitez de la livraison à domicile de vos médicaments
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products">
              <Button size="lg" variant="secondary">Commencer mes achats</Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-medical-primary">
                Créer un compte
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
