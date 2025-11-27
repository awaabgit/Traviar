import { useEffect, useState, useRef } from 'react';
import { X, Heart, Share2, Star, Clock, DollarSign, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react';

interface TripDetailDrawerProps {
  tripId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase?: (tripId: string) => void;
  onViewFullItinerary?: (tripId: string) => void;
}

interface TripDetail {
  id: string;
  title: string;
  description: string;
  destination: string;
  duration_days: number;
  price: number;
  cover_image_url: string;
  creator_name: string;
  creator_avatar: string;
  rating_avg: number;
  rating_count: number;
  vibe_tags: string[];
  detailed_description: string;
  highlights: string[];
  included: string[];
  not_included: string[];
  days: {
    day: number;
    title: string;
    activities: string[];
  }[];
}

export function TripDetailDrawer({
  tripId,
  isOpen,
  onClose,
  onPurchase,
  onViewFullItinerary
}: TripDetailDrawerProps) {
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && tripId) {
      loadTripDetails(tripId);
    }
  }, [isOpen, tripId]);

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

  const loadTripDetails = async (id: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      setTrip({
        id,
        title: 'Romantic Paris Escape',
        description: 'Experience the city of love with curated dining and hidden gems',
        destination: 'Paris, France',
        duration_days: 3,
        price: 299,
        cover_image_url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
        creator_name: 'Sophie Martin',
        creator_avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating_avg: 4.8,
        rating_count: 124,
        vibe_tags: ['romantic', 'cultural', 'luxury'],
        detailed_description: 'Immerse yourself in the magic of Paris with this carefully curated 3-day itinerary. From intimate cafes to world-class museums, experience the city through the eyes of a local. This journey balances iconic landmarks with hidden gems, ensuring an authentic Parisian experience.',
        highlights: [
          'Private sunset tour of the Eiffel Tower',
          'Exclusive wine tasting in Montmartre',
          'Reserved seating at a Michelin-starred bistro',
          'Guided walk through hidden Parisian gardens',
          'Skip-the-line access to the Louvre'
        ],
        included: [
          'All attraction tickets',
          'Restaurant reservations',
          'Local transportation guide',
          'Digital city map with recommendations',
          '24/7 creator support'
        ],
        not_included: [
          'Flights',
          'Accommodation',
          'Meals (except where specified)',
          'Travel insurance'
        ],
        days: [
          {
            day: 1,
            title: 'Arrival & Left Bank Charm',
            activities: [
              'Morning: Check-in and coffee at Café de Flore',
              'Afternoon: Stroll through Luxembourg Gardens',
              'Lunch: Authentic crepes in the Latin Quarter',
              'Evening: Sunset at Pont des Arts',
              'Dinner: Classic French bistro experience'
            ]
          },
          {
            day: 2,
            title: 'Icons & Hidden Gems',
            activities: [
              'Morning: Skip-the-line Louvre tour',
              'Lunch: Picnic on the Seine',
              'Afternoon: Montmartre exploration and wine tasting',
              'Evening: Private Eiffel Tower sunset experience',
              'Dinner: Michelin-starred Le Comptoir'
            ]
          },
          {
            day: 3,
            title: 'Secret Paris & Farewell',
            activities: [
              'Morning: Hidden passages and vintage shopping',
              'Lunch: Market tour and cooking class',
              'Afternoon: Musée Rodin gardens',
              'Evening: Seine river cruise at twilight',
              'Farewell: Champagne at a rooftop bar'
            ]
          }
        ]
      });
    } catch (error) {
      console.error('Failed to load trip details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    console.log('Share trip');
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
          aria-label="Close drawer"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent" />
          </div>
        ) : trip ? (
          <>
            <div className="relative h-80 flex-shrink-0">
              <img
                src={trip.cover_image_url}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 right-4 flex gap-2" style={{ right: '60px' }}>
                <button
                  onClick={handleSave}
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
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg
                           hover:bg-white transition-all duration-200
                           transform hover:scale-110 active:scale-95"
                >
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={trip.creator_avatar}
                    alt={trip.creator_name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="text-white/90 text-sm">Created by</p>
                    <p className="text-white font-semibold">{trip.creator_name}</p>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">{trip.title}</h1>
                <p className="text-white/90 text-sm mb-3">{trip.description}</p>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">{trip.rating_avg}</span>
                    <span className="text-sm text-gray-600">({trip.rating_count})</span>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-sm font-medium text-gray-900">
                    {trip.duration_days} days
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-sm font-medium text-gray-900">
                    ${trip.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-coral-500" />
                    <h3 className="text-lg font-semibold text-gray-900">About this trip</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{trip.detailed_description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {trip.vibe_tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-coral-50 text-coral-700 text-sm font-medium border border-coral-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Trip Highlights</h3>
                  <ul className="space-y-2">
                    {trip.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-coral-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Day-by-day itinerary</h3>
                  <div className="space-y-3">
                    {trip.days.map(day => (
                      <div key={day.day} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-coral-500 flex items-center justify-center text-white font-semibold">
                              {day.day}
                            </div>
                            <div className="text-left">
                              <p className="font-semibold text-gray-900">Day {day.day}</p>
                              <p className="text-sm text-gray-600">{day.title}</p>
                            </div>
                          </div>
                          {expandedDay === day.day ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        {expandedDay === day.day && (
                          <div className="p-4 bg-white">
                            <ul className="space-y-2">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What's included</h4>
                    <ul className="space-y-1">
                      {trip.included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Not included</h4>
                    <ul className="space-y-1">
                      {trip.not_included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-gray-400">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-white flex gap-3">
              <button
                onClick={() => onViewFullItinerary?.(trip.id)}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-coral-600
                         border-2 border-coral-500 hover:bg-coral-50
                         transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                View Full Itinerary
              </button>
              <button
                onClick={() => onPurchase?.(trip.id)}
                className="flex-1 px-4 py-3 rounded-xl font-semibold text-white
                         bg-coral-500 hover:bg-coral-600 shadow-md hover:shadow-lg
                         transition-all duration-200 transform hover:scale-105 active:scale-95
                         flex items-center justify-center gap-2"
              >
                <DollarSign className="w-5 h-5" />
                Purchase ${trip.price}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <p className="text-gray-600">Failed to load trip details</p>
          </div>
        )}
      </div>
    </div>
  );
}
