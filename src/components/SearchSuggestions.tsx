'use client';
import { TrendingUp, Star, IndianRupee } from 'lucide-react';

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const quickFilters = [
  { label: "Top Rated", icon: Star, value: "4.5+" },
  { label: "Under ₹2L", icon: IndianRupee, value: "200000" },
  { label: "Popular", icon: TrendingUp, value: "popular" }
];

export function SearchSuggestions({ onSuggestionClick }: SearchSuggestionsProps) {
  return (
    <div className="space-y-3">

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
