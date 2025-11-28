import { useState } from 'react';
import { Save, CheckCircle, AlertCircle, Loader2, X, Sparkles } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';

export function AccountSettings() {
  const { user } = useAuthContext();
  const { profile, refetch } = useProfile(user?.id);
  const { updateProfile, updating } = useUpdateProfile();
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [disablingCreator, setDisablingCreator] = useState(false);

  const handleDisableCreatorMode = async () => {
    if (!user?.id) return;

    setDisablingCreator(true);

    const result = await updateProfile(user.id, {
      is_creator: false,
    });

    if (result) {
      refetch();
      setShowDisableModal(false);
    }

    setDisablingCreator(false);
  };

  const handleEnableCreatorMode = async () => {
    if (!user?.id) return;

    const result = await updateProfile(user.id, {
      is_creator: true,
    });

    if (result) {
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="flex items-center gap-3">
              <input
                type="email"
                value="demo@traviar.app"
                disabled
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
              <span className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Verified
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Your email address is verified and cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              defaultValue="@wanderlust_sam"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
            <p className="text-xs text-gray-500 mt-1">Your unique username on Traviar</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
            <p className="text-xs text-gray-500 mt-1">Used for two-factor authentication</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>

          <button className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800
                           text-white font-medium transition-all">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Creator Mode</h2>

        {profile?.is_creator ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-coral-50 to-orange-50 border border-coral-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-coral-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Creator Account</p>
                  <p className="text-sm text-gray-600">You can sell itineraries and earn revenue</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-coral-500 text-white text-sm font-medium">
                Active
              </span>
            </div>

            <button
              onClick={() => setShowDisableModal(true)}
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              Disable creator mode
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Standard Account</p>
                  <p className="text-sm text-gray-600">Enable creator mode to sell itineraries</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm font-medium">
                Disabled
              </span>
            </div>

            <button
              onClick={handleEnableCreatorMode}
              disabled={updating}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-coral-500
                       hover:bg-coral-600 text-white font-medium transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enabling...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Enable Creator Mode
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Disable Creator Mode Confirmation Modal */}
      {showDisableModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Disable Creator Mode?</h2>
              <button
                onClick={() => setShowDisableModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium mb-1">Warning</p>
                  <p className="text-sm text-amber-700">
                    Disabling creator mode will hide your Creator Dashboard and marketplace listings.
                    Your itineraries will no longer be visible to buyers.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              You can re-enable creator mode at any time from your account settings.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDisableModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300
                         hover:bg-gray-50 text-gray-700 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDisableCreatorMode}
                disabled={disablingCreator}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                         bg-red-600 hover:bg-red-700 text-white font-medium transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {disablingCreator ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Disabling...
                  </>
                ) : (
                  'Disable Creator Mode'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-red-200 p-6">
        <h2 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 rounded-lg border-2 border-red-200 hover:bg-red-50
                           text-red-700 font-medium transition-all text-left flex items-center justify-between">
            <span>Deactivate Account</span>
            <AlertCircle className="w-5 h-5" />
          </button>
          <button className="w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700
                           text-white font-medium transition-all text-left flex items-center justify-between">
            <span>Delete Account Permanently</span>
            <AlertCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 flex items-center justify-end gap-3">
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
  );
}
