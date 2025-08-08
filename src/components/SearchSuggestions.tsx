'use client';
import { Search, TrendingUp, Star, DollarSign } from 'lucide-react';

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const popularUniversities = [
  "Jain University Online",
  "Liverpool John Moores University",
  "Manipal University",
  "Amity University",
  "BITS Pilani",
  "Symbiosis International University"
];

const quickFilters = [
  { label: "Top Rated", icon: Star, value: "4.5+" },
  { label: "Under ₹2L", icon: DollarSign, value: "200000" },
  { label: "Popular", icon: TrendingUp, value: "popular" }
];

export function SearchSuggestions({ onSuggestionClick }: SearchSuggestionsProps) {
  return (
    <div className="space-y-3">
      {/* Popular Universities */}
      <div>
        <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
          <Search className="h-3 w-3" />
          Popular Universities
        </h4>
        <div className="flex flex-wrap gap-1">
          {popularUniversities.map((university) => (
            <button
              key={university}
              onClick={() => onSuggestionClick(university)}
              className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              {university}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div>
        <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          Quick Filters
        </h4>
        <div className="flex flex-wrap gap-1">
          {quickFilters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => onSuggestionClick(filter.value)}
              className="px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
            >
              <filter.icon className="h-3 w-3" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
