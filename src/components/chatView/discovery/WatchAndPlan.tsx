import { Play, ExternalLink, Eye } from 'lucide-react';

const TIKTOK_ITINERARIES = [
  {
    id: '1',
    thumbnail: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: '@travelwithsarah',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '2.3M',
    title: 'Hidden gems in Bali',
  },
  {
    id: '2',
    thumbnail: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: '@foodie_adventures',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '1.8M',
    title: 'Tokyo food tour',
  },
  {
    id: '3',
    thumbnail: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator: '@adventurejoe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: '3.1M',
    title: 'Iceland road trip',
  },
];

export function WatchAndPlan() {
  return (
    <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Watch & Plan</h3>
        <Play className="w-5 h-5 text-coral-500" />
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none' }}>
        {TIKTOK_ITINERARIES.map((item, index) => (
          <button
            key={item.id}
            className="group flex-shrink-0 w-48 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white
                          hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100
                              transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center
                                transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 text-coral-500 ml-1" />
                  </div>
                </div>

                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full
                              bg-black/60 backdrop-blur-sm">
                  <Eye className="w-3 h-3 text-white" />
                  <span className="text-xs font-medium text-white">{item.views}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img
                      src={item.avatar}
                      alt={item.creator}
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                    <span className="text-xs font-medium text-white">{item.creator}</span>
                  </div>
                  <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                </div>
              </div>

              <div className="p-2 border-t border-gray-100">
                <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-coral-500">
                  <span>Open itinerary</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
