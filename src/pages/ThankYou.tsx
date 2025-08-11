import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <title>Cảm ơn bạn đã đặt hàng! – Divine Shop</title>
        <meta name="description" content="Cảm ơn bạn đã đặt hàng tại Divine Shop. Liên hệ Zalo 0987328409 để được hỗ trợ nhanh nhất." />
        <link rel="canonical" href="/thankyou" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 min-h-[40vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">🎉 Cảm ơn bạn đã đặt hàng!</h1>
        <p className="mb-2">Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ xử lý trong thời gian sớm nhất.</p>
        <p className="mb-2">Nếu cần hỗ trợ nhanh, vui lòng liên hệ <b>Zalo: 0987328409</b>.</p>
        <a href="https://zalo.me/0987328409" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Liên hệ Zalo</a>
      </main>
      <Footer />
    </>
  );
};

export default ThankYou;
