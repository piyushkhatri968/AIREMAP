import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FileCheck } from "lucide-react";
import car2 from "../../../assets/AuthImages/car2.png";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { toast } from "react-toastify";
const Overview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [priority, setPriority] = useState("1-2-hours");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const {
    vehicle,
    registration,
    ecuId,
    transmission,
    readTool,
    readType,
    stage,
    options,
    ecuFile,
    commonFiles,
    make,
    masterSlave,
    model,
    notes,
    year,
    from,
  } = location.state || {};

  const modificationOptions = [
    // Left Column
    {
      id: "act-off",
      name: "ACT OFF (Cylinder On Demand)",
      category: "performance",
    },
    {
      id: "ags-off",
      name: "AGS OFF (Active Grill Shutter)",
      category: "performance",
    },
    { id: "clone-ecu", name: "CLONE ECU", category: "performance" },
    { id: "cvn-fix", name: "CVN FIX", category: "performance" },
    {
      id: "dpf-fap-off",
      name: "DPF - FAP OFF",
      warning: true,
      category: "emissions",
    },
    { id: "egr-off", name: "EGR OFF", warning: true, category: "emissions" },
    {
      id: "exhaust-flap",
      name: "EXHAUST FLAP REMOVAL",
      category: "performance",
    },
    {
      id: "glowplug",
      name: "GLOWPLUG",
      warning: true,
      category: "performance",
    },
    {
      id: "hardcut",
      name: "HARDCUT POP&BANG LIMITER (DIESEL ONLY)",
      category: "performance",
    },
    { id: "immo-off", name: "IMMO OFF", category: "security" },
    { id: "launch-control", name: "LAUNCH CONTROL", category: "performance" },
    { id: "nox", name: "NOx", category: "emissions" },
    { id: "oil-pressure", name: "OIL PRESSURE FIX", category: "maintenance" },
    {
      id: "pop-bang",
      name: "POP & BANG (PETROL ONLY)",
      category: "performance",
    },
    {
      id: "sap-delete",
      name: "SAP DELETE (Secondry Air Pump)",
      category: "emissions",
    },
    { id: "speed-limit", name: "SPEED LIMIT OFF", category: "performance" },
    {
      id: "swirl-flaps",
      name: "SWIRL FLAPS OFF",
      warning: true,
      category: "performance",
    },
    { id: "water-pump", name: "WATER PUMP FIX", category: "maintenance" },

    // Right Column
    { id: "adblue-scr", name: "ADBLUE - SCR OFF", category: "emissions" },
    { id: "bmw-display", name: "BMW SPORTS DISPLAY", category: "display" },
    { id: "cold-start", name: "COLD START NOISE", category: "performance" },
    { id: "decode-encode", name: "DECODE - ENCODE", category: "security" },
    { id: "dtc-off", name: "DTC OFF", warning: true, category: "diagnostics" },
    { id: "evap-removal", name: "EVAP REMOVAL", category: "emissions" },
    { id: "flex-fuel", name: "FLEX FUEL E85", category: "fuel" },
    { id: "gpf-off", name: "GPF - OPF OFF", category: "emissions" },
    { id: "hot-start", name: "HOT START", category: "performance" },
    { id: "kickdown", name: "KICKDOWN DEACTIVATION", category: "transmission" },
    { id: "maf-off", name: "MAF OFF", category: "sensors" },
    { id: "o2-lambda", name: "O2 - LAMBDA OFF", category: "emissions" },
    { id: "original-file", name: "ORIGINAL FILE REQUEST", category: "service" },
    { id: "readiness", name: "READINESS CALIBRATION", category: "diagnostics" },
    {
      id: "rev-limiter",
      name: "SOFT REV LIMITER REMOVAL",
      category: "performance",
    },
    { id: "start-stop", name: "START STOP DISABLE", category: "comfort" },
    {
      id: "tprot-off",
      name: "TPROT OFF (Tuning Protection)",
      category: "security",
    },
  ];

  useEffect(() => {
    if (!location.state || from !== "modification-plan") {
      navigate("upload-file");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Please accept the terms");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Page Title and Breadcrumb */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Overview
        </h1>
        {/* Breadcrumb Navigation */}
        <div className="hidden sm:flex items-center space-x-2 text-sm text-zinc-500 dark:text-gray-400">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Dashboard
          </button>
          <span>&gt;</span>
          <span>Portal</span>
          <span>&gt;</span>
          <button
            onClick={() => navigate("/upload-file/modification-plan")}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Upload File
          </button>
          <span>&gt;</span>
          <span className="text-zinc-900 dark:text-white">Overview</span>
        </div>
      </div>
      {/* Step Indicators */}
      <div className="flex items-center justify-end py-2 sm:py-4 gap-3 sm:gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-200 text-zinc-500 dark:bg-gray-600 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold">
            1
          </div>
          <span className="text-zinc-500 dark:text-gray-400 text-xs sm:text-sm">
            Vehicle Details
          </span>
        </div>
        <span className="text-zinc-500 dark:text-gray-400 text-lg sm:text-xl">
          &gt;
        </span>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-200 text-zinc-500 dark:bg-gray-600 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold">
            2
          </div>
          <span className="text-zinc-500 dark:text-gray-400 text-xs sm:text-sm">
            Modification Plan
          </span>
        </div>
        <span className="text-zinc-500 dark:text-gray-400 text-lg sm:text-xl">
          &gt;
        </span>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold">
            3
          </div>
          <span className="text-zinc-900 dark:text-white text-xs sm:text-sm font-medium">
            Overview
          </span>
        </div>
      </div>
      {/* Main Content: two-column layout (left labels, right content) */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700"
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column: labels/descriptions */}
            <aside className="lg:col-span-3 space-y-8 pr-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
                  Overview
                </h2>
                <p className="text-sm text-zinc-500 dark:text-gray-400 whitespace-nowrap">
                  Check if the form data is entered correctly before submit.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                  Details
                </h3>
                <p className="text-xs text-zinc-500 dark:text-gray-400">
                  Make sure you enter the correct car details, as accurate as
                  possible helps to complete the file faster.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mt-[17rem]">
                  Solutions
                </h3>
                <p className="text-xs text-zinc-500 dark:text-gray-400">
                  If there are, read the solution notes and be sure to pay
                  attention to them.
                </p>
              </div>

              {/* <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mt-[7rem]">
                  Priority
                </h3>
                <p className="text-xs text-zinc-500 dark:text-gray-400">
                  Select your preferred service priority levels to help us meet
                  your tunning needs according to your time line.
                </p>
              </div> */}
            </aside>
            {/* Right column: content cards */}
            <section className="lg:col-span-9 space-y-6">
              {/* Car Details Card */}
              <div className="bg-white mt-16 dark:bg-[#242526]/90 rounded-lg p-4 border border-zinc-200 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                  <div className="flex-1 order-2 lg:order-1">
                    <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
                      Registration | {registration}
                    </h4>
                    {/* <p className="text-sm text-zinc-500 dark:text-gray-400">
                      1.6 CTI - 120-BHP - 88-KW
                    </p> */}

                    <div className="grid grid-cols-2 gap-y-2 gap-x-6 mt-4 items-start">
                      {/* <div className="text-sm text-zinc-500 dark:text-gray-400">
                        Registration
                      </div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        {registration || "FE16GUO"}
                      </div> */}

                      <div className="text-sm text-zinc-500 dark:text-gray-400">
                        ECU ID
                      </div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        {ecuId || "98000"}
                      </div>

                      <div className="text-sm text-zinc-500 dark:text-gray-400">
                        Gearbox
                      </div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        {transmission || "Automatic"}
                      </div>

                      <div className="text-sm text-zinc-500 dark:text-gray-400">
                        ECU
                      </div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        BOSCH EDC17C42
                      </div>

                      <div className="text-sm text-zinc-500 dark:text-gray-400">
                        Read Tool
                      </div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        {readTool || "AVDI Abrites (Slave)"}
                      </div>

                      <div className="text-sm text-zinc-500 dark:text-gray-400">
                        Read Type
                      </div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        {readType || "Full Read"}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-x-6 items-start">
                      <div className="text-sm text-zinc-500 dark:text-gray-400">
                        Uploads:
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mt-1 bg-gray-100 dark:bg-[#242526]/90 rounded px-3 py-1 max-w-full border border-zinc-200 dark:border-[#3a3b3c]">
                          <FileCheck className="w-4 h-4 text-green-500" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-900 dark:text-gray-100">
                              {ecuFile?.name}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-gray-300">
                              {ecuFile?.size}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-56 order-1 lg:order-2 self-end lg:self-center">
                    <div className="w-full h-40 bg-gray-100 dark:bg-[#242526]/90 rounded-lg overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-[#3a3b3c]">
                      <img
                        src={car2}
                        alt="Car"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Solutions Card */}
              <div className="bg-white dark:bg-[#242526]/90 rounded-lg p-4 border border-zinc-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="bg-red-600 w-10 h-10 rounded flex items-center justify-center">
                    <span className="text-white font-semibold">S1</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
                      STAGE 1
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-gray-400">
                      Est. 21% more power and 19% more torque
                    </p>
                  </div>
                </div>

                <div>
                  {options.map((item2) => (
                    <div>{item2}</div>
                  ))}
                </div>

                {/* <div className="mt-4 grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-[#242526]/90 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-500 dark:text-gray-400">
                        120 bhp
                      </span>
                      <span className="text-red-600">→</span>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        145 bhp
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-[#242526]/90 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-500 dark:text-gray-400">
                        320 Nm
                      </span>
                      <span className="text-red-600">→</span>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        380 Nm
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* Priority Card */}
              {/* <div className="bg-white dark:bg-[#242526]/90 rounded-lg p-4 border border-zinc-200 dark:border-gray-700">
                <div>
                  <RadioGroup
                    value={priority}
                    onValueChange={setPriority}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="1-2-hours"
                        id="1-2-hours"
                        className="border-gray-200 dark:border-gray-700 text-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <Label
                        htmlFor="1-2-hours"
                        className="text-zinc-900 dark:text-white"
                      >
                        1-2-hours
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="as-soon"
                        id="as-soon"
                        className="border-gray-200 dark:border-gray-700 text-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <Label
                        htmlFor="as-soon"
                        className="text-zinc-900 dark:text-white"
                      >
                        As Soon As Possible
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="asap"
                        id="asap"
                        className="border-gray-200 dark:border-gray-700 text-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <Label
                        htmlFor="asap"
                        className="text-zinc-900 dark:text-white"
                      >
                        ASAP
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="tomorrow"
                        id="tomorrow"
                        className="border-gray-200 dark:border-gray-700 text-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <Label
                        htmlFor="tomorrow"
                        className="text-zinc-900 dark:text-white"
                      >
                        Tomorrow
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div> */}
              {/* Terms Card */}
              <div className="bg-white dark:bg-[#242526]/90 rounded-lg p-4 border border-zinc-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-zinc-500 dark:text-gray-400"
                    >
                      I accept the terms and conditions{" "}
                      <button
                        onClick={() => {}}
                        className="text-red-600 hover:underline"
                      >
                        Please read and accept the terms and conditions before
                        proceeding.
                      </button>
                    </label>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="px-8 dark:text-white"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                  disabled={!acceptTerms}
                >
                  Submit
                </Button>
              </div>
            </section>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Overview;
