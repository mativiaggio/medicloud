import LineSkeleton from "@/components/skeleton/LineSkeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Guest } from "@/types/appwrite.types";
import Link from "next/link";
import { useParams } from "next/navigation";

interface DashBreadProps {
  guest: Guest;
  guestLoading: boolean;
}

const Breadcrumbs = ({ guest, guestLoading }: DashBreadProps) => {
  const { dailyEvolutionId } = useParams();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/inicio">Inicio</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href="/huespedes">Huéspedes</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={`/huespedes/${guest?.$id}`}>
            {guestLoading ? (
              <LineSkeleton height={40} width={400} />
            ) : (
              guest?.full_name
            )}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={`/huespedes/${guest?.$id}/evolucion-diaria`}>
            {guestLoading ? (
              <LineSkeleton height={40} width={400} />
            ) : (
              "Evolución diaria"
            )}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{dailyEvolutionId}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
