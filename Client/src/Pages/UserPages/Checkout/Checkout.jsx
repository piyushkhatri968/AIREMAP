import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaGooglePay } from "react-icons/fa";

import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

import useCreatePayment from "../../../hooks/useCreatePayment";
import useAuthUser from "../../../hooks/useAuthUser";
import { useTranslation } from "react-i18next";

const SQUARE_APP_ID = "sq0idp-DEtbSQbvUEDDspvImb9jDw";
const SQUARE_LOCATION_ID = "LJY1HYSWX9338";

const getSquareCardStyle = (isDark) => ({
  ".input-container": {
    borderColor: isDark ? "#4b5563" : "#d4d4d8",
    borderRadius: "6px",
  },
  ".input-container.is-focus": {
    borderColor: isDark ? "#6b7280" : "#a1a1aa",
  },
  ".input-container.is-error": {
    borderColor: "#ef4444",
  },
  ".message-text": {
    color: isDark ? "#9ca3af" : "#71717a",
  },
  ".message-icon": {
    color: isDark ? "#9ca3af" : "#71717a",
  },
  ".message-text.is-error": {
    color: "#ef4444",
  },
  ".message-icon.is-error": {
    color: "#ef4444",
  },
  input: {
    backgroundColor: isDark ? "#242526" : "#ffffff",
    color: isDark ? "#e5e7eb" : "#18181b",
    fontFamily: "inherit",
  },
  "input::placeholder": {
    color: isDark ? "#9ca3af" : "#a1a1aa",
  },
  "input.is-error": {
    color: "#ef4444",
  },
});

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { authUser } = useAuthUser();
  const isVATApplicable = Boolean(authUser?.VAT);

  const [searchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({ email: "", cardHolderName: "" });
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const packageId = searchParams.get("package");
  const packageDetails = location.state?.packageDetails;
  const total = location.state?.total || 0;
  const subtotal = location.state?.subtotal || 0;
  const vat = location.state?.vat || 0;

  const previousRoute = location.state?.from;

  const paymentsRef = useRef(null);
  const cardRef = useRef(null);
  const cardMountedRef = useRef(false);

  useEffect(() => {
    if (!packageId || !packageDetails || previousRoute !== "/order-details") {
      navigate("/buy-credits", { replace: true });
    }
  }, [packageId, packageDetails, previousRoute, navigate]);

  const initializeCard = async (showLoader = true) => {
    if (showLoader) setIsPaymentsLoading(true);

    try {
      // Destroy existing card if any
      if (cardRef.current && typeof cardRef.current.destroy === "function") {
        try {
          cardRef.current.destroy();
        } catch { }
        cardRef.current = null;
        cardMountedRef.current = false;
      }

      // Wait for container to be ready after destroy
      const container = document.getElementById("card-container");
      if (!container) {
        if (showLoader) setIsPaymentsLoading(false);
        return;
      }

      // Small delay to ensure DOM is ready after destroy
      await new Promise((resolve) => setTimeout(resolve, 100));

      const payments = window.Square.payments(
        SQUARE_APP_ID,
        SQUARE_LOCATION_ID
      );
      paymentsRef.current = payments;

      const isDark = document.documentElement.classList.contains("dark");
      const card = await payments.card({
        style: getSquareCardStyle(isDark),
      });
      cardRef.current = card;

      await card.attach("#card-container");
      cardMountedRef.current = true;
    } catch (err) {
      toast.error(t("checkout.loadCardFailed"));
    } finally {
      if (showLoader) setIsPaymentsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadSquare = async () => {
      if (cardMountedRef.current) return;
      await initializeCard(true);
    };

    loadSquare();

    // Watch for theme changes on <html> element
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class" && mounted) {
          // Reinitialize card with new theme (no loader to avoid flicker)
          initializeCard(false);
          break;
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      mounted = false;
      observer.disconnect();
      if (cardRef.current && typeof cardRef.current.destroy === "function") {
        try {
          cardRef.current.destroy();
        } catch { }
      }
      cardMountedRef.current = false;
    };
  }, [t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { isPending, createPaymentMutation } = useCreatePayment();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (paymentMethod !== "card") {
      toast.error(t("checkout.unavailablePaymentError"));
      return;
    }

    if (!formData.email || !formData.cardHolderName) {
      toast.error(t("checkout.fillFieldsError"));
      return;
    }

    if (!cardMountedRef.current || !cardRef.current) {
      toast.error(t("checkout.cardFormError"));
      return;
    }

    setIsProcessing(true);

    try {
      const result = await cardRef.current.tokenize();

      if (result.status === "OK") {
        const payload = {
          sourceId: result.token,
          amount: total,
          email: formData.email,
          cardHolderName: formData.cardHolderName,
          packageId,
        };

        await createPaymentMutation(payload);
      } else {
        toast.error(
          result.errors?.[0]?.message || t("checkout.tokenizationFailed")
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <form
        onSubmit={handlePayment}
        className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#18191a]"
      >
        <div className="w-full max-w-[480px] space-y-4 px-4 sm:px-0">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-zinc-900 dark:text-white text-lg font-medium mb-2">
              {t("checkout.payAiremap")}
            </h1>
            <div className="text-zinc-900 dark:text-white text-2xl font-semibold">
              £{total.toFixed(2)}
            </div>
          </div>

          {/* Card */}
          <Card className="border border-zinc-200 dark:border-gray-700 shadow-lg dark:bg-[#242526]">
            <div className="p-6">
              {/* Email */}
              <div className="mb-4">
                <Input
                  type="email"
                  name="email"
                  placeholder={t("checkout.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-500 dark:text-gray-400"
                />
              </div>

              {/* Package Summary */}
              <div className="py-4 text-zinc-900 dark:text-white">
                <div className="flex justify-between items-center text-sm">
                  <span>
                    {packageDetails?.name ||
                      t("checkout.creditPackageFallback")}
                  </span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>

                {isVATApplicable && (
                  <div className="flex justify-between items-center text-sm mt-2 text-zinc-500 dark:text-gray-400">
                    <span>{t("checkout.vat")}</span>
                    <span>£{vat.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center font-medium mt-4 pt-4 border-t border-zinc-200 dark:border-gray-700">
                  <span>{t("checkout.totalDue")}</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4 text-zinc-900 dark:text-white">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  {/* Card Option */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value="card"
                        id="card"
                        className="border-zinc-400 dark:border-gray-500"
                      />
                      <label
                        htmlFor="card"
                        className="cursor-pointer font-medium flex-1"
                      >
                        {t("checkout.card")}
                      </label>
                      <div className="flex space-x-1.5">
                        <FaCcVisa className="h-8 w-auto text-[#1A1F71] bg-white" />
                        <FaCcMastercard className="h-8 w-auto text-[#EB001B] bg-white" />
                        <FaCcAmex className="h-8 w-auto text-[#006FCF] bg-white" />
                      </div>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div>
                      <div className="mt-4">
                        <div
                          id="card-container"
                          className="w-full rounded-md bg-white dark:bg-[#242526]"
                        />

                        {isPaymentsLoading && (
                          <div className="flex items-center justify-center my-3 text-sm text-zinc-500 dark:text-gray-400">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>{t("checkout.loadingCardForm")}</span>
                          </div>
                        )}

                        <div>
                          <Input
                            type="text"
                            name="cardHolderName"
                            placeholder={t("checkout.fullNameOnCard")}
                            value={formData.cardHolderName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-500 dark:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Google Pay - disabled */}
                  <div className="flex items-center space-x-3 opacity-50 cursor-not-allowed">
                    <RadioGroupItem
                      value="googlepay"
                      id="googlepay"
                      disabled
                      className="border-zinc-400 dark:border-gray-500"
                    />
                    <div className="flex items-center space-x-2">
                      <label htmlFor="googlepay" className="font-medium">
                        {t("checkout.googlePay")}
                      </label>
                      <FaGooglePay className="h-6 w-auto text-zinc-700 dark:text-gray-300" />
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Pay Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-zinc-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed mt-6"
                size="lg"
                disabled={isProcessing || isPaymentsLoading || isPending}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>{t("checkout.processing")}</span>
                  </div>
                ) : (
                  t("checkout.pay")
                )}
              </Button>

              <p className="text-xs text-zinc-500 dark:text-gray-400 mt-4 text-center">
                {t("checkout.securePayment")}
              </p>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-zinc-500 dark:text-gray-400 space-x-2">
              <span>{t("checkout.poweredBy")} Square</span>
            <span>|</span>
            <a href="#" className="underline hover:text-red-500">
              {t("checkout.terms")}
            </a>
            <span>|</span>
            <a href="#" className="underline hover:text-red-500">
              {t("checkout.privacy")}
            </a>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Checkout;
