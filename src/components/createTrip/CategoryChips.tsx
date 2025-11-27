import { Mountain, UtensilsCrossed, Landmark, Waves } from 'lucide-react';

export type TripCategory = 'adventure' | 'food_wine' | 'cultural' | 'beaches';

interface CategoryChipsProps {
  selectedCategories: TripCategory[];
  onSelectCategories: (categories: TripCategory[]) => void;
}

const categories = [
  {
    id: 'adventure' as const,
    label: 'Adventure',
    icon: Mountain,
    image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'food_wine' as const,
    label: 'Food & Wine',
    icon: UtensilsCrossed,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'cultural' as const,
    label: 'Cultural',
    icon: Landmark,
    image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'beaches' as const,
    label: 'Beaches',
    icon: Waves,
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export function CategoryChips({ selectedCategories, onSelectCategories }: CategoryChipsProps) {
  const toggleCategory = (categoryId: TripCategory) => {
    if (selectedCategories.includes(categoryId)) {
      onSelectCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      onSelectCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategories.includes(category.id);

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => toggleCategory(category.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-full border-2 whitespace-nowrap
              transition-all duration-200 font-medium text-sm
              ${
                isSelected
                  ? 'bg-coral-500 border-coral-500 text-white shadow-soft-lg'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-coral-300 hover:bg-coral-50'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

export function getCategoryImage(selectedCategories: TripCategory[]): string | undefined {
  if (selectedCategories.length === 0) return undefined;
  return categories.find((c) => c.id === selectedCategories[0])?.image;
}
