
import React, { useState, useEffect, useMemo } from 'react';
import { Page, User, Activity, Registration, Comment } from './types';
import { MOCK_ACTIVITIES, MOCK_USERS, MOCK_REGISTRATIONS, MOCK_COMMENTS } from './data/mockData';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import CreateActivityPage from './pages/CreateActivityPage';
import ProfilePage from './pages/ProfilePage';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import AuthPage from './pages/AuthPage';
import LoadingPage from './pages/LoadingPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setActivities(MOCK_ACTIVITIES);
      setRegistrations(MOCK_REGISTRATIONS);
      setComments(MOCK_COMMENTS);
      setIsLoading(false);
    }, 500);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setCurrentActivityId(null); // Reset activity ID on page change
    window.scrollTo(0, 0);
  };

  const viewActivityDetails = (activityId: string) => {
    setCurrentActivityId(activityId);
    setCurrentPage('activity-detail');
    window.scrollTo(0, 0);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    navigate('home');
    setAuthError(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('home');
  };

  const handleCreateActivity = (newActivityData: Omit<Activity, 'id' | 'organizer_id' | 'created_at'>) => {
    if (!currentUser) return;
    const newActivity: Activity = {
      ...newActivityData,
      id: `act-${Date.now()}`,
      organizer_id: currentUser.id,
      created_at: new Date().toISOString(),
      image: `https://picsum.photos/seed/${Math.random()}/800/600` // Random image for new activity
    };
    setActivities(prev => [newActivity, ...prev]);
    viewActivityDetails(newActivity.id);
  };

  const handleRegister = (activityId: string) => {
      if (!currentUser) return;
      const newRegistration: Registration = {
          id: `reg-${Date.now()}`,
          user_id: currentUser.id,
          activity_id: activityId,
          status: 'pending'
      };
      setRegistrations(prev => [...prev, newRegistration]);
  };

  const handleUnregister = (activityId: string) => {
      if (!currentUser) return;
      setRegistrations(prev => prev.filter(r => !(r.activity_id === activityId && r.user_id === currentUser.id)));
  };

  const handleAddComment = (activityId: string, content: string, rating: number) => {
      if (!currentUser) return;
      const newComment: Comment = {
          id: `cmt-${Date.now()}`,
          user_id: currentUser.id,
          activity_id: activityId,
          content,
          rating,
          created_at: new Date().toISOString()
      };
      setComments(prev => [...prev, newComment]);
  };

  const handleUpdateRegistrationStatus = (registrationId: string, status: 'accepted' | 'rejected') => {
      setRegistrations(prev => prev.map(r => r.id === registrationId ? { ...r, status } : r));
  };


  const selectedActivity = useMemo(() => {
    return activities.find(a => a.id === currentActivityId) || null;
  }, [activities, currentActivityId]);
  
  const selectedActivityRegistrations = useMemo(() => {
    return registrations.filter(r => r.activity_id === currentActivityId);
  }, [registrations, currentActivityId]);

  const selectedActivityComments = useMemo(() => {
    return comments.filter(c => c.activity_id === currentActivityId);
  }, [comments, currentActivityId]);

  const renderPage = () => {
    if (isLoading) {
      return <LoadingPage />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} viewActivityDetails={viewActivityDetails} activities={activities.slice(0, 3)} />;
      case 'activities':
        return <ActivitiesPage activities={activities} viewActivityDetails={viewActivityDetails} />;
      case 'activity-detail':
        if (selectedActivity) {
          return <ActivityDetailPage 
            activity={selectedActivity} 
            currentUser={currentUser}
            registrations={selectedActivityRegistrations}
            comments={selectedActivityComments}
            onRegister={handleRegister}
            onUnregister={handleUnregister}
            onAddComment={handleAddComment}
          />;
        }
        return <div>Activité non trouvée</div>;
      case 'create-activity':
        if (!currentUser) {
            return <AuthPage onLogin={handleLogin} mockUsers={MOCK_USERS} authError={authError} setAuthError={setAuthError}/>;
        }
        return <CreateActivityPage onCreateActivity={handleCreateActivity} />;
      case 'profile':
        if (currentUser) {
          return <ProfilePage 
            currentUser={currentUser} 
            activities={activities}
            registrations={registrations}
            navigate={navigate}
            viewActivityDetails={viewActivityDetails}
          />;
        }
        return <AuthPage onLogin={handleLogin} mockUsers={MOCK_USERS} authError={authError} setAuthError={setAuthError}/>;
      case 'dashboard':
        if (currentUser) {
            return <OrganizerDashboardPage 
                currentUser={currentUser}
                activities={activities}
                registrations={registrations}
                onUpdateRegistrationStatus={handleUpdateRegistrationStatus}
            />
        }
        return <AuthPage onLogin={handleLogin} mockUsers={MOCK_USERS} authError={authError} setAuthError={setAuthError}/>;
      case 'auth':
        return <AuthPage onLogin={handleLogin} mockUsers={MOCK_USERS} authError={authError} setAuthError={setAuthError} />;
      default:
        return <div>Page non trouvée</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header currentUser={currentUser} navigate={navigate} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
