"use client";
import Link from "next/link";
import { Scissors } from "lucide-react";
import Services from "@/components/services";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Header from "@/components/header";
import About from "@/components/about";

export default function SwankyShears() {
  const footerProps = {
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    address: "First Floor, H.Asfam, Bodufungandu Magu, Malé, Maldives",
    phone: "(+960) 775-8060",
    email: "info@swankyshears.com",
    openingHours: {
      "Monday - Friday": "9am - 7pm",
      Saturday: "10am - 6pm",
      Sunday: "Closed",
    },
  };

  const heroProps = {
    title: "The New Premium Barbershop in Town",
    subtitle: "Where Style, Comfort, and Expertise Converge",
    ctaText: "View Our Services",
    ctaLink: "#services",
    imageUrl: "/hero/homepage.jpg",
  };

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = {
    lat: 40.7128, // Replace with actual latitude
    lng: -74.006, // Replace with actual longitude
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main>
        <Hero {...heroProps} />
        <About />
        <Services />

        {/* <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <p>
                    <strong>Address:</strong> 123 Main St, Anytown, USA 12345
                  </p>
                  <p>
                    <strong>Phone:</strong> (555) 123-4567
                  </p>
                  <p>
                    <strong>Email:</strong> info@swankyshears.com
                  </p>
                  <div>
                    <strong>Opening Hours:</strong>
                    <ul className="list-disc list-inside pl-4">
                      <li>Monday - Friday: 9am - 7pm</li>
                      <li>Saturday: 10am - 6pm</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
      </main>

      <Footer {...footerProps} />
    </div>
  );
}
