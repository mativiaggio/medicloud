// const Page = () => {
//   return null;
// };

// export default Page;

import { ModeToggle } from "@/components/theme_toggle/ThemeToggle";
import { Button } from "@/components/ui/button";
import { HeartPulse, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 min-h-[57px] items-center justify-center border-b border-main-border-light px-4 dark:border-main-border-dark sm:px-6 md:px-8 lg:px-10">
        <Link className="flex items-center justify-center" href="#">
          <HeartPulse className="text-primary h-6 w-6" />
          <span className="text-primary ml-2 text-2xl font-bold">
            MediCloud
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {/* <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Contact
          </Link> */}
          <ModeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full bg-main-workspace-light py-12 dark:bg-main-workspace-dark md:py-24 lg:py-32 xl:py-48">
          <Image
            src={
              "https://hospicemadreteresa.org.ar/wp-content/uploads/2017/07/bg-frente-casa-hospice.jpg"
            }
            alt="Landing Image"
            width={100000}
            height={100000}
            className="absolute top-0 h-full w-full object-cover"
          />
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter text-color-light sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Bienvenido a MediCloud
                </h1>
                <p className="text-muted-foreground mx-auto max-w-[700px] text-color-light md:text-xl">
                  Software de gestión médica segura, eficiente y compasiva por
                  Hospice Madre Teresa.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/inicio"}>
                  <Button className="bg-main-bg-dark text-color-dark hover:bg-button-hover-dark">
                    Ingresar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <ShieldCheck className="text-primary h-12 w-12" />
                <h2 className="text-xl font-bold">Protección de Datos</h2>
                <p className="text-muted-foreground">
                  MediCloud garantiza que los datos de los huéspedes estén
                  protegidos con cifrado avanzado y medidas de seguridad
                  rigurosas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="text-primary h-12 w-12" />
                <h2 className="text-xl font-bold">
                  Especialización en el Cuidado
                </h2>
                <p className="text-muted-foreground">
                  Facilita la colaboración entre el equipo para brindar la mejor
                  atención posible a los huéspedes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <HeartPulse className="text-primary h-12 w-12" />
                <h2 className="text-xl font-bold">Servicio Compasivo</h2>
                <p className="text-muted-foreground">
                  Desarrollado para apoyar las necesidades únicas del cuidado
                  paliativo con empatía y eficacia, poniendo siempre al huésped
                  en el centro.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-main-workspace-light dark:bg-main-workspace-dark">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Get Started with MediCloud
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join the Hospice Madre Teresa community and revolutionize your
                  healthcare management.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-main-border-light px-4 py-6 dark:border-main-border-dark sm:flex-row md:px-6">
        <p className="text-muted-foreground text-xs">
          © 2024 MediCloud por Hospice Madre Teresa. Todos los derechos
          reservados.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terminos de servicio
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
