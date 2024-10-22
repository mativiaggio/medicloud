import { Models } from "node-appwrite";

export interface Guest extends Models.Document {
  guest_id: string;
  full_name: string;
  birthdate: Date;
  phone_number: string;
  address: string;
  gender: Gender;
  contact_full_name: string;
  contact_email: string;
  contact_phone_number: string;
  contact_relationship: string;
  family_genogram: string;
  oncological_disease: string;
  non_oncological_disease: string;
  referring_physician: string;
  primary_care_physician: string;
  health_insurance: string;
  insuranceProvider: InsuranceProviders;
  health_insurance_number: string;
  allergies: string;
  current_medication: string;
  family_medical_history: string;
  tumor: string;
  tumor_date: Date;
  metastasis: Metastasis;
  metastasis_site: string;
  ecog: Ecog;
  informed: Informed;
  informed_level: Informed_Level;
  not_informed_level: Not_informed_Level;
  religion: Religion;
  religion_other: string;
  funeral_service: Funeral_Service;
  surgery: string;
  rt: string;
  qt: string;
  ht: string;
  opioid_treatment: Opioid_Treatment;
  opioid: string;
  non_opioid_treatment: string;
  status: Status;
  admission_date: Date;
  guestMedications: GuestMedications[];
  daily_evolution: Daily_Evolution[];
}

export interface GuestMedications {
  $id: string;
  name: string;
  description: string;
}

export interface InsuranceProviders extends Models.Document {
  $id: string;
  name: string;
  private: boolean;
}

export interface Medication extends Models.Document {
  $id: string;
  name: string;
}

export interface Tickets extends Models.Document {
  $id: string;
  title: string;
  description: string;
  priority: string;
  due_date: string;
  responsable: string;
}

export interface Daily_Evolution extends Models.Document {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  user_id: string;
  guest_id: string;
  heart_rate: number;
  respiratory_rate: number;
  blood_pressure: string;
  oximetry: number;
  temperature: number;
  content: string;
  guest: Guest;
  daily_evolution_comments: Daily_Evolution_Comments;
}

export interface Daily_Evolution_Comments extends Models.Document {
  user_id: string;
  comment: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
}
