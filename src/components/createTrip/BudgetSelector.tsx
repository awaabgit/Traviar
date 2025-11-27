import { DollarSign } from 'lucide-react';

export type BudgetTier = 'budget' | 'moderate' | 'premium' | 'luxury';

interface BudgetSelectorProps {
  selectedBudget: BudgetTier;
  onSelectBudget: (budget: BudgetTier) => void;
}

const budgetOptions = [
  {
    id: 'budget' as const,
    label: 'Budget',
    symbol: '$',
    description: 'Economical options',
  },
  {
    id: 'moderate' as const,
    label: 'Moderate',
    symbol: '$$',
    description: 'Good value',
  },
  {
    id: 'premium' as const,
    label: 'Premium',
    symbol: '$$$',
    description: 'High quality',
  },
  {
    id: 'luxury' as const,
    label: 'Luxury',
    symbol: 'Luxury',
    description: 'Best available',
  },
];

export function BudgetSelector({ selectedBudget, onSelectBudget }: BudgetSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {budgetOptions.map((option) => {
        const isSelected = selectedBudget === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelectBudget(option.id)}
            className={`
              p-4 rounded-xl border-2 text-left transition-all duration-200
              ${
                isSelected
                  ? 'bg-coral-50 border-coral-500 shadow-soft-lg'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-soft'
              }
            `}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign
                className={`w-5 h-5 ${isSelected ? 'text-coral-600' : 'text-gray-400'}`}
              />
              <span
                className={`font-bold text-lg ${isSelected ? 'text-coral-600' : 'text-gray-900'}`}
              >
                {option.symbol}
              </span>
            </div>
            <div>
              <p
                className={`font-semibold text-sm mb-0.5 ${isSelected ? 'text-coral-900' : 'text-gray-900'}`}
              >
                {option.label}
              </p>
              <p className="text-xs text-gray-500">{option.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
