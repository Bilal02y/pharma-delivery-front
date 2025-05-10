
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from '@/data/products';
import { orders } from '@/data/orders';
import { Check, X } from 'lucide-react';

const AdminPage = () => {
  const { user } = useAuth();

  // Rediriger si l'utilisateur n'est pas administrateur
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Simuler des ordonnances en attente
  const pendingPrescriptions = [
    {
      id: 'PRESC12345',
      userId: '1',
      userName: 'John Doe',
      uploadDate: '2023-11-10T10:30:00Z',
      status: 'pending',
      imageUrl: 'https://placehold.co/400x300?text=Ordonnance'
    },
    {
      id: 'PRESC67890',
      userId: '2',
      userName: 'Jane Smith',
      uploadDate: '2023-11-09T15:45:00Z',
      status: 'pending',
      imageUrl: 'https://placehold.co/400x300?text=Ordonnance'
    }
  ];
  
  // Statistiques fictives
  const stats = {
    totalSales: 1245.99,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
    lowStockProducts: products.filter(p => p.inStock).length
  };
  
  const getOrderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">En attente</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En traitement</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmée</Badge>;
      case 'preparing':
        return <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">En préparation</Badge>;
      case 'shipping':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">En livraison</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Livrée</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Annulée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord administrateur</h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Ventes totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalSales.toFixed(2)} €</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Commandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Commandes en attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Produits en stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.lowStockProducts}</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="prescriptions">Ordonnances</TabsTrigger>
            <TabsTrigger value="inventory">Inventaire</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.slice(0, 5).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>Utilisateur {order.userId}</TableCell>
                        <TableCell>{order.totalAmount.toFixed(2)} €</TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle>Ordonnances à valider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingPrescriptions.map(prescription => (
                    <Card key={prescription.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col space-y-4">
                          <img 
                            src={prescription.imageUrl} 
                            alt="Ordonnance" 
                            className="w-full h-48 object-cover rounded-md mb-4"
                          />
                          <div>
                            <p className="text-sm text-gray-500">ID: {prescription.id}</p>
                            <p className="font-medium">{prescription.userName}</p>
                            <p className="text-sm text-gray-500">
                              Téléchargée le {new Date(prescription.uploadDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="flex space-x-4 pt-4">
                            <Button className="flex-1">
                              <Check className="mr-2 h-4 w-4" />
                              Valider
                            </Button>
                            <Button variant="destructive" className="flex-1">
                              <X className="mr-2 h-4 w-4" />
                              Refuser
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Gestion de l'inventaire</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Ordonnance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.slice(0, 10).map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price.toFixed(2)} €</TableCell>
                        <TableCell>
                          {product.inStock ? (
                            <Badge className="bg-green-100 text-green-800">En stock</Badge>
                          ) : (
                            <Badge variant="destructive">Rupture</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {product.requiresPrescription ? (
                            <Badge className="bg-amber-100 text-amber-800">Requise</Badge>
                          ) : (
                            <Badge variant="outline">Non</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Modifier
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
