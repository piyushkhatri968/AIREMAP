import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PriceList = () => {
  const { t } = useTranslation();
  const stage1Items = [
    { nameKey: "O2 / LAMBDA", credits: 1, isFreeWithTune: true },
    {
      nameKey: "ADBLUE OFF",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "BMW SPORTS DISPLAY",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "DPF OFF",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "DTC REMOVAL",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "EGR OFF",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "EXHAUST FLAP",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "GPF/OPF OFF",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "HARDCUT POPOCORN LIMITER",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "HOTSTART FIX",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "MAF OFF",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "OIL PRESSURE FIX (V6 3.0 TDI)",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "SAP DELETE",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "SPEED LIMITER DELETE",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "SPEEDLIMITER OFF",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "START STOP",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "SWIRL FLAP DELETE",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "TVA OFF",
      credits: 1,
      isFreeWithTune: true,
    },
    {
      nameKey: "TRUCKS / TRACTORS / CONSTRUCTION",
      credits: 1,
      isFreeWithTune: true,
    },
  ];

  const stage2Items = [
    { nameKey: "ALFA – MEVD17 / MED17 / MJ10", credits: 2 },
    { nameKey: "ASTON MARTIN – MED17", credits: 2 },
    {
      nameKey: "BMW/MINI – EDC17 / MG1 / MD1 / MEVD17 / MED17 / MEV17",
      credits: 2,
    },
    { nameKey: "DACIA – MD1 / VALEO / SIEMENS EMS31XX", credits: 2 },
    {
      nameKey:
        "FORD – MD1 / MG1 / SIEMENS EMS2511 / 2533 / 24XX / DCU17CP43 / EDC17CP05 / EDC17CP65 / SID212",
      credits: 2,
    },
    { nameKey: "FERRARI – M2 / ME7 / MED9 / MED17", credits: 2 },
    { nameKey: "FIAT – MJD9", credits: 2 },
    { nameKey: "HYUNDAI / KIA – KEFICO", credits: 2 },
    {
      nameKey: "ISUZU – DCU17CP42 / DCU17CP01 / EDC17C81 / EDC17C83",
      credits: 2,
    },
    { nameKey: "JAC – EDC17C81", credits: 2 },
    { nameKey: "LAMBORGHINI – MG1CS008 / MED17.1.1 / CAMPI", credits: 2 },
    { nameKey: "LDV – EDC17C81", credits: 2 },
    { nameKey: "MAHINDRA – EDC17C81", credits: 2 },
    { nameKey: "MAXUS – EDC17C81", credits: 2 },
    { nameKey: "MAZDA – DCU17CP42 / SH9V", credits: 2 },
    { nameKey: "MCLAREN – MED17.8.XX", credits: 2 },
    { nameKey: "MERCEDES – MG1 / MD1 / CRD3P.XX / CPC", credits: 2 },
    { nameKey: "PORSCHE – MD1 / SDI", credits: 2 },
    { nameKey: "PSA – DCM7.1 / MD1 / VALEO / MJD9", credits: 2 },
    {
      nameKey:
        "RENAULT / NISSAN / VAUXHALL – MD1 / VALEO / SIEMENS EMS31XX / DCM7.1 / MJD9",
      credits: 2,
    },
    { nameKey: "SSANGYONG – DCM6.2AP", credits: 2 },
    { nameKey: "TOYOTA – DENSO R7F701202 / DCM7.1", credits: 2 },
    {
      nameKey:
        "VAG – MG1 / MD1 / SIMOS3 / 6 / 7 / 8 / 9 / 10 / 12 / 16 / 18 / 19",
      credits: 2,
    },
    { nameKey: "VOLVO – MD1 / MG1", credits: 2 },
    { nameKey: "ZHANGXING – EDC17C81", credits: 2 },
    { nameKey: "ALL – MD1 / DCM7.1 / CRD3P.XX / SID321", credits: 2 },
    { nameKey: "ALL – BIKE / ATV / JETSKI / SNOWMOBILE", credits: 2 },
    { nameKey: "GEARBOX", credits: 2 },
  ];

  const solutions = [
    { nameKey: "IMMO OFF", credits: 2 },
    { nameKey: "TRUCK / TRACTOR / HGV / CONSTRUCTION", credits: 4 },
    { nameKey: "CVN FIX", credits: 1 },
    {
      nameKey: "ENCRYPT / DECRYPT (includes 1 encrypt + 1 decrypt)",
      credits: 1,
    },
    { nameKey: "FLEX FUEL (E85)", credits: 1 },
    { nameKey: "ORIGINAL FILE REQUEST", credits: 1 },
    { nameKey: "POP & BANG", credits: 1 },
    { nameKey: "ECU Cloning", credits: 2 },
    { nameKey: "CUMMINS / CATERHAM", credits: 25 },
    { nameKey: "File Check Review", credits: 1 },
  ];

  return (
    <main className="flex-1 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700"
      >
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* First Column */}
            <div className="bg-white dark:bg-[#242526]/90 rounded-lg p-4 sm:p-6 border border-zinc-200 dark:border-gray-700">
              {/* Notice Box for First Column */}
              <div className="bg-zinc-100 dark:bg-[#1A1A1A] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-center text-sm sm:text-base text-zinc-900 dark:text-white">
                  {t("priceList.freeWithTuneNotice")}
                </p>
              </div>

              {/* Stage 1 Items */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                {stage1Items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-zinc-200 dark:border-gray-700 p-2 sm:p-3"
                  >
                    <div className="flex items-center">
                      <span className="text-zinc-900 dark:text-white text-sm sm:text-base">
                        {item?.nameKey}
                      </span>
                      {item.isFreeWithTune && (
                        <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs text-zinc-500 dark:text-gray-400">
                          {t("priceList.freeWithTune")}
                        </span>
                      )}
                    </div>
                    <span className="text-zinc-900 dark:text-white text-sm sm:text-base ml-2">
                      {item.credits} Credits
                    </span>
                  </div>
                ))}
              </div>

              {/* ECU Info Box */}
              <div className="mb-4 sm:mb-6">
                <div className="bg-zinc-100 dark:bg-[#1A1A1A] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-zinc-900 dark:text-white text-sm sm:text-base">
                    {t("priceList.ecuInfo")}
                  </p>
                </div>

                <div className="space-y-2">
                  {stage2Items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-zinc-200 dark:border-gray-700 p-3"
                    >
                      <span className="text-zinc-900 dark:text-white">
                        {item?.nameKey}
                      </span>
                      <span className="text-zinc-900 dark:text-white whitespace-nowrap">
                        {item.credits} Credits
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutios Box */}
              <div className="mb-4 sm:mb-6">
                <div className="bg-zinc-100 dark:bg-[#1A1A1A] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-zinc-900 dark:text-white text-sm sm:text-base">
                    Solutions (Extra Charges)
                  </p>
                </div>

                <div className="space-y-2">
                  {solutions.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-zinc-200 dark:border-gray-700 p-3"
                    >
                      <span className="text-zinc-900 dark:text-white">
                        {item?.nameKey}
                      </span>
                      <span className="text-zinc-900 dark:text-white whitespace-nowrap">
                        {item.credits} Credits
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="bg-white dark:bg-[#242526]/90 rounded-lg p-4 sm:p-6 border border-zinc-200 dark:border-gray-700">
              {/* Warning Box for Second Column */}
              <div className="mb-4 sm:mb-6">
                <p className="text-center text-sm sm:text-base text-zinc-900 dark:text-white">
                  {t("priceList.outsideWorkingHours")}
                </p>
              </div>

              {/* Terms & Conditions */}
              <div className="text-zinc-900 dark:text-white">
                <div className="bg-red-500 rounded py-1.5 sm:py-2 mb-3 sm:mb-4 text-center">
                  <p className="text-white text-sm sm:text-base font-medium underline">
                    {t("priceList.termsConditions")}
                  </p>
                </div>
                <ul className="space-y-2 text-center text-sm sm:text-base lg:text-lg">
                  <li>
                    <span className="text-red-600">
                      {t("priceList.slave")}{" "}
                    </span>
                    {t("priceList.slaveDesc")}
                  </li>
                  <li>
                    <span className="text-red-600">
                      {t("priceList.master")}{" "}
                    </span>
                    {t("priceList.masterDesc")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default PriceList;
