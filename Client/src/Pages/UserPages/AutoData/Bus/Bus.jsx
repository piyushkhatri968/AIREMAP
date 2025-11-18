import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";

const makes = [
  { id: "daf", name: "DAF", logo: "/images/car-logos/daf.png" },
  { id: "hyundai", name: "HYUNDAI", logo: "/images/car-logos/hyundai.png" },
  { id: "isuzu", name: "ISUZU", logo: "/images/car-logos/isuzu.png" },
  { id: "iveco", name: "IVECO", logo: "/images/car-logos/iveco.png" },
  {
    id: "king-long",
    name: "KING LONG",
    logo: "/images/car-logos/king-long.png",
  },
  { id: "man", name: "MAN", logo: "/images/car-logos/man.png" },
  { id: "mercedes", name: "MERCEDES", logo: "/images/car-logos/mercedes.png" },
  { id: "otokar", name: "OTOKAR", logo: "/images/car-logos/otokar.png" },
  { id: "temsa", name: "TEMSA", logo: "/images/car-logos/temsa.png" },
  { id: "thaco", name: "THACO", logo: "/images/car-logos/thaco.png" },
  { id: "volare", name: "VOLARE", logo: "/images/car-logos/volare.png" },
  { id: "volvo", name: "VOLVO", logo: "/images/car-logos/volvo.png" },
  { id: "yutong", name: "YUTONG", logo: "/images/car-logos/yutong.png" },
];

const Bus = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBusMakes = makes.filter((make) =>
    make.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-white dark:bg-[#171819]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700"
      >
        <div className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-red-600 text-sm">Auto Data</span>
                <span className="text-gray-500 text-sm">/</span>
                <span className="text-gray-500 text-sm">Bus</span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Select Vehicle Make
              </h1>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by make"
                className="pl-10 w-full bg-white dark:text-white dark:bg-[#141414] border-gray-200 dark:border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Car Makes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {filteredBusMakes.map((make) => (
                <div
                  key={make.id}
                  onClick={() => {
                    // Generic navigation: go to /{make.id}. If the route doesn't exist
                    // the app will show the not-found page. We also pass make info
                    // in state for pages that use it (e.g. modification-plan or details).
                    navigate(`/${make.id}`, {
                      state: {
                        make: make.name,
                        makeId: make.id,
                      },
                    });
                  }}
                  className="aspect-square flex flex-col items-center justify-center p-4 bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-600 dark:hover:border-red-600 cursor-pointer transition-colors group"
                >
                  <img
                    src={make.logo}
                    alt={make.name}
                    className="h-12 w-12 object-contain mb-2 group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="text-xs text-center font-medium text-gray-900 dark:text-gray-300 group-hover:text-red-600">
                    {make.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Bus;
