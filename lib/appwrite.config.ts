// import * as sdk from "appwrite";
// import { Client, Account } from "appwrite";
// import { env } from "./env.config";

// const client = new Client();
// client.setEndpoint(env.endpoint).setProject(env.projectId);

// export const account = new Account(client);
// export const databases = new sdk.Databases(client);
// export const storage = new sdk.Storage(client);
// export const messaging = new sdk.Messaging(client);

import { Client, Account } from "appwrite";
import { env } from "./env.config";

const client = new Client().setEndpoint(env.endpoint).setProject(env.projectId);

export const account = new Account(client);
