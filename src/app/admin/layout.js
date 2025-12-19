"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/campuses/Sidebar";
import Header from "@/components/admin/campuses/Header";
import { menuItems } from "@/constants/adminMenu";
import axios from "@/lib/axios";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!authToken || !refreshToken) {
        router.push("/login?redirect=/admin");
        return;
      }

      try {
        const response = await axios.get("/users/profile");
        const role = response.data.data.role;
        if (role !== "admin" && role !== "superAdmin") {
          router.push("/login?redirect=/admin");
          return;
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch {
        router.push("/login?redirect=/admin");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="flex h-screen ">
      <div className="border-r">
        <Sidebar menuItems={menuItems} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
