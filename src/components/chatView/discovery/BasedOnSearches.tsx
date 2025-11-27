import { ChevronRight, Star } from 'lucide-react';

const FOOD_SPOTS = [
  { id: '1', name: 'Osteria Francescana', image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.9 },
  { id: '2', name: 'Noma', image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.8 },
  { id: '3', name: 'El Celler de Can Roca', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.9 },
];

const DAY_TRIPS = [
  { id: '1', name: 'Napa Valley Wine Tour', image: 'https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.7 },
  { id: '2', name: 'Grand Canyon Day Trip', image: 'https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.9 },
  { id: '3', name: 'Big Sur Coastal Drive', image: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.8 },
];

const HIDDEN_GEMS = [
  { id: '1', name: 'Secret Beach Cove', image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.6 },
  { id: '2', name: 'Mountain Hot Springs', image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.7 },
  { id: '3', name: 'Hidden Waterfall Trail', image: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.8 },
];

interface SubsectionProps {
  title: string;
  items: Array<{ id: string; name: string; image: string; rating: number }>;
  delay?: number;
}

function Subsection({ title, items, delay = 0 }: SubsectionProps) {
  return (
    <div className="animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <button className="flex items-center gap-1 text-xs font-medium text-coral-500 hover:text-coral-600">
          <span>See all</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none' }}>
        {items.map((item, index) => (
          <button
            key={item.id}
            className="group flex-shrink-0 w-32"
          >
            <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white
                          hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <div className="relative h-24 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full
                              bg-white/90 backdrop-blur-sm">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-700">{item.rating}</span>
                </div>
              </div>

              <div className="p-2">
                <p className="text-xs font-medium text-gray-900 line-clamp-2 leading-snug">
                  {item.name}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function BasedOnSearches() {
  return (
    <section className="animate-fade-in" style={{ animationDelay: '500ms' }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Based On Your Searches</h3>

      <div className="space-y-5">
        <Subsection title="More Food Spots" items={FOOD_SPOTS} delay={0} />
        <Subsection title="More Day Trips" items={DAY_TRIPS} delay={100} />
        <Subsection title="More Hidden Gems" items={HIDDEN_GEMS} delay={200} />
      </div>
    </section>
  );
}
