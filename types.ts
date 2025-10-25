export type Page = 'home' | 'activities' | 'activity-detail' | 'create-activity' | 'profile' | 'dashboard' | 'auth';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  datetime: string; // ISO 8601 string
  capacity: number;
  image: string;
  type: 'Randonnée' | 'Visite' | 'Pique-nique' | 'Sport' | 'Culture';
  organizer_id: string;
  created_at: string; // ISO 8601 string
}

export interface Registration {
  id: string;
  user_id: string;
  activity_id: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Comment {
  id: string;
  user_id: string;
  activity_id: string;
  content: string;
  rating: number;
  created_at: string; // ISO 8601 string
}