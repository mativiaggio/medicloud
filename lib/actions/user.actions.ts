import { ID, Query } from "node-appwrite";
import { account, users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      undefined,
      undefined,
      undefined
    );
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents.users[0];
    }
  }
};

export const login = async (user: LoginParams) => {
  const session = await account.createSession(user.email, user.password);
  console.log("Login successful:", session);
};
