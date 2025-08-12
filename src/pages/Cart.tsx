import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { currency } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Cart = () => {
  const { detailed, total, setQty, remove } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Giỏ hàng – Shop Premium</title>
        <meta name="description" content="Kiểm tra sản phẩm trong giỏ hàng của bạn và tiến hành thanh toán." />
        <link rel="canonical" href="/cart" />
      </Helmet>
      <Header />
      <main className="container mx-auto mt-4 sm:mt-8 px-4 pb-8 animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <h1 className="text-responsive-xl font-bold gradient-text">Giỏ hàng ({detailed.length} sản phẩm)</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {detailed.map((item, index) => (
              <Card key={item.productId} className="overflow-hidden card-hover shadow-soft" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Product image - Kích thước phù hợp hơn */}
                    <div className="relative w-full sm:w-48 h-40 sm:h-40 bg-muted overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 aspect-product"
                      />
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-medium">
                        Premium
                      </Badge>
                    </div>
                    
                    {/* Product details */}
                    <div className="flex-1 p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight text-balance">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Tài khoản chính chủ</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
                            Còn hàng
                          </Badge>
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Số tháng</label>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            onClick={() => setQty(item.productId, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 hover:bg-muted/50 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            aria-label="Số tháng" 
                            value={item.quantity} 
                            onChange={(e) => setQty(item.productId, Math.max(1, Number(e.target.value) || 1))} 
                            className="w-16 text-center h-8 input-focus"
                          />
                          <Button 
                            size="icon" 
                            variant="outline" 
                            onClick={() => setQty(item.productId, item.quantity + 1)}
                            className="h-8 w-8 hover:bg-muted/50 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Price and actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-right">
                          <div className="font-bold text-lg gradient-text">
                            {currency(item.product.price * item.quantity)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {currency(item.product.price)}/tháng
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          onClick={() => remove(item.productId)} 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Xóa</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {detailed.length === 0 && (
              <Card className="card-hover shadow-soft">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="text-6xl animate-pulse-slow">🛒</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-muted-foreground">Giỏ hàng trống</h3>
                      <p className="text-sm text-muted-foreground">
                        Bạn chưa có sản phẩm nào trong giỏ hàng
                      </p>
                    </div>
                    <Button asChild className="mt-4 btn-hero">
                      <Link to="/">Tiếp tục mua sắm</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Checkout sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-medium card-hover glass">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 gradient-text">Thanh toán</h2>
                  
                  {/* Order summary */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span>Tổng giá trị sản phẩm</span>
                      <span className="font-semibold">{currency(total)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Phí dịch vụ</span>
                      <span className="text-muted-foreground">Miễn phí</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Tổng cộng</span>
                        <span className="gradient-text">{currency(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <Button 
                    className="w-full h-12 text-base font-medium btn-hero" 
                    disabled={detailed.length === 0}
                    onClick={() => navigate('/checkout')}
                  >
                    Tiếp tục thanh toán
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
