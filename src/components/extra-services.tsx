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
    <div className="space-y-4 bg-gradient-to-br from-black via-gray-900 to-black p-4 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-lg font-semibold text-white">Add Extra Services</h2>
      {/* Scrollable List Container */}
      <div className="space-y-2 max-h-64 md:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {extraServices.map((service) => (
          <div
            key={service.id}
            className="flex items-center space-x-4 p-2 bg-gray-800 rounded-md hover:bg-gray-700"
          >
            {/* Checkbox */}
            <Checkbox
              id={`service-${service.id}`}
              checked={selectedServices.includes(service.id)}
              onCheckedChange={() => handleServiceToggle(service.id)}
              className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500 border-gray-600 rounded"
            />
            {/* Content */}
            <div className="flex-1">
              <span className="text-sm font-medium text-white">
                {service.title}
              </span>
              <div className="flex justify-between text-gray-400 text-xs mt-1">
                <span>{service.duration} min</span>
                <span className="text-right">MVR {service.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={handleConfirm}
        className="w-full mt-4 bg-gray-900 text-white border border-gray-800 hover:bg-gray-800 rounded-md focus:ring-2 focus:ring-gray-700"
      >
        Next
      </Button>
    </div>
  );
}
