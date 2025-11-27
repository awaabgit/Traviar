import { ArrowRight } from 'lucide-react';

interface PromotionalBannerProps {
  title: string;
  description?: string;
  ctaText: string;
  image_url: string;
  theme?: 'light' | 'dark';
  size?: 'small' | 'large';
  onClick?: () => void;
}

export function PromotionalBanner({
  title,
  description,
  ctaText,
  image_url,
  theme = 'dark',
  size = 'large',
  onClick
}: PromotionalBannerProps) {
  const isLight = theme === 'light';

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group
                    ${size === 'large' ? 'h-80 md:h-96' : 'h-64'}`}
    >
      <img
        src={image_url}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className={`absolute inset-0 ${
        isLight
          ? 'bg-gradient-to-r from-white/95 via-white/80 to-transparent'
          : 'bg-gradient-to-r from-black/70 via-black/50 to-transparent'
      }`} />

      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16">
        <div className="max-w-xl">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight
                        ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {title}
          </h2>
          {description && (
            <p className={`text-base md:text-lg mb-6 leading-relaxed
                         ${isLight ? 'text-gray-700' : 'text-white/90'}`}>
              {description}
            </p>
          )}
          <button className={`inline-flex items-center gap-2 px-6 py-3 rounded-full
                            font-medium text-sm transition-all duration-200
                            group-hover:gap-3 group-hover:px-7
                            ${isLight
                              ? 'bg-gray-900 text-white hover:bg-gray-800'
                              : 'bg-white text-gray-900 hover:bg-gray-100'}`}>
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface FeaturedCategoryProps {
  title: string;
  subtitle: string;
  image_url: string;
  onClick?: () => void;
}

export function FeaturedCategory({ title, subtitle, image_url, onClick }: FeaturedCategoryProps) {
  return (
    <div onClick={onClick} className="relative rounded-xl overflow-hidden cursor-pointer group h-72">
      <img
        src={image_url}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-1 leading-tight">
          {title}
        </h3>
        <p className="text-white/90 text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
