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

export interface Ride {
  id: string;
  driver_id: string;
  vehicle_id: string;
  start_time: string;
  end_time: string;
  available_seats: number;
  from: string;
  to: string;
  created_at?: string;
  updated_at?: string;
}

export interface Stop {
  id: string;
  ride_id: string;
  location_id: string;
  stop_type: "start" | "end" | "intermediate";
  stop_time?: string;
  stop_order: number;
  created_at: string;
  updated_at: string;
  locations?: Location;
}

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}
