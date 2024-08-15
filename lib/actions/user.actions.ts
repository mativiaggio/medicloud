import { account } from "../appwrite.config";

export const login = async (user: LoginParams) => {
  try {
    await account.createEmailPasswordSession(user.email, user.password);
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};
