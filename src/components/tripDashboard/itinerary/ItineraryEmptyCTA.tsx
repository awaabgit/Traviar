import { Sparkles, Plus, Loader2 } from 'lucide-react';

interface ItineraryEmptyCTAProps {
  onGenerateWithAI: () => void;
  onAddManually: () => void;
  isGenerating: boolean;
}

export function ItineraryEmptyCTA({ onGenerateWithAI, onAddManually, isGenerating }: ItineraryEmptyCTAProps) {
  return (
    <div className="bg-gradient-to-br from-coral-50 to-orange-50 rounded-2xl shadow-soft-lg p-8 mb-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-coral-500" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Build your day-by-day itinerary
        </h3>
        <p className="text-gray-600 mb-6">
          Add stops manually or let Traviar create a smart route for you
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onGenerateWithAI}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-medium transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate with AI
              </>
            )}
          </button>

          <button
            onClick={onAddManually}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Add places manually
          </button>
        </div>
      </div>
    </div>
  );
}
