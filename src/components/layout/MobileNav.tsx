
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Pills, 
  ClipboardList, 
  UserRound, 
  ShoppingCart, 
  Home,
  LogOut,
  Settings
} from "lucide-react";

const MobileNav = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { 
      name: "Accueil", 
      path: "/", 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      name: "Médicaments", 
      path: "/products", 
      icon: <Pills className="h-5 w-5" /> 
    },
    { 
      name: "Ordonnances", 
      path: "/prescription", 
      icon: <ClipboardList className="h-5 w-5" /> 
    },
    { 
      name: "Panier", 
      path: "/cart", 
      icon: <ShoppingCart className="h-5 w-5" /> 
    },
    { 
      name: "Mon Profil", 
      path: "/profile", 
      icon: <UserRound className="h-5 w-5" />,
      requireAuth: true
    },
  ];

  // Add admin route if user is admin
  if (user?.isAdmin) {
    menuItems.push({
      name: "Administration",
      path: "/admin",
      icon: <Settings className="h-5 w-5" />,
      requireAuth: true
    });
  }
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col space-y-1">
      <div className="mb-4 py-3">
        <div className="relative w-full mb-4">
          <input 
            type="text" 
            placeholder="Rechercher un médicament..." 
            className="w-full py-2 px-4 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-medical-primary"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item, index) => {
          // Skip items that require auth if user is not logged in
          if (item.requireAuth && !user) return null;
          
          return (
            <Link 
              key={index} 
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-medical-light transition-colors ${
                location.pathname === item.path ? "bg-medical-light text-medical-primary font-medium" : "text-gray-600"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
        
        {user ? (
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-50 transition-colors text-red-500 w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        ) : (
          <Link 
            to="/login"
            className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-medical-light transition-colors text-medical-primary font-medium"
          >
            <UserRound className="h-5 w-5" />
            <span>Connexion</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
