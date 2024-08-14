"use client";
import { account } from "../appwrite.config";

export const login = async (user: LoginParams) => {
  try {
    const userCred = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    console.log("Session created:", userCred); // Verifica si la sesión se crea correctamente

    return userCred;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};
