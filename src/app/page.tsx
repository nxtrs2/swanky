"use client";
import Link from "next/link";
import Services from "@/components/services";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Header from "@/components/header";
import About from "@/components/about";

export default function SwankyShears() {
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

  const heroProps = {
    title: "The New Premium Barbershop in Town",
    subtitle: "Where Style, Comfort, and Expertise Converge",
    ctaText: "View Our Services",
    ctaLink: "/services",
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
    <div className="min-h-screen bg-gray-900">
      <Header />

      <main>
        <Hero {...heroProps} />
        <About />
        {/* <Services /> */}
      </main>

      <Footer {...footerProps} />
    </div>
  );
}
