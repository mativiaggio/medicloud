import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Error } from "../alerts/Error";
import MedCard from "../cards/MedCard";
import { PillBottle } from "lucide-react";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item?.title}
          description={item.description}
          header={item.header}
          // icon={item.icon}
          className={i === 2 || i === 5 || i === 8 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Tratamiento Médico Actual",
    description: "Medicamentos que el huésped está tomando.",
    header: (
      <div className="guest-dashboard-container h-full overflow-auto flex flex-col gap-2">
        {/* <Card>
          <PillBottle className="h-4 w-4" />
          <CardTitle>Morfina</CardTitle>
          <CardDescription>2mg / 8hs.</CardDescription>
        </Card>
        <Card>
          <PillBottle className="h-4 w-4" />
          <CardTitle>Morfina</CardTitle>
          <CardDescription>2mg / 8hs.</CardDescription>
        </Card>
        <Card>
          <PillBottle className="h-4 w-4" />
          <CardTitle>Morfina</CardTitle>
          <CardDescription>2mg / 8hs.</CardDescription>
        </Card> */}
        <MedCard
          icon={<PillBottle size={16} />}
          title="Prueba"
          description="Descripción"
        />
        <MedCard
          icon={<PillBottle size={16} />}
          title="Prueba"
          description="Descripción"
        />
        <MedCard
          icon={<PillBottle size={16} />}
          title="Prueba"
          description="Descripción"
        />
        <MedCard
          icon={<PillBottle size={16} />}
          title="Prueba"
          description="Descripción"
        />
        <MedCard
          icon={<PillBottle size={16} />}
          title="Prueba"
          description="Descripción"
        />
        <MedCard
          icon={<PillBottle size={16} />}
          title="Prueba"
          description="Descripción"
        />
      </div>
    ),
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Un titulo más",
    // description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Error />,
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    // title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Error />,
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
];
