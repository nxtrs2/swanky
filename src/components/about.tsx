import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = ["/carousel/img1.jpg"];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image
                        src={src}
                        alt={`About Swanky Shears ${index + 1}`}
                        width={700}
                        height={300}
                        className="object-cover w-full h-[300px]"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-thin mb-4">About Us</h2>
            <p className="text-lg mb-4 font-thin ">
              At Swanky Shears, we blend traditional barbering techniques with
              modern styles to give you the perfect look. Our experienced
              barbers are dedicated to providing top-notch service in a relaxed,
              friendly atmosphere.
            </p>
            <p className="text-lg font-thin">
              With a passion for our craft, we ensure that every client leaves
              our chair feeling confident and looking their best. From classic
              cuts to trendy styles, we&apos;ve got you covered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
