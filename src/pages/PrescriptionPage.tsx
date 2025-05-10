
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PrescriptionUploader from '@/components/prescription/PrescriptionUploader';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const PrescriptionPage = () => {
  const { user } = useAuth();
  
  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Connexion requise</h1>
            <p className="text-gray-600 mb-8">
              Vous devez être connecté pour télécharger une ordonnance.
            </p>
            <Link to="/login">
              <Button size="lg">Se connecter</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Télécharger une ordonnance</h1>
            <p className="text-gray-600">
              Pour commander des médicaments nécessitant une prescription, veuillez télécharger une photo ou un scan de votre ordonnance médicale.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <PrescriptionUploader />
          </div>
          
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Comment ça marche ?</h3>
            <ol className="list-decimal ml-5 space-y-2 text-blue-700">
              <li>Téléchargez une photo ou un scan claire de votre ordonnance</li>
              <li>Notre équipe de pharmaciens vérifiera votre ordonnance</li>
              <li>Une fois validée, vous recevrez une notification</li>
              <li>Vous pourrez alors commander les médicaments prescrits</li>
              <li>Vos médicaments seront livrés à l'adresse de votre choix</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrescriptionPage;
