import { Heart, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';

const ITINERARIES = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Paris in 5 Days',
    creator: 'Emma Rodriguez',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    price: 249,
    duration: '5 days',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/161172/cycling-bike-trail-sport-161172.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Tokyo Food Tour',
    creator: 'James Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    price: 179,
    duration: '3 days',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Iceland Adventure',
    creator: 'Sophie Martin',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    price: 399,
    duration: '7 days',
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Bali Wellness',
    creator: 'Aria Patel',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    price: 299,
    duration: '6 days',
  },
];

export function RecommendedItineraries() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Itineraries</h3>

      <div className="grid grid-cols-2 gap-3">
        {ITINERARIES.map((item, index) => {
          const isSaved = savedIds.includes(item.id);

          return (
            <button
              key={item.id}
              className="group text-left animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white
                            hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(item.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
                             flex items-center justify-center hover:bg-white transition-colors
                             transform hover:scale-110 active:scale-95"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${
                      isSaved ? 'fill-coral-500 text-coral-500' : 'text-gray-600'
                    }`} />
                  </button>
                </div>

                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-1">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={item.avatar}
                      alt={item.creator}
                      className="w-5 h-5 rounded-full border border-gray-200"
                    />
                    <span className="text-xs text-gray-600 truncate">{item.creator}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-0.5 font-semibold text-sm text-gray-900">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
