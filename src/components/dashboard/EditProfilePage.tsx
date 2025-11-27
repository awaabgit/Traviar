import { useState, useEffect } from 'react';
import { Save, Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';

const NICHE_TAGS = [
  'Budget Travel', 'Luxury Travel', 'Adventure', 'City Breaks', 'Beach',
  'Foodie', 'Solo Travel', 'Family Travel', 'Backpacking', 'Road Trips',
  'Photography', 'Culture', 'Wildlife', 'Wellness', 'Nightlife'
];

const BUDGET_OPTIONS = [
  { value: 'low' as const, label: 'Budget' },
  { value: 'medium' as const, label: 'Mid-Range' },
  { value: 'high' as const, label: 'Luxury' },
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
  const { user } = useAuthContext();
  const { profile, loading: loadingProfile, refetch } = useProfile(user?.id);
  const { updateProfile, updating, error: updateError } = useUpdateProfile();

  const [coverImage, setCoverImage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<'low' | 'medium' | 'high'>('medium');
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load profile data when it becomes available
  useEffect(() => {
    if (profile) {
      setAvatar(profile.avatar_url || '');
      setDisplayName(profile.full_name || '');
      setUsername(profile.username || '');
      setBio(profile.bio || '');
      setSelectedTags(profile.travel_style || []);
      setBudgetRange(profile.preferred_budget_range || 'medium');
    }
  }, [profile]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 4) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setSaveSuccess(false);

    const result = await updateProfile(user.id, {
      full_name: displayName,
      avatar_url: avatar,
      bio,
      travel_style: selectedTags,
      preferred_budget_range: budgetRange,
    });

    if (result) {
      setSaveSuccess(true);
      refetch(); // Refresh profile data
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-coral-500 animate-spin" />
      </div>
    );
  }

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
            Avatar URL
          </label>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            placeholder="https://example.com/your-avatar.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">Paste a direct link to your profile picture</p>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Budget Range
          </label>
          <div className="flex gap-3">
            {BUDGET_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setBudgetRange(option.value)}
                className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                  budgetRange === option.value
                    ? 'border-coral-500 bg-coral-50 text-coral-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {updateError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-medium">Error saving profile</p>
          <p className="text-sm text-red-600 mt-1">{updateError}</p>
        </div>
      )}

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-green-700 font-medium">Profile updated successfully!</p>
            <p className="text-sm text-green-600 mt-1">Your changes have been saved.</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 py-4 px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={updating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-coral-500
                     hover:bg-coral-600 text-white font-semibold transition-all shadow-sm
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
          {saveSuccess && (
            <span className="text-green-600 font-medium flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
