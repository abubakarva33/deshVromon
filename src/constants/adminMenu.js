import { LayoutDashboard, Users, Store, AlertTriangle, BarChart3, Settings, Package, CreditCard, Archive, Image, Flame } from "lucide-react";
import Link from "next/link";

export const menuItems = [
  {
    key: "dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: <Link href="/admin">Dashboard Overview</Link>,
  },

  {
    key: "users",
    icon: <Users className="h-4 w-4" />, // Using BarChart3 as placeholder, can change to appropriate icon
    label: <Link href="/admin/users">User Management</Link>,
  },
  {
    key: "sellerManagement",
    icon: <Store className="h-4 w-4" />,
    label: <Link href="/admin/sellers">Seller Management</Link>,
  },

  {
    key: "campuses",
    icon: <Store className="h-4 w-4" />,
    label: "Campus Management",
    collapsible: true,
    collapsed: true,
    children: [
      { key: "campus-list", label: <Link href="/admin/campuses">Campuses</Link> },
      { key: "delivery-points", label: <Link href="/admin/campuses/delivery-points">Delivery Points</Link> },
    ],
  },
  {
    key: "all_categories",
    icon: <Store className="h-4 w-4" />,
    label: "Category Management",
    collapsible: true,
    collapsed: true,
    children: [
      { key: "categories", label: <Link href="/admin/categories?parent_exists=false">Category</Link> },
      { key: "hot_category", icon: <Flame className="h-4 w-4" />, label: <Link href="/admin/hot-category">Hot Category</Link> },
    ],
  },
  {
    key: "products",
    icon: <Archive className="h-4 w-4" />,
    label: <Link href="/admin/product">Product Management</Link>,
  },
  {
    key: "banners",
    icon: <Image className="h-4 w-4" alt="Banner icon" />,
    label: <Link href="/admin/banners">Banner Management</Link>,
  },
  {
    key: "packages",
    icon: <Package className="h-4 w-4" />,
    label: <Link href="/admin/package">Package Management</Link>,
  },
  {
    key: "subscriptions",
    icon: <CreditCard className="h-4 w-4" />,
    label: <Link href="/admin/subscription">Subscription Management</Link>,
  },
  {
    key: "reports",
    icon: <AlertTriangle className="h-4 w-4" />,
    label: <Link href="/admin/reports">Reports & Issues</Link>,
  },
  {
    key: "analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    label: <Link href="/admin/analytics">Analytics</Link>,
  },
  {
    key: "settings",
    icon: <Settings className="h-4 w-4" />,
    label: <Link href="/admin/settings">System Settings</Link>,
  },
];
