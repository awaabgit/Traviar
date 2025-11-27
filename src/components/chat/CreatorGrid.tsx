import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { CreatorCard } from './CreatorCard';

interface Creator {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  specialties: string[];
  rating: number;
  total_chats: number;
  response_time: string;
  is_online: boolean;
  verified: boolean;
}

interface CreatorGridProps {
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  selectedCreatorId?: string;
}

export function CreatorGrid({ creators, onSelectCreator, selectedCreatorId }: CreatorGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const allSpecialties = Array.from(
    new Set(creators.flatMap(c => c.specialties))
  );

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || creator.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const onlineCreators = filteredCreators.filter(c => c.is_online);
  const offlineCreators = filteredCreators.filter(c => !c.is_online);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat with Travel Creators</h2>
        <p className="text-sm text-gray-600 mb-4">
          Get personalized advice from experienced travel creators
        </p>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300
                     focus:outline-none focus:border-coral-500
                     text-sm text-gray-900 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSpecialty(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all
                      ${!selectedSpecialty
                        ? 'bg-coral-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
          >
            All
          </button>
          {allSpecialties.map(specialty => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all
                        ${selectedSpecialty === specialty
                          ? 'bg-coral-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {onlineCreators.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Online Now ({onlineCreators.length})
              </h3>
            </div>
            <div className="space-y-3">
              {onlineCreators.map(creator => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  onClick={() => onSelectCreator(creator)}
                  selected={creator.id === selectedCreatorId}
                />
              ))}
            </div>
          </div>
        )}

        {offlineCreators.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Offline ({offlineCreators.length})
              </h3>
            </div>
            <div className="space-y-3">
              {offlineCreators.map(creator => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  onClick={() => onSelectCreator(creator)}
                  selected={creator.id === selectedCreatorId}
                />
              ))}
            </div>
          </div>
        )}

        {filteredCreators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No creators found</p>
          </div>
        )}
      </div>
    </div>
  );
}
