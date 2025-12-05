import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PriceList = () => {
  const { t } = useTranslation();
  const stage1Items = [
    { nameKey: 'priceListPage.stage1.o2', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.adblue', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.bmw_sports_display', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.dpf_off', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.dtc_removal', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.egr_off', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.exhaust_flap', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.gpf_off', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.popcorn_limiter', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.hotstart_fix', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.maf_off', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.oil_pressure_fix', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.sap_delete', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.speed_limiter_delete', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.speed_limiter_off', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.start_stop', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.swirl_flap_delete', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.tva_off', credits: 1, isFreeWithTune: true },
    { nameKey: 'priceListPage.stage1.truck_tactor_cons', credits: 1, isFreeWithTune: true, },
  ];

  const stage2Items = [
    { nameKey: 'priceListPage.stage2.alfa', credits: 2 },
    { nameKey: 'priceListPage.stage2.aston', credits: 2 },
    { nameKey: 'priceListPage.stage2.bmw_mini', credits: 2 },
    { nameKey: "priceListPage.stage2.dacia", credits: 2 },
    { nameKey: "priceListPage.stage2.ford", credits: 2 },
    { nameKey: "priceListPage.stage2.ferrari", credits: 2 },
    { nameKey: "priceListPage.stage2.fiat", credits: 2 },
    { nameKey: "priceListPage.stage2.hyundai_kia", credits: 2 },
    { nameKey: "priceListPage.stage2.isuzu", credits: 2 },
    { nameKey: "priceListPage.stage2.jac", credits: 2 },
    { nameKey: "priceListPage.stage2.lamborghini", credits: 2 },
    { nameKey: "priceListPage.stage2.ldv", credits: 2 },
    { nameKey: "priceListPage.stage2.mahindra", credits: 2 },
    { nameKey: "priceListPage.stage2.maxus", credits: 2 },
    { nameKey: "priceListPage.stage2.mazda", credits: 2 },
    { nameKey: "priceListPage.stage2.mclaren", credits: 2 },
    { nameKey: "priceListPage.stage2.mercedes", credits: 2 },
    { nameKey: "priceListPage.stage2.porsche", credits: 2 },
    { nameKey: "priceListPage.stage2.psa", credits: 2 },
    { nameKey: "priceListPage.stage2.renault_nissan_vauxhall", credits: 2 },
    { nameKey: "priceListPage.stage2.ssangyong", credits: 2 },
    { nameKey: "priceListPage.stage2.toyota", credits: 2 },
    { nameKey: "priceListPage.stage2.vag", credits: 2 },
    { nameKey: "priceListPage.stage2.volvo", credits: 2 },
    { nameKey: "priceListPage.stage2.zhangxing", credits: 2 },
    { nameKey: "priceListPage.stage2.all_md1", credits: 2 },
    { nameKey: "priceListPage.stage2.all_vehicles", credits: 2 },
    { nameKey: "priceListPage.stage2.gearbox", credits: 2 },

  ];

  const solutions = [
    { nameKey: "priceListPage.solutions.immo_off", credits: 2 },
    { nameKey: "priceListPage.solutions.truck_tractor_hgv_construction", credits: 4 },
    { nameKey: "priceListPage.solutions.cvn_fix", credits: 1 },
    { nameKey: "priceListPage.solutions.encrypt_decrypt", credits: 1 },
    { nameKey: "priceListPage.solutions.flex_fuel", credits: 1 },
    { nameKey: "priceListPage.solutions.original_file_request", credits: 1 },
    { nameKey: "priceListPage.solutions.pop_bang", credits: 1 },
    { nameKey: "priceListPage.solutions.ecu_cloning", credits: 2 },
    { nameKey: "priceListPage.solutions.cummins_caterham", credits: 25 },
    { nameKey: "priceListPage.solutions.file_check_review", credits: 1 },

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
                  {t('priceListPage.freeWithTuneNotice', { stage1: t('stage1'), stage2: t('stage2') })}
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
                        {item.nameKey ? t(item.nameKey) : item.name}
                      </span>
                      {item.isFreeWithTune && (
                        <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs text-zinc-500 dark:text-gray-400">
                          {t("priceListPage.freeWithTuneTag")}
                        </span>
                      )}
                    </div>
                    <span className="text-zinc-900 dark:text-white text-sm sm:text-base ml-2">
                      {item.credits} {t("creditsUnit")}
                    </span>
                  </div>
                ))}
              </div>

              {/* ECU Info Box */}
              <div className="mb-4 sm:mb-6">
                <div className="bg-zinc-100 dark:bg-[#1A1A1A] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-zinc-900 dark:text-white text-sm sm:text-base">
                    {t("priceListPage.ecuInfo")}
                  </p>
                </div>

                <div className="space-y-2">
                  {stage2Items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-zinc-200 dark:border-gray-700 p-3"
                    >
                      <span className="text-zinc-900 dark:text-white">
                        {item.nameKey ? t(item.nameKey) : item.name}
                      </span>
                      <span className="text-zinc-900 dark:text-white whitespace-nowrap">
                        {item.credits}  {t("creditsUnit")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutios Box */}
              <div className="mb-4 sm:mb-6">
                <div className="bg-zinc-100 dark:bg-[#1A1A1A] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-zinc-900 dark:text-white text-sm sm:text-base">
                    {t("priceListPage.solutionsLabel")}
                  </p>
                </div>

                <div className="space-y-2">
                  {solutions.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-zinc-200 dark:border-gray-700 p-3"
                    >
                      <span className="text-zinc-900 dark:text-white">
                        {item.nameKey ? t(item.nameKey) : item.name}
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
                  {t('priceListPage.workingHoursNotice')}
                </p>
              </div>

              {/* Terms & Conditions */}
              <div className="text-zinc-900 dark:text-white">
                <div className="bg-red-500 rounded py-1.5 sm:py-2 mb-3 sm:mb-4 text-center">
                  <p className="text-white text-sm sm:text-base font-medium underline">
                    {t('priceListPage.termsAndConditions')}
                  </p>
                </div>
                <ul className="space-y-2 text-center text-sm sm:text-base lg:text-lg">
                  <li>
                    <span className="text-red-600">
                      {t("priceListPage.slave")}{" "}
                    </span>
                    {t("priceListPage.slaveDesc")}
                  </li>
                  <li>
                    <span className="text-red-600">
                      {t("priceListPage.master")}{" "}
                    </span>
                    {t("priceListPage.masterDesc")}
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
