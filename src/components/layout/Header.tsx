import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, UserRound, Menu, Flame, PercentCircle, BriefcaseBusiness, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const [q, setQ] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b glass shadow-soft">
      {/* Top banner - hidden on mobile */}
      <div className="hidden lg:block bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between py-2 px-4 text-sm">
          <div className="flex items-center gap-4">
            <Flame className="opacity-90 h-4 w-4" /> 
            <span>Sản phẩm mua nhiều</span>
            <PercentCircle className="opacity-90 h-4 w-4" /> 
            <span>Sản phẩm khuyến mại</span>
            <BriefcaseBusiness 
              className="opacity-90 cursor-pointer h-4 w-4 hover:opacity-100 transition-opacity" 
              onClick={() => navigate('/recruitment')} 
            /> 
            <span className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/recruitment')}>
              Tuyển dụng
            </span>
          </div>
          <div className="opacity-90">Kiếm tiền trên Shop Premium</div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto flex items-center gap-3 py-3 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 shadow-medium group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
            <span className="text-lg sm:text-2xl font-bold text-white">A</span>
          </div>
          <div className="flex flex-col leading-tight hidden sm:block">
            <span className="text-lg sm:text-xl font-bold gradient-text" style={{fontFamily: 'inherit'}}>
              Shop Premium
            </span>
          </div>
        </Link>

        {/* Search bar - hidden on mobile */}
        <div className="flex-1 hidden md:block">
          <div className="flex items-center gap-2 max-w-2xl">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              aria-label="Tìm kiếm sản phẩm"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="h-10 input-focus"
            />
            <Button variant="default" onClick={handleSearch} className="h-10 px-4 btn-hero">
              Tìm
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {/* Desktop navigation */}
          <Button variant="soft" className="hidden lg:inline-flex btn-soft" asChild>
            <Link to="/search">
              <UserRound className="h-4 w-4 mr-2" /> 
              Sản phẩm
            </Link>
          </Button>

          {/* Cart button */}
          <Button variant="hero" asChild className="h-10 px-3 sm:px-4 btn-hero">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4 mr-1 sm:mr-2" /> 
              <span className="hidden sm:inline">Giỏ hàng</span>
              <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                {count}
              </span>
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden h-10 w-10 hover:bg-muted/50">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] glass">
              <SheetHeader>
                <SheetTitle className="gradient-text">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {/* Mobile search */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Tìm kiếm sản phẩm..."
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      className="input-focus"
                    />
                    <Button size="icon" onClick={handleSearch} className="btn-hero">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mobile navigation */}
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-muted/50" asChild>
                    <Link to="/search" onClick={() => setIsMobileMenuOpen(false)}>
                      <UserRound className="h-4 w-4 mr-2" />
                      Sản phẩm
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-muted/50" asChild>
                    <Link to="/recruitment" onClick={() => setIsMobileMenuOpen(false)}>
                      <BriefcaseBusiness className="h-4 w-4 mr-2" />
                      Tuyển dụng
                    </Link>
                  </Button>
                </div>

                {/* Mobile top banner info */}
                <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    <span>Sản phẩm mua nhiều</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PercentCircle className="h-4 w-4" />
                    <span>Sản phẩm khuyến mại</span>
                  </div>
                  <div>Kiếm tiền trên Shop Premium</div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;
