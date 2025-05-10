
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartSummary from '@/components/cart/CartSummary';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/sonner";

const deliveryMethods = [
  {
    id: "standard",
    title: "Standard",
    description: "Livraison en 2-3 jours ouvrés",
    price: 4.95,
  },
  {
    id: "express",
    title: "Express",
    description: "Livraison en 24h",
    price: 9.95,
  },
];

const paymentMethods = [
  {
    id: "card",
    title: "Carte bancaire",
    description: "Paiement sécurisé en ligne",
  },
  {
    id: "paypal",
    title: "PayPal",
    description: "Paiement via votre compte PayPal",
  },
  {
    id: "delivery",
    title: "Paiement à la livraison",
    description: "Payez en espèces ou par carte à la livraison",
  },
];

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Email invalide",
  }),
  phone: z.string().min(10, {
    message: "Numéro de téléphone invalide",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères",
  }),
  city: z.string().min(2, {
    message: "La ville doit contenir au moins 2 caractères",
  }),
  postalCode: z.string().min(5, {
    message: "Code postal invalide",
  }),
  country: z.string().min(2, {
    message: "Veuillez sélectionner un pays",
  }),
  deliveryMethod: z.string(),
  paymentMethod: z.string(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryMethods[0].id);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      address: user?.address || "",
      city: "",
      postalCode: "",
      country: "FR",
      deliveryMethod: deliveryMethods[0].id,
      paymentMethod: paymentMethods[0].id,
    },
  });

  // If cart is empty, redirect to cart page
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Commande passée avec succès");
      clearCart();
      navigate('/profile?tab=orders');
    }, 2000);
  };

  const deliveryFee = deliveryMethods.find(method => method.id === selectedDelivery)?.price || 0;
  const finalTotal = total + deliveryFee;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finaliser la commande</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order form */}
          <div className="lg:w-2/3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Adresse de livraison</CardTitle>
                    <CardDescription>
                      Entrez l'adresse où vous souhaitez recevoir votre commande
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="06 12 34 56 78" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="123 Rue de Paris" 
                              {...field} 
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                              <Input placeholder="Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal</FormLabel>
                            <FormControl>
                              <Input placeholder="75000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pays</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un pays" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="FR">France</SelectItem>
                                <SelectItem value="BE">Belgique</SelectItem>
                                <SelectItem value="CH">Suisse</SelectItem>
                                <SelectItem value="LU">Luxembourg</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Delivery Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Méthode de livraison</CardTitle>
                    <CardDescription>
                      Choisissez comment vous souhaitez recevoir votre commande
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="deliveryMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedDelivery(value);
                              }}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              {deliveryMethods.map((method) => (
                                <div key={method.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={method.id} id={`delivery-${method.id}`} />
                                  <label
                                    htmlFor={`delivery-${method.id}`}
                                    className="flex flex-grow justify-between cursor-pointer"
                                  >
                                    <div>
                                      <span className="font-medium">{method.title}</span>
                                      <p className="text-gray-500 text-sm">{method.description}</p>
                                    </div>
                                    <span className="font-medium">{method.price.toFixed(2)} €</span>
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Méthode de paiement</CardTitle>
                    <CardDescription>
                      Choisissez comment vous souhaitez payer
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedPayment(value);
                              }}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              {paymentMethods.map((method) => (
                                <div key={method.id}>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                                    <label
                                      htmlFor={`payment-${method.id}`}
                                      className="flex flex-grow justify-between cursor-pointer"
                                    >
                                      <div>
                                        <span className="font-medium">{method.title}</span>
                                        <p className="text-gray-500 text-sm">{method.description}</p>
                                      </div>
                                    </label>
                                  </div>
                                  
                                  {selectedPayment === method.id && method.id === 'card' && (
                                    <div className="ml-7 mt-4 space-y-4">
                                      <FormField
                                        control={form.control}
                                        name="cardNumber"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Numéro de carte</FormLabel>
                                            <FormControl>
                                              <Input placeholder="1234 5678 9012 3456" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                          control={form.control}
                                          name="cardExpiry"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Date d'expiration</FormLabel>
                                              <FormControl>
                                                <Input placeholder="MM/YY" {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        
                                        <FormField
                                          control={form.control}
                                          name="cardCvc"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>CVC</FormLabel>
                                              <FormControl>
                                                <Input placeholder="123" {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? 'Traitement en cours...' 
                        : `Payer ${finalTotal.toFixed(2)} €`
                      }
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <CartSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
