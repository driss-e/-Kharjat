import React, { useState, useMemo } from 'react';
import { Activity } from '../types';
import ActivityCard from '../components/ActivityCard';
import MapComponent from '../components/MapComponent';

interface ActivitiesPageProps {
  activities: Activity[];
  viewActivityDetails: (activityId: string) => void;
}

const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ activities, viewActivityDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'map'>('grid');

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            activity.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || activity.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [activities, searchTerm, filterType]);

  const activityTypes = useMemo(() => {
    const types = new Set(activities.map(a => a.type));
    return ['all', ...Array.from(types)];
  }, [activities]);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Toutes les sorties</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher par titre ou lieu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {activityTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? 'Tous les types' : type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-end mb-6">
        <span className="text-sm font-medium text-gray-700 mr-3">Vue :</span>
        <div className="inline-flex rounded-md shadow-sm" role="group">
            <button type="button" onClick={() => setView('grid')} className={`px-4 py-2 text-sm font-medium transition-colors ${view === 'grid' ? 'bg-teal-500 text-white' : 'bg-white text-gray-900'} border border-gray-300 rounded-l-lg hover:bg-teal-50 focus:z-10 focus:ring-2 focus:ring-teal-500`}>
                Grille
            </button>
            <button type="button" onClick={() => setView('map')} className={`px-4 py-2 text-sm font-medium transition-colors ${view === 'map' ? 'bg-teal-500 text-white' : 'bg-white text-gray-900'} border-t border-b border-r border-gray-300 rounded-r-md hover:bg-teal-50 focus:z-10 focus:ring-2 focus:ring-teal-500`}>
                Carte
            </button>
        </div>
      </div>

      {filteredActivities.length > 0 ? (
        view === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} onClick={() => viewActivityDetails(activity.id)} />
            ))}
          </div>
        ) : (
          <MapComponent activities={filteredActivities} onMarkerClick={viewActivityDetails} />
        )
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">Aucune sortie ne correspond à votre recherche.</p>
      )}
    </div>
  );
};

export default ActivitiesPage;