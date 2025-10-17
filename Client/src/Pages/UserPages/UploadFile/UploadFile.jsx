import { motion } from "framer-motion"
import { useNavigate } from "react-router";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { UploadCloud } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

const UploadFile = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    vehicle: "",
    make: "",
    model: "",
    year: "",
    registration: "",
    ecuId: "",
    transmission: "automatic",
    readTool: "",
    readType: "",
    masterSlave: "master"
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [commonFiles, setCommonFiles] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
      setErrors(prev => ({ ...prev, uploadedFile: undefined }));
    }
  };

  const handleCommonFilesUpload = (event) => {
    if (event.target.files) {
      setCommonFiles(Array.from(event.target.files));
    }
  };

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
      setErrors(prev => ({ ...prev, uploadedFile: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!uploadedFile) {
      toast.error("Please upload a ecu-file")
    }

    console.log(formData)

    // navigate('modification-plan', {
    //   state: {
    //     vehicle: formData.vehicle,
    //     registration: formData.registration,
    //     mileage: formData.mileage,
    //     transmission: formData.transmission,
    //     readTool: formData.readTool,
    //     readType: formData.readType,
    //     masterSlave: formData.masterSlave,
    //     file: uploadedFile,
    //     commonFiles: commonFiles,
    //     from: 'upload-file' // Add source page indicator
    //   }
    // });
  }

  return <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-4 sm:space-y-6"
  >
    {/* Page Title */}
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">Upload File</h1>
      {/* Breadcrumb Navigation - Hidden on mobile */}
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
        <span className="text-zinc-900 dark:text-white">Upload File</span>
      </div>
    </div>

    {/* Step Indicators */}
    <div className="flex items-center justify-end py-2 sm:py-4 gap-3 sm:gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold">
          1
        </div>
        <span className="text-zinc-900 dark:text-white text-xs sm:text-sm font-medium">Vehicle Details</span>
      </div>
      <span className="text-zinc-500 dark:text-gray-400 text-lg sm:text-xl">&gt;</span>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-200 dark:bg-gray-600 text-zinc-500 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold">
          2
        </div>
        <span className="text-zinc-500 dark:text-gray-400 text-xs sm:text-sm">Modification Plan</span>
      </div>
      <span className="text-zinc-500 dark:text-gray-400 text-lg sm:text-xl">&gt;</span>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-200 dark:bg-gray-600 text-zinc-500 dark:text-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold">
          3
        </div>
        <span className="text-zinc-500 dark:text-gray-400 text-xs sm:text-sm">Overview</span>
      </div>
    </div>


    {/* Form Container */}
    <form onSubmit={handleSubmit} className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">Vehicle Parameters</h2>
          <p className="text-zinc-500 dark:text-gray-400 text-sm sm:text-base">Please provide the following parameters for your vehicle to help us deliver a more accurate and effective ECU tune.</p>
        </div>
        {/* Vehicle Parameters Form */}
        <div className="space-y-4">
          {/* Vehicle Selection */}
          <div className="grid grid-cols-3 gap-6 items-start">
            <div className="space-y-1">
              <Label className="text-zinc-900 dark:text-white text-sm font-medium block">
                Vehicle <span className="text-red-600">*</span>
              </Label>
              <p className="text-sm text-zinc-600 dark:text-gray-400">
                Choose your vehicle model. If you cannot find your vehicle, please contact us on <a href="/help" className="text-red-600">Help Page</a>.
              </p>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <Input required id="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleInputChange} className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"></Input>
              </div>
            </div>
          </div>

          {/* Make */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
            </div>
            <div className="col-span-2">
              <Input required
                id="make" placeholder="Make" value={formData.make} onChange={handleInputChange}
                className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>
          {/* Model */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
            </div>
            <div className="col-span-2">
              <Input required
                placeholder="Model"
                id="model" value={formData.model} onChange={handleInputChange}
                className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>
          {/* Year */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
            </div>
            <div className="col-span-2">
              <Input required
                placeholder="Year"
                id="year" value={formData.year} onChange={handleInputChange}
                className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>
          {/* Registration */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
            </div>
            <div className="col-span-2">
              <Input required
                placeholder="Registration"
                id="registration" value={formData.registration} onChange={handleInputChange}
                className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>
          {/* ECU ID */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
            </div>
            <div className="col-span-2">
              <Input required
                placeholder="ECU ID"
                id="ecuId" value={formData.ecuId} onChange={handleInputChange}
                className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Transmission Type */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
            </div>
            <div className="col-span-2">
              <RadioGroup
                required
                value={formData.transmission}
                onValueChange={(value) => handleSelectChange('transmission', value)}
                className="flex items-center space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="automatic" id="automatic" className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white" />
                  <Label htmlFor="automatic" className="text-zinc-900 dark:text-white">
                    Automatic
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white" />
                  <Label htmlFor="manual" className="text-zinc-900 dark:text-white">
                    Manual
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="semi-automatic" id="semi-automatic" className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white" />
                  <Label htmlFor="semi-automatic" className="text-zinc-900 dark:text-white">
                    SemiAutomatic
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {/* Tool Selection */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-zinc-900 dark:text-white text-sm font-medium block">
                Tool <span className="text-red-600">*</span>
              </Label>
              <p className="text-sm text-zinc-600 dark:text-gray-400">
                Select the options that specify the reading tool and read type used to extract ECU file.
              </p>
            </div>
            <div className="col-span-2 space-y-4">
              <Select required
                value={formData.readTool}
                onValueChange={(value) => handleSelectChange('readTool', value)}
              >
                <SelectTrigger className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white">
                  <SelectValue placeholder="Select read tool" />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#242526] relative" side="top">
                  <SelectItem value="kess" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">KESS</SelectItem>
                  <SelectItem value="ktag" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">KTAG</SelectItem>
                  <SelectItem value="mpps" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">MPPS</SelectItem>
                  <SelectItem value="galletto" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">Galletto</SelectItem>
                  <SelectItem value="cmd" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">CMD Flash</SelectItem>
                  <SelectItem value="magpro2" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">MagPro2</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={formData.readType} required
                onValueChange={(value) => handleSelectChange('readType', value)}
              >
                <SelectTrigger className="h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white">
                  <SelectValue placeholder="Select a read type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#242526] relative" side="top">
                  <SelectItem value="obd" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">OBD</SelectItem>
                  <SelectItem value="boot" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">Boot Mode</SelectItem>
                  <SelectItem value="bench" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">Bench</SelectItem>
                  <SelectItem value="eeprom" className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer">EEPROM</SelectItem>
                </SelectContent>
              </Select>

              <RadioGroup
                required
                value={formData.masterSlave}
                onValueChange={(value) => handleSelectChange('masterSlave', value)}
                className="flex items-center space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="master" id="master" className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white" />
                  <Label htmlFor="master" className="text-zinc-900 dark:text-white">
                    Master
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slave" id="slave" className="text-white data-[state=checked]:bg-red-600 data-[state=checked]:text-white" />
                  <Label htmlFor="slave" className="text-zinc-900 dark:text-white">
                    Slave
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {/* File Upload */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-zinc-900 dark:text-white text-sm font-medium block">
                Uploads <span className="text-red-600">*</span>
              </Label>
              <p className="text-sm text-zinc-600 dark:text-gray-400">
                Upload your ECU file and any related common files necessary for the tuning process.
              </p>
            </div>
            <div className="col-span-2 space-y-4">
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
                    Select a ECU file to upload
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-gray-400">
                    or drag and drop it here
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
                    onClick={() => document.getElementById('common-files')?.click()}
                  >
                    Upload Common Files
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
                      <div key={index} className="text-sm text-zinc-900 dark:text-white">
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
              <span>Continue</span>
              <span className="text-lg">→</span>
            </Button>
          </div>
        </div>
      </div>
    </form>

  </motion.div>;
};

export default UploadFile;