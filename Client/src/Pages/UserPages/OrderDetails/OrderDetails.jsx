import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import useAuthUser from "../../../hooks/useAuthUser";
import LoadingSkeleton from "../../../components/Loader/LoadingSkeleton/LoadingSkeleton";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { motion } from "framer-motion";

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser } = useAuthUser();
  const [searchParams] = useSearchParams();

  const isVATApplicable = Boolean(authUser?.VAT);

  const packageId = searchParams.get("package");
  const packageDetails = location.state?.packageDetails;

  useEffect(() => {
    if (!packageId || !packageDetails) {
      navigate("/buy-credits");
    }
  }, [packageId, packageDetails, location.state?.from, navigate]);

  // Company data
  const companyData = {
    companyName: "AiRemap Ltd",
    companyAddress: [
      "Unit 5, Office 478, Newhall Street,",
      "Birmingham, B3 3QR",
    ],
  };

  // Package info
  const packageInfo = packageDetails || {
    name: "Unknown Package",
    price: "£0",
    credits: 0,
  };

  // ✅ Clean and round numeric conversions
  const cleanedPriceString = packageInfo.price
    .replace("£", "")
    .replace(/,/g, "");
  const priceNumber = parseFloat(cleanedPriceString) || 0;

  const subtotal = Math.round(priceNumber);
  const vat = isVATApplicable ? Math.round(subtotal * 0.2) : 0;
  const total = Math.round(subtotal + vat);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 sm:px-0 mt-6 sm:mt-0">
      <Card className="max-w-3xl mx-auto bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-700 shadow-lg">
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-8 text-zinc-900 dark:text-white">
            Order Details
          </h1>

          <div className="grid grid-cols-2 gap-x-24 gap-y-8 mb-12">
            {/* From Section */}
            <div>
              <h2 className="text-zinc-600 dark:text-gray-400 mb-4">From:</h2>
              <div className="space-y-1">
                <p className="font-medium text-zinc-900 dark:text-white">
                  {companyData.companyName}
                </p>
                {companyData.companyAddress.map((line, i) => (
                  <p key={i} className="text-zinc-600 dark:text-gray-400">
                    {line}
                  </p>
                ))}
                {/* <p className="text-zinc-600 dark:text-gray-400 mt-2">
                  <span className="inline-block w-20">VAT ID:</span>
                  {companyData.companyVatId}
                </p> */}
              </div>
            </div>

            {/* Bill To Section */}
            <div>
              <h2 className="text-zinc-600 dark:text-gray-400 mb-4">
                Bill To:
              </h2>
              <div className="space-y-1">
                <p className="font-medium text-zinc-900 dark:text-white">
                  {authUser?.firstName && authUser?.lastName ? (
                    `${authUser.firstName} ${authUser.lastName}`
                  ) : (
                    <LoadingSkeleton className="w-40 h-4 bg-zinc-200 dark:bg-gray-600" />
                  )}
                </p>
                <p className="text-zinc-600 dark:text-gray-400">
                  {authUser?.address || "Address not available"}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Item Section */}
          <div className="mb-8">
            <h2 className="text-zinc-600 dark:text-gray-400 mb-4">
              Selected Item:
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-600 dark:text-gray-400">ITEM</span>
                <span className="text-zinc-600 dark:text-gray-400">TOTAL</span>
              </div>

              <div className="flex justify-between items-center text-zinc-900 dark:text-white">
                <span>{packageInfo.name}</span>
                <span>{packageInfo.price}</span>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white">
                <div className="flex justify-between items-center mb-2">
                  <span>Subtotal</span>
                  <span>£{subtotal.toLocaleString()}</span>
                </div>

                {/* ✅ Show VAT only if applicable */}
                {isVATApplicable && (
                  <div className="flex justify-between items-center mb-2">
                    <span>VAT (20%)</span>
                    <span>£{vat.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Grand Total</span>
                  <span>£{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/buy-credits")}
              className="bg-white dark:bg-[#242526] text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-[#2d2e2f] border-zinc-200 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                navigate(`/checkout?package=${packageId}`, {
                  state: {
                    packageDetails,
                    total,
                    subtotal,
                    vat,
                    from: "/order-details",
                  },
                })
              }
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 focus:ring-2"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default OrderDetails;
