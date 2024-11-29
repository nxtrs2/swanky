"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { format, addMinutes, parse, isBefore, isAfter } from "date-fns";

interface Props {
  date: Date;
  staffId: number;
  serviceId: number;
  extraServices: number[];
  onSelect: (time: string) => void;
}

export default function TimeSelection({
  date,
  staffId,
  serviceId,
  extraServices,
  onSelect,
}: Props) {
  const supabase = createClient();
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoading(true);

      // Fetch bookings for the selected date and staff
      const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("start_time, total_time")
        .eq("staff_id", staffId)
        .eq("booking_date", format(date, "yyyy-MM-dd"));

      if (bookingsError) {
        console.error("Error fetching bookings:", bookingsError);
        setLoading(false);
        return;
      }

      // Fetch service duration
      const { data: services, error: servicesError } = await supabase
        .from("services")
        .select("duration")
        .in("id", [serviceId, ...extraServices]);

      if (servicesError) {
        console.error("Error fetching services:", servicesError);
        setLoading(false);
        return;
      }

      const totalDuration =
        services?.reduce((sum, service) => sum + service.duration, 0) || 0;

      // Generate all possible time slots
      const allSlots = [];
      let currentTime = parse("10:00", "HH:mm", new Date());
      const endTime = parse("22:00", "HH:mm", new Date());

      while (isBefore(currentTime, endTime)) {
        allSlots.push(format(currentTime, "HH:mm"));
        currentTime = addMinutes(currentTime, 15);
      }

      // Determine availability of each slot
      const updatedSlots = allSlots.map((slot) => {
        const slotTime = parse(slot, "HH:mm", new Date());
        const slotEnd = addMinutes(slotTime, totalDuration);

        // Check if the slot conflicts with any bookings
        const available = !bookings?.some((booking) => {
          const bookingStart = parse(
            booking.start_time,
            "HH:mm:ss",
            new Date()
          );
          const bookingEnd = addMinutes(bookingStart, booking.total_time);

          // Check if the current slot would overlap with an existing booking
          return (
            (isBefore(slotTime, bookingEnd) &&
              isAfter(slotTime, bookingStart)) || // Slot start during a booking
            (isBefore(slotEnd, bookingEnd) && isAfter(slotEnd, bookingStart)) || // Slot end during a booking
            (isBefore(bookingStart, slotEnd) && isAfter(bookingEnd, slotTime)) // Booking fully overlaps the slot
          );
        });

        return { time: slot, available };
      });

      setSlots(updatedSlots);
      setLoading(false);
    };

    fetchAvailableSlots();
  }, [date, staffId, serviceId, extraServices]);

  if (loading) return <div>Loading available time slots...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select a Time</h2>
      <div className="grid grid-cols-4 gap-2">
        {slots.map(({ time, available }) => (
          <Button
            key={time}
            variant="outline"
            onClick={() => available && onSelect(time)}
            disabled={!available}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}
