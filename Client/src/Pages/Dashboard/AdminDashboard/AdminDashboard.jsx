import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from "../../../components/ui/card";
import { Loader2, Users, DollarSign, Shield, UserCog } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Statistics } from "../../../lib/APIs/adminAPIs";

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryFn: Statistics,
    queryKey: ["statistics"],
  });

  const stats = data?.data;

  return (
    <>
      {isLoading ? (
        <div className="text-center py-10 text-zinc-500 dark:text-gray-400">
          <Loader2 className="animate-spin inline h-7 w-7" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Admin Statistics
            </h2>
          </div>

          {/* ===== USERS SECTION ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-gray-400">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-zinc-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {stats?.users?.totalUsers || 0}
                </div>
                <p className="text-xs text-green-500 dark:text-green-400">
                  +{stats?.users?.lastMonthUsers || 0} this month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-gray-400">
                  Total Agents
                </CardTitle>
                <UserCog className="h-4 w-4 text-zinc-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {stats?.users?.totalAgents || 0}
                </div>
                <p className="text-xs text-green-500 dark:text-green-400">
                  +{stats?.users?.lastMonthAgents || 0} this month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-gray-400">
                  Total Admins
                </CardTitle>
                <Shield className="h-4 w-4 text-zinc-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {stats?.users?.totalAdmins || 0}
                </div>
                <p className="text-xs text-green-500 dark:text-green-400">
                  +{stats?.users?.lastMonthAdmins || 0} this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ===== FILES SECTION ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Total Files", key: "total", lastMonthKey: "lastMonth" },
              { title: "Completed Files", key: "completed" },
              { title: "Pending Files", key: "pending" },
              { title: "Unlocked Files", key: "unlocked" },
              { title: "In Progress Files", key: "inProgress" },
              { title: "Rejected Files", key: "rejected" },
            ].map((file) => (
              <Card
                key={file.key}
                className="bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700"
              >
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-zinc-600 dark:text-gray-400">
                    {file.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                    {stats?.files?.[file.key] || 0}
                  </div>
                  {file.lastMonthKey && (
                    <p className="text-xs text-green-500 dark:text-green-400">
                      +{stats?.files?.lastMonth || 0} this month
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ===== PAYMENTS SECTION ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-gray-400">
                  Total Payments
                </CardTitle>
                <DollarSign className="h-4 w-4 text-zinc-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {stats?.payments?.total || 0}
                </div>
                <p className="text-xs text-green-500 dark:text-green-400">
                  {stats?.payments?.creditsSold || 0} credits sold
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-gray-400">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  £{stats?.payments?.revenue || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-gray-400">
                  Revenue This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                  £{stats?.payments?.lastMonthRevenue || 0}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AdminDashboard;
