import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, UserRound, Menu, Flame, PercentCircle, BriefcaseBusiness } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const Header = () => {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <Flame className="opacity-90" /> <span>Sản phẩm mua nhiều</span>
            <PercentCircle className="opacity-90" /> <span>Sản phẩm khuyến mại</span>
            <BriefcaseBusiness className="opacity-90 cursor-pointer" onClick={() => navigate('/recruitment')} /> <span className="cursor-pointer" onClick={() => navigate('/recruitment')}>Tuyển dụng</span>
          </div>
          <div className="opacity-90">Kiếm tiền trên Divine Shop</div>
        </div>
      </div>
      <div className="container mx-auto flex items-center gap-3 py-4 px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-primary" style={{fontFamily: 'inherit'}}>Acc Store</span>
            <span className="text-xs text-gay-200 -mt-1">Tài khoản premium</span>
          </div>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Tìm kiếm sản phẩm"
              aria-label="Tìm kiếm sản phẩm"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
              }}
            />
            <Button variant="default" onClick={() => q.trim() && navigate(`/search?q=${encodeURIComponent(q.trim())}`)}>Tìm</Button>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Button variant="soft" className="hidden md:inline-flex" asChild>
            <Link to="/search"><UserRound /> Sản phẩm</Link>
          </Button>
          <Button variant="outline" className="md:hidden" size="icon"><Menu /></Button>
          <Button variant="hero" asChild>
            <Link to="/cart"><ShoppingCart /> Giỏ hàng ({count})</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
