import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { currency } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { detailed, total } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Xác nhận – Divine Shop</title>
        <meta name="description" content="Xác nhận thông tin đơn hàng của bạn trước khi thanh toán." />
        <link rel="canonical" href="/checkout" />
      </Helmet>
      <Header />
  <main className="container mx-auto mt-8 min-h-[60vh]">
        <div className="mb-6">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">1</span>
            <span>Giỏ hàng</span>
            <div className="h-px w-10 bg-border" />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">2</span>
            <span>Xác nhận</span>
            <div className="h-px w-10 bg-border" />
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">3</span>
            <span>Thanh toán</span>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h1 className="mb-4 text-xl font-bold">Tóm tắt đơn hàng</h1>
          <ul className="space-y-2">
            {detailed.map((i)=> (
              <li key={i.productId} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <img src={i.product.image} alt={i.product.name} className="w-8 h-8 rounded object-cover border" />
                  {i.product.name} x{i.quantity}
                </span>
                <span className="font-semibold">{currency(i.product.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t pt-4 text-lg">
            <span>Tổng cộng</span>
            <span className="font-extrabold text-primary">{currency(total)}</span>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={()=>navigate('/cart')}>Trở về Giỏ hàng</Button>
            <Button variant="hero" onClick={()=>navigate('/payment')}>Tiếp tục thanh toán</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
