import { LoginInterface, RegisterInterface } from "@/interfaces/auth.interface";
import { Account, Client as Appwrite, Databases, ID } from "appwrite";
import { env } from "@/lib/env.config";

let api: any = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(env.endpoint).setProject(env.projectId);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);

    api.sdk = { account, database };
    return api.sdk;
  },

  // USER ACTIONS
  createAccount: (registerBody: RegisterInterface) => {
    return api
      .provider()
      .account.create(
        ID.unique(),
        registerBody.email,
        registerBody.password,
        registerBody.fullName
      );
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createSession: (loginBody: LoginInterface) => {
    return api
      .provider()
      .account.createEmailPasswordSession(loginBody.email, loginBody.password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  // DATABASE
  guest: {
    getAll: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.listDocuments(
          env.databaseId,
          env.guestCollectionId,
          extraParams
        );
    },

    findById: async (guestId: string) => {
      return await api
        .provider()
        .database.getDocument(env.databaseId, env.guestCollectionId, guestId);
    },

    new: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.createDocument(
          env.databaseId,
          env.guestCollectionId,
          ID.unique(),
          extraParams
        );
    },
  },

  getAllInsuranceDocuments: async (extraParams: string[]) => {
    return await api
      .provider()
      .database.listDocuments(
        env.databaseId,
        env.insuranceCollectionId,
        extraParams
      );
  },

  createInsuranceProvider: async (extraParams: string[]) => {
    return await api
      .provider()
      .database.createDocument(
        env.databaseId,
        env.insuranceCollectionId,
        ID.unique(),
        extraParams
      );
  },
};

export default api;
