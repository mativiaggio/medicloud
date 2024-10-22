// Variables de entorno exportadas para la app
export const env = {
  // Información del proyecto
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  apiKey: process.env.API_KEY || "",
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT || "",

  // IDs de la base de datos
  databaseId: process.env.NEXT_PUBLIC_DATABASE_ID || "",

  // Colecciones de la base de datos
  guestCollectionId: process.env.NEXT_PUBLIC_GUEST_COLECTION_ID || "",
  nurseCollectionId: process.env.NEXT_PUBLIC_NURSE_COLECTION_ID || "",
  insuranceCollectionId: process.env.NEXT_PUBLIC_INSURANCE_COLLECTION_ID || "",
  medicationsCollectionId: process.env.NEXT_PUBLIC_MEDICATIONS_ID || "",
  guestMedicationsCollectionId:
    process.env.NEXT_PUBLIC_GUEST_MEDICATIONS_ID || "",
  devTicketsId: process.env.NEXT_PUBLIC_DEV_TICKETS || "",
  dailyEvolutionId: process.env.NEXT_PUBLIC_DAILY_EVOLUTION_ID || "",
  dailyEvolutionCommentsId:
    process.env.NEXT_PUBLIC_DAILY_EVOLUTION_COMMENTS_ID || "",
  usersCollectionId: process.env.NEXT_PUBLIC_USERS_ID || "",

  // Configuración del almacenamiento (buckets)
  bucketId: process.env.NEXT_PUBLIC_BUCKET_ID || "",
};
