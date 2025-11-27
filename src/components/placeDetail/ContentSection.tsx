import { Play, Bookmark } from 'lucide-react';
import { PlaceDetail } from '../../types';

interface ContentSectionProps {
  place: PlaceDetail;
}

const PLATFORM_LOGOS = {
  tiktok: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  youtube: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  traviar: '✈️',
};

export function ContentSection({ place }: ContentSectionProps) {
  const content = place.creatorContent || [];

  if (content.length === 0) {
    return (
      <section
        id="content"
        className="px-6 py-6 border-t border-gray-100 animate-slide-up-fade"
        style={{ animationDelay: '100ms' }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
        <div className="text-center py-8 px-4 bg-gray-50 rounded-xl">
          <p className="text-gray-500">
            We're still finding great content for this place.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="content"
      className="py-6 border-t border-gray-100 animate-slide-up-fade"
      style={{ animationDelay: '100ms' }}
    >
      <div className="px-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          See it before you go
        </h3>
        <p className="text-sm text-gray-600">Watch videos from creators</p>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 pb-2">
          {content.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${150 + index * 75}ms` }}
              className="flex-shrink-0 w-56 group cursor-pointer animate-slide-up-fade"
            >
              <div className="relative rounded-xl overflow-hidden mb-3 aspect-[9/16]">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110
                           transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm">
                  {typeof PLATFORM_LOGOS[item.platform] === 'string' ? (
                    <span className="text-sm">{PLATFORM_LOGOS[item.platform]}</span>
                  ) : (
                    <div className="text-white">{PLATFORM_LOGOS[item.platform]}</div>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="p-4 rounded-full bg-white/95 backdrop-blur-sm shadow-xl
                               transform group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-8 h-8 text-coral-600 fill-coral-600" />
                  </div>
                </div>

                <button
                  className="absolute top-3 left-3 p-2 rounded-full bg-white/95 backdrop-blur-sm
                           shadow-md hover:bg-white transition-all duration-200
                           transform hover:scale-110 active:scale-95 opacity-0
                           group-hover:opacity-100"
                  aria-label="Save to trip media"
                >
                  <Bookmark className="w-4 h-4 text-gray-700" />
                </button>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white text-sm font-semibold mb-1 line-clamp-2">
                    {item.title}
                  </div>
                  <div className="text-white/80 text-xs">@{item.creatorHandle}</div>
                  {item.viewCount && (
                    <div className="text-white/60 text-xs mt-1">
                      {(item.viewCount / 1000).toFixed(0)}K views
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-4">
        <p className="text-xs text-gray-400 text-center">Powered by creators</p>
      </div>
    </section>
  );
}
