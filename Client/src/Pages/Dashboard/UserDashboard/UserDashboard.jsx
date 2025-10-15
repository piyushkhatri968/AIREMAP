import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Layout/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  useEffect(() => {
    const routes = {
      dashboard: "/dashboard",
      "buy-credits": "/buy-credits",
      transactions: "/transactions",
      support: "/support",
    };

    const targetRoute = routes[activeView];
    if (targetRoute && location.pathname !== targetRoute) {
      navigate(targetRoute, { state: { view: activeView } });
    }
  }, [activeView, navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#171819]">
      {/* Sidebar Navigation */}
      <Sidebar
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
    </div>
  );
};

export default UserDashboard;
