import { X, Star, MapPin, Calendar, Users, Heart, Share2, ShoppingCart, CheckCircle } from 'lucide-react';
import { MarketplaceItinerary } from '../../types';
import { useState } from 'react';

interface MarketplaceItineraryDrawerProps {
  itinerary: MarketplaceItinerary | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MarketplaceItineraryDrawer({ itinerary, isOpen, onClose }: MarketplaceItineraryDrawerProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!itinerary) return null;

  const hasDiscount = itinerary.discount_price && itinerary.discount_price < itinerary.price;
  const finalPrice = hasDiscount ? itinerary.discount_price! : itinerary.price;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50
                  transform transition-transform duration-300 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative">
          <div className="relative h-80 overflow-hidden">
            <img
              src={itinerary.cover_image_url}
              alt={itinerary.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full
                       flex items-center justify-center hover:bg-white transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>

            <div className="absolute top-6 left-6 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full
                         flex items-center justify-center hover:bg-white transition-colors duration-200"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'
                  }`}
                />
              </button>

              <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full
                               flex items-center justify-center hover:bg-white transition-colors duration-200">
                <Share2 className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  {itinerary.title}
                </h1>

                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{itinerary.destination}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{itinerary.duration_days} days</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{itinerary.rating_avg.toFixed(1)}</span>
                    <span className="text-gray-500">({itinerary.rating_count} reviews)</span>
                  </div>

                  <span className="text-gray-400">•</span>

                  <span className="text-gray-600">
                    {itinerary.purchase_count} {itinerary.purchase_count === 1 ? 'purchase' : 'purchases'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-8">
              <img
                src={itinerary.creator?.avatar_url || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={itinerary.creator?.display_name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{itinerary.creator?.display_name}</h3>
                  {itinerary.creator?.is_verified && (
                    <CheckCircle className="w-4 h-4 text-blue-500 fill-current" />
                  )}
                </div>
                <p className="text-sm text-gray-600">@{itinerary.creator?.username}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-coral-50 text-coral-700 rounded-full font-medium">
                    {itinerary.creator?.specialty}
                  </span>
                  <span className="text-xs text-gray-500">
                    {itinerary.creator?.itinerary_count} itineraries
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100
                               font-medium text-sm transition-colors duration-200">
                View Profile
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{itinerary.description}</p>
            </div>

            {itinerary.style_tags && itinerary.style_tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {itinerary.style_tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-3">What's Included</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Complete day-by-day itinerary</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Restaurant and accommodation recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Interactive map with all locations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Budget breakdown and tips</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>Local insights and hidden gems</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gray-300 rounded-full" />
                      <div>
                        <p className="font-semibold text-gray-900">Traveler {i}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Amazing itinerary! Everything was perfectly planned and we had an incredible time.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">${finalPrice}</span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-gray-500 line-through">${itinerary.price}</span>
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                        SAVE ${(itinerary.price - finalPrice).toFixed(0)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <button className="flex items-center gap-2 px-8 py-4 bg-coral-500 hover:bg-coral-600
                               text-white rounded-xl font-bold text-lg
                               transform hover:scale-105 transition-all duration-200 shadow-lg">
                <ShoppingCart className="w-5 h-5" />
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
