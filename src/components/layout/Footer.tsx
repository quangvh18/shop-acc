import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-12 sm:mt-16 lg:mt-20 border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 shadow-medium">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div>
                <div className="text-xl font-bold gradient-text">Shop Premium</div>
                <div className="text-xs text-muted-foreground">Tài khoản premium</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
              Mua tài khoản số, phần mềm bản quyền giá tốt. Giao tự động, uy tín, hỗ trợ 24/7.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a 
                href="https://zalo.me/0987328409" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline">Zalo: 0987.328.409</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-base">Sản phẩm</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/search?category=ai" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/search?category=streaming" className="text-muted-foreground hover:text-primary transition-colors">
                  Streaming
                </Link>
              </li>
              <li>
                <Link to="/search?category=software" className="text-muted-foreground hover:text-primary transition-colors">
                  Phần mềm
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-base">Pháp lý</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/recruitment" className="text-muted-foreground hover:text-primary transition-colors">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-base">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Trung tâm hỗ trợ
                </Link>
              </li>
              <li>
                <a 
                  href="https://zalo.me/0987328409" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Liên hệ Zalo
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@shoppremium.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Email hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-base">Liên hệ</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">0987.328.409</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">support@shoppremium.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} Shop Premium. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-center">
              <span>Được phát triển với ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
