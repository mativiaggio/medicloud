// const Page = () => {
//   return null;
// };

// export default Page;

import { ModeToggle } from "@/components/theme_toggle/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeartPulse, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-center">
        <Link className="flex items-center justify-center" href="#">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">MediCloud</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <ModeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-main-workspace-light dark:bg-main-workspace-dark">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Bienvenido a MediCloud</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Software de gestión médica segura, eficiente y compasiva por Hospice Madre Teresa.</p>
              </div>
              <div className="space-x-4">
                <Link href={"/inicio"}>
                  <Button className="bg-main-bg-dark text-color-dark dark:bg-main-bg-light dark:text-color-light hover:bg-button-hover-dark dark:hover:bg-button-hover-light">Ingresar</Button>
                </Link>
                {/* <Button variant="outline">Get Started</Button> */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <ShieldCheck className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">Secure Data Management</h2>
                <p className="text-muted-foreground">Your patients data is protected with state-of-the-art encryption and security measures.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">Collaborative Care</h2>
                <p className="text-muted-foreground">Seamlessly collaborate with your team to provide the best care for your patients.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <HeartPulse className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">Compassionate Service</h2>
                <p className="text-muted-foreground">Designed to support the unique needs of hospice care with empathy and efficiency.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-main-workspace-light dark:bg-main-workspace-dark">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get Started with MediCloud</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">Join the Hospice Madre Teresa community and revolutionize your healthcare management.</p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
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
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 MediCloud by Hospice Madre Teresa. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
