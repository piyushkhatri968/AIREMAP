import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";

const truckMakes = [
  {
    id: "aebi-schmidt",
    name: "AEBI SCHMIDT",
    logo: "/images/car-logos/aebi-schmidt.png",
  },
  { id: "agrale", name: "AGRALE", logo: "/images/car-logos/agrale.png" },
  {
    id: "alexander-dennis",
    name: "ALEXANDER DENNIS",
    logo: "/images/car-logos/alexander-dennis.png",
  },
  {
    id: "ashok-leyland",
    name: "ASHOK LEYLAND",
    logo: "/images/car-logos/ashok-leyland.png",
  },
  {
    id: "astra-truck",
    name: "ASTRA TRUCK",
    logo: "/images/car-logos/astra-truck.png",
  },
  { id: "autosan", name: "AUTOSAN", logo: "/images/car-logos/autosan.png" },
  { id: "avia", name: "AVIA", logo: "/images/car-logos/avia.png" },
  { id: "bci", name: "BCI", logo: "/images/car-logos/bci.png" },
  { id: "bmc", name: "BMC", logo: "/images/car-logos/bmc.png" },
  { id: "bremach", name: "BREMACH", logo: "/images/car-logos/bremach.png" },
  { id: "caetano", name: "CAETANO", logo: "/images/car-logos/caetano.png" },
  {
    id: "chenglong",
    name: "CHENGLONG",
    logo: "/images/car-logos/chenglong.png",
  },
  {
    id: "chevrolet",
    name: "CHEVROLET",
    logo: "/images/car-logos/chevrolet.png",
  },
  { id: "cummins", name: "CUMMINS", logo: "/images/car-logos/cummins.png" },
  {
    id: "daewoo-truck",
    name: "DAEWOO TRUCK",
    logo: "/images/car-logos/daewoo-truck.png",
  },
  {
    id: "daf-truck",
    name: "DAF TRUCK",
    logo: "/images/car-logos/daf-truck.png",
  },
  {
    id: "denning",
    name: "DENNING MANUFACTURING",
    logo: "/images/car-logos/denning.png",
  },
  { id: "dongfeng", name: "DONGFENG", logo: "/images/car-logos/dongfeng.png" },
  {
    id: "faw-jiefang",
    name: "FAW JIEFANG",
    logo: "/images/car-logos/faw-jiefang.png",
  },
  {
    id: "ford-truck",
    name: "FORD TRUCK",
    logo: "/images/car-logos/ford-truck.png",
  },
  { id: "foton", name: "FOTON", logo: "/images/car-logos/foton.png" },
  {
    id: "fpt-industrial",
    name: "FPT INDUSTRIAL",
    logo: "/images/car-logos/fpt-industrial.png",
  },
  {
    id: "freightliner",
    name: "FREIGHTLINER",
    logo: "/images/car-logos/freightliner.png",
  },
  { id: "gaz", name: "GAZ", logo: "/images/car-logos/gaz.png" },
  { id: "gmc", name: "GMC", logo: "/images/car-logos/gmc.png" },
  { id: "hino", name: "HINO", logo: "/images/car-logos/hino.png" },
  { id: "hydrema", name: "HYDREMA", logo: "/images/car-logos/hydrema.png" },
  { id: "hyundai", name: "HYUNDAI", logo: "/images/car-logos/hyundai.png" },
  { id: "ikaro", name: "IKARUS", logo: "/images/car-logos/ikarus.png" },
  {
    id: "international",
    name: "INTERNATIONAL",
    logo: "/images/car-logos/international.png",
  },
  { id: "isuzu", name: "ISUZU", logo: "/images/car-logos/isuzu.png" },
  { id: "iveco", name: "IVECO", logo: "/images/car-logos/iveco.png" },
  {
    id: "jac-truck",
    name: "JAC TRUCK",
    logo: "/images/car-logos/jac-truck.png",
  },
  { id: "jmc", name: "JMC", logo: "/images/car-logos/jmc.png" },
  { id: "kamaz", name: "KAMAZ", logo: "/images/car-logos/kamaz.png" },
  { id: "kenworth", name: "KENWORTH", logo: "/images/car-logos/kenworth.png" },
  { id: "mack", name: "MACK", logo: "/images/car-logos/mack.png" },
  {
    id: "man-truck",
    name: "MAN TRUCK",
    logo: "/images/car-logos/man-truck.png",
  },
  {
    id: "maz-minsk",
    name: "MAZ MINSK",
    logo: "/images/car-logos/maz-minsk.png",
  },
  {
    id: "mercedes-truck",
    name: "MERCEDES TRUCK",
    logo: "/images/car-logos/mercedes-truck.png",
  },
  {
    id: "mitsubishi-fuso",
    name: "MITSUBISHI FUSO",
    logo: "/images/car-logos/mitsubishi-fuso.png",
  },
  { id: "nissan", name: "NISSAN", logo: "/images/car-logos/nissan-truck.png" },
  {
    id: "peterbilt",
    name: "PETERBILT",
    logo: "/images/car-logos/peterbilt.png",
  },
  {
    id: "renault-truck",
    name: "RENAULT TRUCK",
    logo: "/images/car-logos/renault-truck.png",
  },
  {
    id: "scania-truck",
    name: "SCANIA TRUCK",
    logo: "/images/car-logos/scania-truck.png",
  },
  { id: "shacman", name: "SHACMAN", logo: "/images/car-logos/shacman.png" },
  { id: "sinotruk", name: "SINOTRUK", logo: "/images/car-logos/sinotruk.png" },
  { id: "sisu", name: "SISU", logo: "/images/car-logos/sisu.png" },
  {
    id: "tata-truck",
    name: "TATA TRUCK",
    logo: "/images/car-logos/tata-truck.png",
  },
  { id: "terex", name: "TEREX", logo: "/images/car-logos/terex.png" },
  { id: "toyota-truck", name: "TOYOTA", logo: "/images/car-logos/toyota.png" },
  {
    id: "ud-trucks",
    name: "UD TRUCKS",
    logo: "/images/car-logos/ud-trucks.png",
  },
  { id: "voegele", name: "VOEGELE", logo: "/images/car-logos/voegele.png" },
  {
    id: "volkswagen-truck",
    name: "VOLKSWAGEN TRUCK",
    logo: "/images/car-logos/volkswagen-truck.png",
  },
  { id: "volvo", name: "VOLVO", logo: "/images/car-logos/volvo.png" },
  {
    id: "western-star",
    name: "WESTERN STAR",
    logo: "/images/car-logos/western-star.png",
  },
  { id: "wirtgen", name: "WIRTGEN", logo: "/images/car-logos/wirtgen.png" },
  { id: "xcmg", name: "XCMG", logo: "/images/car-logos/xcmg.png" },
];

const Truck = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTruckMakes = truckMakes.filter((make) =>
    make.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                <span className="text-gray-500 text-sm">Trucks</span>
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
              {filteredTruckMakes.map((brand) => {
                return (
                  <div
                    key={brand.id}
                    className="aspect-square flex flex-col items-center justify-center p-4 bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-600 dark:hover:border-red-600 cursor-pointer transition-colors group"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-12 w-12 object-contain mb-2 group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />

                    <span className="text-xs text-center font-medium text-gray-900 dark:text-gray-300 group-hover:text-red-600">
                      {brand.name}
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

export default Truck;
