'use client';
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star, DollarSign, X, TrendingUp } from "lucide-react";
import { SearchSuggestions } from "./SearchSuggestions";

type Props = {
  onFilterChange: (filters: { 
    maxFee: number; 
    searchTerm?: string;
    minRating?: number;
  }) => void;
};

export default function FilterBar({ onFilterChange }: Props) {
  const [fee, setFee] = useState(1000000);
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFeeChange = (val: number[]) => {
    const newFee = val[0];
    setFee(newFee);
    applyFilters({ maxFee: newFee, searchTerm, minRating });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    applyFilters({ maxFee: fee, searchTerm: value, minRating });
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    applyFilters({ maxFee: fee, searchTerm, minRating: rating });
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes("+")) {
      // Rating filter
      const rating = parseFloat(suggestion);
      handleRatingChange(rating);
    } else if (suggestion === "popular") {
      // Popular filter - could be implemented later
      handleSearchChange("popular");
    } else if (suggestion === "200000") {
      // Fee filter
      handleFeeChange([200000]);
    } else {
      // University name
      handleSearchChange(suggestion);
    }
  };

  const applyFilters = (filters: { maxFee: number; searchTerm?: string; minRating?: number }) => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setFee(1000000);
    setSearchTerm("");
    setMinRating(0);
    onFilterChange({ maxFee: 1000000, searchTerm: "", minRating: 0 });
  };

  const hasActiveFilters = fee < 1000000 || searchTerm || minRating > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-4">
        <div className="flex items-center gap-2 mb-1">
          <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Refine your search</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <Search className="h-4 w-4" />
            Search Universities
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Enter university name..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search Suggestions */}
        {!searchTerm && (
          <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
        )}

        {/* Fee Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Maximum Fee
            </label>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {fee === 1000000 ? "No limit" : `₹${fee.toLocaleString()}`}
            </span>
          </div>
          <Slider 
            defaultValue={[fee]} 
            max={1000000} 
            step={10000} 
            onValueChange={handleFeeChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>₹50K</span>
            <span>₹5L</span>
            <span>₹10L</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <Star className="h-4 w-4" />
            Minimum Rating
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[0, 3, 3.5, 4, 4.5].map((rating) => (
              <Button
                key={rating}
                variant={minRating === rating ? "default" : "outline"}
                size="sm"
                onClick={() => handleRatingChange(rating)}
                className={`flex items-center gap-1 justify-center text-xs ${
                  minRating === rating 
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {rating === 0 ? (
                  "Any Rating"
                ) : (
                  <>
                    <Star className={`h-3 w-3 ${minRating === rating ? 'fill-current' : 'text-gray-400'}`} />
                    {rating}+
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Stats</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
              <div className="font-semibold text-green-600 dark:text-green-400">₹2L</div>
              <div className="text-gray-600 dark:text-gray-400">Avg Fee</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
              <div className="font-semibold text-blue-600 dark:text-blue-400">4.2</div>
              <div className="text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm flex-1"
          >
            <Filter className="h-4 w-4" />
            {isExpanded ? "Hide" : "Show"} Advanced
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="text-sm border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Advanced Filters (Collapsible) */}
        {isExpanded && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-600 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort By
              </label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="name">Name A-Z</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Accreditations
              </label>
              <div className="space-y-2">
                {["UGC", "AICTE", "NAAC", "WES"].map((acc) => (
                  <label key={acc} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                    {acc}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
