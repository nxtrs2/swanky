import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";

type HeroProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
};

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageUrl,
}: HeroProps) {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          quality={100}
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative container mx-auto px-4 py-32 sm:py-48 lg:py-56">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold lg:font-normal tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-xl sm:text-2xl max-w-xl">{subtitle}</p>
          <div className="mt-10">
            <Button variant="secondary" asChild size="lg">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
