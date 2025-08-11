import chatgptImg from "@/assets/chatgpt-update.png";
import chatgptShareImg from "@/assets/chatgpt-share.png";
import claudeImg from "@/assets/claude-1m.png";
import youtubeImg from "@/assets/youtube-1y.png";
import duolingoImg from "@/assets/douligo-1y.png";
import spotifyImg from "@/assets/spotify-1y.png";
import capcut1mImg from "@/assets/capcut-1m.png";
import capcut1yImg from "@/assets/capcut-1y.png";
import gemini1mImg from "@/assets/gemini-1m.png";
import netflix1mImg from "@/assets/netflix-1m.png";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // VND
  originalPrice?: number;
  tags: string[];
  image: string;
  status?: "in_stock" | "out_of_stock";
  description?: string;
  category?: string;
  accountType?:
    | "ChatGPT Plus"
    | "YouTube Premium"
    | "Duolingo Super"
    | "Spotify Premium"
    | "Claude Pro"
    | "CapCut Pro"
    | "Gemini Pro"
    | "Netflix Premium";
};

export const products: Product[] = [
  {
    id: "chatgpt-plus",
    slug: "chatgpt-plus-1-thang-tai-khoan-chinh-chu",
    name: "ChatGPT Plus 20$ 1 tháng - Tài khoản chính chủ",
    price: 390000,
    originalPrice: 500000,
    tags: ["openai", "ai", "chatbot"],
    image: chatgptImg,
    status: "in_stock",
    description:
      "Nâng cấp tài khoản ChatGPT Plus chính chủ trong 1 tháng. Hỗ trợ hướng dẫn chi tiết và bảo hành trong thời gian sử dụng.",
    category: "AI",
    accountType: "ChatGPT Plus",
  },
  {
    id: "chatgpt-plus-share",
    slug: "chatgpt-plus-1-thang-tai-khoan-share",
    name: "ChatGPT Plus 20$ 1 tháng - Tài khoản share",
    price: 90000,
    originalPrice: 500000,
    tags: ["openai", "ai", "chatbot"],
    image: chatgptShareImg,
    status: "in_stock",
    description:
      "Nâng cấp tài khoản ChatGPT Plus chính chủ trong 1 tháng. Hỗ trợ hướng dẫn chi tiết và bảo hành trong thời gian sử dụng.",
    category: "AI",
    accountType: "ChatGPT Plus",
  },
  {
    id: "youtube-premium",
    slug: "youtube-premium-1-nam",
    name: "YouTube Premium 1 năm + Music",
    price: 520000,
    originalPrice: 1290000,
    tags: ["youtube", "music", "video"],
    image: youtubeImg,
    status: "in_stock",
    description:
      "Gói YouTube Premium 1 năm – xem video không quảng cáo, nghe nhạc nền, tải ngoại tuyến.",
    category: "Giải trí",
    accountType: "YouTube Premium",
  },
  {
    id: "youtube-premium",
    slug: "youtube-premium-6-thang",
    name: "YouTube Premium 6 tháng + Music",
    price: 300000,
    originalPrice: 645000,
    tags: ["youtube", "music", "video"],
    image: youtubeImg,
    status: "in_stock",
    description:
      "Gói YouTube Premium 1 năm – xem video không quảng cáo, nghe nhạc nền, tải ngoại tuyến.",
    category: "Giải trí",
    accountType: "YouTube Premium",
  },
  {
    id: "duolingo-super",
    slug: "duolingo-super-1-nam",
    name: "Duolingo Super 1 năm - Gia hạn chính chủ",
    price: 220000,
    originalPrice: 479000,
    tags: ["education"],
    image: duolingoImg,
    status: "in_stock",
    category: "Học tập",
    accountType: "Duolingo Super",
  },
  {
    id: "spotify-premium",
    slug: "spotify-premium-1-nam",
    name: "Spotify Premium 1 năm - Gia hạn chính chủ",
    price: 320000,
    originalPrice: 590000,
    tags: ["education"],
    image: spotifyImg,
    status: "in_stock",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "spotify-premium-6-thang",
    slug: "spotify-premium-6-thang",
    name: "Spotify Premium 6 tháng - Gia hạn chính chủ",
    price: 200000,
    originalPrice: 290000,
    tags: ["education"],
    image: spotifyImg,
    status: "in_stock",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "claude-1m",
    slug: "claude-1m",
    name: "Claude Pro 20$ 1 tháng - Tài khoản chính chủ",
    price: 390000,
    originalPrice: 500000,
    tags: ["education"],
    image: claudeImg,
    status: "in_stock",
    category: "AI",
    accountType: "Claude Pro",
  },
  {
    id: "capcut-1m",
    slug: "capcut-1m",
    name: "CapCut Pro 1 tháng - Tài khoản chính chủ",
    price: 65000,
    originalPrice: 290000,
    tags: ["education"],
    image: capcut1mImg,
    status: "in_stock",
    category: "Video Editor",
    accountType: "CapCut Pro",
  },
  {
    id: "capcut-1y",
    slug: "capcut-1y",
    name: "CapCut Pro 1 năm - Tài khoản chính chủ",
    price: 650000,
    originalPrice: 1900000,
    tags: ["education"],
    image: capcut1yImg,
    status: "in_stock",
    category: "Video Editor",
    accountType: "CapCut Pro",
  },
  {
    id: "gemini-1m",
    slug: "gemini-1y",
    name: "Gemini Pro 1 năm - Tài khoản chính chủ",
    price: 390000,
    originalPrice: 500000,
    tags: ["education"],
    image: gemini1mImg,
    status: "in_stock",
    category: "AI",
    accountType: "Gemini Pro",
  },
  {
    id: "netflix-1m",
    slug: "netflix-1m",
    name: "Netflix 1 tháng - Tài khoản chính chủ",
    price: 79000,
    originalPrice: 114000,
    tags: ["education"],
    image: netflix1mImg,
    status: "in_stock",
    category: "Giải trí",
    accountType: "Netflix Premium",
  },
  // {
  //   id: "jetbrains-all",
  //   slug: "jetbrains-all-products-pack",
  //   name: "JetBrains All Products Pack 1 năm",
  //   price: 490000,
  //   originalPrice: 6900000,
  //   tags: ["dev", "ide"],
  //   image: jetbrainsImg,
  //   status: "in_stock",
  //   category: "Dev",
  //   accountType: "subscription",
  // },
  // {
  //   id: "windows-pro",
  //   slug: "windows-10-pro-key",
  //   name: "Windows 10 Pro CD Key",
  //   price: 150000,
  //   originalPrice: 250000,
  //   tags: ["os", "license"],
  //   image: windowsImg,
  //   status: "in_stock",
  //   category: "Hệ điều hành",
  //   accountType: "key",
  // },
  // {
  //   id: "kaspersky",
  //   slug: "kaspersky-1-thiet-bi",
  //   name: "Kaspersky Premium 1 thiết bị",
  //   price: 199000,
  //   originalPrice: 800000,
  //   tags: ["security", "vpn"],
  //   image: kasperskyImg,
  //   status: "in_stock",
  //   category: "Bảo mật",
  //   accountType: "key",
  // },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );
