import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { format, addMonths, parseISO, addDays } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import type { AccountType, OrderRecord, OrdersQueryFilters, OrderStatus } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const accountTypeOptions = [
  "netflix",
  "youtube",
  "spotify",
  "capcut",
  "chatgpt",
  "claude",
  "grok",
  "gemini",
  "google-one",
  "other",
] as const;

const customerAccountSchema = z.object({
  account: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  otp_secret: z.string().optional().nullable(),
});

const orderSchema = z.object({
  customer: z.string().min(1),
  account_type: z.enum(accountTypeOptions),
  store_account: z.string().optional().nullable(),
  customer_account: customerAccountSchema.optional().nullable(),
  start_date: z.string(),
  duration_months: z.number().int().min(1).max(24),
  cost: z.number().nonnegative(),
  revenue: z.number().nonnegative(),
  note: z.string().optional().nullable(),
});

function toDateOnly(d: Date) {
  return d.toISOString().slice(0, 10);
}

function calcEndDate(start: string, months: number) {
  return toDateOnly(addMonths(parseISO(start), months));
}

function getStatus(endIso: string): OrderStatus {
  const now = new Date();
  const end = parseISO(endIso);
  const daysLeft = Math.ceil((+end - +now) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 7) return "expiring";
  return "active";
}

