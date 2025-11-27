import { useState } from 'react';
import { Plus, Percent, Calendar, Copy, Trash2, Edit, TrendingUp, DollarSign } from 'lucide-react';

interface DiscountCode {
  id: string;
  code: string;
  discount: number;
  usageCount: number;
  maxUses: number | null;
  expiryDate: string | null;
  active: boolean;
}

const MOCK_CODES: DiscountCode[] = [
  {
    id: '1',
    code: 'SUMMER2024',
    discount: 20,
    usageCount: 45,
    maxUses: 100,
    expiryDate: '2024-08-31',
    active: true,
  },
  {
    id: '2',
    code: 'FIRSTTRIP',
    discount: 15,
    usageCount: 12,
    maxUses: null,
    expiryDate: null,
    active: true,
  },
  {
    id: '3',
    code: 'WINTER23',
    discount: 25,
    usageCount: 78,
    maxUses: 100,
    expiryDate: '2024-03-31',
    active: false,
  },
];

export function PricingDiscountsPage() {
  const [codes, setCodes] = useState(MOCK_CODES);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Discounts</h1>
        <p className="text-gray-600">Manage your pricing strategy and promotional codes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Average Price</h3>
          <p className="text-3xl font-bold text-gray-900">$21</p>
          <p className="text-xs text-gray-500 mt-2">Market avg: $24</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <Percent className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Active Discounts</h3>
          <p className="text-3xl font-bold text-gray-900">{codes.filter(c => c.active).length}</p>
          <p className="text-xs text-gray-500 mt-2">{codes.filter(c => !c.active).length} expired</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-coral-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-coral-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Redemptions</h3>
          <p className="text-3xl font-bold text-gray-900">135</p>
          <p className="text-xs text-gray-500 mt-2">+23% this month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Pricing Strategy</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Pricing Recommendation</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Based on market data, itineraries similar to yours are priced at $24 on average.
                  Your current average is $21, which positions you competitively.
                </p>
                <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all">
                  View Detailed Analysis
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Budget Range</p>
              <p className="text-2xl font-bold text-gray-900">$10-$20</p>
              <p className="text-xs text-gray-500 mt-1">8 itineraries</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Mid Range</p>
              <p className="text-2xl font-bold text-gray-900">$21-$35</p>
              <p className="text-xs text-gray-500 mt-1">12 itineraries</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Premium</p>
              <p className="text-2xl font-bold text-gray-900">$36+</p>
              <p className="text-xs text-gray-500 mt-1">4 itineraries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Discount Codes</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-coral-500
                           hover:bg-coral-600 text-white font-medium transition-all">
            <Plus className="w-4 h-4" />
            Create Code
          </button>
        </div>

        <div className="space-y-3">
          {codes.map((code) => (
            <div
              key={code.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-coral-300 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  code.active ? 'bg-coral-50' : 'bg-gray-100'
                }`}>
                  <Percent className={`w-6 h-6 ${code.active ? 'text-coral-600' : 'text-gray-400'}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900">{code.code}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      code.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {code.active ? 'Active' : 'Expired'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-coral-100 text-coral-700 text-xs font-medium">
                      {code.discount}% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Used: {code.usageCount}{code.maxUses ? `/${code.maxUses}` : ''}</span>
                    {code.expiryDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Expires: {code.expiryDate}
                      </span>
                    )}
                    {!code.expiryDate && <span className="text-green-600">No expiry</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Copy code">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Bundle Pricing</h2>
        <p className="text-sm text-gray-600 mb-4">
          Offer special pricing when customers purchase multiple itineraries
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-coral-500 transition-colors">
            <h3 className="font-semibold text-gray-900 mb-2">Buy 2, Get 10% Off</h3>
            <p className="text-sm text-gray-600 mb-3">
              Encourage customers to purchase multiple itineraries with a discount
            </p>
            <button className="text-sm font-medium text-coral-600 hover:text-coral-700">
              Set Up Bundle →
            </button>
          </div>

          <div className="p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-coral-500 transition-colors">
            <h3 className="font-semibold text-gray-900 mb-2">Subscription Discount</h3>
            <p className="text-sm text-gray-600 mb-3">
              Offer recurring discounts for returning customers
            </p>
            <button className="text-sm font-medium text-coral-600 hover:text-coral-700">
              Create Subscription →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
