import { TrendingUp, DollarSign, ShoppingBag, Users, Download, Eye } from 'lucide-react';

const RECENT_SALES = [
  { id: '1', date: '2024-01-23', buyer: 'Sarah M.', itinerary: 'Weekend in Paris', amount: 19, status: 'completed' },
  { id: '2', date: '2024-01-23', buyer: 'Mike T.', itinerary: 'Barcelona on a Budget', amount: 15, status: 'completed' },
  { id: '3', date: '2024-01-22', buyer: 'Emma L.', itinerary: 'Rome in 5 Days', amount: 29, status: 'completed' },
  { id: '4', date: '2024-01-22', buyer: 'John D.', itinerary: 'Weekend in Paris', amount: 19, status: 'pending' },
  { id: '5', date: '2024-01-21', buyer: 'Lisa K.', itinerary: 'Barcelona on a Budget', amount: 15, status: 'completed' },
];

const TOP_SELLERS = [
  { title: 'Weekend in Paris', sales: 45, revenue: 855 },
  { title: 'Rome in 5 Days', sales: 32, revenue: 928 },
  { title: 'Barcelona on a Budget', sales: 38, revenue: 570 },
];

export function SalesDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sales Dashboard</h1>
        <p className="text-gray-600">Track your sales performance and revenue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +18.2%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Revenue This Month</h3>
          <p className="text-3xl font-bold text-gray-900">$1,234</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-coral-50 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-coral-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12.5%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Sales This Month</h3>
          <p className="text-3xl font-bold text-gray-900">68</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Sale Value</h3>
          <p className="text-3xl font-bold text-gray-900">$18</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Unique Buyers</h3>
          <p className="text-3xl font-bold text-gray-900">52</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Revenue Trend</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-coral-50 text-coral-700 text-sm font-medium">30D</button>
              <button className="px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 text-sm font-medium">90D</button>
              <button className="px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 text-sm font-medium">1Y</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[420, 380, 510, 490, 630, 580, 720, 690, 850, 820, 950, 1100].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-coral-500 rounded-t-lg hover:bg-coral-600 transition-all cursor-pointer"
                     style={{ height: `${(value / 1100) * 100}%` }}>
                </div>
                <span className="text-xs text-gray-500">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Selling Itineraries</h2>
          <div className="space-y-3">
            {TOP_SELLERS.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">#{index + 1}</span>
                  <span className="text-sm font-bold text-green-600">${item.revenue}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1 truncate">{item.title}</p>
                <p className="text-xs text-gray-600">{item.sales} sales</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Sales</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300
                           hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Buyer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Itinerary</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SALES.map((sale) => (
                <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{sale.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">{sale.buyer}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{sale.itinerary}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">${sale.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      sale.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
