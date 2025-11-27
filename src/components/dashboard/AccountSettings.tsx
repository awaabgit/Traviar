import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export function AccountSettings() {
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
        <h2 className="text-lg font-bold text-gray-900 mb-4">Account Type</h2>
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-coral-50 to-orange-50 border border-coral-200">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Creator Account</p>
            <p className="text-sm text-gray-600">You can sell itineraries and earn revenue</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-coral-500 text-white text-sm font-medium">
            Active
          </span>
        </div>
      </div>

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
