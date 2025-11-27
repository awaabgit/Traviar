import { X, ExternalLink, ChevronRight } from 'lucide-react';

interface VideoDrawerProps {
  videoId: string | null;
  onClose: () => void;
  onOpenItinerary: () => void;
}

export function VideoDrawer({ videoId, onClose, onOpenItinerary }: VideoDrawerProps) {
  if (!videoId) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl
                   overflow-y-auto animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4
                      flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Video Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="aspect-[9/16] max-h-[600px] rounded-xl overflow-hidden bg-gray-900
                        flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center
                            mx-auto mb-4">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-white text-sm">Video Player Placeholder</p>
              <p className="text-white/60 text-xs mt-1">TikTok embed would appear here</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Paris Travel Guide - Hidden Gems Edition
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Discover the secret spots locals love in Paris! From hidden cafes in Le Marais
              to stunning viewpoints away from the crowds. This itinerary includes all the
              places featured in this video plus 8 more amazing stops.
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-coral-50 to-orange-50 p-6 border border-coral-200">
            <div className="flex items-start gap-4">
              <img
                src="https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=120"
                alt="Itinerary"
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-coral-600 uppercase mb-1">
                  From Itinerary
                </p>
                <h4 className="font-bold text-gray-900 mb-1">
                  Weekend in Paris
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  3 days · 12 stops · $19
                </p>

                <button
                  onClick={onOpenItinerary}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-coral-500
                           hover:bg-coral-600 text-white text-sm font-semibold
                           transition-all shadow-sm hover:shadow-md
                           transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Open Itinerary
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">More from this creator</h4>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-100
                           hover:ring-2 hover:ring-coral-500 transition-all"
                >
                  <img
                    src={`https://images.pexels.com/photos/${i === 1 ? '1388030' : i === 2 ? '2147029' : '2064827'}/pexels-photo-${i === 1 ? '1388030' : i === 2 ? '2147029' : '2064827'}.jpeg?auto=compress&cs=tinysrgb&w=200`}
                    alt="Related video"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg
                     border-2 border-gray-300 hover:border-coral-500 hover:bg-coral-50
                     text-gray-700 hover:text-coral-700 font-semibold transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View on TikTok
          </a>
        </div>
      </div>
    </div>
  );
}
