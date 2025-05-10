
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {activeTab === "login" ? "Connectez-vous" : "Créez un compte"}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === "login" 
                  ? "Accédez à votre compte pour gérer vos commandes" 
                  : "Inscrivez-vous pour commencer à commander vos médicaments"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="mt-6">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup" className="mt-6">
                  <SignupForm />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-gray-600">
                {activeTab === "login" ? (
                  <>
                    Vous n'avez pas de compte ?{" "}
                    <button 
                      onClick={() => setActiveTab("signup")}
                      className="text-medical-primary hover:underline font-medium"
                    >
                      Inscrivez-vous
                    </button>
                  </>
                ) : (
                  <>
                    Vous avez déjà un compte ?{" "}
                    <button 
                      onClick={() => setActiveTab("login")}
                      className="text-medical-primary hover:underline font-medium"
                    >
                      Connectez-vous
                    </button>
                  </>
                )}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
