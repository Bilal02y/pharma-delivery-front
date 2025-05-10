
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Paracétamol 500mg',
    description: 'Analgésique et antipyrétique pour soulager la douleur légère à modérée et réduire la fièvre.',
    price: 5.99,
    imageUrl: 'https://placehold.co/300x300?text=Paracétamol',
    category: 'antidouleur',
    brand: 'Générique',
    requiresPrescription: false,
    inStock: true,
    dosage: '500mg',
    composition: 'Paracétamol, excipients',
    sideEffects: 'Rarement: réactions allergiques, troubles hépatiques si surdosage'
  },
  {
    id: '2',
    name: 'Ibuprofène 400mg',
    description: 'Anti-inflammatoire non stéroïdien (AINS) pour soulager la douleur et réduire l\'inflammation.',
    price: 7.50,
    imageUrl: 'https://placehold.co/300x300?text=Ibuprofène',
    category: 'anti-inflammatoire',
    brand: 'Générique',
    requiresPrescription: false,
    inStock: true,
    dosage: '400mg',
    composition: 'Ibuprofène, excipients',
    sideEffects: 'Troubles digestifs, risque d\'ulcère en cas d\'usage prolongé'
  },
  {
    id: '3',
    name: 'Amoxicilline 500mg',
    description: 'Antibiotique de la famille des bêta-lactamines utilisé pour traiter diverses infections bactériennes.',
    price: 12.80,
    imageUrl: 'https://placehold.co/300x300?text=Amoxicilline',
    category: 'antibiotique',
    brand: 'Générique',
    requiresPrescription: true,
    inStock: true,
    dosage: '500mg',
    composition: 'Amoxicilline, excipients',
    sideEffects: 'Diarrhée, réactions allergiques, candidose'
  },
  {
    id: '4',
    name: 'Aspirine 500mg',
    description: 'Analgésique, antipyrétique et anti-inflammatoire pour soulager la douleur, réduire la fièvre et l\'inflammation.',
    price: 4.99,
    imageUrl: 'https://placehold.co/300x300?text=Aspirine',
    category: 'antidouleur',
    brand: 'Générique',
    requiresPrescription: false,
    inStock: true,
    dosage: '500mg',
    composition: 'Acide acétylsalicylique, excipients',
    sideEffects: 'Troubles digestifs, risque de saignement, syndrome de Reye chez les enfants'
  },
  {
    id: '5',
    name: 'Loratadine 10mg',
    description: 'Antihistaminique non sédatif utilisé pour soulager les symptômes d\'allergie comme le rhume des foins.',
    price: 8.95,
    imageUrl: 'https://placehold.co/300x300?text=Loratadine',
    category: 'allergies',
    brand: 'Générique',
    requiresPrescription: false,
    inStock: true,
    dosage: '10mg',
    composition: 'Loratadine, excipients',
    sideEffects: 'Rarement: maux de tête, somnolence, bouche sèche'
  },
  {
    id: '6',
    name: 'Oméprazole 20mg',
    description: 'Inhibiteur de la pompe à protons utilisé pour réduire la production d\'acide gastrique et traiter les reflux.',
    price: 9.50,
    imageUrl: 'https://placehold.co/300x300?text=Oméprazole',
    category: 'digestif',
    brand: 'Générique',
    requiresPrescription: true,
    inStock: true,
    dosage: '20mg',
    composition: 'Oméprazole, excipients',
    sideEffects: 'Maux de tête, diarrhée, nausées, douleurs abdominales'
  },
  {
    id: '7',
    name: 'Vitamine D3 1000UI',
    description: 'Supplément vitaminique pour combler les carences en vitamine D et renforcer les os.',
    price: 15.20,
    imageUrl: 'https://placehold.co/300x300?text=Vitamine+D3',
    category: 'supplements',
    brand: 'NaturaSanté',
    requiresPrescription: false,
    inStock: true,
    dosage: '1000UI',
    composition: 'Vitamine D3, huile végétale, gélatine',
    sideEffects: 'Rarement: nausées, vomissements en cas de surdosage'
  },
  {
    id: '8',
    name: 'Levothyroxine 50µg',
    description: 'Hormone thyroïdienne de synthèse utilisée pour traiter l\'hypothyroïdie.',
    price: 6.70,
    imageUrl: 'https://placehold.co/300x300?text=Levothyroxine',
    category: 'hormones',
    brand: 'Générique',
    requiresPrescription: true,
    inStock: true,
    dosage: '50µg',
    composition: 'Lévothyroxine sodique, excipients',
    sideEffects: 'Palpitations, nervosité, insomnie si dose trop élevée'
  },
  {
    id: '9',
    name: 'Métoprolol 50mg',
    description: 'Bêta-bloquant utilisé pour traiter l\'hypertension artérielle et certains troubles cardiaques.',
    price: 11.40,
    imageUrl: 'https://placehold.co/300x300?text=Métoprolol',
    category: 'cardiovasculaire',
    brand: 'Générique',
    requiresPrescription: true,
    inStock: true,
    dosage: '50mg',
    composition: 'Métoprolol, excipients',
    sideEffects: 'Fatigue, mains froides, ralentissement du rythme cardiaque'
  },
  {
    id: '10',
    name: 'Sirop pour la toux',
    description: 'Sirop antitussif pour soulager la toux sèche et irritative.',
    price: 8.25,
    imageUrl: 'https://placehold.co/300x300?text=Sirop+Toux',
    category: 'toux',
    brand: 'RespiRelief',
    requiresPrescription: false,
    inStock: true,
    dosage: '200ml',
    composition: 'Dextrométhorphane, sirop de glucose, arômes',
    sideEffects: 'Somnolence, vertiges, nausées'
  },
  {
    id: '11',
    name: 'Insuline Rapide',
    description: 'Hormone utilisée pour traiter le diabète de type 1 et parfois le diabète de type 2.',
    price: 42.99,
    imageUrl: 'https://placehold.co/300x300?text=Insuline',
    category: 'diabete',
    brand: 'DiabControl',
    requiresPrescription: true,
    inStock: true,
    dosage: '100UI/ml',
    composition: 'Insuline humaine recombinante, glycérol, eau',
    sideEffects: 'Hypoglycémie, réactions au site d\'injection'
  },
  {
    id: '12',
    name: 'Crème hydratante',
    description: 'Crème hydratante pour peau sèche et sensible.',
    price: 14.50,
    imageUrl: 'https://placehold.co/300x300?text=Crème',
    category: 'dermatologie',
    brand: 'DermaSoin',
    requiresPrescription: false,
    inStock: true,
    dosage: '150ml',
    composition: 'Glycérine, huiles végétales, eau, conservateurs',
    sideEffects: 'Rarement: irritations cutanées chez personnes sensibles'
  }
];

