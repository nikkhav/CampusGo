import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "./Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
  fullWidth?: boolean;
}

export function DatePicker({
  date,
  setDate,
  className,
  fullWidth = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            fullWidth ? "w-full" : "w-[240px]",
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: de })
          ) : (
            <span>Wähle ein Datum</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar selected={date} onSelect={handleDateSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
