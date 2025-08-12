import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Cảm ơn bạn đã đặt hàng! – Shop Premium</title>
        <meta name="description" content="Cảm ơn bạn đã đặt hàng tại Shop Premium. Liên hệ Zalo 0987328409 để được hỗ trợ nhanh nhất." />
        <link rel="canonical" href="/thankyou" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-600">🎉 Cảm ơn bạn đã đặt hàng!</h1>
          <div className="space-y-4 text-lg">
            <p>Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ xử lý trong thời gian sớm nhất.</p>
            <p>Nếu cần hỗ trợ nhanh, vui lòng liên hệ <b>Zalo: 0987328409</b>.</p>
          </div>
          <a 
            href="https://zalo.me/0987328409" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Liên hệ Zalo
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
