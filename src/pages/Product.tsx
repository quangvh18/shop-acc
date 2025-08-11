import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, currency } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const Product = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const navigate = useNavigate();
  const { add } = useCart();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!product) return <div className="p-8">Không tìm thấy sản phẩm.</div>;


const validate = () => {
  if (!email.trim()) return "Vui lòng nhập email đăng nhập.";
  if (!password.trim()) return "Vui lòng nhập mật khẩu.";
  return "";
};

const handleAdd = () => {
  const err = validate();
  if (err) {
    setError(err);
    return;
  }
  setError("");
  add(product.id, 1);
  toast({
    title: "Đã thêm vào giỏ hàng",
    description: (
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <span>{product.name} đã được thêm.</span>
      </div>
    )
  });
  navigate("/cart");
};


  const handleAddOnly = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    add(product.id, 1);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>{product.name} đã được thêm.</span>
        </div>
      )
    });
  };

  return (
    <>
      <Helmet>
        <title>{product.name} – Divine Shop</title>
        <meta name="description" content={`Mua ${product.name} giá tốt, giao hàng tự động tại Divine Shop.`} />
        <link rel="canonical" href={`/product/${product.slug}`} />
      </Helmet>
      <Header />
  <main className="container mx-auto px-4 mt-6 min-h-[60vh] grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={product.image} alt={product.name} className="w-full rounded-xl" />
        </div>
        <div className="md:col-span-7 space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Sản phẩm</div>
            <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-primary">{currency(product.price)}</div>
            {product.originalPrice && (
              <div className="text-muted-foreground line-through">{currency(product.originalPrice)}</div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Nhập thông tin tài khoản (bắt buộc)</h3>
            {/* <Input placeholder="Tên khách hàng" value={name} onChange={e=>setName(e.target.value)} /> */}
            <Input placeholder="Email đăng nhập" value={email} onChange={e=>setEmail(e.target.value)} />
            <Input placeholder="Mật khẩu" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <Input placeholder="Mã 2FA (nếu có)" />
            {error && <div className="text-sm text-red-500 pt-1">{error}</div>}
            <div className="text-sm text-muted-foreground">Hướng dẫn lấy mã sẽ hiển thị trong quá trình thanh toán.</div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="hero" onClick={handleAdd}>Mua ngay</Button>
            <Button variant="soft" onClick={handleAddOnly}>Thêm vào giỏ</Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Product;
