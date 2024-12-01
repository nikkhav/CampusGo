export interface Vehicle {
  id: string;
  user_id: string;
  brand: string;
  model: string;
  color: string;
  license_plate: string;
  seats: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewOption {
  id: number;
  is_positive: boolean;
  text: string;
  to_driver: boolean;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  is_positive: boolean;
  comment: string | null;
  created_at: string;
  updated_at: string;
  review_review_options?: ReviewOption[];
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string | null;
  image: string | null;
  is_id_verified: boolean;
  is_license_verified: boolean;
  phone: string | null;
  languages: string[];
  vehicles?: Vehicle[];
  reviews?: Review[];
  preferences: string[];
  created_at: string;
  updated_at: string;
}
