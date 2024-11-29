import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface Staff {
  id: number;
  name: string;
  profile_photo_url: string;
}

interface Service {
  id: number;
  name: string;
  title: string;
  duration: number;
  price: number;
}

interface StaffServiceSelectorProps {
  onSelect: (staffId: number | null, serviceId: number | null) => void;
}

export default function StaffServiceSelector({
  onSelect,
}: StaffServiceSelectorProps) {
  const supabase = createClient();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: staffData } = await supabase.from("staff").select("*");
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .limit(5);

      if (staffData) setStaff(staffData);
      if (servicesData) setServices(servicesData);
    };

    fetchData();
  }, []);

  const handleStaffSelect = (staffId: number) => {
    setSelectedStaff(staffId);
    setSelectedService(null);
  };

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
  };

  const handleNext = () => {
    onSelect(selectedStaff, selectedService);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Choose Staff or Service</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <h3 className="text-md font-semibold mb-2">Staff</h3>
          <div className="flex flex-wrap gap-2">
            {staff.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <Avatar
                  className={`cursor-pointer ${
                    selectedStaff === s.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleStaffSelect(s.id)}
                >
                  <AvatarImage src={s.profile_photo_url} alt={s.name} />
                  <AvatarFallback>{s.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="mt-1 text-sm">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-md font-semibold mb-2">Services</h3>
          <ul className="space-y-2">
            {services.map((service) => (
              <li
                key={service.id}
                className={`cursor-pointer p-2 rounded ${
                  selectedService === service.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
                onClick={() => handleServiceSelect(service.id)}
              >
                <span>{service.name}</span>
                <span className="float-right">
                  {service.duration}min - MVR {service.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button
        className="mt-4"
        onClick={handleNext}
        disabled={!selectedStaff || !selectedService}
      >
        Next
      </Button>
    </div>
  );
}
