import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => (
  <>
    <Helmet>
      <title>Điều khoản sử dụng – Divine Shop</title>
      <meta name="description" content="Điều khoản sử dụng dịch vụ Divine Shop." />
      <link rel="canonical" href="/terms" />
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 mt-6">
      <h1 className="text-2xl font-bold">Điều khoản sử dụng</h1>
      <section className="prose mt-4 max-w-none">
        <p>Việc sử dụng website đồng nghĩa bạn đồng ý với các điều khoản dưới đây. Nội dung chi tiết sẽ được cập nhật.</p>
      </section>
      <Footer />
    </main>
  </>
);

export default Terms;
