import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import { Guest } from '@/types/appwrite.types';
import Link from 'next/link';
import LineSkeleton from '@/components/skeleton/LineSkeleton';

interface DashBreadProps {
    guest: Guest;
    guestLoading: boolean;
}

const ECBreadcrumbs = ({ guest, guestLoading} : DashBreadProps) => {
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
                <LineSkeleton height={16} width={100} />
              ) : (
                guest?.full_name
              )}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Estudios complementarios</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
  )
}

export default ECBreadcrumbs
