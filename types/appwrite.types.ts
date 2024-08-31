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
}

export interface InsuranceProviders extends Models.Document {
  $id: string;
  name: string;
}

// export interface Appointment extends Models.Document {
//   guest: Guest;
//   schedule: Date;
//   status: Status;
//   primaryPhysician: string;
//   reason: string;
//   note: string;
//   userId: string;
//   cancellationReason: string | null;
// }
