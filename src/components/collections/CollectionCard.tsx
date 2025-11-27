import { Star } from 'lucide-react';

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  itineraryCount: number;
  averageRating: number;
  startingPrice: number;
  tags: string[];
}

interface CollectionCardProps {
  collection: Collection;
  onClick: () => void;
}

export function CollectionCard({ collection, onClick }: CollectionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full rounded-2xl overflow-hidden bg-white border border-gray-200
                 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]
                 transform text-left"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={collection.coverImage}
          alt={collection.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {collection.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm
                       text-xs font-medium text-gray-900"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1.5 rounded-full bg-coral-500 text-white
                         text-sm font-semibold shadow-lg">
            Explore
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-coral-600 transition-colors">
          {collection.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {collection.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="font-medium">{collection.itineraryCount} itineraries</span>
          <span className="text-gray-300">·</span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            Avg {collection.averageRating}
          </span>
          <span className="text-gray-300">·</span>
          <span>From ${collection.startingPrice}</span>
        </div>
      </div>
    </button>
  );
}
