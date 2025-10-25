import React, { useMemo } from 'react';
import { User, Activity, Registration, Page } from '../types';
import ActivityCard from '../components/ActivityCard';
import { parseISO, compareAsc, compareDesc } from 'date-fns';

interface ProfilePageProps {
  currentUser: User;
  activities: Activity[];
  registrations: Registration[];
  navigate: (page: Page) => void;
  viewActivityDetails: (activityId: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, activities, registrations, navigate, viewActivityDetails }) => {

  const createdActivities = useMemo(() => {
    return activities.filter(a => a.organizer_id === currentUser.id)
      .sort((a, b) => compareDesc(parseISO(a.datetime), parseISO(b.datetime)));
  }, [activities, currentUser.id]);

  const registeredActivities = useMemo(() => {
    const registeredIds = new Set(registrations.filter(r => r.user_id === currentUser.id).map(r => r.activity_id));
    return activities.filter(a => registeredIds.has(a.id))
      .sort((a, b) => compareAsc(parseISO(a.datetime), parseISO(b.datetime)));
  }, [activities, registrations, currentUser.id]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start bg-white p-8 rounded-lg shadow-md mb-8">
        <img src={currentUser.avatar} alt={currentUser.name} className="w-32 h-32 rounded-full border-4 border-teal-500" />
        <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
          <h1 className="text-4xl font-bold">{currentUser.name}</h1>
          <p className="text-lg text-gray-600">{currentUser.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Mes sorties créées</h2>
        {createdActivities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {createdActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} onClick={() => viewActivityDetails(activity.id)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 bg-gray-100 p-4 rounded-lg">Vous n'avez créé aucune sortie. <button onClick={() => navigate('create-activity')} className="text-teal-600 font-semibold hover:underline">Créez-en une !</button></p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Mes inscriptions</h2>
        {registeredActivities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} onClick={() => viewActivityDetails(activity.id)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 bg-gray-100 p-4 rounded-lg">Vous n'êtes inscrit à aucune sortie. <button onClick={() => navigate('activities')} className="text-teal-600 font-semibold hover:underline">Découvrez les prochaines sorties !</button></p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
