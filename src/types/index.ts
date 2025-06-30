export interface Company {
  company_id: string;
  name: string;
  address?: string;
  phone_number?: string;
  website_url?: string;
  industry?: string;
  employee_size?: number;
  created_at: string;
  updated_at: string;
}

export interface Person {
  person_id: string;
  company_id: string;
  company?: Company;
  first_name: string;
  last_name: string;
  full_name: string;
  department?: string;
  title?: string;
  email?: string;
  phone_mobile?: string;
  phone_direct?: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessCard {
  card_id: string;
  person_id: string;
  person?: Person;
  uploader_user_id: string;
  image_url: string;
  ocr_raw_data?: any;
  exchange_date: string;
  exchange_time?: string;
  exchange_location?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  tags?: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Interaction {
  interaction_id: string;
  person_id: string;
  person?: Person;
  interaction_date: string;
  interaction_type: 'Meeting' | 'Call' | 'Email';
  purpose?: string;
  details?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  role: 'Admin' | 'User';
  created_at: string;
  updated_at: string;
}

export interface AnalyticsData {
  cardGrowth: Array<{ date: string; count: number }>;
  industryDistribution: Array<{ industry: string; count: number; percentage: number }>;
  interactionFrequency: Array<{ person: string; frequency: number }>;
  followUpStatus: {
    needsFollowUp: number;
    recentContact: number;
    longTermContact: number;
  };
}