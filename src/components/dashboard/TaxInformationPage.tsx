import { FileText, Download, Upload, AlertCircle, CheckCircle } from 'lucide-react';

export function TaxInformationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tax Information</h1>
        <p className="text-gray-600">Manage your tax documents and information</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Tax Information Required</h3>
            <p className="text-sm text-amber-800 mb-3">
              We need your tax information to comply with regulations. Please complete your tax profile to continue receiving payouts.
            </p>
            <button className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium">
              Complete Tax Profile
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tax Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>Select business type...</option>
              <option>Individual / Sole Proprietor</option>
              <option>LLC</option>
              <option>Corporation (C-Corp)</option>
              <option>Corporation (S-Corp)</option>
              <option>Partnership</option>
              <option>Non-Profit Organization</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax ID / EIN (US) or VAT Number (EU)
            </label>
            <input
              type="text"
              placeholder="XX-XXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legal Business Name
            </label>
            <input
              type="text"
              placeholder="Your business name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>
            <input
              type="text"
              placeholder="Street address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="City"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
              <input
                type="text"
                placeholder="State/Province"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                type="text"
                placeholder="ZIP/Postal Code"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
              <input
                type="text"
                placeholder="Country"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tax Forms</h2>
        <div className="space-y-3">
          <div className="p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">W-9 Form</p>
                <p className="text-sm text-gray-600">For US taxpayers</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">W-8BEN Form</p>
                <p className="text-sm text-gray-600">For non-US taxpayers</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tax Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Annual Earnings Summary</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-900">2024 Tax Year</span>
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-900">2023 Tax Year</span>
                <Download className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">1099-K Forms</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-900">2023 Form 1099-K</span>
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <div className="p-3 rounded-lg bg-gray-50 text-center">
                <p className="text-sm text-gray-600">2024 forms available after Jan 31, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tax Settings</h2>
        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Automatic Tax Withholding</h3>
                <p className="text-sm text-gray-600">
                  Automatically withhold taxes from your earnings based on your tax profile
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-coral-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Withholding Rate
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
              <option>0% - No withholding</option>
              <option>10%</option>
              <option>15%</option>
              <option>20%</option>
              <option>25%</option>
              <option>30%</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Consult with a tax professional to determine your appropriate withholding rate
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Tax Information Notes</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Tax forms are generated annually and available by January 31</li>
          <li>• Keep your tax information up to date to avoid payment delays</li>
          <li>• Consult with a tax professional for personalized advice</li>
          <li>• Traviar is not responsible for tax advice or filing</li>
        </ul>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 flex items-center justify-end gap-3">
        <button className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                         text-gray-700 font-medium transition-all">
          Cancel
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-coral-500
                         hover:bg-coral-600 text-white font-semibold transition-all shadow-sm">
          Save Tax Information
        </button>
      </div>
    </div>
  );
}
