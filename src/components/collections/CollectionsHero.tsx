import { Sparkles } from 'lucide-react';

export function CollectionsHero() {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-white
                    border border-orange-100 shadow-lg p-10 mb-8">
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                      bg-white/90 backdrop-blur-sm border border-orange-200 mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-semibold text-gray-900">Curated by Traviar creators</span>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Collections
        </h1>

        <p className="text-xl text-gray-700 mb-2 font-medium">
          Handpicked travel themes from expert creators
        </p>
        <p className="text-base text-gray-600 font-medium">
          Browse by mood, budget, or travel style.
        </p>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-15">
        <svg width="200" height="200" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M90 30L110 70H130L110 90L120 130L90 110L60 130L70 90L50 70H70L90 30Z"
                fill="currentColor" className="text-orange-500"/>
          <circle cx="140" cy="140" r="15" fill="currentColor" className="text-orange-400"/>
          <circle cx="40" cy="40" r="12" fill="currentColor" className="text-red-400"/>
        </svg>
      </div>
    </div>
  );
}