const PAGE_SIZES = [10, 20, 50, 100];

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<OrdersQueryFilters>({ status: "all", account_type: "all" });
  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<OrderRecord | null>(null);
  const [expiringList, setExpiringList] = useState<OrderRecord[]>([]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const { register, handleSubmit, reset, setValue } = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer: "",
      account_type: "netflix",
      store_account: "",
      customer_account: { account: "", password: "", otp_secret: "" },
      start_date: toDateOnly(new Date()),
      duration_months: 1,
      cost: 0,
      revenue: 0,
      note: "",
    },
  });

  useEffect(() => {
    void loadData();
  }, [page, pageSize, filters]);

  async function loadData() {
    setLoading(true);
    try {
      // Count query
      let countQuery = supabase.from("orders").select("id", { count: "exact", head: true });
      countQuery = applyFiltersToQuery(countQuery, filters);
      const { count, error: countErr } = await countQuery;
      if (countErr) throw countErr;
      setTotal(count ?? 0);

      // Data query with pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      let query = supabase
        .from("orders")
        .select("*")
        .order("start_date", { ascending: false })
        .range(from, to);

      query = applyFiltersToQuery(query, filters);
      const { data, error } = await query;
      if (error) throw error;
      const normalized = (data ?? []).map((o: any) => ({
        ...o,
        start_date: o.start_date,
        end_date: o.end_date ?? calcEndDate(o.start_date, Number(o.duration_months)),
        duration_months: Number(o.duration_months),
        cost: Number(o.cost),
        revenue: Number(o.revenue),
        customer_account: typeof o.customer_account === "string" ? JSON.parse(o.customer_account) : o.customer_account,
      })) as OrderRecord[];
      setOrders(normalized);

      // Expiring in next 7 days
      const today = toDateOnly(new Date());
      const next7 = toDateOnly(addDays(new Date(), 7));
      const { data: expData, error: expErr } = await supabase
        .from("orders")
        .select("*")
        .gte("end_date", today)
        .lte("end_date", next7)
        .limit(50);
      if (!expErr) setExpiringList((expData as any as OrderRecord[]) || []);
    } catch (e: any) {
      toast({ title: "Lỗi tải dữ liệu", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  function buildMatchFilters(f: OrdersQueryFilters) {
    const m: Record<string, any> = {};
    if (f.account_type && f.account_type !== "all") m.account_type = f.account_type;
    return m;
  }

  function applyFiltersToQuery<T>(query: any, f: OrdersQueryFilters): any {
    query = query.match(buildMatchFilters(f));
    if (f.keyword && f.keyword.trim() !== "") {
      // Search across customer, store_account, customer_account->>account
      query = query.or(`customer.ilike.%${f.keyword}%,store_account.ilike.%${f.keyword}%,customer_account->>account.ilike.%${f.keyword}%`);
    }
    if (f.status && f.status !== "all") {
      const today = toDateOnly(new Date());
      const next7 = toDateOnly(addDays(new Date(), 7));
      if (f.status === "expired") query = query.lt("end_date", today);
      if (f.status === "expiring") query = query.gte("end_date", today).lte("end_date", next7);
      if (f.status === "active") query = query.gt("end_date", next7);
    }
    if (f.from_date) query = query.gte("start_date", f.from_date);
    if (f.to_date) query = query.lte("start_date", f.to_date);
    return query;
  }

  async function onCreateOrUpdate(values: z.infer<typeof orderSchema>) {
    const payload = {
      ...values,
      customer_account: values.customer_account ? JSON.stringify(values.customer_account) : null,
      end_date: calcEndDate(values.start_date, values.duration_months),
    };
    try {
      if (editing) {
        const { error } = await supabase.from("orders").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast({ title: "Đã cập nhật đơn hàng" });
      } else {
        const { error } = await supabase.from("orders").insert(payload);
        if (error) throw error;
        toast({ title: "Đã tạo đơn hàng" });
      }
      setEditing(null);
      setFormOpen(false);
      reset();
      await loadData();
    } catch (e: any) {
      toast({ title: "Lỗi lưu đơn hàng", description: e.message, variant: "destructive" });
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Xoá đơn hàng này?")) return;
    try {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Đã xoá" });
      await loadData();
    } catch (e: any) {
      toast({ title: "Lỗi xoá", description: e.message, variant: "destructive" });
    }
  }

  function openEdit(o: OrderRecord) {
    setEditing(o);
    setFormOpen(true);
    setValue("customer", o.customer);
    setValue("account_type", o.account_type as any);
    setValue("store_account", o.store_account ?? "");
    setValue("customer_account", o.customer_account ?? { account: "", password: "", otp_secret: "" });
    setValue("start_date", o.start_date.slice(0, 10));
    setValue("duration_months", o.duration_months);
    setValue("cost", o.cost);
    setValue("revenue", o.revenue);
    setValue("note", o.note ?? "");
  }

  const stats = useMemo(() => {
    let sumCost = 0;
    let sumRevenue = 0;
    let active = 0;
    let expiring = 0;
    let expired = 0;
    for (const o of orders) {
      sumCost += Number(o.cost) || 0;
      sumRevenue += Number(o.revenue) || 0;
      const status = getStatus(o.end_date);
      if (status === "active") active++;
      if (status === "expiring") expiring++;
      if (status === "expired") expired++;
    }
    return { sumCost, sumRevenue, active, expiring, expired };
  }, [orders]);

  return (
  <div className="w-full max-w-none mx-auto p-4 space-y-6">
      <Helmet>
        <title>Quản trị đơn hàng</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Tổng chi phí</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{stats.sumCost.toLocaleString()} đ</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tổng doanh thu</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{stats.sumRevenue.toLocaleString()} đ</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Đang hoạt động</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{stats.active}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sắp hết hạn</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setModalOpen(true)}>Xem</Button>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{stats.expiring}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc</CardTitle>
        </CardHeader>
  <CardContent className="flex flex-wrap gap-3 items-end w-full">
          <Input
            className="flex-1 min-w-[180px]"
            placeholder="Tìm theo tên, Zalo, TK store, TK khách"
            value={filters.keyword || ""}
            onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
          />
          <div className="flex-1 min-w-[140px]">
            <Select value={filters.account_type || "all"} onValueChange={(v) => setFilters((f) => ({ ...f, account_type: v as any }))}>
              <SelectTrigger>
                <SelectValue placeholder="Loại tài khoản" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {accountTypeOptions.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[140px]">
            <Select value={filters.status || "all"} onValueChange={(v) => setFilters((f) => ({ ...f, status: v as any }))}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Còn hạn</SelectItem>
                <SelectItem value="expiring">Sắp hết hạn (≤7d)</SelectItem>
                <SelectItem value="expired">Đã hết hạn</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <Label className="text-xs">Từ</Label>
            <Input type="date" className="w-32" value={filters.from_date || ""} onChange={(e) => setFilters((f) => ({ ...f, from_date: e.target.value }))} />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <Label className="text-xs">Đến</Label>
            <Input type="date" className="w-32" value={filters.to_date || ""} onChange={(e) => setFilters((f) => ({ ...f, to_date: e.target.value }))} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button onClick={() => { setEditing(null); reset(); setFormOpen(true); }}>Tạo đơn hàng</Button>

        <div className="flex items-center gap-2">
          <Label>Kích thước trang</Label>
          <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((s) => (
                <SelectItem key={s} value={String(s)}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="w-full text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-2 py-1">Loại TK</TableHead>
                  <TableHead className="px-2 py-1">Khách hàng</TableHead>
                  <TableHead className="px-2 py-1">TK store</TableHead>
                  <TableHead className="px-2 py-1">TK khách</TableHead>
                  <TableHead className="px-2 py-1">Bắt đầu</TableHead>
                  <TableHead className="px-2 py-1">Hết hạn</TableHead>
                  <TableHead className="px-2 py-1">Thời hạn</TableHead>
                  <TableHead className="px-2 py-1">Chi phí</TableHead>
                  <TableHead className="px-2 py-1">Doanh thu</TableHead>
                  <TableHead className="px-2 py-1">Trạng thái</TableHead>
                  <TableHead className="px-2 py-1">Ghi chú</TableHead>
                  <TableHead className="px-2 py-1">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => {
                  const status = getStatus(o.end_date);
                  return (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium px-2 py-1">{o.account_type}</TableCell>
                      <TableCell className="px-2 py-1">{o.customer}</TableCell>
                      <TableCell className="px-2 py-1">{o.store_account}</TableCell>
                      <TableCell className="px-2 py-1">
                        {o.customer_account?.account}
                        {o.customer_account?.password && <><br /><span className="text-xs text-muted-foreground">{o.customer_account.password}</span></>}
                        {o.customer_account?.otp_secret && <><br /><span className="text-xs text-muted-foreground">2FA: {o.customer_account.otp_secret}</span></>}
                      </TableCell>
                      <TableCell className="px-2 py-1">{o.start_date}</TableCell>
                      <TableCell className="px-2 py-1">{o.end_date}</TableCell>
                      <TableCell className="px-2 py-1">{o.duration_months} tháng</TableCell>
                      <TableCell className="px-2 py-1">{o.cost.toLocaleString()} đ</TableCell>
                      <TableCell className="px-2 py-1">{o.revenue.toLocaleString()} đ</TableCell>
                      <TableCell className="px-2 py-1">
                        <Badge variant={status === "expired" ? "destructive" : status === "expiring" ? "secondary" : "default"}>
                          {status === "active" ? "Còn hạn" : status === "expiring" ? "Sắp hết hạn" : "Đã hết hạn"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 py-1">{o.note}</TableCell>
                      <TableCell className="px-2 py-1">
                        <Button size="sm" variant="outline" onClick={() => openEdit(o)}>Sửa</Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(o.id)}>Xoá</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              Trang {page}/{totalPages} ({total} bản ghi)
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled={page <= 1} onClick={() => setPage(1)}>«</Button>
              <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>‹</Button>
              <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>›</Button>
              <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={formOpen} onOpenChange={(v) => { setFormOpen(v); if (!v) { setEditing(null); reset(); } }}>
  <DialogContent className="max-w-xl" aria-describedby="order-form-desc">
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa đơn hàng" : "Tạo đơn hàng"}</DialogTitle>
            <div id="order-form-desc" className="sr-only">Nhập thông tin đơn hàng để tạo hoặc chỉnh sửa.</div>
          </DialogHeader>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            onSubmit={handleSubmit(onCreateOrUpdate)}
          >
            <div className="md:col-span-2">
              <Label>Khách hàng (tên, zalo...)</Label>
              <Input {...register("customer")} />
            </div>
            <div>
              <Label>Loại TK</Label>
              <Select defaultValue="netflix" onValueChange={(v) => setValue("account_type", v as AccountType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accountTypeOptions.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>TK store</Label>
              <Input {...register("store_account")} />
            </div>
            <div>
              <Label>TK khách</Label>
              <Input {...register("customer_account.account")} />
            </div>
            <div>
              <Label>Mật khẩu</Label>
              <Input {...register("customer_account.password")} />
            </div>
            <div>
              <Label>Mã 2FA</Label>
              <Input {...register("customer_account.otp_secret")} />
            </div>
            <div>
              <Label>Ngày bắt đầu</Label>
              <Input type="date" {...register("start_date")} />
            </div>
            <div>
              <Label>Thời hạn (tháng)</Label>
              <Input type="number" min={1} max={24} {...register("duration_months", { valueAsNumber: true })} />
            </div>
            <div>
              <Label>Chi phí</Label>
              <Input type="number" min={0} step="1000" {...register("cost", { valueAsNumber: true })} />
            </div>
            <div>
              <Label>Doanh thu</Label>
              <Input type="number" min={0} step="1000" {...register("revenue", { valueAsNumber: true })} />
            </div>
            <div className="md:col-span-2">
              <Label>Ghi chú</Label>
              <Input {...register("note")} />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => { setEditing(null); setFormOpen(false); reset(); }}>Huỷ</Button>
              <Button type="submit">Lưu</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
  <DialogContent className="max-w-3xl" aria-describedby="expiring-list-desc">
          <DialogHeader>
            <DialogTitle>Tài khoản sắp hết hạn (7 ngày)</DialogTitle>
            <div id="expiring-list-desc" className="sr-only">Danh sách các tài khoản sẽ hết hạn trong 7 ngày tới.</div>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại TK</TableHead>
                  <TableHead>Tên KH</TableHead>
                  <TableHead>Hết hạn</TableHead>
                  <TableHead>TK khách</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiringList.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.account_type}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell>{format(parseISO(o.end_date), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{o.customer_account?.account || ""}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}