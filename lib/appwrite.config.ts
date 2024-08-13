import * as sdk from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();
const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  GUEST_COLECTION_ID,
  NURSE_COLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();
export const account = new sdk.Account(client);

if (!ENDPOINT) {
  throw new Error("ENDPOINT is not defined");
}

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
