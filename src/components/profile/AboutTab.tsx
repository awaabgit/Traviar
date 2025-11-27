import { Globe, MapPin, Award, Languages, TrendingUp } from 'lucide-react';

interface AboutTabProps {
  profile: {
    fullBio: string;
    languages: string[];
    specialties: string[];
    highlights: string[];
    stats: {
      yearsOfTravel: number;
      citiesVisited: number;
      totalReviews: number;
    };
    socialLinks: {
      tiktok?: string;
      instagram?: string;
      youtube?: string;
      website?: string;
    };
  };
}

const DEFAULT_PROFILE = {
  fullBio: `Hey there! I'm a full-time travel creator who's been exploring Europe for the past 5 years.
    My mission is to help budget-conscious travelers discover amazing experiences without breaking the bank.

    I specialize in creating detailed, actionable itineraries that save you hours of research. Every recommendation
    in my guides has been personally tested and vetted. I focus on authentic local experiences, hidden gems,
    and the perfect balance between must-see attractions and off-the-beaten-path discoveries.

    When I'm not traveling, you can find me planning the next adventure, editing videos, or responding to
    DMs from fellow travelers. Let's explore the world together!`,
  languages: ['English', 'Spanish', 'French', 'Portuguese'],
  specialties: ['Paris', 'Barcelona', 'Lisbon', 'Rome', 'Amsterdam', 'Berlin', 'Prague', 'Budapest'],
  highlights: [
    'Featured in Travel + Leisure Magazine',
    'Top 10 European Travel Creator 2024',
    '500K+ followers across platforms',
    'Over 1000 trips planned for travelers',
  ],
  stats: {
    yearsOfTravel: 5,
    citiesVisited: 87,
    totalReviews: 1240,
  },
  socialLinks: {
    tiktok: '#',
    instagram: '#',
    youtube: '#',
    website: '#',
  },
};

export function AboutTab({ profile = DEFAULT_PROFILE }: { profile?: Partial<AboutTabProps['profile']> }) {
  const mergedProfile = { ...DEFAULT_PROFILE, ...profile };

  return (
    <div className="max-w-4xl space-y-8">
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-coral-600" />
          About Me
        </h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {mergedProfile.fullBio}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-coral-100 mx-auto mb-3
                        flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-coral-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {mergedProfile.stats.yearsOfTravel}+
          </p>
          <p className="text-sm text-gray-600">Years of Travel</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-coral-100 mx-auto mb-3
                        flex items-center justify-center">
            <MapPin className="w-6 h-6 text-coral-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {mergedProfile.stats.citiesVisited}
          </p>
          <p className="text-sm text-gray-600">Cities Visited</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-coral-100 mx-auto mb-3
                        flex items-center justify-center">
            <Award className="w-6 h-6 text-coral-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {mergedProfile.stats.totalReviews}
          </p>
          <p className="text-sm text-gray-600">Total Reviews</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Languages className="w-5 h-5 text-coral-600" />
          Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {mergedProfile.languages.map((language) => (
            <span
              key={language}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-medium"
            >
              {language}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-coral-600" />
          Places I Specialize In
        </h3>
        <div className="flex flex-wrap gap-2">
          {mergedProfile.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-4 py-2 rounded-full bg-coral-50 border border-coral-200
                       text-coral-700 font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-coral-600" />
          Creator Highlights
        </h3>
        <ul className="space-y-3">
          {mergedProfile.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-coral-100 flex items-center justify-center
                            flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-coral-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700 flex-1">{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-coral-600" />
          Connect With Me
        </h3>
        <div className="flex items-center gap-3">
          {mergedProfile.socialLinks.tiktok && (
            <a
              href={mergedProfile.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900
                       hover:bg-gray-800 text-white font-medium transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              TikTok
            </a>
          )}
          {mergedProfile.socialLinks.instagram && (
            <a
              href={mergedProfile.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500
                       hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
              </svg>
              Instagram
            </a>
          )}
          {mergedProfile.socialLinks.youtube && (
            <a
              href={mergedProfile.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600
                       hover:bg-red-700 text-white font-medium transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          )}
          {mergedProfile.socialLinks.website && (
            <a
              href={mergedProfile.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border-2 border-gray-300
                       hover:border-coral-500 hover:bg-coral-50 text-gray-700 hover:text-coral-700
                       font-medium transition-all"
            >
              <Globe className="w-4 h-4" />
              Website
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
