import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";

export const carMakes = [
  { id: "acura", name: "ACURA", logo: "/images/car-logos/acura-seeklogo.png" },
  {
    id: "alfa-romeo",
    name: "ALFA ROMEO",
    logo: "/images/car-logos/alfa-romeo.png",
  },
  { id: "alpina", name: "ALPINA", logo: "/images/car-logos/alpina.png" },
  { id: "ajp", name: "AJP", logo: "/images/car-logos/ajp-moto-seeklogo.png" },
  {
    id: "aston-martin",
    name: "ASTON MARTIN",
    logo: "/images/car-logos/aston-martin.png",
  },
  { id: "audi", name: "AUDI", logo: "/images/car-logos/Audi.png" },
  {
    id: "aprilia",
    name: "APRILIA",
    logo: "/images/car-logos/aprilia-seeklogo.png",
  },
  { id: "bentley", name: "BENTLEY", logo: "/images/car-logos/bentley.png" },
  { id: "bmw", name: "BMW", logo: "/images/car-logos/bmw.png" },
  { id: "baic", name: "BAIC", logo: "/images/car-logos/baic-seeklogo.png" },
  { id: "buick", name: "BUICK", logo: "/images/car-logos/buick.png" },
  { id: "cadillac", name: "CADILLAC", logo: "/images/car-logos/cadillac.png" },
  { id: "case", name: "CASE", logo: "/images/car-logos/case-seeklogo.png" },
  { id: "chery", name: "CHERY", logo: "/images/car-logos/chery.png" },
  {
    id: "chevrolet",
    name: "CHEVROLET",
    logo: "/images/car-logos/chevrolet.png",
  },
  { id: "chrysler", name: "CHRYSLER", logo: "/images/car-logos/chrysler.png" },
  { id: "citroen", name: "CITROEN", logo: "/images/car-logos/citroen.png" },
  { id: "cupra", name: "CUPRA", logo: "/images/car-logos/cupra.png" },
  {
    id: "challenger",
    name: "CHALLENGER",
    logo: "/images/car-logos/challenger-camping-car-seeklogo.png",
  },
  {
    id: "changan",
    name: "CHANGAN",
    logo: "/images/car-logos/changan-icon-seeklogo.png",
  },
  { id: "claas", name: "CLAAS", logo: "/images/car-logos/claas-seeklogo.png" },
  {
    id: "cmc",
    name: "CMC",
    logo: "/images/car-logos/cmc-commercial-metals-company-seeklogo.png",
  },

  { id: "dacia", name: "DACIA", logo: "/images/car-logos/dacia.png" },
  { id: "daewoo", name: "DAEWOO", logo: "/images/car-logos/daewoo.png" },
  { id: "deutz", name: "DEUTZ", logo: "/images/car-logos/deutz-seeklogo.png" },
  {
    id: "deepal",
    name: "DEEPAL",
    logo: "/images/car-logos/deepal-global-changan-seeklogo.png",
  },
  { id: "daf", name: "DAF", logo: "/images/car-logos/daf-seeklogo.png" },
  { id: "dodge", name: "DODGE", logo: "/images/car-logos/dodge.png" },
  {
    id: "donkervoort",
    name: "DONKERVOORT",
    logo: "/images/car-logos/donkervoort.png",
  },
  {
    id: "dizajn",
    name: "DIZAJN",
    logo: "/images/car-logos/logo-dizajn-seeklogo.png",
  },

  {
    id: "hitachi",
    name: "HITACHI",
    logo: "/images/car-logos/fiat-hitachi-seeklogo.png",
  },
  { id: "fendt", name: "FENDT", logo: "/images/car-logos/fendt-seeklogo.png" },
  { id: "ferrari", name: "FERRARI", logo: "/images/car-logos/ferrari.png" },
  { id: "fiat", name: "FIAT", logo: "/images/car-logos/fiat.png" },
  { id: "ford", name: "FORD", logo: "/images/car-logos/ford.png" },
  {
    id: "freightliner",
    name: "FREIGHTLINER",
    logo: "/images/car-logos/freightliner-trucks-seeklogo.png",
  },

  {
    id: "genesis",
    name: "GENESIS",
    logo: "/images/car-logos/genesis-seeklogo.png",
  },
  { id: "gmc", name: "GMC", logo: "/images/car-logos/gmc.png" },
  { id: "gac", name: "GAC", logo: "/images/car-logos/gac-motor-seeklogo.png" },
  {
    id: "geely",
    name: "GEELY",
    logo: "/images/car-logos/geely-auto-seeklogo.png",
  },
  { id: "gwm", name: "GWM", logo: "/images/car-logos/gwm.png" },
  { id: "holden", name: "HOLDEN", logo: "/images/car-logos/holden.png" },
  { id: "honda", name: "HONDA", logo: "/images/car-logos/honda.png" },
  { id: "hyundai", name: "HYUNDAI", logo: "/images/car-logos/hyundai.png" },
  {
    id: "hummer",
    name: "HUMMER",
    logo: "/images/car-logos/hummer-seeklogo.png",
  },
  {
    id: "hongqi",
    name: "HONQIQI",
    logo: "/images/car-logos/hongqi-seeklogo.png",
  },
  {
    id: "holland",
    name: "HOLLAND",
    logo: "/images/car-logos/new-holland-seeklogo.png",
  },

  { id: "infiniti", name: "INFINITI", logo: "/images/car-logos/infiniti.png" },
  { id: "isuzu", name: "ISUZU", logo: "/images/car-logos/isuzu.png" },
  { id: "iveco", name: "IVECO", logo: "/images/car-logos/iveco-seeklogo.png" },
  { id: "jaguar", name: "JAGUAR", logo: "/images/car-logos/jaguar.png" },
  { id: "jeep", name: "JEEP", logo: "/images/car-logos/jeep.png" },
  {
    id: "john-deere",
    name: "JOHN DEERE",
    logo: "/images/car-logos/john-deere-1956-seeklogo.png",
  },
  {
    id: "jetour",
    name: "JETOUR",
    logo: "/images/car-logos/jetour-seeklogo.png",
  },
  { id: "jcb", name: "JCB", logo: "/images/car-logos/jcb-seeklogo.png" },
  { id: "jac", name: "JAC", logo: "/images/car-logos/jac-seeklogo.png" },

  { id: "kia", name: "KIA", logo: "/images/car-logos/kia.png" },
  { id: "krone", name: "KRONE", logo: "/images/car-logos/krone-seeklogo.png" },

  {
    id: "lamborghini",
    name: "LAMBORGHINI",
    logo: "/images/car-logos/lamborghini.png",
  },
  { id: "lancia", name: "LANCIA", logo: "/images/car-logos/lancia.png" },
  {
    id: "land-rover",
    name: "LAND ROVER",
    logo: "/images/car-logos/land-rover.png",
  },
  { id: "lexus", name: "LEXUS", logo: "/images/car-logos/lexus.png" },
  {
    id: "luxgen",
    name: "LUXGEN",
    logo: "/images/car-logos/luxgen-seeklogo.png",
  },
  {
    id: "lotus",
    name: "LOTUS",
    logo: "/images/car-logos/lotus-cars-seeklogo.png",
  },
  {
    id: "lindner",
    name: "LINDNER",
    logo: "/images/car-logos/lindner-seeklogo.png",
  },
  {
    id: "lincoln",
    name: "LINCOLN",
    logo: "/images/car-logos/lincoln-electric-company-seeklogo.png",
  },

  {
    id: "norton",
    name: "NORTON",
    logo: "/images/car-logos/norton-classic-seeklogo.png",
  },
  {
    id: "nissan",
    name: "NISSAN",
    logo: "/images/car-logos/nissan-seeklogo.png",
  },
  { id: "mv", name: "MV", logo: "/images/car-logos/mv-agusta-seeklogo.png" },
  {
    id: "motron",
    name: "MOTRON",
    logo: "/images/car-logos/motron-seeklogo.png",
  },
  {
    id: "moto-morini",
    name: "MOTO MORINI",
    logo: "/images/car-logos/moto-morini-seeklogo.png",
  },
  {
    id: "moto-guzzi",
    name: "MOTO GUZZI",
    logo: "/images/car-logos/moto-guzzi-seeklogo.png",
  },
  {
    id: "mitsubishi",
    name: "MITSUBISHI",
    logo: "/images/car-logos/mitsubishi-seeklogo.png",
  },
  {
    id: "mini-cooper",
    name: "MINI COOPER",
    logo: "/images/car-logos/mini-cooper-seeklogo.png",
  },
  { id: "mg", name: "MG", logo: "/images/car-logos/mg-seeklogo.png" },
  {
    id: "mercury-marine",
    name: "MERCURY MARINE",
    logo: "/images/car-logos/mercury-marine-seeklogo.png",
  },
  {
    id: "mclaren",
    name: "MCLAREN",
    logo: "/images/car-logos/mclaren-seeklogo.png",
  },
  {
    id: "mc-cormick",
    name: "MC CORMICK",
    logo: "/images/car-logos/mc-cormick-seeklogo.png",
  },
  { id: "mazda", name: "MAZDA", logo: "/images/car-logos/mazda-seeklogo.png" },
  {
    id: "massey-ferguson",
    name: "MASSEY FERGUSON",
    logo: "/images/car-logos/massey-ferguson-seeklogo.png",
  },
  {
    id: "maserati",
    name: "MASERATI",
    logo: "/images/car-logos/maserati-seeklogo.png",
  },
  { id: "man", name: "MAN", logo: "/images/car-logos/man-seeklogo.png" },
  {
    id: "mahindra",
    name: "MAHINDRA",
    logo: "/images/car-logos/mahindra-seeklogo.png",
  },
  { id: "mack", name: "MACK", logo: "/images/car-logos/mack-seeklogo.png" },

  { id: "opel", name: "OPEL", logo: "/images/car-logos/opel-new-seeklogo.png" },
  {
    id: "oldsmobile",
    name: "OLDSMOBILE",
    logo: "/images/car-logos/oldsmobile-seeklogo.png",
  },

  { id: "volvo", name: "VOLVO", logo: "/images/car-logos/volvo-seeklogo.png" },
  {
    id: "valtra",
    name: "VALTRA",
    logo: "/images/car-logos/valtra-seeklogo.png",
  },
  {
    id: "toyota",
    name: "TOYOTA",
    logo: "/images/car-logos/toyota-seeklogo.png",
  },
  { id: "tata", name: "TATA", logo: "/images/car-logos/tata-seeklogo.png" },
  {
    id: "suzuki",
    name: "SUZUKI",
    logo: "/images/car-logos/suzuki-seeklogo.png",
  },
  { id: "steyr", name: "STEYR", logo: "/images/car-logos/steyr-seeklogo.png" },
  {
    id: "ssangyong",
    name: "SSANGYONG",
    logo: "/images/car-logos/ssangyong-seeklogo.png",
  },
  { id: "smart", name: "SMART", logo: "/images/car-logos/smart-seeklogo.png" },
  { id: "skoda", name: "SKODA", logo: "/images/car-logos/skoda-seeklogo.png" },
  {
    id: "segway",
    name: "SEGWAY",
    logo: "/images/car-logos/segway-seeklogo.png",
  },
  { id: "seat", name: "SEAT", logo: "/images/car-logos/seat-seeklogo.png" },
  {
    id: "scania",
    name: "SCANIA",
    logo: "/images/car-logos/scania-seeklogo.png",
  },
  {
    id: "saturn",
    name: "SATURN",
    logo: "/images/car-logos/saturn-seeklogo.png",
  },
  {
    id: "lynk",
    name: "LYNK",
    logo: "/images/car-logos/samsung-lynk-seeklogo.png",
  },
  { id: "same", name: "SAME", logo: "/images/car-logos/same-seeklogo.png" },
  {
    id: "saab",
    name: "SAAB",
    logo: "/images/car-logos/saab-my2001-seeklogo.png",
  },
  {
    id: "royal-enfield",
    name: "ROYAL ENFIELD",
    logo: "/images/car-logos/royal-enfield-seeklogo.png",
  },
  {
    id: "rolls-royce",
    name: "ROLLS ROYCE",
    logo: "/images/car-logos/rolls-royce-seeklogo.png",
  },
  {
    id: "renault",
    name: "RENAULT",
    logo: "/images/car-logos/renault-seeklogo.png",
  },
  {
    id: "quadro",
    name: "QUADRO",
    logo: "/images/car-logos/quadro-de-aviacao-do-exercito-exercito-brasileir-seeklogo.png",
  },
  { id: "qj", name: "QJ", logo: "/images/car-logos/qj-motor-seeklogo.png" },
  {
    id: "proton",
    name: "PROTON",
    logo: "/images/car-logos/proton-seeklogo.png",
  },
  {
    id: "porsche",
    name: "PORSCHE",
    logo: "/images/car-logos/porsche-seeklogo.png",
  },
  {
    id: "pontiac",
    name: "PONTIAC",
    logo: "/images/car-logos/pontiac-firebird-1977-seeklogo.png",
  },
  {
    id: "polaris",
    name: "POLARIS",
    logo: "/images/car-logos/polaris-seeklogo.png",
  },
  {
    id: "piaggio",
    name: "PIAGGIO",
    logo: "/images/car-logos/piaggio-emblem-seeklogo.png",
  },
  {
    id: "peugeot",
    name: "PEUGEOT",
    logo: "/images/car-logos/peugeot-new-2021-seeklogo.png",
  },
];

const Car = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter car makes based on search query
  const filteredCarMakes = carMakes.filter((make) =>
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
                <span className="text-gray-500 text-sm">Cars</span>
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
              {filteredCarMakes.map((make) => (
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

export default Car;
