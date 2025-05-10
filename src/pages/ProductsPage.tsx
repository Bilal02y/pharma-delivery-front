
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductList from '@/components/products/ProductList';
import ProductFilters from '@/components/products/ProductFilters';
import { getFilteredProducts, categories } from '@/data/products';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(getFilteredProducts());
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  // Les filtres
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || null,
    priceRange: [0, 50],
    onlyNoPrescription: false,
    onlyInStock: true,
  });

  // Récupérer les produits filtrés
  useEffect(() => {
    const categoryId = filters.category || undefined;
    const requiresPrescription = filters.onlyNoPrescription ? false : undefined;
    const minPrice = filters.priceRange[0];
    const maxPrice = filters.priceRange[1];
    
    const filteredProducts = getFilteredProducts(
      categoryId,
      requiresPrescription,
      minPrice,
      maxPrice,
      searchQuery
    );
    
    setProducts(filteredProducts);
    
    // Mettre à jour l'URL
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (searchQuery) params.set('q', searchQuery);
    setSearchParams(params);
  }, [filters, searchQuery, setSearchParams]);

  // Gérer le changement de filtres
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Gérer la recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // La recherche est déjà gérée par le useEffect
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catalogue de médicaments</h1>
          <p className="text-gray-600">
            Trouvez tous vos médicaments et produits de santé
          </p>
        </div>
        
        {/* Barre de recherche et filtres (mobile) */}
        <div className="flex items-center justify-between mb-6">
          <form 
            onSubmit={handleSearch}
            className="flex-grow max-w-md"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher un médicament..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <div className="ml-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <ProductFilters 
                    onFilterChange={handleFilterChange}
                    minPrice={0}
                    maxPrice={50}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres (desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters 
                onFilterChange={handleFilterChange}
                minPrice={0}
                maxPrice={50}
              />
            </div>
          </div>
          
          {/* Liste de produits */}
          <div className="flex-grow">
            {/* Afficher le titre de la catégorie si une catégorie est sélectionnée */}
            {filters.category && (
              <h2 className="text-2xl font-semibold mb-6">
                {categories.find(c => c.id === filters.category)?.name || 'Catégorie'}
              </h2>
            )}
            
            <ProductList 
              products={products} 
              emptyMessage={
                searchQuery 
                  ? `Aucun résultat pour "${searchQuery}"`
                  : "Aucun produit ne correspond aux filtres sélectionnés"
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
