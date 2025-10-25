import React, { useMemo } from 'react';
import { User, Activity, Registration } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface OrganizerDashboardPageProps {
  currentUser: User;
  activities: Activity[];
  registrations: Registration[];
  onUpdateRegistrationStatus: (registrationId: string, status: 'accepted' | 'rejected') => void;
}

const StatusBadge: React.FC<{ status: Registration['status'] }> = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusMap = {
        pending: "bg-yellow-200 text-yellow-800",
        accepted: "bg-green-200 text-green-800",
        rejected: "bg-red-200 text-red-800",
    };
    const textMap = {
        pending: "En attente",
        accepted: "Acceptée",
        rejected: "Refusée",
    };
    return <span className={`${baseClasses} ${statusMap[status]}`}>{textMap[status]}</span>;
};

const OrganizerDashboardPage: React.FC<OrganizerDashboardPageProps> = ({ 
    currentUser, activities, registrations, onUpdateRegistrationStatus 
}) => {

  const organizedActivities = useMemo(() => {
    return activities.filter(a => a.organizer_id === currentUser.id);
  }, [activities, currentUser.id]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Tableau de bord Organisateur</h1>
      
      {organizedActivities.length > 0 ? (
        <div className="space-y-8">
          {organizedActivities.map(activity => {
            const activityRegistrations = registrations.filter(r => r.activity_id === activity.id);
            return (
              <div key={activity.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">{activity.title}</h2>
                {activityRegistrations.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {activityRegistrations.map(reg => {
                      const user = MOCK_USERS.find(u => u.id === reg.user_id);
                      if (!user) return null;
                      
                      return (
                        <li key={reg.id} className="py-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                             <StatusBadge status={reg.status} />
                            {reg.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => onUpdateRegistrationStatus(reg.id, 'accepted')}
                                  className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                                >
                                  Accepter
                                </button>
                                <button 
                                  onClick={() => onUpdateRegistrationStatus(reg.id, 'rejected')}
                                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                                >
                                  Refuser
                                </button>
                              </>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500">Aucune inscription pour cette sortie pour le moment.</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 bg-gray-100 p-6 rounded-lg">Vous n'avez organisé aucune sortie.</p>
      )}
    </div>
  );
};

export default OrganizerDashboardPage;