import React, { useState } from "react";
import { Outlet } from "react-router";
import AdminNavbar from "../Navbar/AdminNavbar/AdminNavbar";
import AdminSidebar from "../Sidebar/AdminSidebar/AdminSidebar";

const AdminDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  return (
    <div className="min-h-screen flex bg-white dark:bg-[#171819] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="lg:ml-64 flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <AdminNavbar
          isSidebarOpen={isSidebarOpen}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main content area */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 mt-20 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
