import { useState } from 'react';
import { X, Star, MapPin, Clock, DollarSign, Phone, Globe, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface PlaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    priceLevel: string;
    address: string;
    phone?: string;
    website?: string;
    hours?: string;
    description: string;
    images: string[];
    location: { lat: number; lng: number };
  };
  onAddToTrip: (dayNumber: number) => void;
  tripDays: number;
}

export function PlaceDetailModal({ isOpen, onClose, place, onAddToTrip, tripDays }: PlaceDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showDaySelector, setShowDaySelector] = useState(false);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % place.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + place.images.length) % place.images.length);
  };

  const handleAddToDay = (dayNumber: number) => {
    onAddToTrip(dayNumber);
    setShowDaySelector(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[24px] shadow-soft-xl overflow-hidden
                   animate-scale-in-bounce flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-[400px] bg-gray-900">
            <img
              src={place.images[currentImageIndex]}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {place.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                           bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white
                           transition-all duration-200 transform hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                           bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white
                           transition-all duration-200 transform hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 text-gray-900" />
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm
                       shadow-lg hover:bg-white transition-all duration-200
                       transform hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/90 backdrop-blur-sm
                       shadow-lg hover:bg-white transition-all duration-200
                       transform hover:scale-110 active:scale-95"
            >
              <Heart
                className={`w-5 h-5 transition-all duration-200 ${
                  isSaved ? 'fill-coral-500 text-coral-500' : 'text-gray-900'
                }`}
              />
            </button>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-900">
                  {place.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-900">
                  {place.priceLevel}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{place.name}</h2>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{place.rating}</span>
                  <span className="text-white/80">({place.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {place.images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {place.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900">{place.address}</p>
                </div>
              </div>

              {place.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hours</p>
                    <p className="text-gray-900">{place.hours}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {place.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-gray-900">{place.phone}</p>
                  </div>
                </div>
              )}

              {place.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Website</p>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coral-600 hover:text-coral-700 hover:underline"
                    >
                      Visit website
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price Level</p>
                  <p className="text-gray-900">{place.priceLevel}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{place.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
            <div className="h-[300px] bg-gray-100 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Map Preview (Lat: {place.location.lat}, Lng: {place.location.lng})
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews Snapshot</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <span className="font-medium text-gray-900">User {review}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Great experience! Highly recommended for anyone visiting the area.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50">
          {showDaySelector ? (
            <div className="animate-slide-in-down">
              <p className="text-sm font-medium text-gray-900 mb-3">Select a day to add this place:</p>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {Array.from({ length: tripDays }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => handleAddToDay(day)}
                    className="px-4 py-3 rounded-xl border border-gray-200 hover:border-coral-500
                             hover:bg-coral-50 text-sm font-medium text-gray-900
                             transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Day {day}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowDaySelector(false)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200
                         hover:border-gray-300 hover:bg-white text-gray-900 font-medium
                         transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${
                    isSaved ? 'fill-coral-500 text-coral-500' : ''
                  }`}
                />
                {isSaved ? 'Saved' : 'Save'}
              </button>

              <button
                onClick={() => setShowDaySelector(true)}
                className="px-8 py-3 rounded-xl bg-coral-500 hover:bg-coral-600 text-white
                         font-semibold shadow-lg hover:shadow-xl transition-all duration-200
                         transform hover:scale-105 active:scale-95"
              >
                Add to Trip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
