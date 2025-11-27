interface CollectionCardData {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  itineraryCount: number;
}

interface CollectionsTabProps {
  onCollectionClick: (id: string) => void;
}

const MOCK_COLLECTIONS: CollectionCardData[] = [
  {
    id: '1',
    title: 'European City Breaks',
    coverImage: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Quick weekend trips across Europe',
    itineraryCount: 12,
  },
  {
    id: '2',
    title: 'Budget Travel Guide',
    coverImage: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Affordable adventures for smart travelers',
    itineraryCount: 8,
  },
  {
    id: '3',
    title: 'Foodie Adventures',
    coverImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Culinary journeys around the world',
    itineraryCount: 15,
  },
  {
    id: '4',
    title: 'Hidden Gems',
    coverImage: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Off-the-beaten-path destinations',
    itineraryCount: 10,
  },
  {
    id: '5',
    title: 'Summer Escapes',
    coverImage: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Perfect warm-weather getaways',
    itineraryCount: 14,
  },
  {
    id: '6',
    title: 'Cultural Immersion',
    coverImage: 'https://images.pexels.com/photos/2675269/pexels-photo-2675269.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Deep dives into local culture',
    itineraryCount: 9,
  },
];

export function CollectionsTab({ onCollectionClick }: CollectionsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {MOCK_COLLECTIONS.map((collection) => (
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
