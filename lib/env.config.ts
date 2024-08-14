// Aquí se definen las variables de entorno para ser exportadas a la app
export const env = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  apiKey: process.env.API_KEY || "",
  databaseId: process.env.DATABASE_ID || "",
  guestCollectionId: process.env.GUEST_COLECTION_ID || "",
  nurseCollectionId: process.env.NURSE_COLECTION_ID || "",
  bucketId: process.env.NEXT_PUBLIC_BUCKET_ID || "",
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT || "",
  firebaseApiKey: process.env.FIREBASE_API_KEY || "",
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || "",
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
  firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  firebaseAppId: process.env.FIREBASE_APP_ID || "",
};
