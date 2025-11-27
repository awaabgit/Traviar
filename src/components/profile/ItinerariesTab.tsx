import { Star, Clock, MapPin, Compass, Sparkles } from 'lucide-react';

export interface ItineraryCardData {
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
  itineraries: ItineraryCardData[];
  isOwnProfile: boolean;
  onItineraryClick: (id: string) => void;
  onPlanTrip?: () => void;
  onPlanWithAI?: () => void;
}

export function ItinerariesTab({ itineraries, isOwnProfile, onItineraryClick, onPlanTrip, onPlanWithAI }: ItinerariesTabProps) {
  // Empty state when no itineraries
  if (itineraries.length === 0) {
    if (isOwnProfile) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-20 h-20 rounded-full bg-gradient-sunset flex items-center justify-center mb-6">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready for your next adventure?
          </h3>
          <p className="text-gray-600 text-center mb-6 max-w-md">
            Start creating your first itinerary and share your travel experiences with the world
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onPlanWithAI}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-coral-500
                       hover:bg-coral-600 text-white font-semibold transition-all
                       shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              Plan with AI
            </button>
            <button
              onClick={onPlanTrip}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-coral-500
                       hover:bg-coral-50 text-coral-600 font-semibold transition-all
                       transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Compass className="w-4 h-4" />
              Plan a Trip
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-center">No itineraries yet</p>
        </div>
      );
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {itineraries.map((itinerary) => (
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
