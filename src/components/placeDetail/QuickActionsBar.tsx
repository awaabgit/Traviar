import { Plus, StickyNote, Sparkles, Check, MapPin } from 'lucide-react';

interface QuickActionsBarProps {
  isAdded: boolean;
  onAddToDay: () => void;
  onAddNote?: () => void;
  onAskAI?: () => void;
  distanceInfo?: string;
}

export function QuickActionsBar({
  isAdded,
  onAddToDay,
  onAddNote,
  onAskAI,
  distanceInfo,
}: QuickActionsBarProps) {
  return (
    <div
      className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4
                 flex-shrink-0 animate-slide-in-down"
      style={{ animationDelay: '100ms' }}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={onAddToDay}
          disabled={isAdded}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold
                   transition-all duration-200 transform hover:scale-105 active:scale-95
                   shadow-md hover:shadow-lg ${
                     isAdded
                       ? 'bg-green-500 text-white cursor-default'
                       : 'bg-coral-500 hover:bg-coral-600 text-white'
                   }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Day</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Day</span>
            </>
          )}
        </button>

        <button
          onClick={onAddNote}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
                   text-gray-700 hover:text-gray-900 border border-gray-200
                   hover:border-gray-300 hover:bg-gray-50
                   transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <StickyNote className="w-4 h-4" />
          <span className="hidden sm:inline">Add note</span>
        </button>

        <button
          onClick={onAskAI}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
                   text-coral-600 hover:text-coral-700 border border-coral-200
                   hover:border-coral-300 hover:bg-coral-50
                   transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden lg:inline">Ask Traviar AI</span>
          <span className="lg:hidden">Ask AI</span>
        </button>

        {distanceInfo && (
          <div className="ml-auto hidden md:flex items-center gap-1.5 px-3 py-1.5
                       rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{distanceInfo}</span>
          </div>
        )}
      </div>
    </div>
  );
}
