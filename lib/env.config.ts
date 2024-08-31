// Aquí se definen las variables de entorno para ser exportadas a la app
export const env = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  apiKey: process.env.API_KEY || "",
  databaseId: process.env.NEXT_PUBLIC_DATABASE_ID || "",
  guestCollectionId: process.env.NEXT_PUBLIC_GUEST_COLECTION_ID || "",
  nurseCollectionId: process.env.NEXT_PUBLIC_NURSE_COLECTION_ID || "",
  insuranceCollectionId: process.env.NEXT_PUBLIC_INSURANCE_COLLECTION_ID || "",
  bucketId: process.env.NEXT_PUBLIC_BUCKET_ID || "",
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT || "",
};
