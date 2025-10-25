
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Kharjat / خرجات. Tous droits réservés.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-teal-400">Contact</a>
          <a href="#" className="hover:text-teal-400">Mentions Légales</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
