import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FileCheck, Loader2 } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { toast } from "react-toastify";
import useCreateEcuFile from "../../../hooks/useCreateEcuFile";
import TermsConditionPopup from "../../../components/TermsConditionPopup";

const Overview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [termsConditionPopup, settermsConditionPopup] = useState(false);

  const stateData = location.state || {};
  const {
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
  } = stateData;

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
    {
      id: "cvn-fix",
      name: "CVN FIX",
      warning: true,
      credits: 1,
      category: "performance",
    },
    {
      id: "dpf-fap-off",
      name: "DPF - FAP OFF",
      category: "emissions",
    },
    { id: "egr-off", name: "EGR OFF", category: "emissions" },
    {
      id: "exhaust-flap",
      name: "EXHAUST FLAP REMOVAL",
      category: "performance",
    },
    {
      id: "glowplug",
      name: "GLOWPLUG",
      category: "performance",
    },
    {
      id: "hardcut",
      name: "HARDCUT POP&BANG LIMITER (DIESEL ONLY)",
      category: "performance",
    },
    {
      id: "immo-off",
      name: "IMMO OFF",
      warning: true,
      credits: 2,
      category: "security",
    },
    { id: "launch-control", name: "LAUNCH CONTROL", category: "performance" },
    { id: "nox", name: "NOx", category: "emissions" },
    { id: "oil-pressure", name: "OIL PRESSURE FIX", category: "maintenance" },
    {
      id: "pop-bang",
      name: "POP & BANG (PETROL ONLY)",
      warning: true,
      credits: 1,
      category: "performance",
    },
    {
      id: "sap-delete",
      name: "SAP DELETE (Secondary Air Pump)",
      category: "emissions",
    },
    { id: "speed-limit", name: "SPEED LIMIT OFF", category: "performance" },
    {
      id: "swirl-flaps",
      name: "SWIRL FLAPS OFF",
      category: "performance",
    },
    { id: "water-pump", name: "WATER PUMP FIX", category: "maintenance" },
    {
      id: "enc-dec",
      name: "ENCRYPT / DECRYPT (Includes 1 Encrypt and 1 Decrypt)",
      category: "service",
      warning: true,
      credits: 1,
    },

    // Right Column
    { id: "adblue-scr", name: "ADBLUE - SCR OFF", category: "emissions" },
    { id: "bmw-display", name: "BMW SPORTS DISPLAY", category: "display" },
    { id: "cold-start", name: "COLD START NOISE", category: "performance" },
    { id: "decode-encode", name: "DECODE - ENCODE", category: "security" },
    { id: "dtc-off", name: "DTC OFF", category: "diagnostics" },
    { id: "evap-removal", name: "EVAP REMOVAL", category: "emissions" },
    {
      id: "flex-fuel",
      name: "FLEX FUEL E85",
      warning: true,
      credits: 1,
      category: "fuel",
    },
    { id: "gpf-off", name: "GPF - OPF OFF", category: "emissions" },
    { id: "hot-start", name: "HOT START", category: "performance" },
    { id: "kickdown", name: "KICKDOWN DEACTIVATION", category: "transmission" },
    { id: "maf-off", name: "MAF OFF", category: "sensors" },
    { id: "o2-lambda", name: "O2 - LAMBDA OFF", category: "emissions" },
    {
      id: "original-file",
      name: "ORIGINAL FILE REQUEST",
      warning: true,
      credits: 1,
      category: "service",
    },
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
    {
      id: "add-solutions-to-master",
      name: "ADDITIONAL SOLUTIONS ADDED TO MASTER FILE",
      category: "performance",
      warning: true,
      credits: 1,
    },
  ];

  const stageDisplay = {
    "No Engine Mud": "No Engine Mud",
    Eco: "Eco",
    "Stage 1": "Stage 1",
    "Stage 2": "Stage 2",
    "Gear Box": "Gear Box",
    "Original File (Back To Stock)": "Original File (Back To Stock)",
    "ECU Cloning": "ECU Cloning",
  };

  const optionNameMap = modificationOptions.reduce((acc, option) => {
    acc[option.id] = option.name;
    return acc;
  }, {});

  useEffect(() => {
    if (!location.state || from !== "modification-plan") {
      navigate("/upload-file");
    }
  }, [location.state, from, navigate]);

  const handleGoBack = (e) => {
    e.preventDefault();

    navigate("/modification-plan", {
      state: {
        ...stateData,
        from: "overview-back",
      },
    });
  };

  const data = location.state;

  const { isPending, createEcuFileMutation } = useCreateEcuFile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error("Please accept the terms");
      return;
    }

    const formData = new FormData();

    // append normal fields
    const normalFields = {
      registration,
      ecuId,
      transmission,
      readTool,
      readType,
      stage,
      options,
      make,
      masterSlave,
      model,
      notes,
      year,
    };

    Object.entries(normalFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // append ecu file
    if (ecuFile) {
      formData.append("ecuFile", ecuFile);
    }

    // append files
    if (commonFiles && commonFiles.length > 0) {
      commonFiles.forEach((file, index) => {
        formData.append("commonFiles", file);
      });
    }

    try {
      await createEcuFileMutation(formData);
    } catch (error) {
      console.log(error);
    }
  };
  const renderSelectedOptions = () => {
    if (!options || options.length === 0) {
      if (
        stage === "Gear Box" ||
        stage === "Original File (Back To Stock)" ||
        stage === "ECU Cloning"
      ) {
        return (
          <p className="text-sm italic text-zinc-500 dark:text-gray-400 mt-2">
            No extra modifications selected. (Not applicable for this Stage)
          </p>
        );
      }
      return (
        <p className="text-sm italic text-red-500 dark:text-red-400 mt-2">
          No extra modifications selected. (Required for this Stage)
        </p>
      );
    }

    return (
      <div className="space-y-1 mt-2">
        {options.map((optionId) => (
          <div
            key={optionId}
            className="text-sm text-zinc-700 dark:text-gray-300 flex items-center gap-2"
          >
            <span className="text-red-600 dark:text-red-500">•</span>
            {optionNameMap[optionId] || optionId}
          </div>
        ))}
      </div>
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 sm:space-y-6"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            Overview
          </h1>
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
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mt-[16rem]">
                    Solutions
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-gray-400">
                    If there are, read the solution notes and be sure to pay
                    attention to them.
                  </p>
                </div>
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

                      <div className="grid grid-cols-2 gap-y-2 gap-x-6 mt-4 items-start">
                        <div className="text-sm text-zinc-500 dark:text-gray-400">
                          Make/Model/Year
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          {make} {model} {year}
                        </div>

                        <div className="text-sm text-zinc-500 dark:text-gray-400">
                          ECU ID
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          {ecuId || "N/A"}
                        </div>

                        <div className="text-sm text-zinc-500 dark:text-gray-400">
                          Gearbox
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          {transmission || "N/A"}
                        </div>

                        <div className="text-sm text-zinc-500 dark:text-gray-400">
                          Master/Slave
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          {masterSlave || "N/A"}
                        </div>

                        <div className="text-sm text-zinc-500 dark:text-gray-400">
                          Read Tool
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          {readTool || "N/A"}
                        </div>

                        <div className="text-sm text-zinc-500 dark:text-gray-400">
                          Read Type
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">
                          {readType || "N/A"}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-x-6 items-start">
                        <div className="text-sm text-zinc-500 dark:text-gray-400">
                          Original File:
                        </div>
                        <div>
                          {ecuFile ? (
                            <div className="flex items-center gap-2 mt-1 bg-gray-100 dark:bg-[#242526]/90 rounded px-3 py-1 max-w-full border border-zinc-200 dark:border-[#3a3b3c]">
                              <FileCheck className="w-4 h-4 text-green-500" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-zinc-900 dark:text-gray-100">
                                  {ecuFile.name}
                                </span>
                                <span className="text-xs text-zinc-500 dark:text-gray-300">
                                  {formatFileSize(ecuFile.size)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-red-500">
                              No file uploaded
                            </span>
                          )}

                          {commonFiles && commonFiles.length > 0 && (
                            <div className="mt-2 text-sm text-zinc-500 dark:text-gray-400">
                              **+ {commonFiles.length} additional file(s)**
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Solutions Card */}
                <div className="bg-white dark:bg-[#242526]/90 rounded-lg p-4 border border-zinc-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-600 w-10 h-10 rounded flex items-center justify-center">
                      {/* Display first letter of stage or 'S' for default */}
                      <span className="text-white font-semibold">
                        {stageDisplay[stage]
                          ? stageDisplay[stage].charAt(0)
                          : "S"}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
                        {stageDisplay[stage] || stage || "N/A Stage"}
                      </h4>
                      {/* Stage description placeholder */}
                      <p className="text-sm text-zinc-500 dark:text-gray-400">
                        {stage === "stage-1"
                          ? "Est. 21% more power and 19% more torque"
                          : "Custom tuning plan selected."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-zinc-100 dark:border-gray-800 pt-3">
                    <h5 className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                      Selected Options:
                    </h5>
                    {renderSelectedOptions()}
                  </div>

                  {notes && (
                    <div className="mt-4 border-t border-zinc-100 dark:border-gray-800 pt-3">
                      <h5 className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                        Notes for Tuner:
                      </h5>
                      <p className="text-sm italic text-zinc-600 dark:text-gray-400 whitespace-pre-wrap">
                        {notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms Card (unchanged) */}
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
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          settermsConditionPopup(true);
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Please read and accept the terms and conditions before
                        proceeding.
                      </button>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoBack}
                    className="px-8 dark:text-white"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-8"
                    disabled={!acceptTerms || isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </form>
      </motion.div>

      {termsConditionPopup && (
        <TermsConditionPopup settermsConditionPopup={settermsConditionPopup} />
      )}
    </>
  );
};

export default Overview;
