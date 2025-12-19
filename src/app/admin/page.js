"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Store, ShoppingCart, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <DashboardOverview />
    </main>
  );
}

// Dashboard Overview Component
function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Total Users</p>
                <p className="text-2xl font-bold text-blue">1,247</p>
              </div>
              <Users className="h-8 w-8 text-blue" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Active Sellers</p>
                <p className="text-2xl font-bold text-green">45</p>
              </div>
              <Store className="h-8 w-8 text-green" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Total Orders</p>
                <p className="text-2xl font-bold text-yellow">1,250</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-yellow" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Pending Reports</p>
                <p className="text-2xl font-bold text-red">7</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <span>New seller registered</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span>Order #1234 completed</span>
                <span className="text-sm text-gray-500">4 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span>New report submitted</span>
                <span className="text-sm text-gray-500">6 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Server Status</span>
                <Badge variant="default">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <Badge variant="default">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>API Response</span>
                <Badge variant="default">Fast</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
