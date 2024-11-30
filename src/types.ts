export interface Vehicle {
  make: string;
  model: string;
  color: string;
}

export interface PublicProfileData {
  firstName: string;
  lastName: string;
  status: string;
  verification: string[];
  vehicles: Vehicle[];
  preferences: string[];
  languages: string[];
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
}

export interface AccountSettingsData {
  personalDetails: PersonalDetails;
}

export interface UserData {
  publicProfile: PublicProfileData;
  accountSettings: AccountSettingsData;
}

export interface ReviewOption {
  id: number;
  is_positive: boolean;
  text: string;
  to_driver: boolean;
}
