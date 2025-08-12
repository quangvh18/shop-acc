import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/marketing/HeroSection";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Shop Premium – Mua tài khoản số, phần mềm bản quyền giá rẻ</title>
        <meta name="description" content="Sản phẩm nổi bật: AI, VPN, YouTube Premium, Windows, JetBrains… Giao tự động, uy tín." />
        <link rel="canonical" href="/" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto px-4 animate-fade-in">
        <HeroSection />
        
        <section className="mt-8 sm:mt-12 lg:mt-16 pb-8">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-responsive-xl font-bold gradient-text">Sản phẩm nổi bật</h2>
              <p className="text-muted-foreground text-responsive">
                Danh sách những sản phẩm theo xu hướng mà có thể bạn sẽ thích
              </p>
            </div>
            <Button variant="outline" className="btn-soft w-fit" asChild>
              <Link to="/search">
                Khám phá
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, index) => (
              <div 
                key={p.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
