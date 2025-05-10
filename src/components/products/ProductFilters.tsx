
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { categories } from '@/data/products';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductFiltersProps {
  onFilterChange: (filters: {
    category: string | null;
    priceRange: [number, number];
    onlyNoPrescription: boolean;
    onlyInStock: boolean;
  }) => void;
  minPrice?: number;
  maxPrice?: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  onFilterChange,
  minPrice = 0,
  maxPrice = 50
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [onlyNoPrescription, setOnlyNoPrescription] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(true);

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = categoryId === categoryFilter ? null : categoryId;
    setCategoryFilter(newCategory);
    onFilterChange({
      category: newCategory,
      priceRange,
      onlyNoPrescription,
      onlyInStock
    });
  };

  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [value[0], value[1]];
    setPriceRange(newPriceRange);
    onFilterChange({
      category: categoryFilter,
      priceRange: newPriceRange,
      onlyNoPrescription,
      onlyInStock
    });
  };

  const handlePrescriptionChange = (checked: boolean) => {
    setOnlyNoPrescription(checked);
    onFilterChange({
      category: categoryFilter,
      priceRange,
      onlyNoPrescription: checked,
      onlyInStock
    });
  };

  const handleStockChange = (checked: boolean) => {
    setOnlyInStock(checked);
    onFilterChange({
      category: categoryFilter,
      priceRange,
      onlyNoPrescription,
      onlyInStock: checked
    });
  };

  const resetFilters = () => {
    setCategoryFilter(null);
    setPriceRange([minPrice, maxPrice]);
    setOnlyNoPrescription(false);
    setOnlyInStock(true);
    onFilterChange({
      category: null,
      priceRange: [minPrice, maxPrice],
      onlyNoPrescription: false,
      onlyInStock: true
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filtres</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Réinitialiser
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger>Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={categoryFilter === category.id ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span className="truncate">{category.name}</span>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Prix</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider 
                min={minPrice} 
                max={maxPrice} 
                step={1} 
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between">
                <div>
                  <span className="text-sm text-gray-500">Min:</span>
                  <span className="text-sm font-medium ml-1">{priceRange[0]}€</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Max:</span>
                  <span className="text-sm font-medium ml-1">{priceRange[1]}€</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Disponibilité</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="no-prescription" 
                  checked={onlyNoPrescription}
                  onCheckedChange={handlePrescriptionChange}
                />
                <Label htmlFor="no-prescription">Sans ordonnance uniquement</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="in-stock" 
                  checked={onlyInStock}
                  onCheckedChange={handleStockChange}
                />
                <Label htmlFor="in-stock">En stock uniquement</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
