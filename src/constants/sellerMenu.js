import { LayoutDashboard, Store, ShoppingCart, Settings } from "lucide-react";
import Link from "next/link";

export const menuItems = [
  {
    key: "dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: <Link href="/seller-dashboard">Dashboard Overview</Link>,
  },
  {
    key: "products",
    icon: <Store className="h-4 w-4" />,
    label: <Link href="/seller-dashboard/products">Product Management</Link>,
  },
  {
    key: "orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    label: <Link href="/seller-dashboard/orders">Orders</Link>,
  },
  {
    key: "settings",
    icon: <Settings className="h-4 w-4" />,
    label: <Link href="/seller-dashboard/settings">Settings</Link>,
  },
];
