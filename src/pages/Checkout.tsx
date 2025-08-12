import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { currency } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Checkout = () => {
  const { detailed, total } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [zalo, setZalo] = useState("");
  const [errors, setErrors] = useState<{name?: string; zalo?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string; zalo?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập tên khách hàng';
    }
    
    if (!zalo.trim()) {
      newErrors.zalo = 'Vui lòng nhập số Zalo';
    } else if (!/^\d{9,11}$/.test(zalo.trim())) {
      newErrors.zalo = 'Số Zalo không hợp lệ (9-11 số)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigate('/payment');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Xác nhận – Shop Premium</title>
        <meta name="description" content="Xác nhận thông tin đơn hàng của bạn trước khi thanh toán." />
        <link rel="canonical" href="/checkout" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto mt-4 sm:mt-8 px-4 pb-8 animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/cart')} 
            className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại giỏ hàng
          </Button>
          
          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">1</span>
                <span className="hidden sm:inline">Giỏ hàng</span>
              </div>
              <div className="h-px w-6 sm:w-10 bg-border" />
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">2</span>
                <span className="hidden sm:inline">Xác nhận</span>
              </div>
              <div className="h-px w-6 sm:w-10 bg-border" />
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-medium">3</span>
                <span className="hidden sm:inline">Thanh toán</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <Card className="shadow-soft card-hover">
          <CardContent className="p-4 sm:p-6">
            <h1 className="text-lg sm:text-xl font-bold mb-4 gradient-text">Tóm tắt đơn hàng</h1>
            
            {/* Order Items */}
            <div className="space-y-3 mb-6">
              {detailed.map((item) => (
                <div key={item.productId} className="flex items-center justify-between gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                      />
                      <Badge className="absolute top-1 right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 text-xs">
                        Premium
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base leading-tight text-balance line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Tài khoản chính chủ
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          x{item.quantity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-sm sm:text-base gradient-text">
                      {currency(item.product.price * item.quantity)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currency(item.product.price)}/tháng
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex items-center justify-between text-base sm:text-lg">
                <span className="font-semibold">Tổng cộng</span>
                <span className="font-bold text-lg sm:text-xl gradient-text">{currency(total)}</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                Phí dịch vụ: Miễn phí
              </div>
            </div>

            {/* Customer Info - Required */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-base">Thông tin khách hàng <span className="text-red-500">*</span></h3>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Tên khách hàng <span className="text-red-500">*</span>
                </label>
                <Input 
                  placeholder="Nhập tên khách hàng" 
                  value={name} 
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  className={`input-focus ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Số Zalo <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-md border bg-muted px-3 text-sm">
                    +84
                  </span>
                  <Input 
                    placeholder="Nhập số Zalo" 
                    value={zalo} 
                    onChange={(e) => {
                      setZalo(e.target.value.replace(/\D/g, ""));
                      if (errors.zalo) setErrors(prev => ({ ...prev, zalo: undefined }));
                    }}
                    maxLength={11}
                    className={`input-focus flex-1 ${errors.zalo ? 'border-red-500 focus:border-red-500' : ''}`}
                    type="tel"
                    required
                  />
                </div>
                {errors.zalo && (
                  <p className="text-sm text-red-500 mt-1">{errors.zalo}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button 
                variant="outline" 
                onClick={() => navigate('/cart')}
                className="btn-soft order-2 sm:order-1"
              >
                Trở về Giỏ hàng
              </Button>
              <Button 
                variant="hero" 
                onClick={handleContinue}
                className="btn-hero order-1 sm:order-2"
              >
                Tiếp tục thanh toán
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
