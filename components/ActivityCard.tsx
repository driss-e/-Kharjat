import React from 'react';
import { Activity } from '../types';
import { parseISO, isPast, format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
    const activityDate = parseISO(activity.datetime);
    const isActivityPast = isPast(activityDate);

  return (
    <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
        onClick={onClick}
    >
      <div className="relative">
        <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
        <div className={`absolute top-2 right-2 px-3 py-1 text-sm font-semibold text-white rounded-full ${isActivityPast ? 'bg-gray-500' : 'bg-teal-500'}`}>
            {isActivityPast ? 'Terminée' : 'À venir'}
        </div>
         <div className="absolute bottom-2 left-2 px-3 py-1 text-sm font-semibold text-white bg-black bg-opacity-50 rounded-full">
            {activity.type}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{activity.title}</h3>
        <p className="text-gray-600 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {activity.location}
        </p>
        <p className="text-gray-600 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {format(activityDate, 'PPPP', { locale: fr })}
        </p>
         <div className="mt-4 flex justify-between items-center text-sm">
            <span className="text-gray-500">Capacité</span>
            <span className="font-semibold text-teal-600">{activity.capacity} places</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;