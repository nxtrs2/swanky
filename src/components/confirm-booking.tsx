"use client";

import { useState, useEffect } from "react";
import { ConfirmBookingProps } from "@/types";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";

export default function ConfirmBooking({
  date,
  time,
  staffId,
  serviceId,
  extraServices,
  onConfirm,
}: ConfirmBookingProps) {
  const supabase = createClient();
  const [staffName, setStaffName] = useState("");
  const [services, setServices] = useState<
    { title: string; duration: number; price: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const [staffResponse, servicesResponse] = await Promise.all([
        supabase.from("staff").select("name").eq("id", staffId).single(),
        supabase
          .from("services")
          .select("name,title, duration, price")
          .in("id", [serviceId, ...extraServices]),
      ]);

      if (staffResponse.data) setStaffName(staffResponse.data.name);
      if (servicesResponse.data) setServices(servicesResponse.data);

      setLoading(false);
    };

    fetchDetails();
  }, [staffId, serviceId, extraServices]);

  if (loading) return <div>Loading...</div>;

  const totalDuration = services.reduce(
    (sum, service) => sum + service.duration,
    0
  );
  const totalPrice = services.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="space-y-6 bg-gradient-to-br from-black via-gray-900 to-black p-6 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-base font-thin text-white">Your booking details:</h2>
      <div className=" text-white">
        {/* Date */}

        <p className="mb-5 text-gray-400">
          Your appointment with <span className="text-white">{staffName}</span>{" "}
          is at <span className="text-white">{time}</span> on{" "}
          <span className="text-white">{format(date, "MMMM d, yyyy")}</span> for
          the services:
        </p>

        {services.map((service, index) => (
          <div key={index} className="flex justify-between">
            <span>{service.title}</span>
            <span>MVR {service.price}</span>
          </div>
        ))}

        <div className="flex justify-between mt-5">
          <p className="font-medium text-gray-400">Total Duration:</p>
          <p>{totalDuration} minutes</p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-medium text-gray-400">Total Price:</p>
          <p>MVR {totalPrice}</p>
        </div>
      </div>
      <Button
        onClick={onConfirm}
        className="w-full mt-4 bg-gray-800 text-white border border-gray-800 hover:bg-gray-800 rounded-md focus:ring-2 focus:ring-gray-700"
      >
        Confirm Booking
      </Button>
    </div>

    // <div className="space-y-4">
    //   <h2 className="text-lg font-semibold">Confirm Booking</h2>
    //   <div>
    //     <p>
    //       <strong>Date:</strong> {format(date, "MMMM d, yyyy")}
    //     </p>
    //     <p>
    //       <strong>Time:</strong> {time}
    //     </p>
    //     <p>
    //       <strong>Staff:</strong> {staffName}
    //     </p>
    //     <p>
    //       <strong>Services:</strong>
    //     </p>
    //     <ul className="list-disc list-inside">
    //       {services.map((service, index) => (
    //         <li key={index}>
    //           {service.name} - {service.duration} min - MVR {service.price}
    //         </li>
    //       ))}
    //     </ul>
    //     <p>
    //       <strong>Total Duration:</strong> {totalDuration} min
    //     </p>
    //     <p>
    //       <strong>Total Price:</strong> MVR {totalPrice}
    //     </p>
    //   </div>
    //   <Button onClick={onConfirm}>Confirm Booking</Button>
    // </div>
  );
}
