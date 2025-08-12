import chatgptImg from "@/assets/chatgpt-update.png";
import chatgptShareImg from "@/assets/chatgpt-share.png";
import claudeImg from "@/assets/claude-1m.png";
import youtubeImg from "@/assets/youtube-1y.png";
import youtube6Img from "@/assets/youtube-6m.png";
import duolingoImg from "@/assets/douligo-1y.png";
import spotifyImg from "@/assets/spotify-1y.png";
import spotify6Img from "@/assets/spotify-6m.png";
import capcut1mImg from "@/assets/capcut-1m.png";
import capcut1yImg from "@/assets/capcut-1y.png";
import gemini1mImg from "@/assets/gemini-1m.png";
import netflix1mImg from "@/assets/netflix-1m.png";
import grok1mImg from "@/assets/grok-1m.png";

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
    | "Netflix Premium"
    | "SuperGrok";
};

export const products: Product[] = [
  {
    id: "chatgpt-plus",
    slug: "chatgpt-plus-1-thang-tai-khoan-chinh-chu",
    name: "ChatGPT Plus 1 tháng - TK chính chủ",
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
    name: "ChatGPT Plus 1 tháng - TK share",
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
    image: youtube6Img,
    status: "in_stock",
    description:
      "Gói YouTube Premium 1 năm – xem video không quảng cáo, nghe nhạc nền, tải ngoại tuyến.",
    category: "Giải trí",
    accountType: "YouTube Premium",
  },
  {
    id: "duolingo-super",
    slug: "duolingo-super-1-nam",
    name: "Duolingo Super 1 năm - TK chính chủ",
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
    name: "Spotify Premium 1 năm - TK chính chủ",
    price: 320000,
    originalPrice: 590000,
    tags: ["music", "spotify"],
    image: spotifyImg,
    status: "in_stock",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "spotify-premium-6-thang",
    slug: "spotify-premium-6-thang",
    name: "Spotify Premium 6 tháng - TK chính chủ",
    price: 200000,
    originalPrice: 290000,
    tags: ["music", "spotify"],
    image: spotify6Img,
    status: "in_stock",
    category: "Âm nhạc",
    accountType: "Spotify Premium",
  },
  {
    id: "claude-1m",
    slug: "claude-1m",
    name: "Claude Pro 20$ 1 tháng - TK chính chủ",
    price: 390000,
    originalPrice: 500000,
    tags: ["ai", "claude"],
    image: claudeImg,
    status: "in_stock",
    category: "AI",
    accountType: "Claude Pro",
  },
  {
    id: "capcut-1m",
    slug: "capcut-1m",
    name: "CapCut Pro 1 tháng - TK chính chủ",
    price: 65000,
    originalPrice: 290000,
    tags: ["video", "capcut"],
    image: capcut1mImg,
    status: "in_stock",
    category: "Video Editor",
    accountType: "CapCut Pro",
  },
  {
    id: "capcut-1y",
    slug: "capcut-1y",
    name: "CapCut Pro 1 năm - TK chính chủ",
    price: 650000,
    originalPrice: 1900000,
    tags: ["video", "capcut"],
    image: capcut1yImg,
    status: "in_stock",
    category: "Video Editor",
    accountType: "CapCut Pro",
  },
  {
    id: "gemini-1m",
    slug: "gemini-1-thang",
    name: "Gemini Pro 1 tháng - TK chính chủ",
    price: 100000,
    originalPrice: 500000,
    tags: ["ai", "gemini"],
    image: gemini1mImg,
    status: "in_stock",
    category: "AI",
    accountType: "Gemini Pro",
  },
  {
    id: "netflix-1m",
    slug: "netflix-1m",
    name: "Netflix 1 tháng - TK chính chủ",
    price: 79000,
    originalPrice: 114000,
    tags: ["movie", "netflix"],
    image: netflix1mImg,
    status: "in_stock",
    category: "Giải trí",
    accountType: "Netflix Premium",
  },
  {
    id: "grok-1m",
    slug: "grok-1m",
    name: "SuperGrok 1 tháng - TK chính chủ",
    price: 390000,
    originalPrice: 750000,
    tags: ["ai", "grok"],
    image: grok1mImg,
    status: "in_stock",
    category: "AI",
    accountType: "SuperGrok",
  },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );
