
import React, { useState, useCallback } from 'react';
import { Activity } from '../types';
import { generateActivityDetails } from '../services/geminiService';

interface CreateActivityPageProps {
  onCreateActivity: (activity: Omit<Activity, 'id' | 'organizer_id' | 'created_at'>) => void;
}

const CreateActivityPage: React.FC<CreateActivityPageProps> = ({ onCreateActivity }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [datetime, setDatetime] = useState('');
    const [capacity, setCapacity] = useState(10);
    const [type, setType] = useState<'Randonnée' | 'Visite' | 'Pique-nique' | 'Sport' | 'Culture'>('Randonnée');
    const [image, setImage] = useState('https://picsum.photos/seed/event/800/600'); // default image
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !location || !datetime) {
            setError('Veuillez remplir les champs obligatoires.');
            return;
        }
        onCreateActivity({ title, description, location, datetime, capacity, image, type });
    };

    const handleGenerateWithAI = useCallback(async () => {
        if (!aiPrompt) return;
        setIsGenerating(true);
        setError('');
        try {
            const result = await generateActivityDetails(aiPrompt);
            setTitle(result.title);
            setDescription(result.description);
        } catch (err) {
            setError('Erreur lors de la génération avec l\'IA. Veuillez réessayer.');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    }, [aiPrompt]);

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Créer une nouvelle sortie</h1>

            <div className="mb-6 p-4 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
                <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700 mb-1">Idée de sortie (pour l'IA)</label>
                <div className="flex space-x-2">
                    <input
                        id="ai-prompt"
                        type="text"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Ex: pique-nique au parc avec jeux"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        disabled={isGenerating}
                    />
                    <button 
                        onClick={handleGenerateWithAI}
                        disabled={isGenerating || !aiPrompt}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:bg-gray-400 flex items-center justify-center"
                    >
                        {isGenerating ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Générer'}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre *</label>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lieu *</label>
                        <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">Date et heure *</label>
                        <input id="datetime" type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacité</label>
                        <input id="capacity" type="number" min="2" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value, 10))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type d'activité</label>
                        <select id="type" value={type} onChange={(e) => setType(e.target.value as any)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Randonnée</option>
                            <option>Visite</option>
                            <option>Pique-nique</option>
                            <option>Sport</option>
                            <option>Culture</option>
                        </select>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <button type="submit" className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                        Créer la sortie
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateActivityPage;
