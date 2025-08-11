import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Recruitment = () => (
  <>
    <Helmet>
      <title>Tuyển dụng – Divine Shop</title>
      <meta name="description" content="Tuyển dụng nhân viên chăm sóc khách hàng Divine Shop." />
      <link rel="canonical" href="/recruitment" />
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 mt-6 min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">🧑‍💼 Tuyển dụng: Nhân viên Chăm sóc Khách hàng</h1>
      <div className="prose max-w-2xl">
        <h2 className="mt-6">📄 Thông tin chung</h2>
        <ul>
          <li><b>Vị trí:</b> Nhân viên CSKH</li>
          <li><b>Độ tuổi:</b> 18 – 27 tuổi</li>
          <li><b>Ưu tiên:</b> Học sinh, sinh viên</li>
        </ul>
        <h2 className="mt-6">⏳ Thời gian làm việc</h2>
        <ul>
          <li>4h/ngày, 6 ngày/tuần</li>
          <li>Có thể linh động theo giờ giấc tùy tính chất công việc</li>
        </ul>
        <h2 className="mt-6">💵 Thu nhập</h2>
        <ul>
          <li>Thu nhập dựa trên hiệu quả công việc</li>
        </ul>
        <h2 className="mt-6">💼 Mô tả công việc</h2>
        <ul>
          <li>Chăm sóc khách hàng qua các kênh: Fanpage, Email, Zalo</li>
          <li>Thực hiện các nhiệm vụ liên quan đến chăm sóc khách hàng</li>
        </ul>
        <h2 className="mt-6">📘 Yêu cầu</h2>
        <ul>
          <li>Tốc độ gõ: ≥ 40 WPM (kiểm tra tại <a href="https://10fastfingers.com" target="_blank" rel="noopener noreferrer">10fastfingers.com</a>)</li>
          <li>Kỹ năng giao tiếp tốt, làm việc nhóm</li>
        </ul>
        <div className="mt-8 p-4 bg-blue-50 rounded text-base">
          <b>Liên hệ ứng tuyển qua Zalo:</b> <a href="https://zalo.me/0344396798" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">0344.396.798</a>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Recruitment;
