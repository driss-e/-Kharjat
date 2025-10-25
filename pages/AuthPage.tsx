
import React from 'react';
import { User } from '../types';
import AuthForm from '../components/AuthForm';

interface AuthPageProps {
  onLogin: (user: User) => void;
  // A real app would have a more complex signup flow
  mockUsers: User[];
  authError: string | null;
  setAuthError: (error: string | null) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, mockUsers, authError, setAuthError }) => {

  const handleLogin = (email: string) => {
    setAuthError(null);
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      onLogin(user);
    } else {
      setAuthError('Aucun utilisateur trouvé avec cet email.');
    }
  };
  
  const handleSignup = (name: string, email: string) => {
     setAuthError("La création de compte n'est pas implémentée dans cette démo. Veuillez utiliser un des emails existants.");
     console.log(`Tentative d'inscription : ${name}, ${email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Bienvenue !</h1>
            <p className="text-gray-600 mt-2">Connectez-vous pour continuer.</p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-left">
                <h3 className="font-semibold mb-2">Utilisateurs de démo :</h3>
                <ul className="list-disc list-inside">
                    {mockUsers.map(u => <li key={u.id}><code>{u.email}</code></li>)}
                </ul>
            </div>
        </div>
        <AuthForm onLogin={handleLogin} onSignup={handleSignup} error={authError} />
    </div>
  );
};

export default AuthPage;
