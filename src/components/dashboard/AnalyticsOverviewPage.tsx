import { TrendingUp, Eye, Users, MousePointer, Clock, Globe } from 'lucide-react';

export function AnalyticsOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Overview</h1>
        <p className="text-gray-600">Track your performance and audience engagement</p>
      </div>

      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 rounded-lg bg-coral-500 text-white text-sm font-medium">7 Days</button>
        <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">30 Days</button>
        <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">90 Days</button>
        <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">1 Year</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +24.3%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Views</h3>
          <p className="text-3xl font-bold text-gray-900">24,583</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +18.7%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Profile Views</h3>
          <p className="text-3xl font-bold text-gray-900">8,392</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-coral-50 flex items-center justify-center">
              <MousePointer className="w-6 h-6 text-coral-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +15.2%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Click-through Rate</h3>
          <p className="text-3xl font-bold text-gray-900">12.4%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Direct', percentage: 45, visitors: 11204, color: 'bg-coral-500' },
              { source: 'Social Media', percentage: 30, visitors: 7476, color: 'bg-blue-500' },
              { source: 'Search', percentage: 15, visitors: 3738, color: 'bg-green-500' },
              { source: 'Referrals', percentage: 10, visitors: 2492, color: 'bg-purple-500' },
            ].map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.source}</span>
                  <span className="text-sm text-gray-600">{item.visitors.toLocaleString()} visits</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top Locations</h2>
          <div className="space-y-3">
            {[
              { country: 'United States', flag: '🇺🇸', visitors: 8234, percentage: 33 },
              { country: 'United Kingdom', flag: '🇬🇧', visitors: 6127, percentage: 25 },
              { country: 'Canada', flag: '🇨🇦', visitors: 3926, percentage: 16 },
              { country: 'Australia', flag: '🇦🇺', visitors: 2945, percentage: 12 },
              { country: 'Germany', flag: '🇩🇪', visitors: 2454, percentage: 10 },
            ].map((location) => (
              <div key={location.country} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{location.flag}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{location.country}</p>
                    <p className="text-xs text-gray-600">{location.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-coral-600">{location.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Popular Content</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Content</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Views</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Clicks</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">CTR</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Weekend in Paris', views: 5423, clicks: 892, ctr: '16.4%', time: '3:42' },
                { title: 'Barcelona on a Budget', views: 4817, clicks: 723, ctr: '15.0%', time: '3:18' },
                { title: 'Rome in 5 Days', views: 3928, clicks: 589, ctr: '15.0%', time: '4:05' },
                { title: 'Amsterdam Guide', views: 3214, clicks: 445, ctr: '13.8%', time: '2:54' },
              ].map((item, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{item.views.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{item.clicks}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-coral-600">{item.ctr}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
