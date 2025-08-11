import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import * as React from "react";
import hero1 from "@/assets/hero-capcut.png";
import hero2 from "@/assets/hero-netflix.png";
import hero3 from "@/assets/hero-youtube.png";
import hero4 from "@/assets/hero-google-one.png";
import hero5 from "@/assets/hero-zoom.png";

const slides = [
  { img: hero1, alt: "Ứng dụng CapCut" },
  { img: hero2, alt: "Ứng dụng Netflix" },
  { img: hero3, alt: "Ứng dụng YouTube" },
  { img: hero4, alt: "Ứng dụng Google One" },
  { img: hero5, alt: "Ứng dụng Zoom" },
];

const HeroCarousel = () => {
  const [api, setApi] = React.useState<any>(null);

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="container mx-auto mt-4">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={i}>
              <img src={s.img} alt={s.alt} loading="eager" className="w-full rounded-xl" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
