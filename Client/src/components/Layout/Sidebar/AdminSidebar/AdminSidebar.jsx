import {
  BarChart3,
  Coins,
  CreditCard,
  FileText,
  Settings,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuthUser from "../../../../hooks/useAuthUser";

const AdminSidebar = ({ isOpen = true }) => {
  const [activeTab, setActiveTab] = useState("");
  const { authUser } = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate();

  // sidebar navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: BarChart3, path: "/dashboard" },
    { id: "users", label: "Users", icon: Users, path: "/users" },
    { id: "files", label: "ECU Files", icon: FileText, path: "/files" },
    {
      id: "transactions",
      label: "Transactions",
      icon: CreditCard,
      path: "/transactions",
    },
    { id: "credits", label: "Credits", icon: Coins, path: "/credits" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  // auto-detect active tab from URL
  useEffect(() => {
    const current = navItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    setActiveTab(current ? current.id : "");
  }, [location.pathname]);

  // handle navigation click
  const handleNavClick = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <div
      className={`w-64 bg-white dark:bg-[#1C1C1C] flex flex-col h-screen fixed left-0 top-0 z-40 transition-transform duration-300 lg:translate-x-0 border-r border-zinc-200 dark:border-zinc-800 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mt-24 p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-red-600 text-white"
                  : "text-gray-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-[#2B2B2B] dark:hover:text-white"
              }`}
              data-testid={`button-${item.id}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
