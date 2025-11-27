import { useEffect, useState, useRef } from 'react';
import { X, Heart, Share2, MapPin, Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';

interface DestinationDetailDrawerProps {
  destinationId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onViewAllItineraries?: (destination: string) => void;
  onTripClick?: (tripId: string) => void;
}

interface DestinationDetail {
  id: string;
  name: string;
  country: string;
  theme: string;
  image_url: string;
  itinerary_count: number;
  description: string;
  best_time_to_visit: string;
  average_budget: string;
  popular_duration: string;
  highlights: string[];
  travel_tips: string[];
  weather_info: {
    spring: string;
    summer: string;
    fall: string;
    winter: string;
  };
  featured_trips: {
    id: string;
    title: string;
    image: string;
    price: number;
    days: number;
    rating: number;
  }[];
}

export function DestinationDetailDrawer({
  destinationId,
  isOpen,
  onClose,
  onViewAllItineraries,
  onTripClick
}: DestinationDetailDrawerProps) {
  const [destination, setDestination] = useState<DestinationDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && destinationId) {
      loadDestinationDetails(destinationId);
    }
  }, [isOpen, destinationId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const loadDestinationDetails = async (id: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      setDestination({
        id,
        name: 'Santorini',
        country: 'Greece',
        theme: 'Romantic sunset views',
        image_url: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
        itinerary_count: 34,
        description: 'Santorini is a stunning Greek island in the southern Aegean Sea, famous for its dramatic cliffside villages, whitewashed buildings with blue-domed churches, and spectacular sunsets. This volcanic island offers a perfect blend of natural beauty, ancient history, and Mediterranean charm.',
        best_time_to_visit: 'April to November (Peak: June-September)',
        average_budget: '$150-300 per day',
        popular_duration: '3-5 days',
        highlights: [
          'Watch the world-famous sunset in Oia',
          'Explore the ancient ruins of Akrotiri',
          'Swim in the unique Red Beach',
          'Wine tasting at local volcanic vineyards',
          'Sail around the caldera',
          'Visit the charming village of Pyrgos'
        ],
        travel_tips: [
          'Book accommodations well in advance during peak season',
          'Rent an ATV or car to explore the island freely',
          'Arrive early to popular spots to avoid crowds',
          'Try the local wine varieties - especially Assyrtiko',
          'Don\'t miss the sunset from Oia castle for the best views',
          'Visit the black sand beaches on the east coast'
        ],
        weather_info: {
          spring: 'Mild and pleasant, perfect for sightseeing (15-22°C)',
          summer: 'Hot and dry, ideal for beaches (25-30°C)',
          fall: 'Warm with fewer crowds (20-26°C)',
          winter: 'Cool and quiet, some closures (10-15°C)'
        },
        featured_trips: [
          {
            id: 't1',
            title: 'Romantic Santorini Honeymoon',
            image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
            price: 599,
            days: 4,
            rating: 4.9
          },
          {
            id: 't2',
            title: 'Greek Island Hopping Adventure',
            image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400',
            price: 799,
            days: 7,
            rating: 4.8
          },
          {
            id: 't3',
            title: 'Santorini Wine & Culture Tour',
            image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
            price: 449,
            days: 3,
            rating: 4.7
          }
        ]
      });
    } catch (error) {
      console.error('Failed to load destination details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end md:items-center md:justify-end"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      <div
        ref={drawerRef}
        className="relative w-full md:w-[520px] h-[92vh] md:h-full bg-white
                   md:shadow-2xl overflow-hidden
                   animate-slide-in-bottom md:animate-slide-in-right
                   rounded-t-3xl md:rounded-none flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/95 backdrop-blur-sm
                   shadow-lg hover:bg-white transition-all duration-200
                   transform hover:scale-110 active:scale-95"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent" />
          </div>
        ) : destination ? (
          <>
            <div className="relative h-80 flex-shrink-0">
              <img
                src={destination.image_url}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 right-4 flex gap-2" style={{ right: '60px' }}>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg
                           hover:bg-white transition-all duration-200
                           transform hover:scale-110 active:scale-95"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isSaved ? 'fill-red-500 text-red-500' : 'text-gray-700'
                    }`}
                  />
                </button>
                <button
                  onClick={() => console.log('Share')}
                  className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg
                           hover:bg-white transition-all duration-200
                           transform hover:scale-110 active:scale-95"
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-4xl font-bold text-white mb-2">{destination.name}</h1>
                <p className="text-white/90 text-lg mb-3">{destination.country}</p>
                <p className="text-white/80 text-sm">{destination.theme}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-gray-50 text-center">
                    <TrendingUp className="w-6 h-6 text-coral-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{destination.itinerary_count}</p>
                    <p className="text-xs text-gray-600">Itineraries</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 text-center">
                    <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-900">{destination.popular_duration}</p>
                    <p className="text-xs text-gray-600">Duration</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 text-center">
                    <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-gray-900">{destination.average_budget}</p>
                    <p className="text-xs text-gray-600">Per day</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About {destination.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{destination.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Must-see highlights</h3>
                  <ul className="space-y-2">
                    {destination.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-coral-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Travel tips</h3>
                  <ul className="space-y-2">
                    {destination.travel_tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-coral-500 font-bold">→</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">When to visit</h3>
                  <p className="text-coral-600 font-medium mb-3">{destination.best_time_to_visit}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(destination.weather_info).map(([season, info]) => (
                      <div key={season} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="font-semibold text-gray-900 capitalize mb-1">{season}</p>
                        <p className="text-sm text-gray-600">{info}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Popular itineraries</h3>
                    <button
                      onClick={() => onViewAllItineraries?.(destination.name)}
                      className="text-sm font-medium text-coral-600 hover:text-coral-700"
                    >
                      View all
                    </button>
                  </div>
                  <div className="space-y-3">
                    {destination.featured_trips.map(trip => (
                      <button
                        key={trip.id}
                        onClick={() => onTripClick?.(trip.id)}
                        className="w-full flex gap-3 p-3 rounded-xl border border-gray-200 hover:border-coral-300
                                 hover:shadow-md transition-all duration-200 text-left"
                      >
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                            {trip.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>${trip.price}</span>
                            <span>•</span>
                            <span>{trip.days} days</span>
                            <span>•</span>
                            <span>★ {trip.rating}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-white">
              <button
                onClick={() => onViewAllItineraries?.(destination.name)}
                className="w-full px-4 py-3 rounded-xl font-semibold text-white
                         bg-coral-500 hover:bg-coral-600 shadow-md hover:shadow-lg
                         transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                View All {destination.itinerary_count} Itineraries
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-gray-600">Failed to load destination details</p>
          </div>
        )}
      </div>
    </div>
  );
}
