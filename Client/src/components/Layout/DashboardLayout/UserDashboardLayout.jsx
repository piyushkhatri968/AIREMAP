import { useState } from "react";
import { Outlet } from "react-router";
import UserSidebar from "../Sidebar/UserSidebar/UserSidebar";
import UserNavbar from "../Navbar/UserNavbar/UserNavbar";

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#171819] overflow-hidden">
      {/* Sidebar */}
      <UserSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={isSidebarOpen}
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
        <UserNavbar
          isSidebarOpen={isSidebarOpen}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main content area */}
        <div className="flex-1 sm:p-6 lg:p-8 mt-16 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
