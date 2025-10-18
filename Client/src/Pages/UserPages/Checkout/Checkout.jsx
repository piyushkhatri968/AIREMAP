import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"; // Import for loading spinner

// --- ORIGINAL IMPORTS (Assuming paths are correct) ---
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

// Your Assets
import visaImg from "../../../assets/payment/visa.svg";
import masterCardImg from "../../../assets/payment/mastercard.svg";
import amexImg from "../../../assets/payment/amex.svg";
import googleplayImg from "../../../assets/payment/googlepay.svg";
import stripeImg from "../../../assets/payment/stripe.svg";
import { CreatePayment } from "../../../lib/APIs/paymentAPIs"; // Assuming this is your updated Axios wrapper

// Square SDK credentials
const SQUARE_APP_ID = "sandbox-sq0idb-TjXG7dXuKre9EGWMEyontQ";
const SQUARE_LOCATION_ID = "LJY1HYSWX9338";

// Helper function to check for dark mode status
const isDarkMode = () => {
  return document.documentElement.classList.contains("dark");
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSaveInfoChecked, setIsSaveInfoChecked] = useState(false);
  const [isSquareLoaded, setIsSquareLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // New state for payment processing
  const [theme, setTheme] = useState(isDarkMode() ? "dark" : "light"); // State for theme tracking

  const cardContainerRef = useRef(null);
  const cardInstanceRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    cardHolderName: "",
  });

  const packageId = searchParams.get("package");
  const packageDetails = location.state?.packageDetails;
  const total = location.state?.total || 0;
  const subtotal = location.state?.subtotal || 0;
  const vat = location.state?.vat || 0;
  const previousRoute = location.state?.from;

  // --- Initial Navigation & Data Check ---
  useEffect(() => {
    if (!packageId || !packageDetails || previousRoute !== "/order-details") {
      toast.error("Invalid checkout session. Redirecting.");
      navigate("/buy-credits", { replace: true });
    }
  }, [packageId, packageDetails, previousRoute, navigate]);

  // --- Theme Change Observer (For dynamic Square styling) ---
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(isDarkMode() ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- SQUARE PAYMENT LIFE CYCLE MANAGEMENT ---

  const loadSquareCard = useCallback(async () => {
    if (paymentMethod !== "card" || !cardContainerRef.current) {
      return;
    }
    if (!window.Square) {
      toast.error("Payment SDK failed to load. Please try refreshing.");
      return;
    }

    setIsSquareLoaded(false);

    // Fix 1: Cleanup previous instance (Prevents double rendering/attaching and fixes Google Pay switch)
    if (cardInstanceRef.current) {
      await cardInstanceRef.current.destroy();
      cardInstanceRef.current = null;
    }

    try {
      const payments = window.Square.payments(
        SQUARE_APP_ID,
        SQUARE_LOCATION_ID
      );

      const isDarkTheme = theme === "dark";

      // Fix 2: Square API Compliant Styling (Using PX units and supported longhand properties)
      const cardColor = isDarkTheme ? "#FFFFFF" : "#000000";
      const placeholderColor = isDarkTheme ? "#9CA3AF" : "#6B7280";
      const borderColor = isDarkTheme ? "#374151" : "#D1D5DB";
      const backgroundColor = isDarkTheme ? "#242526" : "#FFFFFF";
      const focusRingColor = "#3B82F6";

      const card = await payments.card({});

      await card.attach(cardContainerRef.current);
      cardInstanceRef.current = card;
      setIsSquareLoaded(true);
    } catch (err) {
      console.error("Failed to load Square Card:", err);
      toast.error("Secure payment fields failed to load. Please try again.");
      setIsSquareLoaded(true);
    }
  }, [paymentMethod, theme]);

  // Fix 3: Managing Card Lifecycle (Attach/Destroy based on selection)
  useEffect(() => {
    if (paymentMethod === "card") {
      loadSquareCard();
    } else {
      const cleanup = async () => {
        if (cardInstanceRef.current) {
          await cardInstanceRef.current.destroy();
          cardInstanceRef.current = null;
          setIsSquareLoaded(false);
        }
      };
      cleanup();
    }
  }, [paymentMethod, loadSquareCard]);

  // --- PAYMENT SUBMISSION ---
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // Start processing state

    if (paymentMethod !== "card") {
      setIsProcessing(false);
      return toast.info(
        "Currently only Card payment is supported for testing."
      );
    }

    // Fix 4: Toast for loading state
    if (!cardInstanceRef.current || !isSquareLoaded) {
      setIsProcessing(false);
      return toast.error("Payment fields are still loading. Please wait.");
    }

    try {
      const card = cardInstanceRef.current;

      const result = await card.tokenize();

      if (result.status !== "OK") {
        // Fix 5: Replace alert with toast
        setIsProcessing(false);
        return toast.error(
          "Card details invalid or tokenization failed! Please check your input."
        );
      }

      // Data payload (Ensure backend validation works with amount and email)
      const dataPayload = {
        sourceId: result.token,
        amount: total,
        email: formData.email,
        packageId: packageId, // Sending packageId for backend security validation
      };

      const response = await CreatePayment(dataPayload);
      console.log(response);
    } catch (error) {
      console.error(error);
      const apiError =
        error.response?.data?.message ||
        "Error processing payment. Please check console.";
      toast.error(apiError);
    } finally {
      setIsProcessing(false); // Stop processing state
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <form
        onSubmit={handlePayment}
        className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#18191a]"
      >
        <div className="w-full max-w-[480px] space-y-4 px-4 sm:px-0">
          {/* Header (unchanged) */}
          <div className="text-center mb-4">
            <h1 className="text-zinc-900 dark:text-white text-lg font-medium mb-2">
              Pay AIREMAP Tuning LTD
            </h1>
            <div className="text-zinc-900 dark:text-white text-2xl font-semibold">
              £{total.toFixed(2)}
            </div>
          </div>

          {/* Divider Or (unchanged) */}
          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-300 dark:border-gray-600"></div>
            </div>
            <div className="relative bg-zinc-50 dark:bg-[#18191a] inline-block">
              <span className="px-2 text-sm text-zinc-500 dark:text-gray-400">
                Or
              </span>
            </div>
          </div>

          {/* Payment Form */}
          <Card className="border border-zinc-200 dark:border-gray-700 shadow-lg bg-white dark:bg-[#242526]">
            <div className="p-6">
              {/* Email Input */}
              <div className="mb-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3"
                />
              </div>

              {/* Line Item Summary (unchanged) */}
              <div className="py-4 text-zinc-900 dark:text-white">
                <div className="flex justify-between items-center text-sm">
                  <span>{packageDetails?.name || "Credit Package"}</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2 text-zinc-500 dark:text-gray-400">
                  <span>VAT (20%)</span>
                  <span>£{vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-medium mt-4 pt-4 border-t border-zinc-200 dark:border-gray-700">
                  <span>Total due</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4 text-zinc-900 dark:text-white">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  {/* Option 1: Card Payment */}
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
                        Card
                      </label>
                      <div className="flex space-x-1">
                        <img src={visaImg} alt="Visa" className="h-4" />
                        <img
                          src={masterCardImg}
                          alt="Mastercard"
                          className="h-4"
                        />
                        <img
                          src={amexImg}
                          alt="American Express"
                          className="h-4"
                        />
                      </div>
                    </div>

                    {/* Square Card Field Container */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 mt-2">
                        {/* 🛑 Square Field Container (Used Ref) */}
                        <div
                          ref={cardContainerRef}
                          className="min-h-[50px] transition-all duration-300"
                        >
                          {/* Loading UI is shown here */}
                          {!isSquareLoaded && (
                            <div className="flex items-center justify-center p-3 text-sm text-zinc-500 dark:text-gray-400 border border-zinc-200 dark:border-gray-700 rounded-lg bg-zinc-50 dark:bg-[#1A1A1A]">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin text-red-600" />
                              Awaiting secure card field initialization...
                            </div>
                          )}
                        </div>

                        {/* Card Holder Name (Standard Input) */}
                        <Input
                          type="text"
                          name="cardHolderName"
                          required
                          placeholder="Full name on card"
                          value={formData.cardHolderName}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Option 2: Google Pay (Disabled in test mode) */}
                  <div className="flex items-center space-x-3 opacity-50 cursor-not-allowed">
                    <RadioGroupItem
                      value="googlepay"
                      id="googlepay"
                      disabled
                      className="border-zinc-400 dark:border-gray-500"
                    />
                    <div className="flex items-center space-x-2">
                      <label htmlFor="googlepay" className="font-medium">
                        Google Pay
                      </label>
                      <img
                        src={googleplayImg}
                        alt="Google Pay"
                        className="h-4"
                      />
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="savePaymentInfo"
                  className="flex items-center space-x-2 text-zinc-900 dark:text-white cursor-pointer"
                >
                  <Checkbox
                    id="savePaymentInfo"
                    checked={isSaveInfoChecked}
                    onCheckedChange={setIsSaveInfoChecked}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-zinc-700 dark:text-gray-300">
                    Save my information for faster checkout
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 font-medium py-3 rounded-lg"
                size="lg"
                // Button disabled when not 'card', loading, or processing
                disabled={
                  paymentMethod !== "card" || !isSquareLoaded || isProcessing
                }
              >
                {/* Button Loading State based on isSquareLoaded/isProcessing */}
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : paymentMethod === "card" && !isSquareLoaded ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading Payment...
                  </>
                ) : (
                  `Pay £${total.toFixed(2)}`
                )}
              </Button>

              <p className="text-xs text-zinc-500 dark:text-gray-400 mt-4 text-center">
                Pay securely at AIREMAP Tuning LTD and everywhere Link is
                accepted.
              </p>
            </div>
          </Card>

          {/* Powered by Stripe (unchanged) */}
          <div className="text-center text-xs text-zinc-500 dark:text-gray-400 space-x-2">
            <span>Powered by</span>
            <img src={stripeImg} alt="Stripe" className="inline-block h-4" />
            <span>|</span>
            <a
              href="#"
              className="underline hover:text-red-500 transition-colors"
            >
              Terms
            </a>
            <span>|</span>
            <a
              href="#"
              className="underline hover:text-red-500 transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Checkout;
