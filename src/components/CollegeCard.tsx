'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, TrendingUp, Award, DollarSign, Clock, Monitor, Trophy, CheckCircle, Plus } from "lucide-react";
import { CollegeData } from '@/lib/types';

export function CollegeCard({ college }: { college: CollegeData }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMainBanner = () => {
    const mainBanner = college.university.universty_banner.find(banner => banner.priority === 1);
    return mainBanner?.banner || college.university.logo;
  };

  const getTopAccreditations = () => {
    return college.university.approval_details
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 3);
  };

  const getProgramHighlights = () => {
    return [
      "Fast-Track MBA in 18 Months",
      `${college.university.compare_count.toLocaleString()}+ Alumni`,
      "Flexible Range of Electives"
    ];
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-400/50 text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 ml-1">
          {rating}/5
        </span>
      </div>
    );
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 shadow-sm hover:-translate-y-1 rounded-xl">
      {/* University Header with Logo and Name */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <img 
            src={college.university.logo} 
            alt={`${college.university.name} logo`}
            className="h-12 w-12 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg p-2 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {college.university.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {college.university.name.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* University Banner Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={getMainBanner()} 
          alt={college.university.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = college.university.logo;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Accreditations */}
        {getTopAccreditations().length > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getTopAccreditations().map((approval) => (
                <span key={approval.id} className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {approval.title}
                </span>
              ))}
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              Click to know →
            </button>
          </div>
        )}

        {/* Student Choice & Rating Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">36%</span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Student Choice</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            {renderStars(college.university.cv_rating)}
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({college.university.review_count} reviews)
            </span>
          </div>
        </div>

        {/* EMI Badge */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800">
          <span className="text-xs font-medium text-green-700 dark:text-green-300">
            ₹ INTEREST FREE EMI
          </span>
        </div>

        {/* Fee and Apply Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Apply →
            </Button>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(college.fee)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {college.courses_fee_details.length > 0 ? 'Full' : 'Per Semester'}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-medium text-green-600 dark:text-green-400">
              Save ₹10,000
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Limited time offer
            </div>
          </div>
        </div>

        {/* Available Experts */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Talk to our expert OR Institution directly →
          </span>
        </div>

        {/* Program Highlights - Only 2-3 features */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Know University in 2 mins✓
          </h4>
          <div className="space-y-1">
            {getProgramHighlights().map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            +2 More
          </button>
        </div>

        {/* Add to Compare */}
        <div className="flex justify-end pt-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <Plus className="h-4 w-4" />
            Add to compare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
