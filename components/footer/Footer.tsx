import Image from "next/image";
import React from "react";

interface FooterProps {
  bg?: string;
  colorLight?: string;
  colorDark?: string;
}

const Footer = ({ props }: { props: FooterProps }) => {
  const { bg, colorLight = "color-light", colorDark = "color-dark" } = props;
  return (
    <div
      id="main-footer"
      className={`border-t border-main-border-light dark:border-main-border-dark h-fit min-h-[40vh] w-full p-[30px] ${bg} ${colorLight} ${colorDark}`}>
      <div className="w-full flex justify-center items-center p-5">
        <Image
          src={"/assets/svgs/HMT-Blanco.svg"}
          height={0}
          width={0}
          style={{ height: "auto", width: "200px" }}
          alt="Hospice Madre Teresa"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center p-5">
        <h1 className="text-3xl font-semibold mb-[30px]">MediCloud</h1>
        <div className="flex gap-5 mb-[30px]">
          <a
            href="https://hospicemadreteresa.org.ar/"
            aria-label={"Pagina web del Hospice Madre Teresa"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-globe">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/hospicemadreteresalujan/"
            aria-label={"Instagram del Hospice Madre Teresa"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/hospicemtlujan/"
            aria-label={"Facebook del Hospice Madre Teresa"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
        <div>
          <p className="text-center">
            © 2024 MediCloud todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
