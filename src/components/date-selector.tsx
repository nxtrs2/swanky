import { useState } from "react";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface DateSelectorProps {
  onSelect: (date: Date) => void;
}

export default function DateSelector({ onSelect }: DateSelectorProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const maxDate = addDays(new Date(), 5);

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onSelect(newDate);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Choose a Date</h2>
      <div className="flex justify-center md:justify-start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(date) => date < new Date() || date > maxDate}
          className="rounded-md border shadow"
        />
      </div>
    </div>
  );
}
