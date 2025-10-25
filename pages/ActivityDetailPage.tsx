import React, { useState, useMemo } from 'react';
import { Activity, User, Registration, Comment } from '../types';
import { MOCK_USERS } from '../data/mockData'; // For user details
import { parseISO, isPast, format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import StarRating from '../components/StarRating';
import MapComponent from '../components/MapComponent';

interface ActivityDetailPageProps {
    activity: Activity;
    currentUser: User | null;
    registrations: Registration[];
    comments: Comment[];
    onRegister: (activityId: string) => void;
    onUnregister: (activityId: string) => void;
    onAddComment: (activityId: string, content: string, rating: number) => void;
}

const ActivityDetailPage: React.FC<ActivityDetailPageProps> = ({ 
    activity, currentUser, registrations, comments, onRegister, onUnregister, onAddComment 
}) => {
    const activityDate = parseISO(activity.datetime);
    const isActivityPast = isPast(activityDate);

    const [commentContent, setCommentContent] = useState('');
    const [commentRating, setCommentRating] = useState(0);

    const organizer = useMemo(() => MOCK_USERS.find(u => u.id === activity.organizer_id), [activity.organizer_id]);
    const acceptedRegistrations = useMemo(() => registrations.filter(r => r.status === 'accepted'), [registrations]);

    const isUserRegistered = useMemo(() => {
        if (!currentUser) return false;
        return registrations.some(r => r.user_id === currentUser.id);
    }, [currentUser, registrations]);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentContent.trim() && commentRating > 0) {
            onAddComment(activity.id, commentContent, commentRating);
            setCommentContent('');
            setCommentRating(0);
        }
    };

    const averageRating = useMemo(() => {
        if (comments.length === 0) return 0;
        const total = comments.reduce((acc, c) => acc + c.rating, 0);
        return total / comments.length;
    }, [comments]);


    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={activity.image} alt={activity.title} className="w-full h-64 object-cover" />
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start">
                        <h1 className="text-4xl font-bold text-gray-800">{activity.title}</h1>
                         <span className={`px-4 py-2 text-sm font-semibold text-white rounded-full ${isActivityPast ? 'bg-gray-500' : 'bg-teal-500'}`}>
                            {isActivityPast ? 'Terminée' : 'À venir'}
                        </span>
                    </div>

                    <div className="flex items-center mt-2">
                        <StarRating rating={averageRating} readOnly />
                        <span className="text-gray-600 ml-2">({comments.length} avis)</span>
                    </div>
                    
                    <p className="text-gray-600 mt-4 text-lg">{activity.description}</p>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span>{format(activityDate, 'EEEE d MMMM yyyy \'à\' HH:mm', { locale: fr })}</span>
                        </div>
                         <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.975M15 21H9" /></svg>
                            <span>{acceptedRegistrations.length} / {activity.capacity} participants</span>
                        </div>
                        {organizer && (
                           <div className="flex items-center">
                            <img src={organizer.avatar} alt={organizer.name} className="w-8 h-8 rounded-full mr-2" />
                            <span>Organisé par <strong>{organizer.name}</strong></span>
                           </div>
                        )}
                    </div>

                    <div className="mt-8">
                      <MapComponent activities={[activity]} />
                    </div>

                    {!isActivityPast && currentUser && (
                        <div className="mt-8 text-center">
                            {isUserRegistered ? (
                                <button 
                                    onClick={() => onUnregister(activity.id)}
                                    className="px-8 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600"
                                >
                                    Se désinscrire
                                </button>
                            ) : (
                                 <button 
                                    onClick={() => onRegister(activity.id)}
                                    disabled={acceptedRegistrations.length >= activity.capacity}
                                    className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 disabled:bg-gray-400"
                                >
                                    {acceptedRegistrations.length >= activity.capacity ? 'Complet' : 'S\'inscrire'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Comments Section */}
            <div className="mt-8 bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Avis ({comments.length})</h2>
                {isActivityPast && currentUser && isUserRegistered && (
                    <form onSubmit={handleCommentSubmit} className="mb-6 p-4 border rounded-lg">
                       <h3 className="text-lg font-semibold mb-2">Laissez votre avis</h3>
                        <StarRating rating={commentRating} setRating={setCommentRating} />
                        <textarea 
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            rows={3}
                            placeholder="Partagez votre expérience..."
                            className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button type="submit" className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400" disabled={!commentContent.trim() || commentRating === 0}>
                            Envoyer
                        </button>
                    </form>
                )}

                <div className="space-y-4">
                    {comments.length > 0 ? comments.map(comment => {
                        const user = MOCK_USERS.find(u => u.id === comment.user_id);
                        return (
                            <div key={comment.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <img src={user?.avatar} alt={user?.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <div className="flex items-center">
                                        <p className="font-semibold">{user?.name}</p>
                                        <div className="ml-4">
                                            <StarRating rating={comment.rating} readOnly />
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mt-1">{comment.content}</p>
                                    <p className="text-xs text-gray-400 mt-1">{format(parseISO(comment.created_at), 'd MMMM yyyy', { locale: fr })}</p>
                                </div>
                            </div>
                        )
                    }) : (
                        <p className="text-gray-500">Aucun avis pour le moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityDetailPage;