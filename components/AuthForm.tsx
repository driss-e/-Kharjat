
import React, { useState } from 'react';

interface AuthFormProps {
  onLogin: (email: string) => void;
  onSignup: (name: string, email: string) => void;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onSignup, error }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Note: password is not used in mock auth, but is standard for a form
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email);
    } else {
      onSignup(name, email);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Connexion' : 'Inscription'}</h2>
        
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom complet
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="votre.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <p className="text-xs text-gray-500">Pour la démo, n'importe quel mot de passe fonctionne.</p>
        </div>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        
        <div className="flex items-center justify-between">
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
          >
            {isLogin ? 'Créer un compte' : 'Déjà un compte ?'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
