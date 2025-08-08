// TypeScript interfaces for the API response structure

export interface ApprovalDetail {
  id: number;
  title: string;
  logo: string;
  status: number;
  priority: number;
  accreditation_description: string | null;
}

export interface UniversityBanner {
  id: number;
  banner: string;
  video_link: string | null;
  priority: number;
  banner_type: number;
  status: number;
  universities: number;
}

export interface FeeDetail {
  id: number;
  fee_type: {
    fee_type: string;
  };
  fee: string;
  priority: number;
  status: number;
  universities_courses: number;
}

export interface University {
  id: number;
  ptu_count: number;
  compare_count: number;
  fake_review_count: number;
  cv_rating: string;
  review_count: number;
  logo: string;
  name: string;
  slug: string;
  owner_by: number;
  universty_banner: UniversityBanner[];
  approval_details: ApprovalDetail[];
}

export interface CollegeData {
  fee: number;
  full_fee_usd: number | null;
  university: University;
  courses_fee_details: FeeDetail[];
  courses_fee_usd_details: FeeDetail[];
}

export interface ApiResponse {
  data: CollegeData[];
}

export interface Filters {
  maxFee: number;
  searchTerm: string;
  minRating: number;
}
