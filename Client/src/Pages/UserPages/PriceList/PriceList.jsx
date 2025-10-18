import { useLocation } from "react-router";
import { motion } from "framer-motion";

const PriceList = () => {
  const location = useLocation();

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
  ];

  const stage2Items = [
    { nameKey: "ALFA - ME(V)7 / MED17 / MJ10", credits: 2 },
    { nameKey: "ASTON MARTIN - MED17", credits: 2 },
    {
      nameKey: "BMW/MINI - EDC17 / MG1 / MD1 / MEV(D)7 / MED17 / MEV17",
      credits: 2,
    },
  ];
  return (
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
                All Listed Below are FREE With Any Stage 1 or Stage 2 Tune.
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
                        FREE WITH TUNE
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
                  ECU's Listed Below Are Charged at 2 CRD. This also includes
                  Solutions Only. However solutions are always FREE with any
                  Tune. If The ECU Is NOT Listed Below Then It Will Be Charged
                  At 1 Credit
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
                    <span className="text-zinc-900 dark:text-white">
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
                Any files uploaded outside of working hours that require manual
                input will NOT be processed until Airemap re-opens.
              </p>
            </div>

            {/* Terms & Conditions */}
            <div className="text-zinc-900 dark:text-white">
              <div className="bg-red-500 rounded py-1.5 sm:py-2 mb-3 sm:mb-4 text-center">
                <p className="text-white text-sm sm:text-base font-medium underline">
                  Terms & Conditions
                </p>
              </div>
              <ul className="space-y-2 text-center text-sm sm:text-base lg:text-lg">
                <li>
                  Slave Users wanting decrypting and encrypting of files outside
                  our service are charged at 1 Credit. These requests can only
                  be made if Airemap have no solution available or are unable to
                  find a working solution, or the ECU requires specific custom
                  tuning inc. changes for upgraded turbos, injectors etc.
                </li>
                <li>
                  Due to software being a digital sale, ALL payments for credits
                  are NON-refundable. Credits cannot be transferred to other
                  account holders or used towards tool purchases.
                </li>
                <li>
                  If there are any file issues, and we cannot resolve, then file
                  credits will be refunded back onto your credit balance.
                </li>
                <li>
                  Files over 21 days old that require rework modifications are
                  charged at an EXTRA 1 Credit. This includes solutions too.
                </li>
                <li>
                  Due to software being a digital sale, ALL payments for credits
                  are NON-refundable. Credits cannot be transferred to other
                  account holders or used towards tool purchases. If there are
                  any file issues, and we cannot resolve, then file credits will
                  be refunded back onto your credit balance. Files over 21 days
                  old that require further modifications are charged at an EXTRA
                  1 Credit.
                </li>
                <li>
                  This includes solutions too. Airemap reserves the right to
                  allow access to the VRM Databases Lookup. This Database is a
                  service aimed at the SLAVE Network of Airemap. If VRM usage is
                  abused, your VRM access will be permanently disabled and
                  manual search reduced. Files that require further solutions,
                  adding or removing from the ECU file within the 21-day
                  warranty period, are FREE for all slave users. This excludes
                  Stage options. However, for Master users, all extras are
                  chargeable.
                </li>
                <li>
                  When ordering a file for a Master Tool, please be sure you
                  have the complete request from the end customer. Adding or
                  removing extra features or tunes to a file after the order has
                  been sent will result in an extra charge. Any solutions
                  wanting to be added outside the warranty window are charged
                  and will require a new file request. Jobs that require redo,
                  due to customer\'s car going back to main dealer and the map
                  has been removed, you will need to make a new file request.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceList;
