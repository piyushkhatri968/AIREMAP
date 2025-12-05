import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

const TermsConditionPopup = ({ settermsConditionPopup }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full min-h-screen bg-black/40 flex items-center justify-center backdrop-blur-sm fixed top-0 left-0 z-[99]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white dark:bg-[#242526] border border-zinc-200 dark:border-gray-700 shadow-xl rounded-2xl w-[90%] sm:w-[400px] max-w-[90vw] p-8 text-center"
      >
        <div className="text-zinc-900 dark:text-white">
          <div className="bg-red-500 rounded py-1.5 sm:py-2 mb-3 sm:mb-4 text-center">
            <p className="text-white text-sm sm:text-base font-medium underline">
              {t("overviewPage.termsTitle")}
            </p>
          </div>
          <ul className="space-y-6 text-center text-sm sm:text-base lg:text-lg">
            <li>
              <span className="text-red-600">{t("slave")}:</span> {t("slaveDesc")}
            </li>
            <li>
              <span className="text-red-600">{t("master")}:</span> {t("masterDesc")}
            </li>
          </ul>
          <div className="flex items-center justify-end">
            <Button
              onClick={() => settermsConditionPopup(false)}
              type="button"
              className=" bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-gray-800 disabled:bg-zinc-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed sm:mt-2"
              data-testid="button-submit"
            >
              {t("autoDataPage.close")}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsConditionPopup;
