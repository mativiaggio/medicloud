import Image from "next/image";
import React from "react";
import LoginForm from "../forms/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center items-center p-5">
        <Image
          src={"/assets/svgs/HMT-Blanco.svg"}
          height={0}
          width={0}
          style={{ height: "auto", width: "200px" }}
          alt="Hospice Madre Teresa"
        />
      </div>
      <div className="flex w-full px-10  xl:px-80 h-[80vh] mt-[30px]">
        <div className="w-full xl:w-2/4 flex flex-col justify-center items-center xl:items-end pr-5">
          <h1 className="w-full max-w-sm text-5xl font-bold mb-[20px]">
            Inicia sesión en
            <span className="text-main-4"> MediCloud</span> para comenzar.
          </h1>
          <LoginForm />
        </div>
        <div className="hidden xl:flex w-full xl:w-2/4 justify-center items-center">
          <Image
            src={"/assets/images/login-image.png"}
            height={500}
            width={500}
            alt="Honestidad, amor y cuidado"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
