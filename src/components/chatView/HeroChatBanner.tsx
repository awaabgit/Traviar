import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const ROTATING_SUBTEXTS = [
  "I'll help you discover amazing places and create the perfect itinerary",
  "Ask me anything about destinations, activities, or travel tips",
  "Let's turn your travel dreams into reality",
];

export function HeroChatBanner() {
  const [subtextIndex, setSubtextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtextIndex((prev) => (prev + 1) % ROTATING_SUBTEXTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative px-8 pt-12 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-white opacity-70" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-orange-200 mb-6 animate-fade-in-up shadow-md">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold text-gray-800">Your AI Travel Assistant</span>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up tracking-tight" style={{ animationDelay: '100ms' }}>
          Where to today, <span className="bg-gradient-sunset bg-clip-text text-transparent">John</span>?
        </h1>

        <div className="h-16 flex items-center justify-center">
          <p
            key={subtextIndex}
            className="text-lg text-gray-600 max-w-2xl animate-fade-in font-medium"
          >
            {ROTATING_SUBTEXTS[subtextIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
