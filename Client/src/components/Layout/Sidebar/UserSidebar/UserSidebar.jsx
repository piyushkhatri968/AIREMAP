import React, { useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  Tags,
  CircleDollarSign,
  FileSpreadsheet,
  FileQuestion,
  Upload,
  FolderOpen,
  User as User1,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import useAuthUser from "../../../../hooks/useAuthUser";
import UserSideItem from "../UserSidebar/UserSideItem";

const UserSidebar = ({ activeView, setActiveView, isOpen = true }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate();

  // navigation handler
  const handleNavigation = useCallback(
    (view) => {
      setActiveView(view);
      navigate(`/${view}`, { replace: true });
    },
    [navigate, setActiveView]
  );

  // auto sync activeView with path
  useEffect(() => {
    const path = location.pathname.slice(1);
    if (path && path !== activeView) setActiveView(path);
  }, [location.pathname, activeView, setActiveView]);

  return (
    <div
      className={`w-64 bg-white dark:bg-[#1C1C1C] flex flex-col h-screen fixed left-0 top-0 z-40 transition-transform duration-300 lg:translate-x-0 border-r border-zinc-200 dark:border-zinc-800 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* User Header */}
      <div className="p-4 mt-16">
        <div className="flex items-center gap-4">
          <div className="w-[4.5rem] h-[4.5rem] rounded-md overflow-hidden flex items-center justify-center">
            <img
              src={`https://flagcdn.com/w320/${authUser?.country?.toLowerCase()}.png`}
              alt={`${authUser?.country} flag`}
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-900 dark:text-white font-medium">
              {authUser?.firstName || "First"} {authUser?.lastName || "Last"}
            </span>
            <div className="bg-red-500/20 rounded px-2 py-0.4 mt-1">
              <span className="text-xs text-red-500 font-medium">
                {authUser?.credits || 0} CRD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        {/* GENERAL Section */}
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            General
          </h3>
          <UserSideItem
            icon={<LayoutDashboard className="w-4 h-4" />}
            label="Dashboard"
            isActive={activeView === "dashboard"}
            onClick={() => handleNavigation("dashboard")}
          />
        </div>

        {/* DATABASE Section */}
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Database
          </h3>
          <UserSideItem
            icon={<Tags className="w-4 h-4" />}
            label="Price List"
            isActive={activeView === "price-list"}
            onClick={() => handleNavigation("price-list")}
          />
        </div>

        {/* CREDITS Section */}
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Credits
          </h3>
          <UserSideItem
            icon={<CircleDollarSign className="w-4 h-4" />}
            label="Buy Credits"
            isActive={activeView === "buy-credits"}
            onClick={() => handleNavigation("buy-credits")}
          />
          <UserSideItem
            icon={<FileSpreadsheet className="w-4 h-4" />}
            label="My Transactions"
            isActive={activeView === "transactions"}
            onClick={() => handleNavigation("transactions")}
          />
        </div>

        {/* PORTAL Section */}
        <div className="space-y-1">
          <h3 className="px-2 text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Portal
          </h3>
          <UserSideItem
            icon={<FileQuestion className="w-4 h-4" />}
            label="File Service"
            hasSubmenu
          >
            <UserSideItem
              icon={<Upload className="w-4 h-4" />}
              label="Upload File"
              isActive={activeView === "upload-file"}
              onClick={() => handleNavigation("upload-file")}
            />
            <UserSideItem
              icon={<FolderOpen className="w-4 h-4" />}
              label="My Files"
              isActive={activeView === "my-files"}
              onClick={() => handleNavigation("my-files")}
            />
          </UserSideItem>
        </div>
      </nav>
    </div>
  );
};

export default UserSidebar;
