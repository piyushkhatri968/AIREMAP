import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { faultCodes } from "../../utils/FaultyCodesData";

const FaultyCodesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredCodes = faultCodes.filter(
        (code) =>
            code.pCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            code.dfCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            code.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCodes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCodes = filteredCodes.slice(startIndex, startIndex + itemsPerPage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700 m-3 sm:m-6 mt-6 sm:mt-0"
        >
            <div className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <Input
                                type="text"
                                placeholder="Search by DF-Code, P-Code, or Description"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 sm:pl-10 w-full bg-white dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white text-sm sm:text-base placeholder:text-zinc-500 dark:placeholder:text-gray-400 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-zinc-200 dark:border-gray-700">
                                        <th className="py-3 px-4 text-sm font-medium text-zinc-500 dark:text-gray-400 uppercase tracking-wider w-40">
                                            P Code
                                        </th>
                                        <th className="py-3 px-4 text-sm font-medium text-zinc-500 dark:text-gray-400 uppercase tracking-wider w-56">
                                            DF Code
                                        </th>

                                        <th className="py-3 px-4 text-sm font-medium text-zinc-500 dark:text-gray-400 uppercase tracking-wider text-right">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-200 dark:divide-gray-700">
                                    {paginatedCodes.map((code, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-zinc-100/50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="py-3 px-4 text-zinc-900 dark:text-white text-sm">
                                                {code.pCode}
                                            </td>
                                            <td className="py-3 px-4 text-zinc-900 dark:text-white text-sm">
                                                {code.dfCode}
                                            </td>

                                            <td className="py-3 px-4 text-zinc-900 dark:text-white text-sm text-right">
                                                {code.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="sm:hidden">
                            <div className="space-y-2 divide-y divide-zinc-200 dark:divide-gray-700">
                                {paginatedCodes.map((code, index) => (
                                    <div
                                        key={index}
                                        className="py-3 px-3 hover:bg-zinc-100/50 dark:hover:bg-gray-700/50 transition-colors space-y-2"
                                    >
                                        <div className="flex justify-between text-sm">
                                            <p className="text-zinc-500 dark:text-gray-400">
                                                P Code: {code.pCode}
                                            </p>
                                            <p className="text-zinc-900 dark:text-white font-medium">
                                                DF Code: {code.dfCode}
                                            </p>

                                        </div>
                                        <p className="text-zinc-700 dark:text-gray-300 text-sm mt-1">
                                            {code.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2 mt-4">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="p-2 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50"
                        >
                            «
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50"
                        >
                            ‹
                        </button>
                        {(() => {
                            const maxVisible = window.innerWidth < 640 ? 5 : 10;
                            const pages = [];
                            let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                            let endPage = Math.min(totalPages, startPage + maxVisible - 1);

                            if (endPage - startPage + 1 < maxVisible)
                                startPage = Math.max(1, endPage - maxVisible + 1);

                            if (startPage > 1) {
                                pages.push(1);
                                if (startPage > 2) pages.push("...");
                            }

                            for (let i = startPage; i <= endPage; i++) pages.push(i);

                            if (endPage < totalPages) {
                                if (endPage < totalPages - 1) pages.push("...");
                                pages.push(totalPages);
                            }

                            return pages.map((page, index) =>
                                typeof page === "number" ? (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 flex items-center justify-center rounded text-sm ${currentPage === page
                                            ? "bg-red-500 text-white"
                                            : "text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span
                                        key={index}
                                        className="w-8 h-8 flex items-center justify-center text-zinc-500 dark:text-gray-400"
                                    >
                                        {page}
                                    </span>
                                )
                            );
                        })()}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50"
                        >
                            ›
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-2 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50"
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FaultyCodesPage;
