import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router'; // Assuming react-router-dom for routing
// Your Shadcn UI Components
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';

// Your Assets
import visaImg from "../../../assets/payment/visa.svg";
import masterCardImg from "../../../assets/payment/mastercard.svg";
import amexImg from "../../../assets/payment/amex.svg";
import googleplayImg from "../../../assets/payment/googlepay.svg";
import stripeImg from "../../../assets/payment/stripe.svg";

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isSaveInfoChecked, setIsSaveInfoChecked] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        cardHolderName: "",
    });

    const packageId = searchParams.get('package');
    const packageDetails = location.state?.packageDetails;
    const total = location.state?.total || 0;
    const subtotal = location.state?.subtotal || 0;
    const vat = location.state?.vat || 0;
    const previousRoute = location.state?.from;

    useEffect(() => {
        if (!packageId || !packageDetails || previousRoute !== '/order-details') {
            navigate("/buy-credits", { replace: true });
        }
    }, [packageId, packageDetails, previousRoute, navigate]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCardFieldChange = (e, maxLength) => {
        const { name, value } = e.target;

        // Remove all non-digits (force numeric input)
        const numericValue = value.replace(/\D/g, '');

        // Limit length
        const finalValue = numericValue.substring(0, maxLength);

        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));
    };

    // Formatting functions for better display in input fields (MM / YY or groups of 4)
    const formatCardNumber = (value) => value.match(/.{1,4}/g)?.join(' ') || '';
    const formatExpiryDate = (value) => {
        if (value.length > 2) {
            return `${value.substring(0, 2)} / ${value.substring(2)}`;
        }
        return value;
    };


    const handlePayment = (e) => {
        e.preventDefault();


        const paymentData = {
            method: paymentMethod,
            saveInfo: isSaveInfoChecked,
            email: formData.email,

            cardDetails: paymentMethod === 'card' ? {
                cardNumber: formData.cardNumber,
                expiryDate: formData.expiryDate, 
                cvc: formData.cvc,
                cardHolderName: formData.cardHolderName,
            } : null,

            amount: total.toFixed(2),
            packageId: packageId,
        };

        console.log(JSON.stringify(paymentData, null, 2));


    };

    return (
        <form onSubmit={handlePayment} className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-[480px] space-y-4">

                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-zinc-900 dark:text-white text-lg font-medium mb-2">
                        Pay AIREMAP Tuning LTD
                    </h1>
                    <div className="text-zinc-900 dark:text-white text-2xl font-semibold">
                        £{total.toFixed(2)}
                    </div>
                </div>

                {/* Divider Or */}
                <div className="relative text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative bg-zinc-50 dark:bg-[#18191a] inline-block">
                        <span className="px-2 text-sm text-zinc-500 dark:text-gray-400">Or</span>
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
                                className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600 focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                            />
                        </div>

                        {/* Line Item Summary */}
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
                                            className="border-zinc-400 dark:border-gray-500 text-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-red-500"
                                        />
                                        <label htmlFor="card" className="cursor-pointer font-medium flex-1">Card</label>
                                        <div className="flex space-x-1">
                                            <img src={visaImg} alt="Visa" className="h-4" />
                                            <img src={masterCardImg} alt="Mastercard" className="h-4" />
                                            <img src={amexImg} alt="American Express" className="h-4" />
                                        </div>
                                    </div>

                                    {/* Card Details Input Fields */}
                                    {paymentMethod === 'card' && (
                                        <div className="space-y-4">
                                            <Input
                                                type="tel"
                                                name="cardNumber"
                                                required
                                                placeholder="Card Number (e.g. 1234 1234 1234 1234)"
                                                value={formatCardNumber(formData.cardNumber)}
                                                onChange={(e) => handleCardFieldChange(e, 16)} 
                                                className="w-full bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-gray-600  placeholder:text-zinc-500 dark:placeholder:text-gray-400 shadow-sm"
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    type="tel" 
                                                    name="expiryDate"
                                                    required
                                                    placeholder="MM / YY"
                                                    value={formatExpiryDate(formData.expiryDate)}
                                                    onChange={(e) => handleCardFieldChange(e, 4)}
                                                    className="w-full bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-gray-600 placeholder:text-zinc-500 dark:placeholder:text-gray-400 shadow-sm"
                                                />
                                                <Input
                                                    type="tel"
                                                    name="cvc"
                                                    required
                                                    placeholder="CVC"
                                                    value={formData.cvc}
                                                    onChange={(e) => handleCardFieldChange(e, 4)}
                                                    className="w-full bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-gray-600 placeholder:text-zinc-500 dark:placeholder:text-gray-400 shadow-sm"
                                                    maxLength={4}
                                                />
                                            </div>
                                            <Input
                                                type="text"
                                                name="cardHolderName"
                                                required
                                                placeholder="Full name on card"
                                                value={formData.cardHolderName}
                                                onChange={handleInputChange}
                                                className="w-full bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-300 dark:border-gray-600  placeholder:text-zinc-500 dark:placeholder:text-gray-400 shadow-sm"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Option 2: Google Pay */}
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem
                                        value="googlepay"
                                        id="googlepay"
                                        className="border-zinc-400 dark:border-gray-500 text-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-red-500"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <label htmlFor="googlepay" className="cursor-pointer font-medium">Google Pay</label>
                                        <img src={googleplayImg} alt="Google Pay" className="h-4" />
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>


                  
                        <div className="mt-4">
                            <label htmlFor="savePaymentInfo" className="flex items-center space-x-2 text-zinc-900 dark:text-white cursor-pointer">
                                <Checkbox
                                    id="savePaymentInfo"
                                    checked={isSaveInfoChecked}
                                    onCheckedChange={setIsSaveInfoChecked}
                                    className="w-4 h-4 data-[state=checked]:bg-red-600 dark:data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 dark:data-[state=checked]:border-red-600 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 rounded"
                                />
                                <span className="text-sm">Save my information for faster checkout</span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-red-600 text-white hover:bg-red-700 mt-6 font-medium py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                            size="lg"
                        >
                            Pay £{total.toFixed(2)}
                        </Button>

                        <p className="text-xs text-zinc-500 dark:text-gray-400 mt-4 text-center">
                            Pay securely at AIREMAP Tuning LTD and everywhere Link is accepted.
                        </p>
                    </div>
                </Card>

                {/* Powered by Stripe */}
                <div className="text-center text-xs text-zinc-500 dark:text-gray-400 space-x-2">
                    <span>Powered by</span>
                    <img src={stripeImg} alt="Stripe" className="inline-block h-4" />
                    <span>|</span>
                    <a href="#" className="underline hover:text-red-500 transition-colors">Terms</a>
                    <span>|</span>
                    <a href="#" className="underline hover:text-red-500 transition-colors">Privacy</a>
                </div>
            </div>
        </form>
    )
}

export default Checkout;