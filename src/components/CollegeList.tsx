'use client';

import { useEffect, useState } from 'react';
import { CollegeCard } from './CollegeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { CollegeData, ApiResponse, Filters } from '@/lib/types';
import { ChevronDown, GraduationCap } from 'lucide-react';

interface CollegeListProps {
  filters: Filters;
}

export default function CollegeList({ filters }: CollegeListProps) {
  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredColleges, setFilteredColleges] = useState<CollegeData[]>([]);
  const [displayedColleges, setDisplayedColleges] = useState<CollegeData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const cardsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://admin.collegevidya.com/listuserbyuniversity/467d8841-b3c3-42cc-a439-ee4d912bf1c6/1/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        setColleges(data.data);
        setFilteredColleges(data.data);
        setDisplayedColleges(data.data.slice(0, cardsPerPage));
      } catch (err) {
        console.error('Error fetching colleges:', err);
        setError('Failed to load colleges. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = colleges;

    // Filter by fee
    if (filters.maxFee > 0 && filters.maxFee < 1000000) {
      filtered = filtered.filter(college => college.fee <= filters.maxFee);
    }

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(college => 
        college.university.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by rating
    if (filters.minRating > 0) {
      filtered = filtered.filter(college => 
        parseFloat(college.university.cv_rating) >= filters.minRating
      );
    }

    setFilteredColleges(filtered);
    setDisplayedColleges(filtered.slice(0, cardsPerPage));
    setCurrentPage(1);
  }, [colleges, filters]);

  const loadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const endIndex = nextPage * cardsPerPage;
      setDisplayedColleges(filteredColleges.slice(0, endIndex));
      setCurrentPage(nextPage);
      setLoadingMore(false);
    }, 300);
  };

  const hasMoreColleges = displayedColleges.length < filteredColleges.length;

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <div>
                <Skeleton className="h-6 w-48 mb-1" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
        
        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-0 overflow-hidden">
              {/* Header Skeleton */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
              
              {/* Image Skeleton */}
              <Skeleton className="h-40 w-full" />
              
              {/* Content Skeleton */}
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-16 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-full rounded-lg" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-12 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-8 w-32 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (filteredColleges.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-gray-400 dark:text-gray-500 text-4xl mb-2">🔍</div>
          <p className="text-gray-600 dark:text-gray-400">No colleges found matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats - More Subtle */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
              <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {filteredColleges.length} Universities Found
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {displayedColleges.length} of {filteredColleges.length} results
              </p>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-white">
                {filteredColleges.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-600 dark:text-green-400">
                {filteredColleges.filter(c => c.fee <= 200000).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Under ₹2L</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-600 dark:text-blue-400">
                {filteredColleges.filter(c => parseFloat(c.university.cv_rating) >= 4).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">4+ Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* College Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedColleges.map((college) => (
          <CollegeCard key={college.university.id} college={college} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreColleges && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            {loadingMore ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ChevronDown className="h-4 w-4" />
                Load More Universities
              </div>
            )}
          </Button>
        </div>
      )}

      {/* End of results message */}
      {!hasMoreColleges && filteredColleges.length > 0 && (
        <div className="text-center py-6">
          <div className="text-gray-400 dark:text-gray-500 text-2xl mb-2">🎓</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            You've reached the end! All {filteredColleges.length} universities are displayed.
          </p>
        </div>
      )}
    </div>
  );
}
