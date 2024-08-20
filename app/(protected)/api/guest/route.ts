import api from "@/appwrite/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
  const appwrite = await api.getAllGuestsDocuments([]);

  return NextResponse.json(appwrite);
}
