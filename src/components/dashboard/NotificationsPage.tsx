import { Bell, Mail, Smartphone, CheckCircle } from 'lucide-react';

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h1>
        <p className="text-gray-600">Choose how and when you want to be notified</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-coral-50 flex items-center justify-center">
            <Bell className="w-6 h-6 text-coral-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Email Notifications</h2>
            <p className="text-sm text-gray-600">Receive updates via email</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'New Sales', description: 'When someone purchases your itinerary', enabled: true },
            { label: 'New Reviews', description: 'When someone leaves a review', enabled: true },
            { label: 'New Followers', description: 'When someone starts following you', enabled: true },
            { label: 'Messages', description: 'When you receive a new message', enabled: true },
            { label: 'Weekly Summary', description: 'A weekly digest of your activity', enabled: true },
            { label: 'Marketing & Promotions', description: 'Tips and special offers from Traviar', enabled: false },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Push Notifications</h2>
            <p className="text-sm text-gray-600">Real-time alerts on your device</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Sales Alerts', description: 'Instant notification for new purchases', enabled: true },
            { label: 'Message Notifications', description: 'When you receive a new message', enabled: true },
            { label: 'Review Alerts', description: 'When someone reviews your itinerary', enabled: false },
            { label: 'Engagement Updates', description: 'Likes, saves, and other interactions', enabled: false },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={item.enabled} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Notification Frequency</h2>
        <div className="space-y-3">
          <label className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-coral-500 cursor-pointer transition-colors">
            <input type="radio" name="frequency" className="w-4 h-4 text-coral-500" defaultChecked />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Real-time</p>
              <p className="text-xs text-gray-500">Get notified instantly</p>
            </div>
          </label>

          <label className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-coral-500 cursor-pointer transition-colors">
            <input type="radio" name="frequency" className="w-4 h-4 text-coral-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Daily Digest</p>
              <p className="text-xs text-gray-500">One summary email per day</p>
            </div>
          </label>

          <label className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-coral-500 cursor-pointer transition-colors">
            <input type="radio" name="frequency" className="w-4 h-4 text-coral-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Weekly Digest</p>
              <p className="text-xs text-gray-500">One summary email per week</p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">Stay Informed</h3>
            <p className="text-sm text-green-800">
              We'll only send you important updates about your account and sales. You can adjust these settings anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 flex items-center justify-end gap-3">
        <button className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                         text-gray-700 font-medium transition-all">
          Cancel
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-coral-500
                         hover:bg-coral-600 text-white font-semibold transition-all shadow-sm">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
