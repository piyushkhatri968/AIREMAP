import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import useAuthUser from '../../../hooks/useAuthUser'
import LoadingSkeleton from '../../../components/Loader/LoadingSkeleton/LoadingSkeleton'
import { Button } from '../../../components/ui/button'
import { useEffect } from 'react'
import { Card } from '../../../components/ui/card'

const OrderDetails = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { authUser } = useAuthUser()
    const [searchParams] = useSearchParams();

    const packageId = searchParams.get("package");
    const packageDetails = location.state?.packageDetails;

    useEffect(() => {
        if (!packageId || !packageDetails) {
            navigate("/buy-credits")
        }
    }, [packageId, packageDetails, location.state?.from, navigate])

    // Company data
    const companyData = {
        companyName: "AIREMAP Tuning LTD",
        companyAddress: ["Castle Hill House, 12 Castle Hill", "Windsor United Kingdom SL41PD"],
        companyVatId: "GB453816187"
    };

    // Package info
    const packageInfo = packageDetails || {
        name: "Unknown Package",
        price: "£0",
        credits: 0
    };

    // FIX: Calculate totals - Remove '£' AND ',' before converting to number
    const cleanedPriceString = packageInfo.price.replace('£', '').replace(/,/g, '');
    const priceNumber = parseFloat(cleanedPriceString);

    const subtotal = priceNumber;
    const vat = subtotal * 0.20; // 20% VAT
    const total = subtotal + vat;


    return (
        // Card BG for Light/Dark mode
        <Card className="max-w-3xl mx-auto bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-700 shadow-lg" >
            <div className="p-8">
                {/* Heading Text */}
                <h1 className="text-2xl font-semibold mb-8 text-zinc-900 dark:text-white">Order Details</h1>

                <div className="grid grid-cols-2 gap-x-24 gap-y-8 mb-12">
                    {/* From Section */}
                    <div>
                        {/* Secondary Heading Text */}
                        <h2 className="text-zinc-600 dark:text-gray-400 mb-4">From:</h2>
                        <div className="space-y-1">
                            {/* Main Text */}
                            <p className="font-medium text-zinc-900 dark:text-white">{companyData.companyName}</p>
                            {companyData.companyAddress.map((line, i) => (
                                // Secondary Text
                                <p key={i} className="text-zinc-600 dark:text-gray-400">{line}</p>
                            ))}
                            {/* Secondary Text */}
                            <p className="text-zinc-600 dark:text-gray-400 mt-2">
                                <span className="inline-block w-20">VAT ID:</span>
                                {companyData.companyVatId}
                            </p>
                        </div>
                    </div>

                    {/* Bill To Section */}
                    <div>
                        {/* Secondary Heading Text */}
                        <h2 className="text-zinc-600 dark:text-gray-400 mb-4">Bill To:</h2>
                        <div className="space-y-1">
                            {/* Main Text (with loading skeleton color adjusted) */}
                            <p className="font-medium text-zinc-900 dark:text-white">
                                {authUser?.firstName + " " + authUser?.lastName || <span className="inline-block align-middle"><LoadingSkeleton className="w-40 h-4 bg-zinc-200 dark:bg-gray-600" /></span>}
                            </p>

                            {/* Secondary Text */}
                            <p className="text-zinc-600 dark:text-gray-400">{authUser?.address || "Address not available"}</p>

                        </div>
                    </div>
                </div>

                {/* Selected Item Section */}
                <div className="mb-8">
                    {/* Secondary Heading Text */}
                    <h2 className="text-zinc-600 dark:text-gray-400 mb-4">Selected Item:</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            {/* Secondary Text */}
                            <span className="text-zinc-600 dark:text-gray-400">ITEM</span>
                            <span className="text-zinc-600 dark:text-gray-400">TOTAL</span>
                        </div>

                        {/* Main Text */}
                        <div className="flex justify-between items-center text-zinc-900 dark:text-white">
                            <span>{packageInfo.name}</span>
                            <span>{packageInfo.price}</span>
                        </div>

                        {/* Totals */}
                        {/* Border color change */}
                        <div className="pt-4 border-t border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white">
                            <div className="flex justify-between items-center mb-2">
                                <span>Subtotal</span>
                                <span>£{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span>VAT (20%)</span>
                                <span>£{vat.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Grand Total</span>
                                <span>£{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/buy-credits')}
                        // Cancel Button Light/Dark mode classes
                        className="bg-white dark:bg-[#242526] text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-[#2d2e2f] border-zinc-200 dark:border-gray-700"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => navigate(`/checkout?package=${packageId}`, {
                            state: {
                                packageDetails,
                                total,
                                subtotal,
                                vat,
                                from: '/order-details'
                            }
                        })}
                        // Primary Button (Red accent is consistent)
                        className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 focus:ring-2"
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </Card>

    )
}

export default OrderDetails

