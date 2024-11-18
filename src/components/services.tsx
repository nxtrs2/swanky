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

const services = [
  {
    name: "Haircut",
    price: 140,
    discount: 30,
    description: "A classic haircut service. Usually takes 15 to 30 minutes.",
  },
  {
    name: "Haircut + beard",
    price: 160,
    discount: 30,
    description:
      "Combination of haircut and beard trim. Usually takes 30 to 45 minutes.",
  },
  {
    name: "Beard trim",
    price: 80,
    discount: 30,
    description:
      "Beard trimming and styling service. Usually takes 15 minutes.",
  },
  {
    name: "Head massage",
    price: 80,
    discount: 30,
    description: "20 minutes of relaxing head massage.",
  },
  {
    name: "Hair treatment for dry hair",
    price: 250,
    discount: 30,
    description: "Specialized treatment for dry hair.",
  },
  {
    name: "Hair falling treatment",
    price: 250,
    discount: 30,
    description: "Treatment to address hair fall issues.",
  },
  {
    name: "Conditioning treatment",
    price: 250,
    discount: 30,
    description: "Deep conditioning treatment for hair.",
  },
  //   {
  //     name: "Hair colour black - S",
  //     price: 200,
  //     discount: 0,
  //     description: "Black hair coloring for short hair.",
  //   },
  //   {
  //     name: "Hair colour black - M",
  //     price: 350,
  //     discount: 0,
  //     description: "Black hair coloring for medium-length hair.",
  //   },
  //   {
  //     name: "Hair colour black - L",
  //     price: 500,
  //     discount: 0,
  //     description: "Black hair coloring for long hair.",
  //   },
  //   {
  //     name: "Hair colour - fashion colour - S",
  //     price: 300,
  //     discount: 0,
  //     description: "Fashion hair coloring for short hair.",
  //   },
  //   {
  //     name: "Hair colour - fashion colour - M",
  //     price: 500,
  //     discount: 0,
  //     description: "Fashion hair coloring for medium-length hair.",
  //   },
  //   {
  //     name: "Hair colour - fashion colour - L",
  //     price: 1000,
  //     discount: 0,
  //     description: "Fashion hair coloring for long hair.",
  //   },
  //   {
  //     name: "Hair highlight - S",
  //     price: 350,
  //     discount: 0,
  //     description: "Hair highlighting for short hair.",
  //   },
  //   {
  //     name: "Hair highlight - M",
  //     price: 600,
  //     discount: 0,
  //     description: "Hair highlighting for medium-length hair.",
  //   },
  //   {
  //     name: "Hair highlight - L",
  //     price: 1000,
  //     discount: 0,
  //     description: "Hair highlighting for long hair.",
  //   },
  //   {
  //     name: "Facial herbal",
  //     price: 350,
  //     discount: 0,
  //     description: "Herbal facial treatment.",
  //   },
  //   {
  //     name: "Facial gold",
  //     price: 450,
  //     discount: 0,
  //     description: "Luxurious gold facial treatment.",
  //   },
  //   {
  //     name: "Pedicure - Express",
  //     price: 300,
  //     discount: 0,
  //     description: "Quick pedicure service.",
  //   },
  //   {
  //     name: "Pedicure - Full",
  //     price: 700,
  //     discount: 0,
  //     description: "Comprehensive pedicure service.",
  //   },
  //   {
  //     name: "Manicure",
  //     price: 200,
  //     discount: 0,
  //     description: "Professional manicure service.",
  //   },
  //   {
  //     name: "Rebounding - S",
  //     price: 800,
  //     discount: 0,
  //     description: "Hair rebounding for short hair.",
  //   },
  //   {
  //     name: "Rebounding - M",
  //     price: 1200,
  //     discount: 0,
  //     description: "Hair rebounding for medium-length hair.",
  //   },
  //   {
  //     name: "Rebounding - L",
  //     price: 1500,
  //     discount: 0,
  //     description: "Hair rebounding for long hair.",
  //   },
  //   {
  //     name: "Hair perming - S",
  //     price: 800,
  //     discount: 0,
  //     description: "Hair perming for short hair.",
  //   },
  //   {
  //     name: "Hair perming - M",
  //     price: 1200,
  //     discount: 0,
  //     description: "Hair perming for medium-length hair.",
  //   },
  //   {
  //     name: "Hair perming - L",
  //     price: 1500,
  //     discount: 0,
  //     description: "Hair perming for long hair.",
  //   },
  //   {
  //     name: "Hair wash",
  //     price: 50,
  //     discount: 0,
  //     description: "Basic hair wash service.",
  //   },
];

export default function Services() {
  const formatPrice = (price: number) => `MVR${price.toFixed(2)}`;

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (100 - discount)) / 100;
  };

  return (
    <section id="services" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-thin ">Our Services </h2>
        <span className="text-red-500 text-sm text-center">
          GRAND OPENING SPECIALS!
          <br /> 30% Discount on all Services until 31st Dec 2024
        </span>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="text-right"></TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service, index) => (
                <TableRow key={index}>
                  <TableCell className="font-light">{service.name}</TableCell>
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
                          <DialogTitle>{service.name}</DialogTitle>
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
                          {/* {service.discount > 0 && (
                            <p className="text-green-600">
                              You save: {formatPrice(service.discount)}
                            </p>
                          )} */}
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
