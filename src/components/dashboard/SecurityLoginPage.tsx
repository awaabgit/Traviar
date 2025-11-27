import { Shield, Smartphone, Key, MapPin, Monitor, AlertTriangle } from 'lucide-react';

export function SecurityLoginPage() {
  const activeSessions = [
    { device: 'Chrome on MacBook Pro', location: 'New York, NY', lastActive: 'Active now', current: true },
    { device: 'Safari on iPhone 14', location: 'New York, NY', lastActive: '2 hours ago', current: false },
    { device: 'Chrome on Windows', location: 'Los Angeles, CA', lastActive: '3 days ago', current: false },
  ];

  const loginHistory = [
    { date: '2024-01-23 14:30', location: 'New York, NY', device: 'Chrome on MacBook', status: 'success' },
    { date: '2024-01-23 09:15', location: 'New York, NY', device: 'Safari on iPhone', status: 'success' },
    { date: '2024-01-22 18:45', location: 'New York, NY', device: 'Chrome on MacBook', status: 'success' },
    { date: '2024-01-22 12:20', location: 'Los Angeles, CA', device: 'Chrome on Windows', status: 'success' },
    { date: '2024-01-21 16:10', location: 'Unknown', device: 'Unknown', status: 'failed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security & Login</h1>
        <p className="text-gray-600">Manage your account security and login settings</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Password</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Current Password</p>
                <p className="text-xs text-gray-500">Last changed 45 days ago</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-sm font-medium">
                Change Password
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Password Strength: Strong</p>
                <p className="text-xs text-blue-700">
                  Your password meets all security requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-gray-200 hover:border-coral-500 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Authenticator App</p>
                <p className="text-xs text-gray-600">Recommended</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Use an app like Google Authenticator or Authy
            </p>
            <button className="text-sm font-medium text-coral-600 hover:text-coral-700">
              Set Up →
            </button>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 hover:border-coral-500 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">SMS Verification</p>
                <p className="text-xs text-gray-600">Backup method</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Receive codes via text message
            </p>
            <button className="text-sm font-medium text-coral-600 hover:text-coral-700">
              Set Up →
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Active Sessions</h2>
          <button className="text-sm font-medium text-red-600 hover:text-red-700">
            Sign Out All Devices
          </button>
        </div>

        <div className="space-y-3">
          {activeSessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  session.current ? 'bg-green-50' : 'bg-gray-50'
                }`}>
                  <Monitor className={`w-5 h-5 ${session.current ? 'text-green-600' : 'text-gray-600'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{session.device}</p>
                    {session.current && (
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{session.location}</span>
                    <span>·</span>
                    <span>{session.lastActive}</span>
                  </div>
                </div>
              </div>
              {!session.current && (
                <button className="text-sm font-medium text-red-600 hover:text-red-700">
                  Sign Out
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Login History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Device</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((login, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{login.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{login.location}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{login.device}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      login.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {login.status === 'success' ? 'Successful' : 'Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Security Recommendations</h3>
            <ul className="space-y-1 text-sm text-amber-800">
              <li>• Enable two-factor authentication for added security</li>
              <li>• Review your active sessions regularly</li>
              <li>• Use a unique, strong password</li>
              <li>• Never share your login credentials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
