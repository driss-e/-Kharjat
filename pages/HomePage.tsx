
import React from 'react';
import { Page, Activity } from '../types';
import ActivityCard from '../components/ActivityCard';

interface HomePageProps {
  navigate: (page: Page) => void;
  viewActivityDetails: (activityId: string) => void;
  activities: Activity[];
}

const HomePage: React.FC<HomePageProps> = ({ navigate, viewActivityDetails, activities }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 bg-teal-50 rounded-lg">
        <h1 className="text-5xl font-extrabold text-teal-700">Trouvez votre prochaine sortie.</h1>
        <h2 className="text-5xl font-extrabold text-orange-500 mt-2">.خرجات / Kharjat</h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Proposez, découvrez et rejoignez des sorties de groupe. Randonnées, visites, pique-niques et plus encore !
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button onClick={() => navigate('activities')} className="bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition-transform transform hover:scale-105">
            Découvrir les sorties
          </button>
          <button onClick={() => navigate('create-activity')} className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-transform transform hover:scale-105">
            Proposer une sortie
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Découvrez</h3>
            <p className="text-gray-600">Filtrez et trouvez des activités qui vous intéressent près de chez vous.</p>
          </div>
          <div className="p-6">
             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mx-auto mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.975M15 21H9" /></svg>
             </div>
            <h3 className="text-xl font-semibold mb-2">Participez</h3>
            <p className="text-gray-600">Inscrivez-vous en un clic et rencontrez de nouvelles personnes.</p>
          </div>
          <div className="p-6">
             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
            <h3 className="text-xl font-semibold mb-2">Organisez</h3>
            <p className="text-gray-600">Créez vos propres sorties et partagez vos passions avec la communauté.</p>
          </div>
        </div>
      </section>

      {/* Featured Activities Section */}
      <section className="py-16 bg-gray-100 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-10">Prochaines sorties</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {activities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} onClick={() => viewActivityDetails(activity.id)} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
