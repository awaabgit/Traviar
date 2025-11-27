import { Star, Clock, MapPin } from 'lucide-react';

interface ItineraryCardData {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  stops: number;
  creatorAvatar: string;
}

interface ItinerariesTabProps {
  onItineraryClick: (id: string) => void;
}

const MOCK_ITINERARIES: ItineraryCardData[] = [
  {
    id: '1',
    title: 'Weekend in Paris',
    coverImage: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 19,
    rating: 4.8,
    reviewCount: 124,
    duration: '3 days',
    stops: 12,
    creatorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    id: '2',
    title: 'Barcelona on a Budget',
    coverImage: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 15,
    rating: 4.9,
    reviewCount: 89,
    duration: '4 days',
    stops: 15,
    creatorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    id: '3',
    title: 'Lisbon Hidden Gems',
    coverImage: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 22,
    rating: 4.7,
    reviewCount: 67,
    duration: '3 days',
    stops: 10,
    creatorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    id: '4',
    title: 'Rome in 5 Days',
    coverImage: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 29,
    rating: 4.9,
    reviewCount: 156,
    duration: '5 days',
    stops: 18,
    creatorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    id: '5',
    title: 'Amsterdam Explorer',
    coverImage: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 24,
    rating: 4.8,
    reviewCount: 92,
    duration: '4 days',
    stops: 14,
    creatorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    id: '6',
    title: 'Berlin Cultural Tour',
    coverImage: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 18,
    rating: 4.7,
    reviewCount: 78,
    duration: '3 days',
    stops: 11,
    creatorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
];

export function ItinerariesTab({ onItineraryClick }: ItinerariesTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_ITINERARIES.map((itinerary) => (
        <button
          key={itinerary.id}
          onClick={() => onItineraryClick(itinerary.id)}
          className="group text-left rounded-2xl overflow-hidden bg-white border border-gray-200
                   shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={itinerary.coverImage}
              alt={itinerary.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute top-3 right-3">
              <span className="px-3 py-1.5 rounded-full bg-white text-gray-900
                           text-sm font-bold shadow-lg">
                ${itinerary.price}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <img
                src={itinerary.creatorAvatar}
                alt="Creator"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-coral-600 transition-colors">
              {itinerary.title}
            </h3>

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {itinerary.rating}
              </span>
              <span className="text-gray-400">·</span>
              <span>{itinerary.reviewCount} reviews</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {itinerary.duration}
              </span>
              <span className="text-gray-400">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {itinerary.stops} stops
              </span>
            </div>

            <button className="w-full py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                           text-white text-sm font-semibold transition-all
                           transform group-hover:scale-[1.02]">
              View Itinerary
            </button>
          </div>
        </button>
      ))}
    </div>
  );
}
