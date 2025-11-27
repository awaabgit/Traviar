import { DollarSign, TrendingUp } from 'lucide-react';

interface BudgetSummaryCardProps {
  tripId: string;
}

export function BudgetSummaryCard({ tripId }: BudgetSummaryCardProps) {
  const budget = {
    total: 2500,
    spent: 1850,
    categories: [
      { name: 'Accommodation', amount: 800, color: '#3b82f6' },
      { name: 'Transportation', amount: 450, color: '#10b981' },
      { name: 'Food & Dining', amount: 350, color: '#f59e0b' },
      { name: 'Activities', amount: 250, color: '#8b5cf6' },
    ],
  };

  const remaining = budget.total - budget.spent;
  const percentSpent = (budget.spent / budget.total) * 100;

  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6
                    hover:shadow-soft-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Budget</h3>
        <div className="p-2 rounded-lg bg-green-100">
          <DollarSign className="w-5 h-5 text-green-600" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-bold text-gray-900">${budget.spent}</span>
            <span className="text-sm text-gray-500">of ${budget.total}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-coral-500 to-coral-600 rounded-full
                       transition-all duration-500 animate-scale-in origin-left"
              style={{ width: `${percentSpent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">{percentSpent.toFixed(0)}% used</span>
            <span className="text-sm font-medium text-green-600">${remaining} remaining</span>
          </div>
        </div>

        <div className="space-y-3">
          {budget.categories.map((category, index) => (
            <div
              key={category.name}
              style={{ animationDelay: `${index * 50}ms` }}
              className="flex items-center justify-between animate-slide-up-fade
                       hover:translate-x-1 transition-transform duration-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">${category.amount}</span>
            </div>
          ))}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                   border border-gray-200 hover:border-gray-300 hover:bg-gray-50
                   text-sm font-medium text-gray-700 transition-all duration-200
                   transform hover:scale-105 active:scale-95"
        >
          <TrendingUp className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
}
