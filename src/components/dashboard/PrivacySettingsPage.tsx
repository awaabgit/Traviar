import { Shield, Eye, Lock, Download, Users, Search, MessageCircle } from 'lucide-react';

export function PrivacySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Settings</h1>
        <p className="text-gray-600">Control who can see your content and information</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Visibility</h2>
        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Public Profile</h3>
                <p className="text-sm text-gray-600">Anyone can view your profile and content</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
            </label>
          </div>

          <div className="flex items-start justify-between p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Search Engine Indexing</h3>
                <p className="text-sm text-gray-600">Allow search engines to show your profile in results</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
            </label>
          </div>

          <div className="flex items-start justify-between p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Show in Recommendations</h3>
                <p className="text-sm text-gray-600">Let Traviar suggest your profile to potential followers</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Who Can See</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-900">Your email address</span>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Only me</option>
              <option>Followers</option>
              <option>Everyone</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-900">Your followers list</span>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Only me</option>
              <option>Followers</option>
              <option>Everyone</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-900">Your following list</span>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Only me</option>
              <option>Followers</option>
              <option>Everyone</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-900">Your saved itineraries</span>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Only me</option>
              <option>Followers</option>
              <option>Everyone</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-gray-900">Your purchase history</span>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Only me</option>
              <option>Followers</option>
              <option>Everyone</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Interactions</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Who can message you</p>
              <p className="text-xs text-gray-500">Control who can send you direct messages</p>
            </div>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Everyone</option>
              <option>Followers only</option>
              <option>No one</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Who can tag you</p>
              <p className="text-xs text-gray-500">Control who can tag you in content</p>
            </div>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Everyone</option>
              <option>Followers only</option>
              <option>No one</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Who can comment on your content</p>
              <p className="text-xs text-gray-500">Control who can leave comments</p>
            </div>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Everyone</option>
              <option>Followers only</option>
              <option>No one</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Blocked Users</h2>
        <p className="text-sm text-gray-600 mb-4">
          Users you've blocked cannot view your profile or interact with your content
        </p>
        <div className="p-4 rounded-lg border-2 border-dashed border-gray-300 text-center">
          <Lock className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">No blocked users</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Data & Privacy</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Download Your Data</p>
                <p className="text-xs text-gray-500">Get a copy of all your data</p>
              </div>
            </div>
            <span className="text-sm text-coral-600 font-medium">Request →</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Privacy Policy</p>
                <p className="text-xs text-gray-500">Learn how we protect your data</p>
              </div>
            </div>
            <span className="text-sm text-coral-600 font-medium">View →</span>
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
          Save Changes
        </button>
      </div>
    </div>
  );
}
