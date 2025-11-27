import { Layers, Plus } from 'lucide-react';

export interface CollectionCardData {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  itineraryCount: number;
}

interface CollectionsTabProps {
  collections: CollectionCardData[];
  isOwnProfile: boolean;
  onCollectionClick: (id: string) => void;
  onCreateCollection?: () => void;
}

export function CollectionsTab({ collections, isOwnProfile, onCollectionClick, onCreateCollection }: CollectionsTabProps) {
  // Empty state when no collections
  if (collections.length === 0) {
    if (isOwnProfile) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-20 h-20 rounded-full bg-gradient-sunset flex items-center justify-center mb-6">
            <Layers className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Curate your favorite places
          </h3>
          <p className="text-gray-600 text-center mb-6 max-w-md">
            Organize your itineraries into collections and share your favorite destinations with the world
          </p>
          <button
            onClick={onCreateCollection}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-coral-500
                     hover:bg-coral-600 text-white font-semibold transition-all
                     shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Create Collection
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-center">No collections yet</p>
        </div>
      );
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {collections.map((collection) => (
        <button
          key={collection.id}
          onClick={() => onCollectionClick(collection.id)}
          className="group text-left rounded-xl overflow-hidden bg-white border border-gray-200
                   shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="relative h-40 overflow-hidden">
            <img
              src={collection.coverImage}
              alt={collection.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-coral-200 transition-colors">
                {collection.title}
              </h3>
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-gray-600 mb-3">
              {collection.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">
                {collection.itineraryCount} itineraries
              </span>
              <svg
                className="w-5 h-5 text-coral-600 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
