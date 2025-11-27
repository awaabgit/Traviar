import { Users, TrendingUp, Clock, Heart } from 'lucide-react';

export function AudienceInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Audience Insights</h1>
        <p className="text-gray-600">Understand your audience demographics and behavior</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-coral-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-coral-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +15.3%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Followers</h3>
          <p className="text-3xl font-bold text-gray-900">24,892</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +8.7%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Engagement Rate</h3>
          <p className="text-3xl font-bold text-gray-900">18.4%</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Time on Profile</h3>
          <p className="text-3xl font-bold text-gray-900">3:42</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">New Followers (30d)</h3>
          <p className="text-3xl font-bold text-gray-900">1,247</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Follower Growth</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[820, 950, 1100, 1050, 1180, 1240, 1390, 1320, 1450, 1580, 1650, 1890].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-coral-500 rounded-t-lg hover:bg-coral-600 transition-all cursor-pointer"
                     style={{ height: `${(value / 1890) * 100}%` }}>
                </div>
                <span className="text-xs text-gray-500">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Gender Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Female</span>
                <span className="text-sm font-semibold text-gray-900">58%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-coral-500 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Male</span>
                <span className="text-sm font-semibold text-gray-900">38%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Other/Prefer not to say</span>
                <span className="text-sm font-semibold text-gray-900">4%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Age Distribution</h3>
            <div className="space-y-3">
              {[
                { range: '18-24', percentage: 22 },
                { range: '25-34', percentage: 42 },
                { range: '35-44', percentage: 24 },
                { range: '45-54', percentage: 8 },
                { range: '55+', percentage: 4 },
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900 w-16">{item.range}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-coral-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Top Geographic Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Countries</h3>
            <div className="space-y-3">
              {[
                { country: 'United States', flag: '🇺🇸', followers: 8234, percentage: 33 },
                { country: 'United Kingdom', flag: '🇬🇧', followers: 6127, percentage: 25 },
                { country: 'Canada', flag: '🇨🇦', followers: 3926, percentage: 16 },
                { country: 'Australia', flag: '🇦🇺', followers: 2945, percentage: 12 },
                { country: 'Germany', flag: '🇩🇪', followers: 2454, percentage: 10 },
              ].map((location) => (
                <div key={location.country} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{location.country}</p>
                      <p className="text-xs text-gray-600">{location.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-coral-600">{location.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Cities</h3>
            <div className="space-y-3">
              {[
                { city: 'New York, NY', followers: 1842 },
                { city: 'London, UK', followers: 1623 },
                { city: 'Los Angeles, CA', followers: 1456 },
                { city: 'Toronto, ON', followers: 1234 },
                { city: 'Sydney, NSW', followers: 1089 },
              ].map((location, index) => (
                <div key={location.city} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-coral-600">#{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{location.city}</p>
                      <p className="text-xs text-gray-600">{location.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Audience Interests</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { interest: 'Travel', percentage: 92 },
            { interest: 'Food & Dining', percentage: 78 },
            { interest: 'Photography', percentage: 65 },
            { interest: 'Adventure', percentage: 58 },
            { interest: 'Culture', percentage: 54 },
            { interest: 'Budget Travel', percentage: 48 },
            { interest: 'Luxury Travel', percentage: 32 },
            { interest: 'Beach Destinations', percentage: 45 },
            { interest: 'City Breaks', percentage: 62 },
            { interest: 'Nature', percentage: 41 },
          ].map((item) => (
            <div
              key={item.interest}
              className="px-4 py-2 rounded-full bg-coral-50 border border-coral-200"
            >
              <span className="text-sm font-medium text-coral-700">{item.interest}</span>
              <span className="text-xs text-coral-600 ml-2">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Peak Activity Times</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Best times to post:</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                <p className="text-lg font-bold text-green-700">8-10 AM</p>
                <p className="text-xs text-green-600">Morning commute</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                <p className="text-lg font-bold text-green-700">12-2 PM</p>
                <p className="text-xs text-green-600">Lunch break</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
                <p className="text-lg font-bold text-green-700">7-9 PM</p>
                <p className="text-xs text-green-600">Evening relaxation</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Most active days:</p>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const activity = [75, 82, 88, 85, 72, 65, 60][i];
                return (
                  <div key={day} className="text-center">
                    <div className="h-20 flex items-end justify-center mb-2">
                      <div
                        className="w-full bg-coral-500 rounded-t"
                        style={{ height: `${activity}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600">{day}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
