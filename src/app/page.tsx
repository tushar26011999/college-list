"use client"
import { useState } from 'react';
import CollegeList from '@/components/CollegeList';
import FilterBar from '@/components/FilterBar';
import { ModeToggle } from '@/components/ModeToggle';
import { GraduationCap, Search, Users, Star, TrendingUp } from 'lucide-react';

export default function Home() {
  const [filters, setFilters] = useState({
    maxFee: 1000000,
    searchTerm: "",
    minRating: 0
  });

  const handleFilterChange = (newFilters: { 
    maxFee: number; 
    searchTerm?: string;
    minRating?: number;
  }) => {
    setFilters({
      maxFee: newFilters.maxFee,
      searchTerm: newFilters.searchTerm || "",
      minRating: newFilters.minRating || 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">College Vidya</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Find Your Perfect University</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Search className="h-4 w-4" />
                  <span>500+ Universities</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>50K+ Students</span>
                </div>
              </div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - More Subtle */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Discover Top Online Universities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Compare fees, accreditations, and find the perfect online degree program for your career goals
            </p>
          </div>
          
          {/* Stats Grid - More Subtle */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Universities</div>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">4.5+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterBar onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* College List */}
          <div className="flex-1">
            <CollegeList filters={filters} />
          </div>
        </div>
      </main>
    </div>
  );
}
