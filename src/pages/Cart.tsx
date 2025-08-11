import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { currency } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const { detailed, total, setQty, remove } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [zalo, setZalo] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <Helmet>
        <title>Giỏ hàng – Shop Premium</title>
        <meta name="description" content="Kiểm tra sản phẩm trong giỏ hàng của bạn và tiến hành thanh toán." />
        <link rel="canonical" href="/cart" />
      </Helmet>
      <Header />
      <main className="container mx-auto mt-8 px-4 grid gap-6 md:grid-cols-12">
        <section className="md:col-span-8 space-y-4">
          <h1 className="text-2xl font-bold">Giỏ hàng ({detailed.length} sản phẩm)</h1>
          {detailed.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 rounded-lg border p-3">
              <img src={item.product.image} alt={item.product.name} className="h-24 w-40 rounded object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{item.product.name}</div>
                <div className="text-muted-foreground text-sm">Tình trạng: Còn hàng</div>
                <div className="mt-1">
                  <div className="text-xs text-muted-foreground mb-1">Số tháng</div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => setQty(item.productId, Math.max(1, item.quantity - 1))}><Minus /></Button>
                    <Input aria-label="Số tháng" value={item.quantity} onChange={(e)=>setQty(item.productId, Math.max(1, Number(e.target.value)||1))} className="w-16 text-center" />
                    <Button size="icon" variant="outline" onClick={() => setQty(item.productId, item.quantity + 1)}><Plus /></Button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{currency(item.product.price * item.quantity)}</div>
                <Button variant="ghost" onClick={() => remove(item.productId)} className="mt-2 text-destructive"><Trash2 /> Xóa</Button>
              </div>
            </div>
          ))}
          {detailed.length === 0 && (
            <div className="rounded-lg border p-8 text-center text-muted-foreground">Giỏ hàng trống. <Link to="/" className="underline">Tiếp tục mua sắm</Link></div>
          )}
        </section>
        <aside className="md:col-span-4 space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-3 text-lg font-semibold">Thanh toán</h2>
            <div className="flex items-center justify-between">
              <span>Tổng giá trị sản phẩm</span>
              <span className="font-semibold">{currency(total)}</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Nhập thông tin khách hàng</div>
            <div className="mt-2 flex flex-col gap-2">
              <Input placeholder="Tên khách hàng (bắt buộc)" value={name} onChange={e=>setName(e.target.value)} />
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-md border bg-muted px-3">+84</span>
                <Input placeholder="Số Zalo (bắt buộc)" value={zalo} onChange={e=>setZalo(e.target.value.replace(/\D/g, ""))} maxLength={11} />
              </div>
            </div>
            {error && <div className="text-sm text-red-500 pt-1">{error}</div>}
            <Button className="mt-4 w-full" variant="hero" disabled={detailed.length===0} onClick={() => {
              if (!name.trim()) {
                setError('Vui lòng nhập tên khách hàng.');
                return;
              }
              if (!zalo.trim()) {
                setError('Vui lòng nhập số Zalo.');
                return;
              }
              if (!/^\d{9,11}$/.test(zalo.trim())) {
                setError('Số Zalo không hợp lệ.');
                return;
              }
              setError("");
              navigate('/checkout');
            }}>Xác nhận thanh toán</Button>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
