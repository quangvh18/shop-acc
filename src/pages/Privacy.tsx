import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => (
  <>
    <Helmet>
      <title>Chính sách bảo mật – Shop Premium</title>
      <meta name="description" content="Chính sách bảo mật thông tin khách hàng của Shop Premium." />
      <link rel="canonical" href="/privacy" />
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 mt-6">
      <h1 className="text-2xl font-bold">Chính sách bảo mật</h1>
      <section className="prose mt-4 max-w-none">
        <p>Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn. Chính sách chi tiết sẽ được cập nhật.</p>
      </section>
      <Footer />
    </main>
  </>
);

export default Privacy;
