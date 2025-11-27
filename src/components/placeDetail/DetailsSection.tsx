import { useState } from 'react';
import { MapPin, Phone, Globe, Clock, Copy, Navigation, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PlaceDetail } from '../../types';

interface DetailsSectionProps {
  place: PlaceDetail;
}

export function DetailsSection({ place }: DetailsSectionProps) {
  const [showFullHours, setShowFullHours] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(place.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`,
      '_blank'
    );
  };

  return (
    <section
      id="details"
      className="px-6 py-6 border-t border-gray-100 space-y-6 animate-slide-up-fade"
      style={{ animationDelay: '100ms' }}
    >
      <h3 className="text-lg font-semibold text-gray-900">Details</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <MapPin className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">Address</div>
                <p className="text-sm text-gray-600 leading-relaxed">{place.address}</p>
              </div>
            </div>
            <div className="flex gap-2 ml-8">
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                         font-medium text-gray-700 hover:text-gray-900 bg-gray-100
                         hover:bg-gray-200 transition-all duration-200"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDirections}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                         font-medium text-coral-600 hover:text-coral-700 bg-coral-50
                         hover:bg-coral-100 transition-all duration-200"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>
          </div>

          {place.openingHours && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">Hours</div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span
                      className={`font-semibold ${
                        place.openingHours.isOpenNow
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {place.openingHours.isOpenNow ? 'Open now' : 'Closed'}
                    </span>
                    {place.openingHours.closesAt && (
                      <span className="text-gray-600">
                        {' '}
                        · Closes at {place.openingHours.closesAt}
                      </span>
                    )}
                  </div>

                  {showFullHours && (
                    <div className="space-y-1 pt-2 border-t border-gray-100">
                      {place.openingHours.schedule.map((day) => (
                        <div
                          key={day.day}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">{day.day}</span>
                          <span className="text-gray-900 font-medium">
                            {day.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setShowFullHours(!showFullHours)}
                    className="flex items-center gap-1 text-sm text-coral-600
                             hover:text-coral-700 font-medium transition-colors duration-200"
                  >
                    <span>{showFullHours ? 'Hide hours' : 'View full hours'}</span>
                    {showFullHours ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {(place.phone || place.website) && (
            <div className="space-y-3">
              {place.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-0.5">
                      Phone
                    </div>
                    <a
                      href={`tel:${place.phone}`}
                      className="text-sm text-coral-600 hover:text-coral-700
                               font-medium transition-colors duration-200"
                    >
                      {place.phone}
                    </a>
                  </div>
                </div>
              )}

              {place.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-0.5">
                      Website
                    </div>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-coral-600 hover:text-coral-700
                               font-medium transition-colors duration-200
                               inline-flex items-center gap-1"
                    >
                      <span>Visit website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {place.amenities.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-3">Amenities</div>
              <div className="grid grid-cols-1 gap-2">
                {place.amenities.slice(0, 6).map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50
                             text-sm text-gray-700"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {place.bookingUrl && (
            <button
              onClick={() => window.open(place.bookingUrl, '_blank')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3
                       rounded-xl font-semibold text-white bg-gradient-to-r
                       from-coral-500 to-orange-500 hover:from-coral-600
                       hover:to-orange-600 shadow-md hover:shadow-lg
                       transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span>Book Now</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
