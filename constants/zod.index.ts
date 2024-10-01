import { z } from "zod";

export const GuestFormValidation = z.object({
  full_name: z.string().nonempty("El nombre completo es obligatorio"),
  birthdate: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "La fecha de nacimiento es obligatoria",
  }),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  gender: z.enum(["male", "female"]),
  contact_full_name: z
    .string()
    .nonempty("El nombre completo del contacto es obligatorio"),
  contact_email: z.string().email("El email del contacto no es válido"),
  contact_phone_number: z
    .string()
    .nonempty("El número de teléfono de contacto es obligatorio"),
  contact_relationship: z.string().optional(),
  family_genogram: z.string().optional(),
  oncological_disease: z.string().optional(),
  non_oncological_disease: z.string().optional(),
  referring_physician: z.string().optional(),
  primary_care_physician: z.string().optional(),
  insuranceProvider: z.string().nonempty("La obra social es obligatoria"),
  health_insurance_number: z.string().optional(),
  allergies: z.string().optional(),
  current_medication: z.string().optional(),
  family_medical_history: z.string().optional(),
  tumor: z.string().optional(),
  tumor_date: z
    .date()
    .refine((val) => !isNaN(val.getTime()), {
      message: "La fecha de diagnóstico es obligatoria",
    })
    .optional(),
  metastasis: z.enum(["yes", "no"]).optional(),
  metastasis_site: z.string().optional(),
  ecog: z
    .enum([
      "Asymptomatic, normal activity",
      "Symptomatic, able to carry out daily activities",
      "Symptomatic, in bed less than 50% of the day",
      "Symptomatic, in bed more than 50% of the day",
      "Symptomatic, in bed all day",
      "Terminal patient",
    ])
    .optional(),
  informed: z
    .enum(["The guest is informed", "The guest is not informed"])
    .optional(),
  informed_level: z
    .enum([
      "Totally, knows the diagnosis and prognosis",
      "Partially, knows the diagnosis but not the prognosis (doesn't know that it is incurable or that they might die)",
      "Uninformed",
    ])
    .optional(),
  religion: z
    .enum([
      "None",
      "Catholic",
      "Jewish",
      "Evangelical",
      "Mormon",
      "Jehovah's Witness",
      "Other",
    ])
    .optional(),
  religion_other: z.string().optional(),
  funeral_service: z.enum(["yes", "no"]).optional(),
  surgery: z.string().optional(),
  rt: z.string().optional(),
  qt: z.string().optional(),
  ht: z.string().optional(),
  opioid_treatment: z.enum(["yes", "no"]).optional(),
  opioid: z.string().optional(),
  non_opioid_treatment: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  admission_date: z.date().refine((val) => !isNaN(val.getTime()), {
    message: "La fecha de admisión es obligatoria",
  }),
});
