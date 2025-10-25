
import React from 'react';
import { Page, User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  navigate: (page: Page) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, navigate, onLogout }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span 
            className="text-2xl font-bold text-teal-600 cursor-pointer"
            onClick={() => navigate('home')}
          >
            Kharjat / خرجات
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
          <button onClick={() => navigate('home')} className="hover:text-teal-600">Accueil</button>
          <button onClick={() => navigate('activities')} className="hover:text-teal-600">Toutes les sorties</button>
          {currentUser && (
            <>
               <button onClick={() => navigate('create-activity')} className="hover:text-teal-600">Créer une sortie</button>
               <button onClick={() => navigate('dashboard')} className="hover:text-teal-600">Tableau de bord</button>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <button onClick={() => navigate('profile')} className="flex items-center space-x-2">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                <span className="font-semibold hidden sm:inline">{currentUser.name}</span>
              </button>
              <button onClick={onLogout} className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-600">
                Déconnexion
              </button>
            </>
          ) : (
            <button onClick={() => navigate('auth')} className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-600">
              Connexion / Inscription
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
