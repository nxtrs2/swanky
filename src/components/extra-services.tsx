"use client";

import { useState, useEffect } from "react";
import { Service, ExtraServicesProps } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

// interface Service {
//   id: number;
//   title: string;
//   duration: number;
//   price: number;
// }

// interface ExtraServicesProps {
//   date: Date;
//   staffId: number;
//   mainServiceId: number;
//   onSelect: (services: number[]) => void;
// }

export default function ExtraServices({
  date,
  staffId,
  mainServiceId,
  onSelect,
}: ExtraServicesProps) {
  const supabase = createClient();
  const [extraServices, setExtraServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExtraServices = async () => {
      setLoading(true);

      try {
        // Step 1: Fetch the service IDs associated with the staff
        const { data: staffServices, error: staffServicesError } =
          await supabase
            .from("staff_services")
            .select("service_id")
            .eq("staff_id", staffId);

        if (staffServicesError) {
          console.error("Error fetching staff services:", staffServicesError);
          setLoading(false);
          return;
        }

        // Extract the service IDs
        const serviceIds = staffServices.map((item) => item.service_id);

        // Step 2: Fetch the services excluding the main service
        const { data: services, error: servicesError } = await supabase
          .from("services")
          .select("*")
          .neq("id", mainServiceId)
          .in("id", serviceIds);

        if (servicesError) {
          console.error("Error fetching services:", servicesError);
          setLoading(false);
          return;
        }

        // Update the state with the fetched services
        setExtraServices(services);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExtraServices();
  }, [staffId, mainServiceId]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleConfirm = () => {
    onSelect(selectedServices);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Add Extra Services</h2>
      <div className="space-y-2">
        {extraServices.map((service) => (
          <div key={service.id} className="flex items-center space-x-2">
            <Checkbox
              id={`service-${service.id}`}
              checked={selectedServices.includes(service.id)}
              onCheckedChange={() => handleServiceToggle(service.id)}
            />
            <label
              htmlFor={`service-${service.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {service.title} - {service.duration} min - MVR {service.price}
            </label>
          </div>
        ))}
      </div>
      <Button onClick={handleConfirm}>Next</Button>
    </div>
  );
}
