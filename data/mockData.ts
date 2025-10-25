import { User, Activity, Registration, Comment } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alice', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=user-1' },
  { id: 'user-2', name: 'Bob', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=user-2' },
  { id: 'user-3', name: 'Charlie', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/150?u=user-3' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Randonnée au Mont Vert',
    description: 'Une superbe randonnée pour tous les niveaux avec une vue imprenable.',
    location: 'Parc National du Mont Vert',
    coordinates: { lat: 44.36, lng: 3.66 },
    datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    capacity: 20,
    image: 'https://picsum.photos/seed/hike/800/600',
    type: 'Randonnée',
    organizer_id: 'user-1',
    created_at: new Date().toISOString(),
  },
  {
    id: 'act-2',
    title: 'Visite guidée du vieux port',
    description: 'Découvrez l\'histoire fascinante du vieux port avec notre guide expert.',
    location: 'Vieux Port, Marseille',
    coordinates: { lat: 43.295, lng: 5.374 },
    datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    capacity: 15,
    image: 'https://picsum.photos/seed/port/800/600',
    type: 'Visite',
    organizer_id: 'user-2',
    created_at: new Date().toISOString(),
  },
  {
    id: 'act-3',
    title: 'Pique-nique et jeux au parc',
    description: 'Un après-midi détente avec pique-nique, jeux de société et frisbee.',
    location: 'Parc de la Tête d\'Or, Lyon',
    coordinates: { lat: 45.775, lng: 4.852 },
    datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    capacity: 30,
    image: 'https://picsum.photos/seed/picnic/800/600',
    type: 'Pique-nique',
    organizer_id: 'user-1',
    created_at: new Date().toISOString(),
  },
    {
    id: 'act-4',
    title: 'Match de Football amical',
    description: 'On se retrouve pour un match de foot 5v5. Bonne ambiance garantie !',
    location: 'City Stade, Paris',
    coordinates: { lat: 48.83, lng: 2.33 },
    datetime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Past event
    capacity: 10,
    image: 'https://picsum.photos/seed/football/800/600',
    type: 'Sport',
    organizer_id: 'user-3',
    created_at: new Date().toISOString(),
  },
];

export const MOCK_REGISTRATIONS: Registration[] = [
  { id: 'reg-1', user_id: 'user-2', activity_id: 'act-1', status: 'accepted' },
  { id: 'reg-2', user_id: 'user-3', activity_id: 'act-1', status: 'pending' },
  { id: 'reg-3', user_id: 'user-1', activity_id: 'act-2', status: 'accepted' },
  { id: 'reg-4', user_id: 'user-2', activity_id: 'act-4', status: 'accepted' },
];

export const MOCK_COMMENTS: Comment[] = [
    { id: 'cmt-1', user_id: 'user-2', activity_id: 'act-4', content: 'Super match, merci pour l\'organisation !', rating: 5, created_at: new Date().toISOString() },
    { id: 'cmt-2', user_id: 'user-1', activity_id: 'act-4', content: 'C\'était sympa.', rating: 4, created_at: new Date().toISOString() },
];