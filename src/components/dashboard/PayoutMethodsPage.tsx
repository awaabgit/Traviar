import { CreditCard, Plus, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

export function PayoutMethodsPage() {
  const payoutMethods = [
    {
      id: '1',
      type: 'PayPal',
      email: 'demo@email.com',
      verified: true,
      isDefault: true,
    },
    {
      id: '2',
      type: 'Bank Account',
      last4: '4567',
      verified: true,
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payout Methods</h1>
        <p className="text-gray-600">Manage how you receive payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Available Balance</h3>
          <p className="text-3xl font-bold text-gray-900">$1,234.56</p>
          <button className="mt-4 w-full px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-medium">
            Request Payout
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Pending Payouts</h3>
          <p className="text-3xl font-bold text-gray-900">$0.00</p>
          <p className="text-xs text-gray-500 mt-4">No pending payouts</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Next Payout Date</h3>
          <p className="text-3xl font-bold text-gray-900">Jan 31</p>
          <p className="text-xs text-gray-500 mt-4">Auto payout on last day of month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-coral-500
                           hover:bg-coral-600 text-white font-medium transition-all">
            <Plus className="w-4 h-4" />
            Add Method
          </button>
        </div>

        <div className="space-y-3">
          {payoutMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-coral-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{method.type}</p>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-coral-100 text-coral-700 text-xs font-medium">
                        Default
                      </span>
                    )}
                    {method.verified ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {method.type === 'PayPal' ? method.email : `•••• ${method.last4}`}
                  </p>
                  {!method.verified && (
                    <button className="text-xs text-coral-600 hover:text-coral-700 mt-1">
                      Verify now →
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium">
                    Set as Default
                  </button>
                )}
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Payout Schedule</h2>
        <div className="space-y-3">
          <label className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-coral-500 cursor-pointer transition-colors">
            <input type="radio" name="schedule" className="w-4 h-4 text-coral-500 mt-1" defaultChecked />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Automatic (Monthly)</p>
              <p className="text-xs text-gray-500 mt-1">Receive payouts on the last day of each month</p>
            </div>
          </label>

          <label className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-coral-500 cursor-pointer transition-colors">
            <input type="radio" name="schedule" className="w-4 h-4 text-coral-500 mt-1" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Automatic (Bi-weekly)</p>
              <p className="text-xs text-gray-500 mt-1">Receive payouts twice per month (1st and 15th)</p>
            </div>
          </label>

          <label className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-coral-500 cursor-pointer transition-colors">
            <input type="radio" name="schedule" className="w-4 h-4 text-coral-500 mt-1" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Manual</p>
              <p className="text-xs text-gray-500 mt-1">Request payouts manually (min. $50)</p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Payout Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Payout Threshold
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>$50</option>
              <option>$100</option>
              <option>$250</option>
              <option>$500</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Payouts will only be sent when your balance reaches this amount
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
              <option>GBP - British Pound</option>
              <option>CAD - Canadian Dollar</option>
              <option>AUD - Australian Dollar</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Payout Information</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Payouts typically arrive within 2-5 business days</li>
          <li>• A 2.5% processing fee is deducted from all payouts</li>
          <li>• Minimum payout amount is $50</li>
          <li>• You can change your payout method anytime</li>
        </ul>
      </div>
    </div>
  );
}
