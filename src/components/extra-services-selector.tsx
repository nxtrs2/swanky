import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
}

interface ExtraServicesSelectorProps {
  staffId: number | null;
  mainServiceId: number | null;
  onSelect: (services: number[]) => void;
}

export default function ExtraServicesSelector({
  staffId,
  mainServiceId,
  onSelect,
}: ExtraServicesSelectorProps) {
  const [extraServices, setExtraServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [mainService, setMainService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .neq("id", mainServiceId)
        .eq("staff_id", staffId);

      const { data: mainServiceData } = await supabase
        .from("services")
        .select("*")
        .eq("id", mainServiceId)
        .single();

      if (servicesData) setExtraServices(servicesData);
      if (mainServiceData) setMainService(mainServiceData);
    };

    fetchData();
  }, [staffId, mainServiceId]);

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotals = () => {
    const selectedExtraServices = extraServices.filter((service) =>
      selectedServices.includes(service.id)
    );
    const totalPrice =
      (mainService?.price || 0) +
      selectedExtraServices.reduce((sum, service) => sum + service.price, 0);
    const totalDuration =
      (mainService?.duration || 0) +
      selectedExtraServices.reduce((sum, service) => sum + service.duration, 0);
    return { totalPrice, totalDuration };
  };

  const { totalPrice, totalDuration } = calculateTotals();

  const handleNext = () => {
    onSelect(selectedServices);
  };

  return (
    <div className="p-4 min-w-screen">
      <h2 className="text-lg font-semibold mb-4">Add Extra Services</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <h3 className="text-md font-semibold mb-2">Extra Services</h3>
          <ul className="space-y-2">
            {extraServices.map((service) => (
              <li key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${service.id}`}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <label htmlFor={`service-${service.id}`} className="flex-1">
                  {service.name} - {service.duration}min - ${service.price}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-md font-semibold mb-2">Summary</h3>
          <p>Total Price: ${totalPrice}</p>
          <p>Total Duration: {totalDuration}min</p>
        </div>
      </div>
      <Button className="mt-4" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
}
