import { Star, MessageCircle, CheckCircle } from 'lucide-react';

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

interface CreatorCardProps {
  creator: Creator;
  onClick: () => void;
  selected?: boolean;
}

export function CreatorCard({ creator, onClick, selected = false }: CreatorCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                ${selected
                  ? 'border-coral-500 bg-coral-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={creator.avatar_url}
            alt={creator.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          {creator.is_online && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{creator.name}</h3>
            {creator.verified && (
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{creator.bio}</p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {creator.specialties.slice(0, 2).map((specialty, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{creator.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{creator.total_chats} chats</span>
            </div>
            <span className="text-green-600 font-medium">{creator.response_time}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
