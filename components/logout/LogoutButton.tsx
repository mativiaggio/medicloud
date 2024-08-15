"use client";
import { account } from "@/lib/appwrite.config";
import { redirect } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await account.deleteSession("current");
          redirect("/ingresar");
        }}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
