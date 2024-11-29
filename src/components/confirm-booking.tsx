"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";

interface Props {
  date: Date;
  time: string;
  staffId: number;
  serviceId: number;
  extraServices: number[];
  onConfirm: () => void;
}

export default function ConfirmBooking({
  date,
  time,
  staffId,
  serviceId,
  extraServices,
  onConfirm,
}: Props) {
  const supabase = createClient();
  const [staffName, setStaffName] = useState("");
  const [services, setServices] = useState<
    { name: string; duration: number; price: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const [staffResponse, servicesResponse] = await Promise.all([
        supabase.from("staff").select("name").eq("id", staffId).single(),
        supabase
          .from("services")
          .select("name, duration, price")
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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Confirm Booking</h2>
      <div>
        <p>
          <strong>Date:</strong> {format(date, "MMMM d, yyyy")}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Staff:</strong> {staffName}
        </p>
        <p>
          <strong>Services:</strong>
        </p>
        <ul className="list-disc list-inside">
          {services.map((service, index) => (
            <li key={index}>
              {service.name} - {service.duration} min - MVR {service.price}
            </li>
          ))}
        </ul>
        <p>
          <strong>Total Duration:</strong> {totalDuration} min
        </p>
        <p>
          <strong>Total Price:</strong> MVR {totalPrice}
        </p>
      </div>
      <Button onClick={onConfirm}>Confirm Booking</Button>
    </div>
  );
}
