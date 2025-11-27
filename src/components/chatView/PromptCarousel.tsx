import { useState } from 'react';
import {
  MapPin,
  UtensilsCrossed,
  Video,
  Hotel,
  Backpack,
  Users,
  PartyPopper,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PromptCard {
  id: string;
  category: string;
  icon: any;
  title: string;
  description: string;
  prompt: string;
}

const PROMPT_CATEGORIES: PromptCard[] = [
  {
    id: '1',
    category: 'Planning',
    icon: MapPin,
    title: 'Plan a full trip',
    description: 'Get a complete itinerary with activities, restaurants, and more',
    prompt: 'Help me plan a 5-day trip to Paris with a mix of culture and food',
  },
  {
    id: '2',
    category: 'Food & Restaurants',
    icon: UtensilsCrossed,
    title: 'Find amazing food',
    description: 'Discover the best local restaurants and hidden gem cafés',
    prompt: 'Find me the best brunch spots in Brooklyn this weekend',
  },
  {
    id: '3',
    category: 'TikTok & Content',
    icon: Video,
    title: 'TikTok inspiration',
    description: 'Turn viral TikTok content into real travel plans',
    prompt: 'I saw a TikTok about a hidden beach in Bali, help me plan a visit',
  },
  {
    id: '4',
    category: 'Hotels',
    icon: Hotel,
    title: 'Perfect accommodations',
    description: 'Find hotels, Airbnbs, and unique stays that match your vibe',
    prompt: 'Find me a boutique hotel in Tulum with beach access under $200/night',
  },
  {
    id: '5',
    category: 'Budget / Backpacking',
    icon: Backpack,
    title: 'Budget travel',
    description: 'Maximize adventure while minimizing costs',
    prompt: 'Plan a 2-week backpacking trip through Southeast Asia on $30/day',
  },
  {
    id: '6',
    category: 'Activities',
    icon: PartyPopper,
    title: 'Things to do',
    description: 'Find activities, tours, and experiences',
    prompt: 'What are the best outdoor activities in Colorado this summer?',
  },
  {
    id: '7',
    category: 'Family Trips',
    icon: Users,
    title: 'Family-friendly',
    description: 'Plan trips the whole family will love',
    prompt: 'Plan a week-long family trip to Orlando with kids ages 5 and 8',
  },
  {
    id: '8',
    category: 'Dates & Duration',
    icon: Calendar,
    title: 'When to go',
    description: 'Find the best time to visit based on weather and events',
    prompt: 'When is the best time to visit Japan for cherry blossoms?',
  },
];

interface PromptCarouselProps {
  onSelectPrompt: (prompt: string) => void;
}

export function PromptCarousel({ onSelectPrompt }: PromptCarouselProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('prompt-carousel');
    if (container) {
      const scrollAmount = 400;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);

      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">What can I help you with?</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={scrollPosition === 0}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50
                     disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50
                     transition-all"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        id="prompt-carousel"
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PROMPT_CATEGORIES.map((card, index) => {
          const Icon = card.icon;
          const isHovered = hoveredId === card.id;

          return (
            <button
              key={card.id}
              onClick={() => onSelectPrompt(card.prompt)}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex-shrink-0 w-80 p-5 rounded-2xl border-2 border-gray-200 bg-white
                       hover:border-coral-400 hover:shadow-lg transition-all duration-300
                       text-left transform hover:scale-[1.02] active:scale-[0.98]
                       animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                              transition-all duration-300
                              ${isHovered ? 'bg-coral-500' : 'bg-coral-50'}`}>
                  <Icon className={`w-6 h-6 transition-colors duration-300
                                  ${isHovered ? 'text-white' : 'text-coral-500'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-coral-500 uppercase tracking-wide mb-1">
                    {card.category}
                  </p>
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug mb-3">
                    {card.description}
                  </p>

                  <div className={`inline-flex items-center text-sm font-medium transition-all duration-300
                                  ${isHovered ? 'text-coral-500' : 'text-gray-400'}`}>
                    Try it
                    <span className={`ml-1 transform transition-transform duration-300
                                    ${isHovered ? 'translate-x-1' : ''}`}>
                      →
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
