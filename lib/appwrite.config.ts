import * as sdk from "node-appwrite";
import { env } from "./env.config";

const client = new sdk.Client();
client.setEndpoint(env.endpoint).setProject(env.projectId).setKey(env.apiKey);
client.setSelfSigned(true);

export const account = new sdk.Account(client);
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
