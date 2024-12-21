"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Great_Vibes } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import Auth from "./auth";
import StaffServiceSelector from "@/components/staff-service-selector";
import ExtraServices from "@/components/extra-services";
import TimeSelection from "@/components/time-selection";
import ConfirmBooking from "@/components/confirm-booking";
import { addDays, format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

const steps = [
  "Choose Staff & Service",
  "Select Date",
  "Add Extra Services",
  "Select Time",
  "Confirm Booking",
];

export default function Booking() {
  const supabase = createClient();
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [extraServices, setExtraServices] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    fetchUser();
  }, []);

  const handleStaffServiceSelect = (
    categoryId: string | null,
    staffId: string | null,
    serviceId: string | null
  ) => {
    setSelectedCategory(categoryId);
    setSelectedStaff(staffId);
    setSelectedService(serviceId);
    setStep(1);
  };

  const handleExtraServicesSelect = (services: string[]) => {
    setExtraServices(services);
    setStep(2);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date ? date : new Date());
  };

  const handleNextStepAfterDateSelect = () => {
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
          <StaffServiceSelector
            date={selectedDate!}
            onSelect={handleStaffServiceSelect}
            selectedCategoryId={selectedCategory}
            selectedStaffId={selectedStaff}
            selectedServiceId={selectedService}
          />
        );
      case 1:
        return (
          <ExtraServices
            date={selectedDate!}
            staffId={selectedStaff!}
            mainServiceId={selectedService!}
            onSelect={handleExtraServicesSelect}
          />
        );
      case 2:
        return (
          <div className="space-y-4 bg-gradient-to-br from-black via-gray-900 to-black p-4 rounded-lg shadow-lg border border-gray-800">
            <h2 className="text-lg font-semibold text-white">Select a Date</h2>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => handleDateSelect(date)}
                disabled={(date) =>
                  date < addDays(new Date(), -1) ||
                  date > addDays(new Date(), 5)
                }
              />
            </div>
            <Button
              disabled={!selectedDate}
              onClick={handleNextStepAfterDateSelect}
              className="w-full mt-4 bg-gray-900 text-white border border-gray-800 hover:bg-gray-800 rounded-md focus:ring-2 focus:ring-gray-700"
            >
              Next
            </Button>
          </div>
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
      {isLoggedIn && (
        <DialogContent className="sm:max-w-[825px] bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 rounded-lg shadow-lg">
          <DialogTitle
            className={`${greatVibes.className}  text-yellow-600 text-4xl text-center`}
          >
            Book an Appointment
          </DialogTitle>
          {/* <DialogDescription className=" text-white">
          Select dddd
        </DialogDescription> */}
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-end">
                {/* <h1 className="text-2xl font-bold">Book an Appointment</h1> */}
                {step > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="mt-4 bg-gray-900 text-white border border-gray-800 hover:bg-gray-800 rounded-md hover:text-blue-400 "
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>
              <Progress
                value={(step / (steps.length - 1)) * 100}
                className="w-full bg-blue-900 rounded-lg overflow-hidden border border-gray-600"
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                  style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                />
              </Progress>

              <div className="flex justify-between text-sm text-gray-200 ">
                {steps.map((stepName, index) => (
                  <span
                    key={stepName}
                    className={`${
                      index <= step
                        ? "font-medium text-primar text-blue-400"
                        : ""
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
      )}
      {!isLoggedIn && (
        <DialogContent className="sm:max-w-[825px] bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 rounded-lg shadow-lg">
          <DialogTitle
            className={`${greatVibes.className}  text-yellow-600 text-4xl text-center`}
          >
            Book an Appointment
          </DialogTitle>
          <DialogDescription className=" text-gray-400 animate-fade-in">
            <span>Let's get started by entering your phone number.</span>
          </DialogDescription>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-end">
                {/* <h1 className="text-2xl font-bold">Book an Appointment</h1> */}
                {step > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="mt-4 bg-gray-900 text-white border border-gray-800 hover:bg-gray-800 rounded-md hover:text-blue-400 "
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>
            </div>
            <Auth />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
