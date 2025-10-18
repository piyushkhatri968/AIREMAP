import { motion } from "framer-motion";
import { useNavigate } from "react-router";
const BuyCredits = () => {
  const navigate = useNavigate();
  return (
    <main className="flex-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700"
      >
        <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-gray-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white text-center mb-3 sm:mb-4">
            Choose Your Plan
          </h2>
          <p className="text-center text-zinc-600 dark:text-gray-400 text-sm sm:text-base">
            If you need more info about our pricing, please check{" "}
            <span className="text-red-500 hover:underline cursor-pointer">
              Pricing Guidelines
            </span>
            .
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                id: "1credit",
                name: "1x Credit",
                price: "£60",
                credits: 1,
                popular: false,
                isBundle: false,
              },
              {
                id: "2credits",
                name: "2x Credits",
                price: "£120",
                credits: 2,
                popular: false,
                isBundle: false,
              },
              {
                id: "3credits",
                name: "3x Credits",
                price: "£180",
                credits: 3,
                popular: false,
                isBundle: false,
              },
              {
                id: "4credits",
                name: "4x Credits",
                price: "£240",
                credits: 4,
                popular: false,
                isBundle: false,
              },
              {
                id: "10credits",
                name: "10x Credits",
                price: "£552",
                originalPrice: "£600",
                credits: 10,
                popular: false,
                isBundle: true,
                savings: "£48",
                perCredit: "£55.20",
              },
              {
                id: "25credits",
                name: "25x Credits",
                price: "£1,320",
                originalPrice: "£1,500",
                credits: 25,
                popular: true,
                isBundle: true,
                savings: "£180",
                perCredit: "£52.80",
              },
              {
                id: "48credits",
                name: "48x Credits",
                price: "£2,400",
                originalPrice: "£2,880",
                credits: 48,
                popular: false,
                isBundle: true,
                savings: "£480",
                perCredit: "£50",
              },
            ].map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`h-full cursor-pointer transition-all hover:scale-105 bg-white dark:bg-[#313636]/100 border border-zinc-200 dark:border-gray-600 rounded-lg p-3 sm:p-4 ${
                    pkg.popular ? "ring-2 ring-red-500" : ""
                  }`}
                  onClick={() => {
                    // Navigate to order details with package info
                    navigate(`/order-details?package=${pkg.id}`, {
                      state: {
                        packageDetails: pkg,
                        from: "/buy-credits",
                      },
                    });
                  }}
                  data-testid={`card-package-${pkg.id}`}
                >
                  {pkg.isBundle && (
                    <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      %
                    </div>
                  )}

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
                        <div className="mb-0.5 sm:mb-1">Benefits:</div>
                        <div className="text-green-400">
                          -{pkg.savings} discount
                        </div>
                        <div className="text-red-400">
                          {pkg.perCredit} per Credit
                        </div>
                      </div>
                    )}

                    <button
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base transition-colors"
                      data-testid={`button-select-${pkg.id}`}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 sm:mt-8 text-center"
          >
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              Secure payment powered by Stripe • All major cards accepted
            </p>
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-[10px] sm:text-xs font-bold text-white">
                  VISA
                </span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-[10px] sm:text-xs font-bold text-white">
                  MC
                </span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-[10px] sm:text-xs font-bold text-white">
                  AMEX
                </span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-[10px] sm:text-xs font-bold text-white">
                  PP
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default BuyCredits;
