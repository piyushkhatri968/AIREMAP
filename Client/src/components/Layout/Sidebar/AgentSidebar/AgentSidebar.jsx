import {
    BarChart3,
    FileText,
    Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuthUser from "../../../../hooks/useAuthUser"

const AgentSidebar = ({ isOpen = true }) => {
    const [activeTab, setActiveTab] = useState("");
    const location = useLocation();
    const navigate = useNavigate();



    const { authUser } = useAuthUser();

    // sidebar navigation items
    const navItems = [
        // { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/dashboard" },
        { id: "files", label: "ECU Files", icon: FileText, path: "/files" },
        { id: "credits", label: "Credits", icon: FileText, path: "/credits" },
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
            className={`w-64 bg-white dark:bg-[#1C1C1C] flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
        >
            <div className="flex-1 mt-24 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <nav className="space-y-2 p-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                ? "bg-red-600 text-white"
                                : "text-gray-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-[#2B2B2B] dark:hover:text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-4 ">
                <div className=" text-sm font-medium border border-zinc-300 dark:border-zinc-600 rounded-md w-full px-4 py-3 bg-zinc-50 dark:bg-[#242526]/90"><p className="text-gray-600 dark:text-white">{authUser.firstName} {authUser.lastName}</p>
                    <p className="text-gray-600 dark:text-zinc-400">{authUser.email}</p></div>
            </div>
        </div>
    );
};

export default AgentSidebar;
