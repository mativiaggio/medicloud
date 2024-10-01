import LineSkeleton from "@/components/skeleton/LineSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Heart, Thermometer, Wind } from "lucide-react";
import Link from "next/link";

const DailyEvolutionSkeletonCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex w-full items-center justify-between">
          <LineSkeleton height={25} width={200} />
          <div>
            <LineSkeleton height={25} width={200} />
          </div>
        </CardTitle>
        <CardDescription>
          <LineSkeleton height={20} width={200} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>
              <LineSkeleton height={20} width={200} />
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-blue-500" />
            <span>
              <LineSkeleton height={20} width={200} />
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-500" />
            <span>
              <LineSkeleton height={20} width={200} />
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-500" />
            <span>
              <LineSkeleton height={20} width={200} />
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-yellow-500" />
            <span>
              <LineSkeleton height={20} width={200} />
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Link href={`#`}>
          <LineSkeleton height={20} width={200} />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DailyEvolutionSkeletonCard;
