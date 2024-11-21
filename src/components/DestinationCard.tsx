import { Card } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { useNavigate } from "react-router-dom";

interface DestinationCardProps {
  id: string;
  from: string;
  to: string;
  fromAddress: string;
  toAddress: string;
  startTime: string;
  duration: string;
  endTime: string;
  passengerName: string;
  passengerInitials: string;
}

export const DestinationCard = ({
  id,
  from,
  to,
  fromAddress,
  toAddress,
  startTime,
  duration,
  endTime,
  passengerName,
  passengerInitials,
}: DestinationCardProps) => {
  const navigate = useNavigate();

  const navigateToBookRide = () => {
    navigate(`/book/${id}`);
  };

  return (
    <Card
      className="flex items-center mt-6 cursor-pointer"
      onClick={navigateToBookRide}
    >
      <div className="flex-1 grid p-5 w-8/12">
        <div className="flex justify-between items-center gap-4">
          <div className="grid gap-1 w-3/12">
            <div className="text-xl font-bold">{startTime}</div>
            <div className="text-lg">{from}</div>
            <div className="text-muted-foreground">{fromAddress}</div>
          </div>
          <div className="flex items-center gap-2 w-6/12">
            <div className="h-[2px] flex-1 bg-border" />
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {duration}
            </div>
            <div className="h-[2px] flex-1 bg-border" />
          </div>
          <div className="grid gap-1 w-3/12 text-right">
            <div className="text-xl font-bold">{endTime}</div>
            <div className="text-lg">{to}</div>
            <div className="text-muted-foreground">{toAddress}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-l w-2/12 p-3">
        <Avatar className="w-16 h-16">
          <AvatarFallback>{passengerInitials}</AvatarFallback>
        </Avatar>
        <div className="font-medium">{passengerName}</div>
      </div>
    </Card>
  );
};
