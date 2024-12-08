import { Card } from "@/components/ui/card.tsx";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar.tsx";
import { useNavigate } from "react-router-dom";

interface DestinationCardProps {
  id: string;
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  intermediateStopsAmount: number;
  driverFirstName: string;
  driverLastName: string;
  driverImage?: string;
}

export const DestinationCard = ({
  id,
  from,
  to,
  startDate,
  endDate,
  intermediateStopsAmount,
  driverFirstName,
  driverLastName,
  driverImage,
}: DestinationCardProps) => {
  const navigate = useNavigate();

  const navigateToBookRide = () => {
    navigate(`/book/${id}`);
  };

  const formattedStartTime = new Date(startDate).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndTime = new Date(endDate).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalMinutes = Math.floor(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 60000,
  );

  const duration =
    totalMinutes < 60
      ? `${totalMinutes} Min.`
      : `${Math.floor(totalMinutes / 60)} Std. ${
          totalMinutes % 60 > 0 ? `${totalMinutes % 60} Min.` : ""
        }`;

  const displayName = `${driverFirstName} ${driverLastName.charAt(0)}.`;
  const initials = `${driverFirstName.charAt(0)}${driverLastName.charAt(0)}`;

  return (
    <Card
      className="flex items-center mt-6 cursor-pointer"
      onClick={navigateToBookRide}
    >
      <div className="flex-1 grid p-5 w-8/12">
        <div className="flex justify-between items-center gap-4">
          <div className="grid gap-1 w-3/12">
            <div className="text-xl font-bold">{formattedStartTime}</div>
            <div className="text-lg">{from}</div>
          </div>
          <div className="flex items-center gap-2 w-6/12">
            <div className="h-[2px] flex-1 bg-border" />
            <div className="text-sm text-center text-muted-foreground whitespace-nowrap">
              {duration}
              <br />
              {intermediateStopsAmount > 0 &&
                `${intermediateStopsAmount} Zwischenstop${
                  intermediateStopsAmount > 1 ? "s" : ""
                }`}
            </div>
            <div className="h-[2px] flex-1 bg-border" />
          </div>
          <div className="grid gap-1 w-3/12 text-right">
            <div className="text-xl font-bold">{formattedEndTime}</div>
            <div className="text-lg">{to}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-l w-2/12 p-3">
        <Avatar className="w-16 h-16 rounded-full overflow-hidden">
          <AvatarImage
            src={driverImage}
            alt={`${displayName}'s image`}
            className="object-cover h-full w-full"
          />
          <AvatarFallback className="bg-gray-300 text-lg text-gray-700 font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="font-medium">{displayName}</div>
      </div>
    </Card>
  );
};
