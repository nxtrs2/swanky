"use client";

import { useState, useEffect } from "react";
import { TimeSelectionProps } from "@/types";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { format, addMinutes, parse, isBefore, isAfter } from "date-fns";

export default function TimeSelection({
  date,
  staffId,
  serviceId,
  extraServices,
  onSelect,
}: TimeSelectionProps) {
  const supabase = createClient();
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoading(true);
      console.log("Date:", format(date, "yyyy-MM-dd"));

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

      if (!bookings || bookings.length === 0) {
        setSlots(
          allSlots.map((slot) => ({
            time: slot,
            available: true,
          }))
        );
        setLoading(false);
        return;
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
    <div className="space-y-4 bg-gradient-to-br from-black via-gray-900 to-black p-4 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-lg font-semibold text-white">Select a Time</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {slots.map(({ time, available }) => (
          <Button
            key={time}
            variant="outline"
            onClick={() => available && setSelectedTime(time)}
            disabled={!available}
            className={`p-1 text-sm font-medium rounded-md  hover:text-yellow-500 ${
              available
                ? "text-white border-gray-700 bg-gray-800 hover:bg-gray-700"
                : "text-gray-500 border-gray-700 bg-gray-800 opacity-50 cursor-not-allowed"
            }`}
          >
            {time}
          </Button>
        ))}
        d
      </div>
      <Button
        disabled={!selectedTime}
        onClick={() => onSelect(selectedTime || "")}
        className="w-full mt-4 bg-gray-800 text-white border border-gray-800 hover:bg-gray-800 rounded-md focus:ring-2 focus:ring-gray-700"
      >
        Select Time
      </Button>
    </div>

    // <div className="space-y-4">
    //   <h2 className="text-lg font-semibold">Select a Time</h2>
    //   <div className="grid grid-cols-4 gap-2">
    //     {slots.map(({ time, available }) => (
    //       <Button
    //         key={time}
    //         variant="outline"
    //         onClick={() => available && onSelect(time)}
    //         disabled={!available}
    //       >
    //         {time}
    //       </Button>
    //     ))}
    //   </div>
    // </div>
  );
}
