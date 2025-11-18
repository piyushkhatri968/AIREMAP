import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";

const Motorhome = () => {
  const brands = [
    "AUTO-TRAIL",
    "CHEVROLET",
    "CI MOTORHOMES",
    "CITROEN",
    "DACIA",
    "DAIHATSU",
    "FIAT",
    "FORD",
    "GMC",
    "HYMER",
    "HYUNDAI",
    "ISUZU",
    "IVECO",
    "LAND ROVER",
    "LDV",
    "MARUTI",
    "MERCEDES-BENZ",
    "MG",
    "MITSUBISHI",
    "NISSAN",
    "OPEL",
    "PEUGEOT",
    "PIAGGIO",
    "RENAULT",
    "RIMOR",
    "ROLLERTEAM",
    "ROVER",
    "SEAT",
    "SKODA",
    "SSANGYONG",
    "SUBARU",
    "SUZUKI",
    "TATA",
    "TEMPO LIBERO",
    "TOYOTA",
    "TRIGANO",
    "VAUXHALL",
    "VOLKSWAGEN",
  ];

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMotorhomeMakes = brands.filter((make) =>
    make.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-white dark:bg-[#171819]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
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
                <span className="text-gray-500 text-sm">Motorhomes</span>
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
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {filteredMotorhomeMakes.map((brand) => {
                // derive filename similar to cars.tsx (lowercase, replace spaces with hyphens)
                const fileName = brand
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/_/g, "-")
                  .replace(/\./g, "");
                const imgPath = `/images/car-logos/${fileName}.png`;
                return (
                  <div
                    key={brand}
                    className="aspect-square flex flex-col items-center justify-center p-4 bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-600 dark:hover:border-red-600 cursor-pointer transition-colors group"
                  >
                    <img
                      src={imgPath}
                      alt={brand}
                      className="h-12 w-12 object-contain mb-2 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />

                    <span className="text-xs text-center font-medium text-gray-900 dark:text-gray-300 group-hover:text-red-600">
                      {brand}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Motorhome;
