import { useState } from 'react';
import { Package, DollarSign, FileText, Bell } from 'lucide-react';

interface EssentialsTabProps {
  tripId: string;
}

type EssentialModule = 'packing' | 'budget' | 'documents' | 'reminders';

export function EssentialsTab({ tripId }: EssentialsTabProps) {
  const [activeModule, setActiveModule] = useState<EssentialModule>('packing');

  const modules = [
    { id: 'packing' as EssentialModule, label: 'Packing List', icon: Package },
    { id: 'budget' as EssentialModule, label: 'Budget Manager', icon: DollarSign },
    { id: 'documents' as EssentialModule, label: 'Documents', icon: FileText },
    { id: 'reminders' as EssentialModule, label: 'Reminders', icon: Bell },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex gap-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;

          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap
                       border-b-2 transition-all duration-200 animate-slide-up-fade
                       transform hover:scale-105 active:scale-95 ${
                         isActive
                           ? 'border-coral-500 text-coral-600'
                           : 'border-transparent text-gray-600 hover:text-gray-900'
                       }`}
            >
              <Icon className="w-4 h-4" />
              {module.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-[500px]">
        {activeModule === 'packing' && (
          <div className="animate-slide-up-fade">
            <PackingListModule />
          </div>
        )}
        {activeModule === 'budget' && (
          <div className="animate-slide-up-fade">
            <BudgetManagerModule />
          </div>
        )}
        {activeModule === 'documents' && (
          <div className="animate-slide-up-fade">
            <DocumentsModule />
          </div>
        )}
        {activeModule === 'reminders' && (
          <div className="animate-slide-up-fade">
            <RemindersModule />
          </div>
        )}
      </div>
    </div>
  );
}

function PackingListModule() {
  const categories = ['Clothing', 'Toiletries', 'Electronics', 'Documents'];

  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Packing List</h3>
        <div className="text-sm text-gray-600">8 of 24 items packed</div>
      </div>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={category} style={{ animationDelay: `${index * 75}ms` }} className="animate-fade-in">
            <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <label key={item} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50
                                           transition-colors duration-200 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-coral-500
                             focus:ring-2 focus:ring-coral-500 transition-all duration-200
                             cursor-pointer"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900">Sample Item {item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetManagerModule() {
  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget Manager</h3>
      <div className="text-center py-12 text-gray-500">
        <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>Budget management coming soon</p>
      </div>
    </div>
  );
}

function DocumentsModule() {
  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Important Documents</h3>
      <div className="text-center py-12 text-gray-500">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>Document management coming soon</p>
      </div>
    </div>
  );
}

function RemindersModule() {
  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Reminders</h3>
      <div className="text-center py-12 text-gray-500">
        <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>Reminders coming soon</p>
      </div>
    </div>
  );
}