export const categories = [
  { id: 'antidouleur', name: 'Antidouleurs', icon: '💊' },
  { id: 'anti-inflammatoire', name: 'Anti-inflammatoires', icon: '🔥' },
  { id: 'antibiotique', name: 'Antibiotiques', icon: '🦠' },
  { id: 'allergies', name: 'Allergies', icon: '🌼' },
  { id: 'digestif', name: 'Système digestif', icon: '🧠' },
  { id: 'supplements', name: 'Compléments alimentaires', icon: '🥗' },
  { id: 'hormones', name: 'Hormones', icon: '⚗️' },
  { id: 'cardiovasculaire', name: 'Cardiovasculaire', icon: '❤️' },
  { id: 'toux', name: 'Toux & Rhume', icon: '🤧' },
  { id: 'diabete', name: 'Diabète', icon: '🍬' },
  { id: 'dermatologie', name: 'Dermatologie', icon: '🧴' }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) || 
      product.category.toLowerCase().includes(lowercaseQuery) || 
      product.brand.toLowerCase().includes(lowercaseQuery)
  );
};

export const getFilteredProducts = (
  categoryId?: string, 
  requirePrescription?: boolean,
  minPrice?: number,
  maxPrice?: number,
  searchQuery?: string
): Product[] => {
  let filteredProducts = [...products];
  
  if (categoryId) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryId);
  }
  
  if (requirePrescription !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.requiresPrescription === requirePrescription);
  }
  
  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
  }
  
  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
  }
  
  if (searchQuery) {
    const lowercaseQuery = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.description.toLowerCase().includes(lowercaseQuery) || 
        product.brand.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  return filteredProducts;
};
