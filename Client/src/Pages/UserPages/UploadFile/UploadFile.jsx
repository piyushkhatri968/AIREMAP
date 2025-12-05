import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { UploadCloud } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { ecuOptions } from "../../../utils/ECUdata";
import EcuSearchCombobox from "./EcuSearchCombobox";
import { useTranslation } from "react-i18next";
const UploadFile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registration: "",
    ecuId: "",
    transmission: "",
    readTool: "",
    readType: "",
    masterSlave: "",
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [commonFiles, setCommonFiles] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const MAX_ECU_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
  const MAX_COMMON_FILES_SIZE = 100 * 1024 * 1024; // 100 MB

  const formatBytes = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > MAX_ECU_FILE_SIZE) {
        toast.error(
          `${t("uploadFilePage.toasts.fileSizeLimit")} ${formatBytes(MAX_ECU_FILE_SIZE)}.`
        );
        event.target.value = null;
        return;
      } else {
        setUploadedFile(file);
      }
    }
  };

  const handleCommonFilesUpload = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      // Calculate total size of all common files
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);

      if (totalSize > MAX_COMMON_FILES_SIZE) {
        toast.error(
          `${t("uploadFilePage.toasts.additionalFilesSizeTotalLimit")} ${formatBytes(
            MAX_COMMON_FILES_SIZE
          )}.`
        );
        event.target.value = null;
        return;
      } else {
        setCommonFiles(files);
      }
    }
  };

  const readToolData = [
    "AVDI Abrites",
    "Alientech KTAG",
    "Alientech Kess3 Bench",
    "Alientech Kess3 Boot",
    "Alientech Kess3 OBD",
    "Alientech KessV2",
    "Alientech Powergate",
    "AutoFLASHER Bench",
    "AutoFLASHER Boot",
    "AutoFLASHER OBD",
    "Autotuner Bench",
    "Autotuner Boot",
    "Autotuner OBD",
    "BS OBD",
    "BS Tricore Boottool",
    "BS Toolbox",
    "Bitbox",
    "CMD Bench",
    "CMD Boot",
    "CMD OBD",
    "CMD Tricore Boottool",
    "DFox Bench",
    "DFox Boot",
    "DFox OBD",
    "Dimsport Genius",
    "Dimsport Trasdata",
    "EVC BDM",
    "EVC BSL",
    "Eprom Programmer",
    "FGtech Bench",
    "FGtech Boot",
    "FGtech OBD",
    "Femto (BMW Tool)",
    "Frieling SPI Wizard",
    "Frieling i-Boot",
    "Frieling i-Flash",
    "Galetto",
    "HexProg",
    "Hptuners",
    "MPPS",
    "Magic Motorsport Bench",
    "Magic Motorsport Boot",
    "Magic Motorsport OBD",
    "Other",
    "PCM-Flash",
    "Pemicro Nexus Debugger",
    "Piasini Serial Suite",
    "bFlash Boot",
    "bFlash Bench",
    "bFlash OBD",
  ];

  // Drag/Drop handlers (simplified, no hover effect)
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.transmission) {
      return toast.error(t("uploadFilePage.toasts.transmissionRequired"));
    }
    if (!formData.ecuId) {
      return toast.error(t("uploadFilePage.toasts.ecuidRequired"));
    }
    if (!formData.readTool) {
      return toast.error(t("uploadFilePage.toasts.readToolRequired"));
    }
    if (!formData.readType) {
      return toast.error(t("uploadFilePage.toasts.readTypeRequired"));
    }
    if (!formData.masterSlave) {
      return toast.error(t("uploadFilePage.toasts.masterSlaveRequired"));
    }
    if (!uploadedFile) {
      return toast.error(t("uploadFilePage.toasts.ecuFileRequired"));
    }

    const data = {
      ...formData,
      ecuFile: uploadedFile,
      commonFiles: commonFiles,
    };

    navigate("/modification-plan", {
      state: {
        ...data,
        from: "upload-file",
      },
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Page Title */}
      <div className="p-4">
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white sm:mb-2">
          {t('uploadFile')}
        </h1>
        {/* Breadcrumb Navigation - Hidden on mobile */}
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
          <span className="text-zinc-900 dark:text-white">{t('uploadFile')}</span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex flex-wrap items-center px-4 py-2 sm:py-4 gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold">
            1
          </div>
          <span className="text-zinc-900 dark:text-white text-xs sm:text-sm font-medium">
            {t('vehicleDetails')}
          </span>
        </div>
        <span className="text-zinc-500 dark:text-gray-400 text-lg sm:text-xl">
          &gt;
        </span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-200 dark:bg-gray-600 text-zinc-500 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold">
            2
          </div>
          <span className="text-zinc-500 dark:text-gray-400 text-xs sm:text-sm">
            {t('modificationPlan')}
          </span>
        </div>
        <span className="text-zinc-500 dark:text-gray-400 text-lg sm:text-xl">
          &gt;
        </span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-200 dark:bg-gray-600 text-zinc-500 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold">
            3
          </div>
          <span className="text-zinc-500 dark:text-gray-400 text-xs sm:text-sm">
            {t('overview')}
          </span>
        </div>
      </div>

      <div className="p-4">      {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700 w-full"
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                {t('vehicleParameters')}
              </h2>
              <p className="text-zinc-500 dark:text-gray-400 text-sm sm:text-base">
                {t('vehicleParametersDescription')}
              </p>
            </div>
            {/* Vehicle Parameters Form */}
            <div className="space-y-8">
              {/* Vehicle Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-[0.65fr_2fr] gap-6 items-start">
                <div className="space-y-1">
                  <Label className="text-zinc-900 dark:text-white text-sm font-medium block">
                    {t('vehicle')} <span className="text-red-600">*</span>
                  </Label>
                  <p className="text-sm text-zinc-600 dark:text-gray-400">
                    {t('vehicleHelp')}
                    {/* <a
                      href="/help"
                      className="text-red-600 hover:underline transition-colors"
                    >
                      {t('helpPage')}
                    </a> */}
                  </p>
                </div>
                <div className="space-y-4">
                  {/* Make */}
                  <Input
                    required
                    id="make"
                    placeholder={t('uploadFilePage.placeholders.make')}
                    value={formData.make}
                    onChange={handleInputChange}
                    className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                  />

                  {/* Model */}
                  <Input
                    required
                    placeholder={t('uploadFilePage.placeholders.model')}
                    id="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                  />

                  {/* Year */}
                  <Input
                    required
                    placeholder={t('uploadFilePage.placeholders.year')}
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                  />

                  {/* Registration */}
                  <Input
                    required
                    placeholder={t('uploadFilePage.placeholders.registration')}
                    id="registration"
                    value={formData.registration}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        registration: e.target.value.toUpperCase(),
                      }))
                    }
                    className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                  />

                  {/* ECU ID */}
                  <div className="relative">
                    {/* Select with EcuSearchCombobox */}
                    <EcuSearchCombobox
                      options={ecuOptions}
                      selectedValue={formData.ecuId}
                      onValueChange={(value) =>
                        handleSelectChange("ecuId", value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Transmission Type */}
              <div className="grid grid-cols-1 sm:grid-cols-[0.65fr_2fr] gap-6 items-start">
                <div className="space-y-4">
                  <Label className="text-zinc-900 dark:text-white text-sm font-medium block">
                    {t("transmissionType")} <span className="text-red-600">*</span>
                  </Label>
                </div>
                <div className="">
                  <RadioGroup
                    value={formData.transmission}
                    onValueChange={(value) =>
                      handleSelectChange("transmission", value)
                    }
                    className="flex items-center space-x-4 md:space-x-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Automatic"
                        id="automatic"
                        className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor="automatic"
                        className="text-zinc-900 dark:text-white"
                      >
                        {t('automatic')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Manual"
                        id="manual"
                        className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor="manual"
                        className="text-zinc-900 dark:text-white"
                      >
                        {t('manual')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="SemiAutomatic"
                        id="semi-automatic"
                        className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor="semi-automatic"
                        className="text-zinc-900 dark:text-white"
                      >
                        {t('semiAutomatic')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              {/* Tool Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-[0.65fr_2fr] gap-6 items-start">
                <div className="space-y-2">
                  <Label className="text-zinc-900 dark:text-white text-sm font-medium block mt-4 sm:mt-0">
                    {t('tool')} <span className="text-red-600">*</span>
                  </Label>
                  <p className="text-sm text-zinc-600 dark:text-gray-400">
                    {t('toolHelp')}
                  </p>
                </div>
                <div className="space-y-4">
                  <Select
                    required
                    value={formData.readTool}
                    onValueChange={(value) =>
                      handleSelectChange("readTool", value)
                    }
                  >
                    <SelectTrigger className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white">
                      <SelectValue placeholder={t('selectReadTool')} />
                    </SelectTrigger>

                    <SelectContent
                      className="dark:bg-[#242526] relative"
                      side="top"
                    >
                      {readToolData.map((tool) => (
                        <SelectItem
                          key={tool}
                          value={tool}
                          className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                        >
                          {tool}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.readType}
                    required
                    onValueChange={(value) =>
                      handleSelectChange("readType", value)
                    }
                  >
                    <SelectTrigger className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white">
                      <SelectValue placeholder={t('selectReadType')} />
                    </SelectTrigger>
                    <SelectContent
                      className="dark:bg-[#242526] relative"
                      side="top"
                    >
                      <SelectItem
                        value="Full Read
"
                        className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                      >
                        Full Read
                      </SelectItem>
                      <SelectItem
                        value="VR Read
"
                        className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                      >
                        VR Read
                      </SelectItem>
                      <SelectItem
                        value="ID Only
"
                        className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                      >
                        ID Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Master/Slave */}
              <div className="grid grid-cols-1 sm:grid-cols-[0.65fr_2fr] gap-6 items-start">
                <div className="space-y-4">
                  <Label className="text-zinc-900 dark:text-white text-sm font-medium block">
                    {t("Master_Slave")} <span className="text-red-600">*</span>
                  </Label>
                </div>
                <div className="">
                  <RadioGroup
                    required
                    value={formData.masterSlave}
                    onValueChange={(value) =>
                      handleSelectChange("masterSlave", value)
                    }
                    className="flex items-center space-x-4 md:space-x-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Master"
                        id="master"
                        className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor="Master"
                        className="text-zinc-900 dark:text-white"
                      >
                        {t('master')}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Slave"
                        id="slave"
                        className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white"
                      />
                      <Label
                        htmlFor="Slave"
                        className="text-zinc-900 dark:text-white"
                      >
                        {t('slave')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* File Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-[0.65fr_2fr] gap-6 items-start">
                <div className="space-y-2">
                  <Label className="text-zinc-900 dark:text-white text-sm font-medium block">
                    {t('uploads')} <span className="text-red-600">*</span>
                  </Label>
                  <p className="text-sm text-zinc-600 dark:text-gray-400">
                    {t('uploadsHelp')}
                  </p>
                </div>
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-zinc-200 dark:border-gray-600 rounded-lg p-8 text-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <UploadCloud className="h-12 w-12 text-zinc-400 dark:text-gray-500 mb-4" />
                      <span className="text-zinc-900 dark:text-white font-medium mb-1">
                        {t('selectEcuFile')}
                      </span>
                      <span className="text-sm text-zinc-600 dark:text-gray-400">
                        {t('dragAndDrop')}
                      </span>
                    </label>
                    {uploadedFile && (
                      <div className="mt-4 text-sm text-zinc-900 dark:text-white">
                        {uploadedFile.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-12 text-zinc-900 dark:text-white hover:bg-transparent"
                        onClick={() =>
                          document.getElementById("common-files")?.click()
                        }
                      >
                        {t('uploadFilePage.uploadAdditionalFiles')}
                      </Button>
                    </div>
                    <input
                      type="file"
                      id="common-files"
                      className="hidden"
                      multiple
                      onChange={handleCommonFilesUpload}
                    />
                    {commonFiles.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {commonFiles.map((file, index) => (
                          <div
                            key={index}
                            className="text-sm text-zinc-900 dark:text-white"
                          >
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 flex items-center gap-2"
                >
                  <span>{t('continue')}</span>
                  <span className="text-lg">→</span>
                </Button>
              </div>
            </div>
          </div>
        </form></div>
    </motion.div>
  );
};

export default UploadFile;
