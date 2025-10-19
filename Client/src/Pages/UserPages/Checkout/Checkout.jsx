import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

import visaImg from "../../../assets/payment/visa.svg";
import masterCardImg from "../../../assets/payment/mastercard.svg";
import amexImg from "../../../assets/payment/amex.svg";
import googleplayImg from "../../../assets/payment/googlepay.svg";
import stripeImg from "../../../assets/payment/stripe.svg";
import useCreatePayment from "../../../hooks/useCreatePayment";

const SQUARE_APP_ID = "sandbox-sq0idb-TjXG7dXuKre9EGWMEyontQ";
const SQUARE_LOCATION_ID = "LJY1HYSWX9338";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    let mounted = true;
    const loadSquare = async () => {
      if (cardMountedRef.current) return;
      setIsPaymentsLoading(true);
      try {
        const payments = window.Square.payments(
          SQUARE_APP_ID,
          SQUARE_LOCATION_ID
        );
        paymentsRef.current = payments;
        const card = await payments.card();
        cardRef.current = card;
        await card.attach("#card-container");
        cardMountedRef.current = true;
      } catch (err) {
        toast.error("Unable to load card form. Try again later");
      } finally {
        if (mounted) setIsPaymentsLoading(false);
      }
    };
    loadSquare();
    return () => {
      mounted = false;
      if (cardRef.current && typeof cardRef.current.destroy === "function") {
        try {
          cardRef.current.destroy();
        } catch (e) {}
      }
      cardMountedRef.current = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { isPending, createPaymentMutation } = useCreatePayment();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (paymentMethod !== "card") {
      toast.error("Selected payment method is not available");
      return;
    }
    if (!formData.email || !formData.cardHolderName) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!cardMountedRef.current || !cardRef.current) {
      toast.error("Card form is not ready");
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
          result.errors ? result.errors[0].message : "Tokenization failed"
        );
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Payment error");
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
          <div className="text-center mb-4">
            <h1 className="text-zinc-900 dark:text-white text-lg font-medium mb-2">
              Pay AIREMAP Tuning LTD
            </h1>
            <div className="text-zinc-900 dark:text-white text-2xl font-semibold">
              £{total.toFixed(2)}
            </div>
          </div>
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
          <Card className="border border-zinc-200 dark:border-gray-700 shadow-lg  dark:bg-[#242526]">
            <div className="p-6">
              <div className="mb-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-500 dark:text-gray-400"
                />
              </div>
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
              <div className="space-y-4 text-zinc-900 dark:text-white">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
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
                  </div>
                  {paymentMethod === "card" && (
                    <div>
                      <div className="mt-4">
                        <div
                          id="card-container"
                          className="w-full rounded-md bg-[#242526]"
                        />
                        {isPaymentsLoading && (
                          <div className="flex items-center justify-center my-3 text-sm text-zinc-500 dark:text-gray-400">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Loading card form...</span>
                          </div>
                        )}
                        <div>
                          <Input
                            type="text"
                            name="cardHolderName"
                            placeholder="Full name on card"
                            value={formData.cardHolderName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-500 dark:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-gray-800 disabled:bg-zinc-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed mt-6"
                size="lg"
                disabled={isProcessing || isPaymentsLoading || isPending}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "PAY"
                )}
              </Button>
              <p className="text-xs text-zinc-500 dark:text-gray-400 mt-4 text-center">
                Pay securely at AIREMAP Tuning LTD and everywhere Link is
                accepted.
              </p>
            </div>
          </Card>
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
