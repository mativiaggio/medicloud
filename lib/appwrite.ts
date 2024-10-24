import { LoginInterface, RegisterInterface } from "@/interfaces/auth.interface";
import { env } from "@/lib/env.config";
import { Account, Client as Appwrite, Databases, ID, Query } from "appwrite";

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
  auth: {
    createAccount: (registerBody: RegisterInterface) => {
      return api
        .provider()
        .account.create(
          ID.unique(),
          registerBody.email,
          registerBody.password,
          registerBody.fullName,
        );
    },

    getCurrentSession: () => {
      let account = api.provider().account;
      return account.get();
    },

    createSession: (loginBody: LoginInterface) => {
      return api
        .provider()
        .account.createEmailPasswordSession(
          loginBody.email,
          loginBody.password,
        );
    },

    deleteCurrentSession: () => {
      return api.provider().account.deleteSession("current");
    },
  },

  // DATABASE

  // Developers
  tickets: {
    getAll: async (extraParams: string[]) => {
      return api
        .provider()
        .database.listDocuments(env.databaseId, env.devTicketsId, extraParams);
    },

    findById: async (guestId: string) => {
      return await api
        .provider()
        .database.getDocument(env.databaseId, env.devTicketsId, guestId);
    },
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

  dailyEvolution: {
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

    findByGuestId: async (
      guestId: string,
      extraParams1: {},
      extraParams2: {},
    ) => {
      return await api
        .provider()
        .database.listDocuments(env.databaseId, env.dailyEvolutionId, [
          Query.equal("guest_id", guestId),
          extraParams1,
          extraParams2,
        ]);
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

  dailyEvolutionComments: {
    getAll: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.listDocuments(
          env.databaseId,
          env.dailyEvolutionCommentsId,
          extraParams,
        );
    },

    findById: async (id: string) => {
      return await api
        .provider()
        .database.getDocument(env.databaseId, env.dailyEvolutionCommentsId, id);
    },

    findByGuestId: async (
      guestId: string,
      extraParams1: {},
      extraParams2: {},
    ) => {
      return await api
        .provider()
        .database.listDocuments(env.databaseId, env.dailyEvolutionCommentsId, [
          Query.equal("guest_id", guestId),
          extraParams1,
          extraParams2,
        ]);
    },

    new: async (extraParams: string[]) => {
      return await api
        .provider()
        .database.createDocument(
          env.databaseId,
          env.dailyEvolutionCommentsId,
          ID.unique(),
          extraParams,
        );
    },

    update: async (id: string, extraParams: string[]) => {
      return await api
        .provider()
        .database.updateDocument(
          env.databaseId,
          env.dailyEvolutionCommentsId,
          id,
          extraParams,
        );
    },

    delete: async (id: string) => {
      return await api
        .provider()
        .database.deleteDocument(
          env.databaseId,
          env.dailyEvolutionCommentsId,
          id,
        );
    },
  },
};

export default api;
