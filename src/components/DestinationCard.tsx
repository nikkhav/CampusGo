import { Card } from "@/components/ui/card.tsx";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar.tsx";
import { Link, useNavigate } from "react-router-dom";
import { calculateDuration } from "@/lib/utils.ts";

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
  rideId?: string;
  rateEnabled?: boolean;
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
  rideId,
  rateEnabled = false,
}: DestinationCardProps) => {
  const navigate = useNavigate();

  const navigateToBookRide = () => {
    if (rideId) {
      return navigate(`/track/${rideId}`);
    } else {
      return navigate(`/book/${id}`);
    }
  };

  const formattedStartTime = new Date(startDate).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = new Date(endDate).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const displayName = `${driverFirstName} ${driverLastName.charAt(0)}.`;
  const initials = `${driverFirstName.charAt(0)}${driverLastName.charAt(0)}`;

  return (
    <>
      {rateEnabled && rideId && (
        <div className="mb-3 mt-5">
          {rateEnabled && (
            <Link
              to={`/rate-driver/${rideId}`}
              className="text-blue-600 hover:underline"
            >
              Bewerte Fahrer
            </Link>
          )}
        </div>
      )}
      <Card
        className="flex flex-col md:flex-row items-center cursor-pointer w-full mb-5"
        onClick={navigateToBookRide}
      >
        <div className="flex-1 grid p-5 w-full md:w-8/12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="grid gap-1 w-full md:w-3/12 text-center md:text-left">
              <div className="text-xl font-bold">{formattedStartTime}</div>
              <div className="text-lg">{from}</div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-6/12">
              <div className="h-[2px] flex-1 bg-border" />
              <div className="text-sm text-center text-muted-foreground whitespace-nowrap">
                {calculateDuration(startDate, endDate)}
                <br />
                {intermediateStopsAmount > 0 &&
                  `${intermediateStopsAmount} Zwischenstop${
                    intermediateStopsAmount > 1 ? "s" : ""
                  }`}
              </div>
              <div className="h-[2px] flex-1 bg-border" />
            </div>
            <div className="grid gap-1 w-full md:w-3/12 text-center md:text-right">
              <div className="text-xl font-bold">{formattedEndTime}</div>
              <div className="text-lg">{to}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-2/12 p-3 border-t md:border-t-0 md:border-l mt-4 md:mt-0">
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
          <div className="font-medium mt-2">{displayName}</div>
        </div>
      </Card>
    </>
  );
};
