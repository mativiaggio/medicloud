import { LoginInterface, RegisterInterface } from "@/interfaces/auth.interface";
import { env } from "@/lib/env.config";
import { Account, Client as Appwrite, Databases, ID, Query } from "appwrite";

const manualSDK = require("node-appwrite");

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
    const id = ID.unique();
    const response = api
      .provider()
      .account.create(
        id,
        registerBody.email,
        registerBody.password,
        registerBody.fullName,
      );

    api
      .provider()
      .database.createDocument(
        env.databaseId,
        env.guestCollectionId,
        ID.unique(),
        {
          user_id: id,
          name: registerBody.fullName,
        },
      );
    return response;
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

  user: {
    findById: async (userId: string) => {
      return await api
        .provider()
        .database.listDocuments(env.databaseId, env.usersCollectionId, [
          Query.equal("user_id", userId),
        ]);
    },
  },

  // DATABASE
  guest: {
    getAll: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.listDocuments(
          env.databaseId,
          env.guestCollectionId,
          extraParams,
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
          extraParams,
        );
    },

    update: async (id: string, extraParams: string[]) => {
      return await api
        .provider()
        .database.updateDocument(
          env.databaseId,
          env.guestCollectionId,
          id,
          extraParams,
        );
    },
  },

  guest_medication: {
    new: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.createDocument(
          env.databaseId,
          env.guestMedicationsCollectionId,
          ID.unique(),
          extraParams,
        );
    },

    delete: async (id: string) => {
      return await api
        .provider()
        .database.deleteDocument(
          env.databaseId,
          env.guestMedicationsCollectionId,
          id,
        );
    },
  },

  medication: {
    getAll: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.listDocuments(
          env.databaseId,
          env.medicationsCollectionId,
          extraParams,
        );
    },

    findById: async (medicationId: string) => {
      return await api
        .provider()
        .database.getDocument(
          env.databaseId,
          env.medicationsCollectionId,
          medicationId,
        );
    },

    new: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.createDocument(
          env.databaseId,
          env.medicationsCollectionId,
          ID.unique(),
          extraParams,
        );
    },

    update: async (id: string, extraParams: string[]) => {
      return await api
        .provider()
        .database.updateDocument(
          env.databaseId,
          env.medicationsCollectionId,
          id,
          extraParams,
        );
    },

    delete: async (id: string) => {
      return await api
        .provider()
        .database.deleteDocument(
          env.databaseId,
          env.medicationsCollectionId,
          id,
        );
    },
  },

  insuranceProvider: {
    getAll: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.listDocuments(
          env.databaseId,
          env.insuranceCollectionId,
          extraParams,
        );
    },

    findById: async (id: string) => {
      return await api
        .provider()
        .database.getDocument(env.databaseId, env.insuranceCollectionId, id);
    },

    new: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.createDocument(
          env.databaseId,
          env.insuranceCollectionId,
          ID.unique(),
          extraParams,
        );
    },

    update: async (id: string, extraParams: string[]) => {
      return await api
        .provider()
        .database.updateDocument(
          env.databaseId,
          env.insuranceCollectionId,
          id,
          extraParams,
        );
    },

    delete: async (id: string) => {
      return await api
        .provider()
        .database.deleteDocument(env.databaseId, env.insuranceCollectionId, id);
    },
  },

  daily_evolution: {
    getAll: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.listDocuments(
          env.databaseId,
          env.dailyEvolutionId,
          extraParams,
        );
    },

    findById: async (dailyEvolutionId: string) => {
      return await api
        .provider()
        .database.getDocument(
          env.databaseId,
          env.dailyEvolutionId,
          dailyEvolutionId,
        );
    },

    new: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.createDocument(
          env.databaseId,
          env.dailyEvolutionId,
          ID.unique(),
          extraParams,
        );
    },

    update: async (id: string, extraParams: string[]) => {
      return await api
        .provider()
        .database.updateDocument(
          env.databaseId,
          env.dailyEvolutionId,
          id,
          extraParams,
        );
    },

    delete: async (id: string) => {
      return await api
        .provider()
        .database.deleteDocument(env.databaseId, env.dailyEvolutionId, id);
    },
  },
};

export default api;
