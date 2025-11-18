import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";

import carImage from "../../../assets/AutoDataImages/cars.png";
import vanImage from "../../../assets/AutoDataImages/vans.png";
import pickupImage from "../../../assets/AutoDataImages/pickups.png";
import motorhomeImage from "../../../assets/AutoDataImages/motorhomes.png";
import truckImage from "../../../assets/AutoDataImages/trucks.png";
import agricultureImage from "../../../assets/AutoDataImages/agriculture.png";
import atvImage from "../../../assets/AutoDataImages/atv.png";
import jetSkiImage from "../../../assets/AutoDataImages/jetski.png";
import bikeImage from "../../../assets/AutoDataImages/bikes.png";
import snowmobileImage from "../../../assets/AutoDataImages/snow-mobile.png";
import constructionImage from "../../../assets/AutoDataImages/construction.png";
import busImage from "../../../assets/AutoDataImages/bus.png";

const AutoData = ({ embedOverride, onSelect }) => {
  const vehicleTypes = [
    { id: "cars", nameKey: "Cars", image: carImage },
    { id: "vans", nameKey: "Vans", image: vanImage },
    {
      id: "pickups",
      nameKey: "Pickups",
      image: pickupImage,
    },
    {
      id: "motorhomes",
      nameKey: "Motorhomes",
      image: motorhomeImage,
    },
    {
      id: "trucks",
      nameKey: "Trucks",
      image: truckImage,
    },
    {
      id: "agriculture",
      nameKey: "Agriculture",
      image: agricultureImage,
    },
    { id: "atv", nameKey: "Atv", image: atvImage },
    { id: "bikes", nameKey: "Bikes", image: bikeImage },
    {
      id: "jet-ski",
      nameKey: "Jet Ski",
      image: jetSkiImage,
    },
    {
      id: "snow-mobile",
      nameKey: "Snow Mobile",
      image: snowmobileImage,
    },
    {
      id: "construction",
      nameKey: "Construction",
      image: constructionImage,
    },
    { id: "bus", nameKey: "Bus", image: busImage },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const isEmbedParam =
    params.get("embed") === "1" || params.get("embed") === "true";
  const isEmbed = embedOverride ?? isEmbedParam;

  const [activeView, setActiveView] = useState("auto-data");

  const [engineNumber, setEngineNumber] = useState("");

  const handleSearch = () => {
    if (engineNumber) {
      navigate(`/auto-data/vehicle/${engineNumber}`);
    }
  };

  // Embedded drill-down state
  const [embedView, setEmbedView] = useState(null);
  const [carsMakesList, setCarsMakesList] = useState([]);
  const [carsModels, setCarsModels] = useState({});
  const [carsLoading, setCarsLoading] = useState(false);
  const [embedSearchQ, setEmbedSearchQ] = useState("");

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        isEmbed || embedOverride
          ? "bg-transparent rounded-none border-0"
          : "bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700"
      }
    >
      <div className="p-4 sm:p-6">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-8">
            <div className="flex-1 w-full lg:w-auto">
              <h1
                className={`${
                  isEmbed || embedOverride
                    ? "text-lg sm:text-xl"
                    : "text-2xl sm:text-3xl"
                } font-bold text-zinc-900 dark:text-white mb-2 sm:mb-3`}
              >
                Choose Vehicle Type
              </h1>
              <div
                className={`${
                  isEmbed || embedOverride
                    ? "text-zinc-500 text-sm space-y-2"
                    : "text-zinc-600 dark:text-zinc-400 space-y-2 text-sm sm:text-base"
                }`}
              >
                <p>
                  We offer you the most detailed chiptuning database on the
                  Internet. Currently, our database consists of more than 18,000
                  records.
                </p>
                <p>
                  The database is constantly updated by professional tuners.
                </p>
                <p className="text-zinc-500 dark:text-zinc-500">
                  Select the vehicle type and follow further details.
                </p>
              </div>
            </div>

            {/* Search Section */}
            <div
              className={`relative ${
                isEmbed || embedOverride
                  ? "bg-transparent"
                  : "bg-zinc-100 dark:bg-[#1A1A1A]"
              } rounded-lg p-3 w-full lg:w-[420px] border ${
                isEmbed || embedOverride
                  ? "border-dashed border-zinc-700"
                  : "border-dashed border-zinc-700"
              }`}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <h2
                    className={`${
                      isEmbed || embedOverride
                        ? "text-sm"
                        : "text-base sm:text-lg"
                    } font-semibold text-zinc-900 dark:text-white`}
                  >
                    Search by Engine Number
                  </h2>
                </div>

                {/* Yellow registration plate (visual only) */}
                <div className="absolute top-0 right-3">
                  <div
                    className={`flex items-center bg-[#FFD400] text-black rounded-md px-2 ${
                      isEmbed || embedOverride ? "py-1" : "py-2"
                    } shadow-sm border border-[#e6b800]`}
                  >
                    <span
                      className={`mr-2 ${
                        isEmbed || embedOverride ? "w-5 h-3" : "w-6 h-4"
                      } inline-block`}
                    >
                      <svg
                        width="24"
                        height="16"
                        viewBox="0 0 60 30"
                        xmlns="http://www.w3.org/2000/svg"
                        className="rounded-sm"
                      >
                        <clipPath id="t">
                          <path d="M0 0v30h60V0z" />
                        </clipPath>
                        <g clipPath="url(#t)">
                          <path fill="#012169" d="M0 0h60v30H0z" />
                          <path fill="#FFF" d="M0 0l60 30M60 0L0 30" />
                          <path
                            fill="#C8102E"
                            d="M0 0l60 30M60 0L0 30"
                            transform="translate(0,0) scale(0.6)"
                          />
                          <path fill="#FFF" d="M25 0h10v30H25zM0 10h60v10H0z" />
                          <path
                            fill="#C8102E"
                            d="M27 0h6v30h-6zM0 12h60v6H0z"
                          />
                        </g>
                      </svg>
                    </span>
                    <div
                      className={`${
                        isEmbed || embedOverride
                          ? "font-mono text-xs"
                          : "font-mono tracking-wider text-sm"
                      }`}
                    >
                      XXXX XXX
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Input
                    value={engineNumber}
                    onChange={(e) => setEngineNumber(e.target.value)}
                    placeholder="Enter engine number"
                    className={`w-full bg-white dark:bg-[#141414] border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-500 ${
                      isEmbed || embedOverride ? "h-8" : "h-9 sm:h-10"
                    }`}
                  />
                  <Button
                    onClick={handleSearch}
                    className={`w-full bg-[#FFB800] hover:bg-[#FFB800]/90 text-black font-medium ${
                      isEmbed || embedOverride
                        ? "h-8 text-sm"
                        : "h-9 sm:h-10 text-sm sm:text-base"
                    }`}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-4">
            {(!isEmbed || !embedView) &&
              vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => {
                    // If embedded and user clicked 'cars', enter embedded cars view
                    if (isEmbed && vehicle.id === "cars") {
                      setEmbedView({ name: "cars" });
                      // load makes list lazily
                      import("./Car/Car")
                        .then((mod) => {
                          setCarsMakesList(mod.carMakes || []);
                        })
                        .catch(() => setCarsMakesList([]));
                      return;
                    }

                    // If an onSelect handler was provided (embedded modal), call it instead
                    if (onSelect) {
                      // pass a lightweight selection object for non-car types
                      onSelect({ type: vehicle.id, nameKey: vehicle.nameKey });
                      return;
                    }
                    // navigate to vehicle-specific page when tile clicked
                    navigate(`/${vehicle.id}`);
                  }}
                  className={`rounded-lg ${
                    isEmbed || embedOverride ? "p-3" : "p-6"
                  } border border-zinc-700 bg-transparent flex flex-col items-center justify-between hover:bg-zinc-800/50 dark:hover:bg-[#1A1A1A]/40 transition-colors cursor-pointer group`}
                >
                  <div
                    className={`${
                      isEmbed || embedOverride
                        ? "h-16 sm:h-18 lg:h-20"
                        : "h-20 sm:h-24 lg:h-32"
                    } flex items-center justify-center mb-1 sm:mb-2 lg:mb-3`}
                  >
                    <img
                      src={vehicle.image}
                      alt={vehicle.nameKey}
                      className={`${
                        isEmbed || embedOverride
                          ? "w-20 h-20 sm:w-24 sm:h-24"
                          : "w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36"
                      } object-contain group-hover:scale-105 transition-all duration-200`}
                    />
                  </div>
                  <span
                    className={`${
                      isEmbed || embedOverride
                        ? "text-xs"
                        : "text-xs sm:text-sm"
                    } font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors text-center`}
                  >
                    {vehicle.nameKey}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (embedOverride === true) {
    return (
      <div className="w-full h-full">
        <div className="bg-[#0b0b0c] text-white rounded-xl overflow-hidden shadow-2xl border border-[#222] h-full flex flex-col">
          <div className="p-6 flex-1">{content}</div>
        </div>
      </div>
    );
  }

  if (isEmbedParam) {
    // Render as centered dark modal panel for embedding inside iframe/modal
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6">
        <div className="w-full max-w-[1200px] mx-auto h-[90vh]">
          <div className="bg-[#0b0b0c] text-white rounded-2xl overflow-hidden shadow-2xl border border-[#222] h-full flex flex-col">
            <div className="p-12 flex-1 overflow-y-auto">{content}</div>
          </div>
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default AutoData;
