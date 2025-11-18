import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";

const makes = [
  { id: "agco", name: "AGCO", logo: "/images/car-logos/agco.png" },
  {
    id: "antonio-carraro",
    name: "ANTONIO CARRARO",
    logo: "/images/car-logos/antonio-carraro.png",
  },
  { id: "arbos", name: "ARBOS", logo: "/images/car-logos/arbos.png" },
  { id: "artec", name: "ARTEC", logo: "/images/car-logos/artec.png" },
  { id: "atlas", name: "ATLAS", logo: "/images/car-logos/atlas.png" },
  { id: "avant", name: "AVANT", logo: "/images/car-logos/avant.png" },
  { id: "belarus", name: "BELARUS", logo: "/images/car-logos/belarus.png" },
  { id: "berthoud", name: "BERTHOUD", logo: "/images/car-logos/berthoud.png" },
  {
    id: "bombardier",
    name: "BOMBARDIER",
    logo: "/images/car-logos/bombardier.png",
  },
  {
    id: "buhler-versatile",
    name: "BUHLER VERSATILE",
    logo: "/images/car-logos/buhler-versatile.png",
  },
  { id: "camox", name: "CAMOX", logo: "/images/car-logos/camox.png" },
  { id: "case", name: "CASE", logo: "/images/car-logos/case.png" },
  { id: "case-ih", name: "CASE IH", logo: "/images/car-logos/case-ih.png" },
  {
    id: "caterpillar",
    name: "CATERPILLAR",
    logo: "/images/car-logos/caterpillar.png",
  },
  {
    id: "challenger",
    name: "CHALLENGER",
    logo: "/images/car-logos/challenger.png",
  },
  { id: "claas", name: "CLAAS TRACTORS", logo: "/images/car-logos/claas.png" },
  { id: "cmi", name: "CMI", logo: "/images/car-logos/cmi.png" },
  { id: "crary", name: "CRARY", logo: "/images/car-logos/crary.png" },
  { id: "deutz", name: "DEUTZ", logo: "/images/car-logos/deutz.png" },
  {
    id: "deutz-fahr",
    name: "DEUTZ-FAHR",
    logo: "/images/car-logos/deutz-fahr.png",
  },
  { id: "dieci", name: "DIECI", logo: "/images/car-logos/dieci.png" },
  { id: "doosan", name: "DOOSAN", logo: "/images/car-logos/doosan.png" },
  { id: "ecolog", name: "ECOLOG", logo: "/images/car-logos/ecolog.png" },
  { id: "euromach", name: "EUROMACH", logo: "/images/car-logos/euromach.png" },
  { id: "fendt", name: "FENDT", logo: "/images/car-logos/fendt.png" },
  { id: "gvm", name: "GVM", logo: "/images/car-logos/gvm.png" },
  { id: "hagie", name: "HAGIE", logo: "/images/car-logos/hagie.png" },
  { id: "halcon", name: "HALCON", logo: "/images/car-logos/halcon.png" },
  { id: "hbmnobas", name: "HBM NOBAS", logo: "/images/car-logos/hbmnobas.png" },
  { id: "hidromek", name: "HIDROMEK", logo: "/images/car-logos/hidromek.png" },
  { id: "hitachi", name: "HITACHI", logo: "/images/car-logos/hitachi.png" },
  { id: "hydrema", name: "HYDREMA", logo: "/images/car-logos/hydrema.png" },
  {
    id: "hyundai-tractors",
    name: "HYUNDAI TRACTORS",
    logo: "/images/car-logos/hyundai-tractors.png",
  },
  { id: "jcb", name: "JCB", logo: "/images/car-logos/jcb.png" },
  {
    id: "john-deere",
    name: "JOHN DEERE",
    logo: "/images/car-logos/john-deere.png",
  },
  {
    id: "kaessbohrer",
    name: "KAESSBOHRER",
    logo: "/images/car-logos/kaessbohrer.png",
  },
  { id: "kioti", name: "KIOTI TRACTORS", logo: "/images/car-logos/kioti.png" },
  { id: "komatsu", name: "KOMATSU", logo: "/images/car-logos/komatsu.png" },
  { id: "krone", name: "KRONE", logo: "/images/car-logos/krone.png" },
  { id: "kubota", name: "KUBOTA", logo: "/images/car-logos/kubota.png" },
  {
    id: "lamborghini-tractors",
    name: "LAMBORGHINI TRACTORS",
    logo: "/images/car-logos/lamborghini-tractors.png",
  },
  {
    id: "landini-tractors",
    name: "LANDINI TRACTORS",
    logo: "/images/car-logos/landini-tractors.png",
  },
  { id: "laverda", name: "LAVERDA", logo: "/images/car-logos/laverda.png" },
  { id: "linde-ag", name: "LINDE AG", logo: "/images/car-logos/linde-ag.png" },
  { id: "lindner", name: "LINDNER", logo: "/images/car-logos/lindner.png" },
  { id: "macdon", name: "MACDON", logo: "/images/car-logos/macdon.png" },
  { id: "manitou", name: "MANITOU", logo: "/images/car-logos/manitou.png" },
  {
    id: "massey-ferguson",
    name: "MASSEY FERGUSON",
    logo: "/images/car-logos/massey-ferguson.png",
  },
  { id: "matrot", name: "MATROT", logo: "/images/car-logos/matrot.png" },
  {
    id: "mccormick",
    name: "MCCORMICK",
    logo: "/images/car-logos/mccormick.png",
  },
  { id: "merlo", name: "MERLO", logo: "/images/car-logos/merlo.png" },
  { id: "miller", name: "MILLER", logo: "/images/car-logos/miller.png" },
  {
    id: "new-holland",
    name: "NEW HOLLAND",
    logo: "/images/car-logos/new-holland.png",
  },
  { id: "orvex", name: "ORVEX", logo: "/images/car-logos/orvex.png" },
  {
    id: "powerscreen",
    name: "POWERSCREEN",
    logo: "/images/car-logos/powerscreen.png",
  },
  { id: "prentice", name: "PRENTICE", logo: "/images/car-logos/prentice.png" },
  { id: "reform", name: "REFORM", logo: "/images/car-logos/reform.png" },
  {
    id: "rostselmash",
    name: "ROSTSELMASH",
    logo: "/images/car-logos/rostselmash.png",
  },
  {
    id: "same-tractors",
    name: "SAME TRACTORS",
    logo: "/images/car-logos/same.png",
  },
  { id: "schaffer", name: "SCHAFFER", logo: "/images/car-logos/schaffer.png" },
  {
    id: "sennebogen",
    name: "SENNEBOGEN TRACTORS",
    logo: "/images/car-logos/sennebogen.png",
  },
  { id: "steyr", name: "STEYR", logo: "/images/car-logos/steyr.png" },
  { id: "still", name: "STILL", logo: "/images/car-logos/still.png" },
  { id: "takeuchi", name: "TAKEUCHI", logo: "/images/car-logos/takeuchi.png" },
  { id: "tecnoma", name: "TECNOMA", logo: "/images/car-logos/tecnoma.png" },
  {
    id: "tigercat",
    name: "TIGERCAT TRACTORS",
    logo: "/images/car-logos/tigercat.png",
  },
  { id: "toyota", name: "TOYOTA", logo: "/images/car-logos/toyota.png" },
  { id: "valtra", name: "VALTRA", logo: "/images/car-logos/valtra.png" },
  { id: "vermeer", name: "VERMEER", logo: "/images/car-logos/vermeer.png" },
  { id: "versa", name: "VERSA", logo: "/images/car-logos/versa.png" },
  { id: "yale", name: "YALE", logo: "/images/car-logos/yale.png" },
];
const Agriculture = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgricultureMakes = makes.filter((make) =>
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
                <span className="text-gray-500 text-sm">Agriculture</span>
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
              {filteredAgricultureMakes.map((make) => (
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

export default Agriculture;
