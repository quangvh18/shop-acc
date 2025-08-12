import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { currency } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import qrImage from "@/assets/qrcode.jpg";

const Payment = () => {
  const { total, clear } = useCart();
  const navigate = useNavigate();
  const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();

  const onDone = () => {
    clear();
    toast({
      title: "Thanh toán thành công!",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Cảm ơn bạn đã đặt hàng. Liên hệ Zalo 0987328409 để được hỗ trợ nhanh nhất.</span>
        </div>
      ),
    });
    setTimeout(() => {
      navigate("/thankyou");
    }, 600);
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán – Shop Premium</title>
        <meta name="description" content="Quét mã QR để thanh toán đơn hàng tại Shop Premium." />
        <link rel="canonical" href="/payment" />
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
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">3</span>
            <span>Thanh toán</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-lg border p-4">
            <h1 className="mb-4 text-xl font-bold">Chuyển khoản ngân hàng - Mua siêu tốc</h1>
            <div className="text-sm text-muted-foreground">Số tiền: <span className="font-semibold text-foreground">{currency(total)}</span></div>
            <div className="mt-4 flex items-center justify-center">
              <div className="rounded-md border bg-white p-3">
                <img
                  src={qrImage}
                  alt="Mã QR thanh toán"
                  width={240}
                  height={240}
                  className="block"
                />
              </div>
            </div>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm">
              <li>Mở ứng dụng Mobile Banking của ngân hàng.</li>
              <li>Chọn Thanh Toán và quét mã QR bên cạnh.</li>
              <li>Không thay đổi nội dung chuyển khoản để hệ thống xử lý tự động.</li>
            </ol>
            <div className="mt-6 flex justify-end">
              <Button variant="hero" onClick={onDone}>Hoàn tất</Button>
            </div>
          </section>
          <aside className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Mã đơn hàng</div>
            <div className="text-2xl font-extrabold tracking-widest">{orderId}</div>
            <div className="mt-4">Tổng tiền phải thanh toán</div>
            <div className="text-2xl font-extrabold text-primary">{currency(total)}</div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
