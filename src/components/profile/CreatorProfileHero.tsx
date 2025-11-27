import { MapPin, Star, Globe, MessageCircle, UserPlus, Video, Settings } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';

export interface CreatorProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  coverImage?: string;
  location: string;
  bio: string;
  tags: string[];
  socialLinks: {
    tiktok?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
  };
  stats: {
    followers: number;
    tripsSold: number;
    rating: number;
    countriesVisited: number;
  };
}

interface CreatorProfileHeroProps {
  profile: CreatorProfile;
  onFollow: () => void;
  onMessage: () => void;
  onViewTikTok: () => void;
  onEditProfile?: () => void;
}

export function CreatorProfileHero({ profile, onFollow, onMessage, onViewTikTok, onEditProfile }: CreatorProfileHeroProps) {
  const { user } = useAuthContext();
  const isOwnProfile = user?.id === profile.id;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-6">
      {profile.coverImage && (
        <>
          <div className="absolute inset-0">
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        </>
      )}
      {!profile.coverImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-orange-50/30 to-coral-50/40" />
      )}

      <div className="relative z-10 p-8">
        <div className="flex items-start gap-6 mb-6">
          <img
            src={profile.avatar}
            alt={profile.displayName}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <h1 className={`text-3xl font-bold mb-1 ${
              profile.coverImage ? 'text-white' : 'text-gray-900'
            }`}>
              {profile.displayName}
            </h1>
            <p className={`text-lg mb-3 ${
              profile.coverImage ? 'text-white/90' : 'text-gray-600'
            }`}>
              {profile.username}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                profile.coverImage
                  ? 'bg-white/20 backdrop-blur-sm border border-white/30 text-white'
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}>
                <MapPin className="w-4 h-4" />
                {profile.location}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {profile.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profile.coverImage
                      ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                      : 'bg-coral-100 text-coral-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className={`leading-relaxed mb-4 max-w-2xl ${
              profile.coverImage ? 'text-white/95' : 'text-gray-700'
            }`}>
              {profile.bio}
            </p>

            <div className="flex items-center gap-3">
              {profile.socialLinks.tiktok && (
                <a
                  href={profile.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full transition-all flex items-center justify-center group ${
                    profile.coverImage
                      ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30'
                      : 'bg-white border border-gray-300 hover:border-coral-500 hover:bg-coral-50'
                  }`}
                >
                  <Video className={`w-4 h-4 ${
                    profile.coverImage ? 'text-white' : 'text-gray-600 group-hover:text-coral-600'
                  }`} />
                </a>
              )}
              {profile.socialLinks.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full transition-all flex items-center justify-center group ${
                    profile.coverImage
                      ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30'
                      : 'bg-white border border-gray-300 hover:border-coral-500 hover:bg-coral-50'
                  }`}
                >
                  <svg className={`w-4 h-4 ${
                    profile.coverImage ? 'text-white' : 'text-gray-600 group-hover:text-coral-600'
                  }`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.youtube && (
                <a
                  href={profile.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full transition-all flex items-center justify-center group ${
                    profile.coverImage
                      ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30'
                      : 'bg-white border border-gray-300 hover:border-coral-500 hover:bg-coral-50'
                  }`}
                >
                  <svg className={`w-4 h-4 ${
                    profile.coverImage ? 'text-white' : 'text-gray-600 group-hover:text-coral-600'
                  }`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full transition-all flex items-center justify-center group ${
                    profile.coverImage
                      ? 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30'
                      : 'bg-white border border-gray-300 hover:border-coral-500 hover:bg-coral-50'
                  }`}
                >
                  <Globe className={`w-4 h-4 ${
                    profile.coverImage ? 'text-white' : 'text-gray-600 group-hover:text-coral-600'
                  }`} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-4 gap-6 mb-6 pt-6 ${
          profile.coverImage ? 'border-t border-white/20' : 'border-t border-gray-200'
        }`}>
          <div className="text-center">
            <p className={`text-2xl font-bold mb-1 ${
              profile.coverImage ? 'text-white' : 'text-gray-900'
            }`}>
              {formatNumber(profile.stats.followers)}
            </p>
            <p className={`text-sm ${
              profile.coverImage ? 'text-white/80' : 'text-gray-600'
            }`}>Followers</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold mb-1 ${
              profile.coverImage ? 'text-white' : 'text-gray-900'
            }`}>
              {formatNumber(profile.stats.tripsSold)}
            </p>
            <p className={`text-sm ${
              profile.coverImage ? 'text-white/80' : 'text-gray-600'
            }`}>Trips Sold</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold mb-1 flex items-center justify-center gap-1 ${
              profile.coverImage ? 'text-white' : 'text-gray-900'
            }`}>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              {profile.stats.rating.toFixed(1)}
            </p>
            <p className={`text-sm ${
              profile.coverImage ? 'text-white/80' : 'text-gray-600'
            }`}>Rating</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold mb-1 ${
              profile.coverImage ? 'text-white' : 'text-gray-900'
            }`}>
              {profile.stats.countriesVisited}
            </p>
            <p className={`text-sm ${
              profile.coverImage ? 'text-white/80' : 'text-gray-600'
            }`}>Countries</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isOwnProfile ? (
            <button
              onClick={onEditProfile}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-coral-500
                       hover:bg-coral-600 text-white font-semibold transition-all
                       shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={onFollow}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-coral-500
                         hover:bg-coral-600 text-white font-semibold transition-all
                         shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <UserPlus className="w-4 h-4" />
                Follow
              </button>

              <button
                onClick={onMessage}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-300
                         hover:border-coral-500 hover:bg-coral-50 text-gray-700 hover:text-coral-700
                         font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
            </>
          )}

          {profile.socialLinks.tiktok && (
            <button
              onClick={onViewTikTok}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900
                       hover:bg-gray-800 text-white font-semibold transition-all
                       shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Video className="w-4 h-4" />
              View TikTok
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
