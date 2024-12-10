"use client";

import { useState, useEffect } from "react";
import { Category, Service, Staff, StaffServiceSelectorProps } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StaffServiceSelector({
  date,
  selectedCategoryId,
  selectedStaffId,
  selectedServiceId,
  onSelect,
}: StaffServiceSelectorProps) {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set initial state based on props
    setSelectedCategory(selectedCategoryId || null);
    setSelectedService(selectedServiceId || null);
    setSelectedStaff(selectedStaffId || null);
  }, [selectedCategoryId, selectedServiceId, selectedStaffId]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: false });

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      if (selectedCategory) {
        setLoading(true);
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("category_id", selectedCategory)
          .eq("active", true)
          .order("display_order", { ascending: false });

        if (error) {
          console.error("Error fetching services:", error);
        } else {
          setServices(data);
        }
        setLoading(false);
      }
    };

    fetchServices();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchStaff = async () => {
      if (selectedService) {
        setLoading(true);
        const { data, error } = await supabase
          .from("staff_services")
          .select("staff_id")
          .eq("service_id", selectedService);

        if (error) {
          console.error("Error fetching staff_services:", error);
        } else {
          const staffIds = data.map((item) => item.staff_id);
          const { data: staffData, error: staffError } = await supabase
            .from("staff")
            .select("*")
            .in("id", staffIds)
            .eq("active", true);

          if (staffError) {
            console.error("Error fetching staff:", staffError);
          } else {
            setStaff(staffData);
          }
        }
        setLoading(false);
      }
    };

    fetchStaff();
  }, [selectedService]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedService(null);
    setSelectedStaff(null);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedStaff(null);
  };

  const handleStaffSelect = (staffId: string) => {
    setSelectedStaff(staffId);
  };

  const handleNext = () => {
    onSelect(selectedCategory, selectedStaff, selectedService);
  };

  if (loading && categories.length === 0) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-gradient-to-br from-black via-gray-900 to-black p-4 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-sm font-thin mb-4 text-white">
        Choose a Category, Service, and a Staff
      </h2>

      <div>
        {/* <label
          htmlFor="category-select"
          className="block text-sm font-medium text-white mb-1"
        >
          Category
        </label> */}
        <Select
          onValueChange={handleCategorySelect}
          value={selectedCategory || undefined}
        >
          <SelectTrigger
            id="category-select"
            className="bg-gray-900 text-white border border-gray-800 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-700"
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 text-white rounded-md shadow-lg">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <div>
          {/* <label
            htmlFor="service-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Service
          </label> */}
          <Select
            onValueChange={handleServiceSelect}
            value={selectedService || undefined}
          >
            <SelectTrigger
              id="service-select"
              className="bg-gray-900 text-white border border-gray-800 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-700"
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 text-white rounded-md shadow-lg">
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} - {service.duration}min - MVR {service.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedService && (
        <div>
          <h3 className="text-sm font-light text-white mb-2">Choose Staff</h3>
          <div className="flex flex-wrap gap-4">
            {staff.map((s) => (
              <div key={s.id} className="flex flex-col items-center space-y-2">
                {/* Avatar */}
                <Avatar
                  className={`cursor-pointer w-16 h-16 rounded-full ${
                    selectedStaff === s.id ? "ring-4 ring-yellow-600" : ""
                  }`}
                  onClick={() => handleStaffSelect(s.id)}
                >
                  <AvatarImage
                    src={s.profile_photo_url || undefined}
                    alt={s.name}
                    className="rounded-full"
                  />
                  <AvatarFallback className="rounded-full">
                    {s.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {/* Staff Name */}
                <span className="text-sm font-medium text-white">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        className="w-full mt-4 bg-gray-900 text-white border border-gray-800 hover:bg-gray-800 rounded-md focus:ring-2 focus:ring-gray-700"
        onClick={handleNext}
        disabled={!selectedStaff || !selectedService}
      >
        Next
      </Button>
    </div>
  );
}
