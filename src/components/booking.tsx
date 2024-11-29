"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import StaffServiceSelector from "@/components/staff-service-selector";
import ExtraServices from "@/components/extra-services";
import TimeSelection from "@/components/time-selection";
import ConfirmBooking from "@/components/confirm-booking";
import { addDays } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const steps = [
  "Select Date",
  "Choose Staff & Service",
  "Add Extra Services",
  "Select Time",
  "Confirm Booking",
];

export default function Booking() {
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [extraServices, setExtraServices] = useState<number[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setStep(1);
  };

  const handleStaffServiceSelect = (
    staffId: number | null,
    serviceId: number | null
  ) => {
    setSelectedStaff(staffId);
    setSelectedService(serviceId);
    setStep(2);
  };

  const handleExtraServicesSelect = (services: number[]) => {
    setExtraServices(services);
    setStep(3);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleConfirm = async () => {
    // TODO: Implement booking confirmation logic with Supabase
    console.log("Booking confirmed:", {
      selectedDate,
      selectedStaff,
      selectedService,
      extraServices,
      selectedTime,
    });
    // Reset the booking process
    setStep(0);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select a Date</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date < new Date() || date > addDays(new Date(), 5)
              }
            />
          </div>
        );
      case 1:
        return (
          <StaffServiceSelector
            onSelect={handleStaffServiceSelect}
            selectedStaff={selectedStaff}
            selectedService={selectedService}
          />
        );
      case 2:
        return (
          <ExtraServices
            staffId={selectedStaff!}
            mainServiceId={selectedService!}
            onSelect={handleExtraServicesSelect}
          />
        );
      case 3:
        return (
          <TimeSelection
            date={selectedDate!}
            staffId={selectedStaff!}
            serviceId={selectedService!}
            extraServices={extraServices}
            onSelect={handleTimeSelect}
          />
        );
      case 4:
        return (
          <ConfirmBooking
            date={selectedDate!}
            time={selectedTime!}
            staffId={selectedStaff!}
            serviceId={selectedService!}
            extraServices={extraServices}
            onConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogTitle>Book an Appointment</DialogTitle>
        <DialogDescription>
          Follow the steps below to book an appointment.
        </DialogDescription>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Book an Appointment</h1>
              {step > 0 && (
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            <Progress
              value={(step / (steps.length - 1)) * 100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              {steps.map((stepName, index) => (
                <span
                  key={stepName}
                  className={`${
                    index <= step ? "font-medium text-primary" : ""
                  }`}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
