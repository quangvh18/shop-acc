export type AccountType =
  | "netflix"
  | "youtube"
  | "spotify"
  | "capcut"
  | "chatgpt"
  | "claude"
  | "grok"
  | "gemini"
  | "google-one"
  | "other";

export type OrderStatus = "active" | "expiring" | "expired";

export interface OrderRecord {
  id: string;
  created_at: string;
  customer: string; // tên hoặc zalo hoặc cả hai, lưu chung một trường
  account_type: AccountType;
  store_account?: string | null;
  customer_account?: {
    account?: string | null;
    password?: string | null;
    otp_secret?: string | null;
  } | null; // gộp các trường liên quan account vào 1 object (hoặc lưu JSON trong DB)
  start_date: string; // ISO date
  duration_months: number; // 1..24
  end_date: string; // ISO date
  cost: number; // chi phi
  revenue: number; // doanh thu
  note?: string | null;
}

export interface OrdersQueryFilters {
  customer_keyword?: string; // name or zalo
  account_type?: AccountType | "all";
  store_account?: string;
  customer_account?: string;
  status?: "all" | OrderStatus;
  from_date?: string; // ISO date inclusive
  to_date?: string; // ISO date inclusive
} 
export interface OrdersQueryFilters {
  keyword?: string; // search all: name/zalo, store_account, customer_account
  account_type?: AccountType | "all";
  status?: "all" | OrderStatus;
  from_date?: string; // ISO date inclusive
  to_date?: string; // ISO date inclusive
}