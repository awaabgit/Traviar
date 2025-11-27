import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { MarketplaceFilters } from '../../types';

interface MarketplaceHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: MarketplaceFilters;
  onFiltersChange: (filters: MarketplaceFilters) => void;
}

export function MarketplaceHeader({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
}: MarketplaceHeaderProps) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = Object.keys(filters).filter(
    (key) => key !== 'sortBy' && filters[key as keyof MarketplaceFilters]
  ).length;

  const priceRanges = [
    { label: 'Under $200', value: [0, 200] as [number, number] },
    { label: '$200 - $500', value: [200, 500] as [number, number] },
    { label: '$500 - $1000', value: [500, 1000] as [number, number] },
    { label: 'Over $1000', value: [1000, 10000] as [number, number] },
  ];

  const durations = [
    { label: 'Weekend (2-3 days)', value: [2, 3] },
    { label: 'Short (4-7 days)', value: [4, 7] },
    { label: 'Medium (8-14 days)', value: [8, 14] },
    { label: 'Long (15+ days)', value: [15, 30] },
  ];

  const styles = [
    'Luxury', 'Backpacking', 'Foodie', 'Adventure', 'Cultural',
    'Beach', 'City', 'Nature', 'Photography', 'Wellness'
  ];

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Marketplace</h1>
          <p className="text-lg text-gray-600 font-medium">Discover curated itineraries from expert travelers worldwide</p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center shadow-md">
              <Search className="w-5 h-5 text-white" />
            </div>
            <input
              type="text"
              placeholder="Search itineraries, creators, destinations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-16 pr-4 py-4 border-2 border-gray-200 rounded-full
                       focus:outline-none focus:border-transparent focus:ring-2 focus:ring-offset-2
                       focus:ring-orange-500 hover:border-gray-300
                       transition-all duration-300 text-base shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-4 border-2 border-gray-200 rounded-full
                     hover:bg-gradient-sunset-soft hover:border-orange-200 transition-all duration-300 font-semibold relative shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-sunset text-white
                             rounded-full text-xs font-bold flex items-center justify-center shadow-md">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 animate-slide-in-down shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Price Range</label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => onFiltersChange({ ...filters, priceRange: range.value })}
                      className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                        filters.priceRange?.[0] === range.value[0] && filters.priceRange?.[1] === range.value[1]
                          ? 'bg-gradient-sunset text-white shadow-md'
                          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Duration</label>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <button
                      key={duration.label}
                      onClick={() => onFiltersChange({ ...filters, duration: duration.value })}
                      className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                        filters.duration?.[0] === duration.value[0]
                          ? 'bg-gradient-sunset text-white shadow-md'
                          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {duration.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Style</label>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => {
                        const currentStyles = filters.styles || [];
                        const newStyles = currentStyles.includes(style)
                          ? currentStyles.filter((s) => s !== style)
                          : [...currentStyles, style];
                        onFiltersChange({ ...filters, styles: newStyles });
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        filters.styles?.includes(style)
                          ? 'bg-gradient-sunset text-white shadow-md'
                          : 'bg-white hover:bg-gradient-sunset-soft text-gray-700 border border-gray-200'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => onFiltersChange({ sortBy: 'popular' })}
                className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
              >
                Clear All Filters
              </button>
              <div className="flex gap-2">
                <select
                  value={filters.sortBy || 'popular'}
                  onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as any })}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-white font-medium
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
