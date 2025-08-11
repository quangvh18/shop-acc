import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[];
const types = Array.from(new Set(products.map(p => p.accountType).filter(Boolean))) as NonNullable<Product["accountType"]>[];

const Search = () => {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [category, setCategory] = useState<string>(sp.get("category") ?? "all");
  const [type, setType] = useState<string>(sp.get("type") ?? "all");
  const [min, setMin] = useState<number>(Number(sp.get("min") ?? "0"));
  const [max, setMax] = useState<number>(Number(sp.get("max") ?? "10000000"));
  const [sort, setSort] = useState<string>(sp.get("sort") ?? "default");

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (!q || p.name.toLowerCase().includes(q.toLowerCase())) &&
      (category === "all" || p.category === category) &&
      (type === "all" || p.accountType === type) &&
      (p.price >= min) && (p.price <= max)
    );
    switch (sort) {
      case "price-asc":
        list = list.slice().sort((a, b) => a.price - b.price); break;
      case "price-desc":
        list = list.slice().sort((a, b) => b.price - a.price); break;
      case "sold":
        list = list.slice().sort((a, b) => ((b.originalPrice ?? b.price) - b.price) - ((a.originalPrice ?? a.price) - a.price)); break;
    }
    return list;
  }, [q, category, type, min, max, sort]);

  const apply = () => {
    const params: Record<string, string> = {};
    if (q) params.q = q;
    if (category) params.category = category;
    if (type) params.type = type;
    if (min) params.min = String(min);
    if (max && max !== 10000000) params.max = String(max);
    if (sort !== "default") params.sort = sort;
    setSp(params, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Tìm kiếm sản phẩm – Shop Premium</title>
        <meta name="description" content="Tìm kiếm sản phẩm theo danh mục, loại tài khoản, mức giá và sắp xếp." />
        <link rel="canonical" href="/search" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 mt-6">
        <h1 className="text-2xl font-bold">Tìm kiếm sản phẩm</h1>
        <section className="mt-4 grid gap-4 md:grid-cols-12">
          <aside className="md:col-span-3 space-y-3 rounded-lg border p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Từ khóa</label>
              <Input placeholder="Nhập tên sản phẩm" value={q} onChange={(e)=>setQ(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Danh mục</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Tất cả" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {categories.map(c => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Loại tài khoản</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue placeholder="Tất cả" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {types.map(t => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Giá từ</label>
                <Input type="number" min={0} value={min} onChange={(e)=>setMin(Math.max(0, Number(e.target.value)||0))} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Đến</label>
                <Input type="number" min={0} value={max} onChange={(e)=>setMax(Math.max(0, Number(e.target.value)||0))} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sắp xếp</label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger><SelectValue placeholder="Mặc định" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Mặc định</SelectItem>
                  <SelectItem value="price-asc">Giá thấp → cao</SelectItem>
                  <SelectItem value="price-desc">Giá cao → thấp</SelectItem>
                  <SelectItem value="sold">Bán chạy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={apply}>Áp dụng</Button>
          </aside>
          <section className="md:col-span-9">
            <div className="mb-3 text-sm text-muted-foreground">Tìm thấy {filtered.length} sản phẩm</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filtered.map(p => (<ProductCard key={p.id} product={p} />))}
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Search;
