import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/marketing/HeroSection";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Divine Shop – Mua tài khoản số, phần mềm bản quyền giá rẻ</title>
        <meta name="description" content="Sản phẩm nổi bật: AI, VPN, YouTube Premium, Windows, JetBrains… Giao tự động, uy tín." />
        <link rel="canonical" href="/" />
      </Helmet>
      <Header />
  <main className="container mx-auto px-4 min-h-[60vh]">
        <HeroSection />
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold">Sản phẩm nổi bật</h1>
              <p className="text-muted-foreground">Danh sách những sản phẩm theo xu hướng mà có thể bạn sẽ thích</p>
            </div>
            <Button variant="outline">Khám phá</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Index;
