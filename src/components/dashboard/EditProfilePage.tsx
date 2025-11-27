import { useState } from 'react';
import { Save, Upload, X, MapPin, Globe, ExternalLink, Plus } from 'lucide-react';

const NICHE_TAGS = [
  'Budget Travel', 'Luxury Travel', 'Adventure', 'City Breaks', 'Beach',
  'Foodie', 'Solo Travel', 'Family Travel', 'Backpacking', 'Road Trips',
  'Photography', 'Culture', 'Wildlife', 'Wellness', 'Nightlife'
];

const PRESET_COVERS = [
  'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

export function EditProfilePage() {
  const [coverImage, setCoverImage] = useState('https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920');
  const [avatar, setAvatar] = useState('https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300');
  const [displayName, setDisplayName] = useState('Sam Chen');
  const [username, setUsername] = useState('wanderlust_sam');
  const [location, setLocation] = useState('Barcelona, Spain');
  const [bio, setBio] = useState('Full-time travel creator helping budget travelers explore Europe. Sharing authentic experiences, hidden gems, and practical tips for your next adventure.');
  const [selectedTags, setSelectedTags] = useState(['Budget Travel', 'City Breaks', 'Foodie', 'Solo Travel']);
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [showCoverModal, setShowCoverModal] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 4) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Profile</h1>
        <p className="text-gray-600">Customize your public profile information</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="relative h-48 group">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity
                        flex items-center justify-center gap-3">
            <button
              onClick={() => setShowCoverModal(true)}
              className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900
                       font-medium transition-all shadow-lg"
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Change Cover
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-16 mb-6 relative group w-32">
            <img
              src={avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100
                          transition-opacity flex items-center justify-center">
              <button className="px-3 py-1.5 rounded-lg bg-white text-gray-900 text-sm font-medium">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCoverModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Choose Cover Photo</h2>
              <button
                onClick={() => setShowCoverModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {PRESET_COVERS.map((cover, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCoverImage(cover);
                    setShowCoverModal(false);
                  }}
                  className="relative aspect-[16/5] rounded-lg overflow-hidden border-2 border-gray-200
                           hover:border-coral-500 transition-all group"
                >
                  <img src={cover} alt={`Cover ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-coral-500/0 group-hover:bg-coral-500/20 transition-colors" />
                </button>
              ))}
            </div>

            <button className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300
                             hover:border-coral-500 hover:bg-coral-50 transition-all text-center">
              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">Upload Custom Image</p>
              <p className="text-xs text-gray-500">Recommended: 1920x600px, max 5MB</p>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={50}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
            <p className="text-xs text-gray-500 mt-1">{displayName.length}/50 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={300}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            placeholder="Tell others about yourself..."
          />
          <p className="text-xs text-gray-500 mt-1">{bio.length}/300 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Niche Tags (Select up to 4)
          </label>
          <div className="flex flex-wrap gap-2">
            {NICHE_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-coral-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${selectedTags.length >= 4 && !selectedTags.includes(tag) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Social Links</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">TikTok</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={tiktokUrl}
              onChange={(e) => setTiktokUrl(e.target.value)}
              placeholder="https://tiktok.com/@username"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/username"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/@channel"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 py-4 px-8 flex items-center justify-between z-10">
        <button className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                         text-gray-700 font-medium transition-all">
          Preview Changes
        </button>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                           text-gray-700 font-medium transition-all">
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-coral-500
                           hover:bg-coral-600 text-white font-semibold transition-all shadow-sm">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
