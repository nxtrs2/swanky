"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Menu, Clock } from "lucide-react";
import { Gwendolyn } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Hero from "@/components/hero";
import Header from "@/components/header";
import Footer from "@/components/footer";

const gwendolyn = Gwendolyn({ subsets: ["latin"], weight: ["400", "700"] });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

const footerProps = {
  googleMapsApiKey: "AIzaSyBN0T4epPdoJNwfe4cFgvl4oz-mkwQbQGI",
  address: "First Floor, H.Asfam, Bodufungandu Magu, Malé, Maldives",
  phone: "(+960) 775-8060",
  email: "info@swankyshears.com",
  openingHours: {
    "Saturday - Thursday": "10am - 11pm",
    Friday: "9am - 11am",
  },
};

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  active: boolean;
  display_order: number;
  photos?: string[];
  videos?: string[];
  duration?: number;
  discount?: number;
  category_id?: string;
}

interface CategoryWithServices {
  id: number;
  title: string;
  description: string;
  services: Service[];
}

const heroProps = {
  title: "Men's Grooming Services",
  subtitle: " Style, Comfort, and Expertise exclusively for men",
  ctaText: "View Our Services",
  ctaLink: "#services",
  imageUrl: "/hero/services.jpg",
};

export default function ServicesPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState<CategoryWithServices[]>([]);

  useEffect(() => {
    const fetchCategoriesWithServices = async () => {
      const { data, error } = await supabase
        .from("category")
        .select(
          `
              id,
              title,
              description,
              services (
                id,
                title,
                description,
                price,
                active,
                duration,
                display_order
              )
            `
        )
        .eq("active", true)
        .eq("services.active", true)
        .order("display_order", { ascending: false });

      if (error) {
        console.error("Error fetching categories with services:", error);
      } else {
        setCategories(data as CategoryWithServices[]);
      }
    };

    fetchCategoriesWithServices();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main>
        <Hero {...heroProps} />
        <div className="max-w-6xl mx-auto">
          <h1 className="flex items-center justify-center py-10 text-center">
            <span className="flex-grow border-t border-yellow-600 ms-4"></span>
            <span
              className={`${greatVibes.className} text-yellow-600 text-6xl px-4`}
            >
              Our Services
            </span>
            <span className="flex-grow border-t border-yellow-600 me-4"></span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mx-auto py-3">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 rounded-lg shadow-lg"
              >
                <CardHeader>
                  <CardTitle
                    className={`${greatVibes.className} text-yellow-600  text-4xl text-center`}
                  >
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 py-3 text-md">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.services.map((service, serviceIndex) => (
                      <li
                        key={serviceIndex}
                        className="flex justify-between items-center border-b border-gray-800 py-2"
                      >
                        <div className="ml-4">
                          <span className="font-normal text-sm lg:font-medium lg:text-lg text-blue-100">
                            {service.title}
                          </span>
                          <span className="text-xs text-gray-400">
                            {/* <Clock className="mr-1 text-xs" />{" "} */} (
                            {service.duration}m)
                          </span>
                        </div>
                        <span className="font-extralight text-xs lg:font-medium lg:text-lg  text-yellow-500 ">
                          MVR {service.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer {...footerProps} />
    </div>
  );
}
