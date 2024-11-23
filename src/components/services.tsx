import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Service = {
  id: string;
  title: string;
  photos: string[];
  videos: string[];
  description: string;
  duration: number;
  price: number;
  discount: number;
  category_id: string;
  display_order: number;
};

type Category = {
  id: string;
  title: string;
};

export default function Services() {
  const supabase = createClient();
  const [services, setServices] = useState<Service[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const formatPrice = (price: number) => `MVR${price.toFixed(2)}`;

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (100 - discount)) / 100;
  };

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: false });

      if (error) {
        console.error("Error fetching services:", error);
      } else {
        setServices(data as Service[]);
      }
    };
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("category")
        .select("id, title")
        .eq("active", true)
        .order("display_order", { ascending: false });
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data as Category[]);
      }
    };
    fetchCategories();
    fetchServices();
  }, []);

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services?.filter((service) => service.category_id === selectedCategory);

  return (
    <section id="services" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-thin ">Our Services </h2>
        <span className="text-red-500 text-sm text-center">
          GRAND OPENING SPECIALS!
          <br /> 30% Discount on all Services until 31st Dec 2024
        </span>
        <div className="flex flex-wrap gap-2 justify-center my-4">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            // variant=""
            onClick={() => setSelectedCategory("All")}
          >
            All
          </Button>
          {categories &&
            categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title}
              </Button>
            ))}
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices &&
                filteredServices.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-light">
                      {service.title}
                    </TableCell>
                    <TableCell className="text-right">
                      {service.discount > 0 ? (
                        <>
                          <span className="line-through text-gray-400 mr-2 text-xs">
                            {formatPrice(service.price)}
                          </span>
                          <span className="font-light text-md text-blue-600">
                            {formatPrice(
                              calculateDiscountedPrice(
                                service.price,
                                service.discount
                              )
                            )}
                          </span>
                        </>
                      ) : (
                        formatPrice(service.price)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{service.title}</DialogTitle>
                            <DialogDescription>
                              {service.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="font-thin text-lg">
                              Price:{" "}
                              {service.discount > 0 ? (
                                <>
                                  <span className="line-through text-gray-500 mr-2">
                                    {formatPrice(service.price)}
                                  </span>
                                  <span className="text-blue-600 font-light">
                                    {formatPrice(
                                      calculateDiscountedPrice(
                                        service.price,
                                        service.discount
                                      )
                                    )}
                                  </span>
                                </>
                              ) : (
                                formatPrice(service.price)
                              )}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
