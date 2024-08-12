import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/forms/LoginForm";
import Login from "@/components/login/Login";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <Login />
    </div>
  );
}
