import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        // Get saved theme or default to system
        return localStorage.getItem("theme") || "system";
    });

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (mode) => {
            if (mode === "light") {
                root.classList.remove("dark");
            } else if (mode === "dark") {
                root.classList.add("dark");
            } else {
                // system mode
                const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                root.classList.toggle("dark", isDark);
            }
        };

        applyTheme(theme);

        // Save preference
        localStorage.setItem("theme", theme);

        // Listen for system theme change (if system mode)
        if (theme === "system") {
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = () => applyTheme("system");
            media.addEventListener("change", handler);
            return () => media.removeEventListener("change", handler);
        }
    }, [theme]);

    return { theme, setTheme };
}
