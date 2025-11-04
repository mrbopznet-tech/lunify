import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Send, // For Telegram
  ThumbsUp,
  UserPlus,
  Eye,
  MessageSquare,
  Users,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Search,
  ShoppingCart,
  Minus,
  Plus,
  CreditCard
} from 'lucide-react';

// Custom TikTok icon to be more accurate, as lucide-react doesn't have one.
const Tiktok = ({size=24, color="currentColor"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tiktok"><path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5"/></svg>
);


export {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Send as Telegram,
  Tiktok,
  ThumbsUp,
  UserPlus,
  Eye,
  MessageSquare,
  Users,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Search,
  ShoppingCart,
  Minus,
  Plus,
  CreditCard
};