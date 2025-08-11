const Footer = () => {
  return (
    <footer className="mt-12 border-t bg-background">
      <div className="container mx-auto px-4 py-4 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="text-lg font-bold">Shop Premium</div>
          <p className="mt-2 text-sm text-muted-foreground">Mua tài khoản số, phần mềm bản quyền giá tốt. Giao tự động, uy tín.</p>
        </div>
        <nav className="md:col-span-3">
          <div className="font-semibold">Pháp lý</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/terms" className="hover:underline">Điều khoản sử dụng</a></li>
            <li><a href="/privacy" className="hover:underline">Chính sách bảo mật</a></li>
          </ul>
        </nav>
        <nav className="md:col-span-3">
          <div className="font-semibold">Liên hệ</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/contact" className="hover:underline">Trung tâm hỗ trợ</a></li>
            <li><a href="https://zalo.me/0987328409" className="hover:underline" target="_blank" rel="noopener noreferrer">Zalo: 0987.328.409</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-1 text-xs text-muted-foreground text-center">© {new Date().getFullYear()} Shop Premium. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
