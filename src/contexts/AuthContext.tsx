
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  isAdmin?: boolean;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Simuler une vérification initiale de l'utilisateur
  React.useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const storedUser = localStorage.getItem('medDeliveryUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Utilisateur de démonstration
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        isAdmin: email === 'admin@example.com'
      };
      
      setUser(mockUser);
      localStorage.setItem('medDeliveryUser', JSON.stringify(mockUser));
      toast.success("Connexion réussie");
    } catch (error) {
      toast.error("Échec de la connexion");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        isAdmin: false
      };
      
      setUser(newUser);
      localStorage.setItem('medDeliveryUser', JSON.stringify(newUser));
      toast.success("Compte créé avec succès");
    } catch (error) {
      toast.error("Échec de la création du compte");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medDeliveryUser');
    toast.success("Déconnexion réussie");
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('medDeliveryUser', JSON.stringify(updatedUser));
      toast.success("Profil mis à jour");
    } catch (error) {
      toast.error("Échec de la mise à jour du profil");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
