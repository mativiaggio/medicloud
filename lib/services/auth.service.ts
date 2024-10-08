import { LoginInterface, RegisterInterface } from "@/interfaces/auth.interface";
import api from "@/lib/appwrite";

export const register = async (registerBody: RegisterInterface) => {
  try {
    const user = await api.auth.createAccount(registerBody);
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw error;
  }
};

export const login = async (loginBody: LoginInterface) => {
  try {
    const session = await api.auth.createSession(loginBody);
    if (session) {
      const account = await api.auth.getCurrentSession();
      return account;
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw error;
  }
};

export const getSession = async () => {
  try {
    const account = await api.auth.getCurrentSession();
    return account;
  } catch (error) {
    console.error("Error occurred during getSession:", error);
  }
};
