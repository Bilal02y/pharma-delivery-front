
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
  requiresPrescription: boolean;
  inStock: boolean;
  dosage?: string;
  composition?: string;
  sideEffects?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
