import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";

const makes = [
  { id: "aeon", name: "AEON", logo: "/images/car-logos/aeon.png" },
  {
    id: "arctic-cat",
    name: "ARCTIC CAT",
    logo: "/images/car-logos/arctic-cat.png",
  },
  { id: "can-am", name: "CAN-AM", logo: "/images/car-logos/can-am.png" },
  { id: "cf-moto", name: "CF MOTO", logo: "/images/car-logos/cf-moto.png" },
  { id: "honda", name: "HONDA", logo: "/images/car-logos/honda.png" },
  { id: "kawasaki", name: "KAWASAKI", logo: "/images/car-logos/kawasaki.png" },
  { id: "polaris", name: "POLARIS", logo: "/images/car-logos/polaris.png" },
  { id: "segway", name: "SEGWAY", logo: "/images/car-logos/segway.png" },
  { id: "textron", name: "TEXTRON", logo: "/images/car-logos/textron.png" },
  { id: "trapper", name: "TRAPPER", logo: "/images/car-logos/trapper.png" },
  { id: "yamaha", name: "YAMAHA", logo: "/images/car-logos/yamaha.png" },
];

const Atv = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAtcMakes = makes.filter((make) =>
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
                <span className="text-gray-500 text-sm">Atv</span>
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
              {filteredAtcMakes.map((make) => (
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

export default Atv;
