import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import hero1 from "@/assets/hero-capcut.png";
import hero2 from "@/assets/hero-youtube.png";
import hero3 from "@/assets/hero-netflix.png";
import { Link } from "react-router-dom";
import { Gamepad2, GraduationCap, Shield, Laptop, Brain, Code } from "lucide-react";
import designBg from "@/assets/thiet-ke.png";
import aiBg from "@/assets/ai.png";

const slides = [
  { img: hero1, alt: "Khuyến mại YouTube" },
  { img: hero2, alt: "Ứng dụng CapCut" },
  { img: hero3, alt: "Steam Wallet siêu tiết kiệm" },
];

const categories = [
  { label: "Giải trí", icon: Gamepad2, to: "/search?category=Gi%E1%BA%A3i%20tr%C3%AD" },
  { label: "Học tập", icon: GraduationCap, to: "/search?category=H%E1%BB%8Dc%20t%E1%BA%ADp" },
  { label: "Bảo mật", icon: Shield, to: "/search?category=B%E1%BA%A3o%20m%E1%BA%ADt" },
  { label: "Hệ điều hành", icon: Laptop, to: "/search?category=H%E1%BB%87%20%C4%91i%E1%BB%81u%20h%C3%A0nh" },
  { label: "AI", icon: Brain, to: "/search?category=AI" },
  { label: "Dev", icon: Code, to: "/search?category=Dev" },
];

const HeroSection = () => {
  return (
  <section className="mt-4 grid grid-cols-12 gap-4 items-stretch">
      {/* Left categories */}
      <aside className="col-span-12 md:col-span-3 h-full">
        <nav className="rounded-xl border bg-card p-3 h-full flex flex-col">
          <ul className="space-y-2 flex-1">
            {categories.map(({ label, icon: Icon, to }) => (
              <li key={label}>
                <Link to={to} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Center carousel */}
      <div className="col-span-12 md:col-span-6 flex flex-col h-full">
        <div className="flex-1 flex h-full min-h-full">
          <Carousel className="w-full flex-1 h-full min-h-full">
            <CarouselContent className="h-full min-h-full">
              {slides.map((s, i) => (
                <CarouselItem key={i} className="h-full min-h-full flex">
                  <img src={s.img} alt={s.alt} loading="eager" className="w-full h-full min-h-full object-cover rounded-xl flex-1" style={{minHeight: 180}} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Right banners */}
  <aside className="col-span-12 md:col-span-3 grid gap-4 h-full">
        <Link to="/search?category=B%E1%BA%A3o%20m%E1%BA%ADt" className="rounded-xl border p-0 relative overflow-hidden group" style={{background: `#eaf1ff`}}>
          <img src={designBg} alt="VPN" className="w-full h-32 md:h-40 object-cover" />
        </Link>
        <Link to="/search?category=AI" className="rounded-xl border p-0 relative overflow-hidden group" style={{background: `#f8fafd`}}>
          <img src={aiBg} alt="AI" className="w-full h-32 md:h-40 object-cover" />
        </Link>
      </aside>
    </section>
  );
};

export default HeroSection;
