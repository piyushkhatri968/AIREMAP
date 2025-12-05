import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import useAuthUser from "../../../hooks/useAuthUser";

const BuyCredits = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { authUser } = useAuthUser();

  const perCreditPrice = Number(authUser?.perCreditPrice || 60);

  const packages = [
    { id: "1credit", credits: 1 },
    { id: "2credits", credits: 2 },
    { id: "3credits", credits: 3 },
    { id: "4credits", credits: 4 },
    { id: "10credits", credits: 10, discountPercent: 8 },
    { id: "25credits", credits: 25, discountPercent: 12 },
    { id: "48credits", credits: 48, discountPercent: 16 },
  ].map((pkg) => {
    const originalPrice = pkg.credits * perCreditPrice;
    const discount = pkg.discountPercent
      ? (originalPrice * pkg.discountPercent) / 100
      : 0;
    const finalPrice = originalPrice - discount;

    const roundedOriginal = Math.round(originalPrice);
    const roundedDiscount = Math.round(discount);
    const roundedFinal = Math.round(finalPrice);
    const roundedPerCredit = Math.round(roundedFinal / pkg.credits);

    return {
      ...pkg,
      name: `${pkg.credits}x Credit${pkg.credits > 1 ? "s" : ""}`,
      price: `£${roundedFinal.toLocaleString()}`,
      originalPrice: discount ? `£${roundedOriginal.toLocaleString()}` : null,
      isBundle: Boolean(discount),
      popular: pkg.credits === 25,
      savings: discount ? `£${roundedDiscount}` : null,
      perCredit: `£${roundedPerCredit}`,
    };
  });

  return (
    <main className="flex-1 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-gray-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center mb-3 sm:mb-4">
            {t("buyCreditsPage.title")}
          </h2>

          <p className="text-center text-zinc-600 dark:text-gray-400 text-sm sm:text-base">
            {t("buyCreditsPage.pricingIntro")}{" "}
            <Link
              to="/price-list"
              className="text-red-500 hover:underline cursor-pointer"
            >
              {t("buyCreditsPage.pricingGuidelines")}
            </Link>
            .
          </p>
        </div>

        {/* Packages */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`h-full cursor-pointer transition-all hover:scale-105 bg-white dark:bg-[#313636]/100 border border-zinc-200 dark:border-gray-600 rounded-lg p-3 sm:p-4 ${pkg.popular ? "ring-2 ring-red-500" : ""
                    }`}
                  onClick={() => {
                    navigate(`/order-details?package=${pkg.id}`, {
                      state: {
                        packageDetails: pkg,
                        from: "/buy-credits",
                      },
                    });
                  }}
                >
                  {/* Discount Badge */}
                  {pkg.isBundle && (
                    <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {t("buyCreditsPage.off")}
                    </div>
                  )}

                  {/* Package Content */}
                  <div className="text-center">
                    <h3 className="text-red-500 font-bold text-sm sm:text-base mb-2 sm:mb-3">
                      {pkg.name}
                    </h3>

                    <div className="mb-2 sm:mb-3">
                      <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-0.5 sm:mb-1">
                        {pkg.price}
                      </div>

                      {pkg.originalPrice && (
                        <div className="text-xs sm:text-sm text-zinc-500 dark:text-gray-400 line-through">
                          {pkg.originalPrice}
                        </div>
                      )}
                    </div>

                    {pkg.isBundle && (
                      <div className="mb-3 sm:mb-4 text-[10px] sm:text-xs text-zinc-500 dark:text-gray-300">
                        <div className="mb-0.5 sm:mb-1">
                          {t("buyCreditsPage.benefits")}
                        </div>

                        <div className="text-green-400">
                          -{pkg.savings} {t("buyCreditsPage.discount")}
                        </div>

                        <div className="text-red-400">
                          {pkg.perCredit} {t("buyCreditsPage.perCredit")}
                        </div>
                      </div>
                    )}

                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base transition-colors">
                      {t("buyCreditsPage.select")}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 sm:mt-8 text-center"
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              {t("buyCreditsPage.securePayment")}
            </p>

            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              {["VISA", "MC", "AMEX", "PP"].map((brand) => (
                <div
                  key={brand}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded flex items-center justify-center"
                >
                  <span className="text-[10px] sm:text-xs font-bold text-white">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default BuyCredits;
