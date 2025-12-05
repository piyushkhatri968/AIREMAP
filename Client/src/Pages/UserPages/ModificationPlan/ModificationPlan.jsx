import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { AlertTriangle, Check, Upload } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { toast } from "react-toastify";
import Textarea from "../../../components/ui/textarea";
import { useTranslation } from "react-i18next";

const ModificationPlan = () => {
  const { t } = useTranslation();
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
    {
      id: "t-t-h-c",
      name: "TRUCK / TRACTOR / HGV / CONSTRUCTION",
      category: "service",
      warning: true,
      credits: 4,
    },
    {
      id: "cum-cat",
      name: "CUMMINS / CATERHAM",
      category: "service",
      warning: true,
      credits: 25,
    },
    {
      id: "file-check-review",
      name: "File Check Review",
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

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedStage, setSelectedStage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [notes, setNotes] = useState("");

  const [uploadedFile, setUploadedFile] = useState(null);
  const [commonFiles, setCommonFiles] = useState([]);

  const blockedStages = useMemo(
    () => ["Gear Box", "Original File (Back To Stock)", "ECU Cloning"],
    []
  );

  const isOptionsBlocked = blockedStages.includes(selectedStage);

  useEffect(() => {
    if (isOptionsBlocked && selectedOptions.length > 0) {
      setSelectedOptions([]);
    }
  }, [isOptionsBlocked, selectedOptions.length]);

  const fromSourceData = location.state;
  const isComingFromOverviewBack = fromSourceData?.from === "overview-back";

  const handleCommonFilesUpload = (event) => {
    if (event.target.files) {
      setCommonFiles(Array.from(event.target.files));
    }
  };

  const handleOptionToggle = (optionId) => {
    if (isOptionsBlocked) {
      toast.info(t("modificationPlanPage.toasts.optionsDisabled"));
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  useEffect(() => {
    if (fromSourceData) {
      if (fromSourceData.ecuFile) {
        setUploadedFile(fromSourceData.ecuFile);
      }
      if (fromSourceData.commonFiles) {
        setCommonFiles(fromSourceData.commonFiles);
      }
    }
  }, [fromSourceData, setUploadedFile, setCommonFiles]);

  useEffect(() => {
    if (isComingFromOverviewBack && fromSourceData) {
      if (fromSourceData.ecuFile) {
        setUploadedFile(fromSourceData.ecuFile);
      }
      if (fromSourceData.commonFiles) {
        setCommonFiles(fromSourceData.commonFiles);
      }
      const timer = setTimeout(() => {
        if (fromSourceData.stage) {
          setSelectedStage(fromSourceData.stage);
        }
        if (fromSourceData.options) {
          setSelectedOptions(fromSourceData.options);
        }
        if (fromSourceData.notes) {
          setNotes(fromSourceData.notes);
        }
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [
    isComingFromOverviewBack,
    fromSourceData,
    setSelectedStage,
    setSelectedOptions,
    setNotes,
    setUploadedFile,
    setCommonFiles,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedStage) {
      toast.error(t("modificationPlanPage.toasts.stageRequired"));
      return;
    }

    const data = {
      ...fromSourceData,
      ecuFile: uploadedFile,
      stage: selectedStage,
      options: selectedOptions,
      notes,
      commonFiles,
      from: "modification-plan",
    };

    navigate("/overview", {
      state: data,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Page Title and Breadcrumb (unchanged) */}
      <div className="p-4">
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white sm:mb-2">
          {t('modificationPlan')}
        </h1>
        {/* Breadcrumb Navigation */}
        <div className="hidden sm:flex items-center space-x-2 text-sm text-zinc-500 dark:text-gray-400">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {t('dashboard')}
          </button>
          <span>&gt;</span>
          <span>{t('portal')}</span>
          <span>&gt;</span>
          <button
            onClick={() => navigate("/upload-file")}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {t('uploadFile')}
          </button>
          <span>&gt;</span>
          <span className="text-zinc-900 dark:text-white">
            {t('modificationPlan')}
          </span>
        </div>
      </div>
      {/* Step Indicators (unchanged) */}
      <div className="flex flex-wrap items-center px-4 py-2 sm:py-4 gap-3 sm:gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-200 text-zinc-500 dark:bg-gray-600 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold">
            1
          </div>
          <span className="text-zinc-500 dark:text-gray-400 text-xs sm:text-sm">
            {t('vehicleDetails')}
          </span>
        </div>
        <span className="text-zinc-500 dark:text-gray-400 text-lg sm:text-xl">
          &gt;
        </span>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold">
            2
          </div>
          <span className="text-zinc-900 dark:text-white text-xs sm:text-sm font-medium">
            {t('modificationPlan')}
          </span>
        </div>
        <span className="text-zinc-500 dark:text-gray-400 text-lg sm:text-xl">
          &gt;
        </span>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-200 dark:bg-gray-600 text-zinc-500 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold">
            3
          </div>
          <span className="text-zinc-500 dark:text-gray-400 text-xs sm:text-sm">
            {t('overview')}
          </span>
        </div>
      </div>
      <div className="p-4">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t('modificationPlanPage.title')}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('modificationPlanPage.subtitle')}
                </p>
              </div>
            </div>
            {/* Stage Selection (unchanged logic) */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('modificationPlanPage.stageLabel')}
                </span>
                <span className="text-red-500">*</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('modificationPlanPage.stagePlaceholder')}
              </p>
              <Select
                value={selectedStage}
                onValueChange={setSelectedStage}
                required
              >
                <SelectTrigger className="w-full bg-white dark:bg-[#242526]/90 border-gray-200 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder={t('modificationPlanPage.stagePlaceholder')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#242526]/90 border-gray-200 dark:border-gray-700 [&>*]:dark:bg-[#242526]/90 [&_*]:dark:bg-[#242526]/90">
                  <SelectItem
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] dark:hover:text-red-500 transition-colors duration-150"
                    value="No Engine Mud"
                  >
                    {t('modificationPlanPage.stageOptions.no-engine-mud')}
                  </SelectItem>
                  <SelectItem
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] dark:hover:text-red-500 transition-colors duration-150"
                    value="Eco"
                  >
                    Eco
                  </SelectItem>
                  <SelectItem
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] dark:hover:text-red-500 transition-colors duration-150"
                    value="Stage 1"
                  >
                    {t('modificationPlanPage.stageOptions.stage-1')}
                  </SelectItem>
                  <SelectItem
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] dark:hover:text-red-500 transition-colors duration-150"
                    value="Stage 2"
                  >
                    {t('modificationPlanPage.stageOptions.stage-2')}
                  </SelectItem>
                  <SelectItem
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] dark:hover:text-red-500 transition-colors duration-150"
                    value="Gear Box"
                  >
                    {t('modificationPlanPage.stageOptions.gearbox')}
                  </SelectItem>
                  <SelectItem
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] dark:hover:text-red-500 transition-colors duration-150"
                    value="Original File (Back To Stock)"
                  >
                    {t('modificationPlanPage.stageOptions.original-file')}
                  </SelectItem>
                  <SelectItem
                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] dark:hover:text-red-500 transition-colors duration-150"
                    value="ECU Cloning"
                  >
                    {t('modificationPlanPage.stageOptions.ecu-cloning')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Options Section */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('modificationPlanPage.optionsLabel')}
                </span>
                {!blockedStages && <span className="text-red-500">*</span>}
                {isOptionsBlocked && (
                  <span className="text-xs text-red-500 ml-2">
                    (Disabled for this Stage)
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('modificationPlanPage.optionsDescription')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-3">
                  {modificationOptions.slice(0, 20).map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center space-x-3 cursor-pointer group ${isOptionsBlocked ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      <Checkbox
                        checked={selectedOptions.includes(option.name)}
                        onCheckedChange={() => handleOptionToggle(option.name)}
                        disabled={isOptionsBlocked}
                        className={`border-gray-200 dark:border-gray-700 data-[state=checked]:bg-red-600 data-[state=checked]:text-white ${isOptionsBlocked
                          ? "data-[state=checked]:bg-gray-400 data-[state=checked]:text-gray-500"
                          : ""
                          }`}
                      />
                      <span className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                        {t(`modificationPlanPage.options.${option.id}`) || option.name}
                        <span>
                          {option.warning && (
                            <span
                              title={`Option requires ${option.credits} credits`}
                            >
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </span>
                          )}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {modificationOptions.slice(20).map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center space-x-3 cursor-pointer group ${isOptionsBlocked ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      <Checkbox
                        checked={selectedOptions.includes(option.name)}
                        onCheckedChange={() => handleOptionToggle(option.name)}
                        disabled={isOptionsBlocked}
                        className={`border-gray-200 dark:border-gray-700 data-[state=checked]:bg-red-600 data-[state=checked]:text-white ${isOptionsBlocked
                          ? "data-[state=checked]:bg-gray-400 data-[state=checked]:text-gray-500"
                          : ""
                          }`}
                      />
                      <span className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                        {t(`modificationPlanPage.options.${option.id}`) || option.name}
                        <span>
                          {option.warning && (
                            <span
                              title={`Option requires ${option.credits} ${option.credits > 1 ? "credits" : "credit"
                                }`}
                            >
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </span>
                          )}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('modificationPlanPage.originalFileLabel')} <span className="text-red-600">*</span>
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {t('modificationPlanPage.originalFileHint')}
                </p>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center transition-colors">
                  {uploadedFile && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Check className="h-5 w-5" />
                      <span>{uploadedFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('modificationPlanPage.additionalFilesLabel')}
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {t('modificationPlanPage.additionalFilesHint')}
                </p>
                <div
                  className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors"
                  onClick={() =>
                    document.getElementById("additional-files")?.click()
                  }
                >
                  {commonFiles.length > 0 ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {commonFiles.length} {t('modificationPlanPage.filesSelected')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {commonFiles.map((file) => file.name).join(", ")}
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('modificationPlanPage.clickToUploadAdditionalFiles')}
                      </p>
                    </>
                  )}
                  <input
                    id="additional-files"
                    type="file"
                    multiple
                    onChange={handleCommonFilesUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            {/* Notes Section (unchanged) */}
            <div className="mt-4">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                {t('modificationPlanPage.notesLabel')}
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('modificationPlanPage.notesPlaceholder')}
              </p>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('modificationPlanPage.notesPlaceholder')}
                className="mt-2 min-h-[120px] bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 placeholder:text-gray-500 dark:placeholder:text-gray-600"
              />
            </div>
            {/* Submit Button (unchanged) */}
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-8 mt-4"
              >
                {t('modificationPlanPage.continueButton')}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModificationPlan;
