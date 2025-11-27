import { Download, Search, Filter, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function TransactionHistoryPage() {
  const transactions = [
    { id: '1', date: '2024-01-23', type: 'Sale', description: 'Weekend in Paris', amount: 19.00, fee: 0.48, net: 18.52, status: 'completed' },
    { id: '2', date: '2024-01-23', type: 'Sale', description: 'Barcelona on a Budget', amount: 15.00, fee: 0.38, net: 14.62, status: 'completed' },
    { id: '3', date: '2024-01-20', type: 'Payout', description: 'Monthly payout to PayPal', amount: 856.00, fee: 21.40, net: 834.60, status: 'completed' },
    { id: '4', date: '2024-01-18', type: 'Sale', description: 'Rome in 5 Days', amount: 29.00, fee: 0.73, net: 28.27, status: 'completed' },
    { id: '5', date: '2024-01-15', type: 'Refund', description: 'Weekend in Paris - Refund', amount: -19.00, fee: 0.00, net: -19.00, status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transaction History</h1>
        <p className="text-gray-600">View all your financial transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Earnings</h3>
          <p className="text-3xl font-bold text-gray-900">$4,892</p>
          <p className="text-xs text-green-600 mt-2">All time</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">This Month</h3>
          <p className="text-3xl font-bold text-gray-900">$1,234</p>
          <p className="text-xs text-green-600 mt-2">+18.2% vs last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Fees</h3>
          <p className="text-3xl font-bold text-gray-900">$122</p>
          <p className="text-xs text-gray-500 mt-2">2.5% platform fee</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-coral-50 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-coral-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Refunds</h3>
          <p className="text-3xl font-bold text-gray-900">$76</p>
          <p className="text-xs text-gray-500 mt-2">4 refunds issued</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>All Types</option>
              <option>Sales</option>
              <option>Payouts</option>
              <option>Refunds</option>
              <option>Fees</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Description</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Fee</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Net</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'Sale'
                        ? 'bg-green-100 text-green-700'
                        : transaction.type === 'Payout'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.description}</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900">
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-gray-700">
                    ${transaction.fee.toFixed(2)}
                  </td>
                  <td className={`py-3 px-4 text-sm text-right font-semibold ${
                    transaction.net >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.net >= 0 ? '+' : ''}${transaction.net.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Showing 1-5 of 127 transactions</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Export Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-coral-500 transition-colors text-left">
            <Download className="w-6 h-6 text-gray-600 mb-2" />
            <p className="font-semibold text-gray-900 mb-1">Export as CSV</p>
            <p className="text-xs text-gray-600">Download spreadsheet for analysis</p>
          </button>

          <button className="p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-coral-500 transition-colors text-left">
            <Download className="w-6 h-6 text-gray-600 mb-2" />
            <p className="font-semibold text-gray-900 mb-1">Export as PDF</p>
            <p className="text-xs text-gray-600">Formatted statement for printing</p>
          </button>

          <button className="p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-coral-500 transition-colors text-left">
            <Download className="w-6 h-6 text-gray-600 mb-2" />
            <p className="font-semibold text-gray-900 mb-1">Monthly Statements</p>
            <p className="text-xs text-gray-600">Download monthly summaries</p>
          </button>
        </div>
      </div>
    </div>
  );
}
