'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';

/**
 * Confirmation Page Content Component
 * Contains the logic that uses useSearchParams
 */
function ConfirmationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [orderData, setOrderData] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);


    /**
     * Utility function to check if response indicates success
     */
    const looksSuccessful = (data: any) => {
        if (!data || typeof data !== 'object') return false;
        const msg = typeof data.message === 'string' ? data.message.toLowerCase() : '';
        return (
            data.ok === true ||
            data.ok === 'true' ||
            data.status === true ||
            data.status === 'success' ||
            msg.includes('success')
        );
    };

    /**
     * Verify payment and load data
     */
    useEffect(() => {
        const verifyAndLoad = async () => {
            const tapId = searchParams.get('tap_id');
            const token = Cookies.get('token');

            if (!token) {
                router.push('/login');
                return;
            }

            try {
                // If tap_id exists, verify payment
                if (tapId) {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cms/tap/callback?tap_id=${tapId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    const data = await response.json();

                    if (response.ok && looksSuccessful(data)) {
                        setSuccess(true);
                        setApiMessage(data.message || 'Payment successful.');
                        // Clean URL
                        window.history.replaceState({}, document.title, '/confirmation');
                    } else {
                        setSuccess(false);
                        setApiMessage(data.message || 'Payment verification failed.');
                        setLoading(false);
                        return;
                    }
                } else {
                    // No tap_id means free trial or already verified
                    setSuccess(true);
                    setApiMessage('Your Subscription has been Activated!');
                }

                // Load order data from localStorage
                const savedOrderData = localStorage.getItem('checkoutData');
                if (savedOrderData) {
                    setOrderData(JSON.parse(savedOrderData));
                }

                // Fetch user data
                const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cms/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (userResponse.ok) {
                    const user = await userResponse.json();
                    setUserData(user);
                }

            } catch (error) {
                console.error('Error verifying payment:', error);
                setApiMessage('An error occurred. Please try again.');
                setSuccess(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAndLoad();
    }, [searchParams, router]);

    /**
     * Set page title
     */
    useEffect(() => {
        document.title = 'مبهر - تأكيد';
    }, []);

    /**
     * Handle redirect to platform
     */
    const handleGoToMubhir = () => {
        const redirectUrl = Cookies.get('redirect_url');
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            router.push('/');
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white">
                <div className="h-12 w-12 border-4 border-gray-200 border-t-[#7a2060] rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-semibold text-black">جاري التحقق من الدفع الخاص بك...</p>
            </div>
        );
    }

    // Failure state
    if (!success) {
        return (
            <div className="bg-white min-h-screen" dir="rtl">
                <div
                    className="text-black m-4 rounded-2xl bg-no-repeat bg-cover"
                    style={{ backgroundImage: "url('/image/Vector.svg')" }}
                >
                    <div className="mx-auto px-4 max-w-5xl w-full p-8">
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center mb-6">
                                <Image
                                    src="/image/mainLogo.png"
                                    alt="Mubhir Logo"
                                    width={100}
                                    height={100}
                                    className="w-[100px] h-[100px]"
                                />
                                <h1 className="text-[66px] md:text-[88px] font-semibold text-[#28235B] tracking-[-0.07em]">
                                    مبهر
                                </h1>
                            </div>
                            <h1 className="text-[28px] md:text-4xl font-semibold tracking-[-1.5px] text-red-600">
                                {apiMessage}
                            </h1>
                        </div>

                        <div className="w-full md:w-[450px] mx-auto">
                            <button
                                type="button"
                                onClick={() => router.push('/packages')}
                                className="mt-6 w-full bg-[#7a2060] text-white py-2 rounded-full hover:bg-[#5a1848] transition-colors"
                            >
                                حاول ثانية
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Extract order details
    const isTrial = orderData?.fromTrial || false;
    const packageTitle = orderData?.selectedPlan?.title_ar || orderData?.selectedPlan?.title_en || 'SAT I - Monthly';
    const packagePrice = orderData?.selectedPlan?.price || orderData?.selectedPlan?.price_numeric || 99;
    const discount = orderData?.discount || 0;
    const couponApplied = discount > 0;

    return (
        <div className="bg-white min-h-screen" dir='rtl'>
            <div
                className="text-black m-4 rounded-2xl bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/image/Vector.svg')" }}
            >
                <div className="mx-auto px-4 max-w-3xl w-full p-8">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center mb-6">
                            <Image
                                src="/image/mainLogo.png"
                                alt="Mubhir Logo"
                                width={100}
                                height={100}
                                className="w-[100px] h-[100px]"
                            />
                            <h1 className="text-[66px] md:text-[88px] font-semibold text-[#28235B] tracking-[-0.07em]">
                                مبهر
                            </h1>
                        </div>
                        <h2 className="text-[28px] md:text-4xl font-semibold tracking-[-1.5px]">
                            تم تفعيل اشتراكك!
                        </h2>
                    </div>

                    {/* Order Summary Box */}
                    <div className="bg-[#F9FAFB] rounded-3xl  border border-[#EAECF0] p-6 mb-6">
                        {/* Package Title */}
                        <h3 className="text-lg font-semibold text-black mb-4">{packageTitle}</h3>

                        <div className="space-y-3">
                            {isTrial ? (
                                // Free Trial Layout
                                <>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">تجربة لمدة 5 أيام</span>
                                        <span className="font-semibold">0.00 ريال سعودي</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">بعد فترة تجريبية مدتها 5 أيام</span>
                                        <span className="font-semibold">{Number(packagePrice).toFixed(2)} ريال سعودي*</span>
                                    </div>
                                </>
                            ) : (
                                // Paid Subscription Layout
                                <>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Total</span>
                                        <span className="font-semibold">{Number(packagePrice).toFixed(2)} ريال سعودي</span>
                                    </div>

                                    {/* Referral Discount (only if coupon applied) */}
                                    {couponApplied && (
                                        <div className="flex justify-between items-center text-green-600">
                                            <span>Referral Discount</span>
                                            <span>-SAR {discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Order Total */}
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>إجمالي المبلغ المستحق الآن (1)</span>
                                <span>{isTrial ? '0.00' : (Number(packagePrice) - discount).toFixed(2)} ريال سعودي</span>
                            </div>

                            {/* Note */}
                            <p className="text-xs text-gray-500 mt-4">
                                {isTrial
                                    ? '*يتطلب الوصول الكامل المستمر خطة تحضير امتحان مدفوعة'
                                    : `*May be charged SAR ${(Number(packagePrice) - discount).toFixed(2)} automatically after subscription period`}
                            </p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-[#F9FAFB] rounded-3xl border border-[#EAECF0] p-6 mb-6">
                        <h3 className="text-lg font-semibold text-black mb-3">معلومات الاتصال</h3>
                        <div className="space-y-1 text-gray-700">
                            <p>{userData?.email || orderData?.email || 'N/A'}</p>
                            <p>{userData?.phone || orderData?.phone || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="bg-[#F9FAFB] rounded-3xl border border-[#EAECF0] p-6 mb-6">
                        <h3 className="text-lg font-semibold text-black mb-3">معلومات الفواتير</h3>
                        <div className="space-y-1 text-gray-700">
                            <p>{userData?.first_name || orderData?.firstName} {userData?.last_name || orderData?.lastName}</p>
                            <p>{userData?.city || orderData?.city || 'N/A'} - {userData?.post_code || orderData?.postCode || 'N/A'}, Saudi Arabia</p>
                            <p>{userData?.address || orderData?.address || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Student Profile Information */}
                    <div className="bg-[#F9FAFB] rounded-3xl border border-[#EAECF0] p-6 mb-6">
                        <h3 className="text-lg font-semibold text-black mb-3">معلومات الملف الشخصي للطالب</h3>
                        <div className="space-y-1 text-gray-700">
                            <p>الجنس: {userData?.gender || orderData?.gender || 'Male'}</p>
                            <p>تاريخ الميلاد:  {userData?.date_of_birth || orderData?.dateOfBirth || 'N/A'}</p>
                            <p>المرحلة الثانوية: {userData?.secondary_school_grade || orderData?.secondarySchoolGrade || '11th Grade'}</p>
                        </div>
                    </div>

                    {/* Go to Mubhir Button */}
                    <button
                        type="button"
                        onClick={handleGoToMubhir}
                        className="w-full bg-[#7a2060] text-white py-3 rounded-full font-semibold hover:bg-[#5a1848] transition-colors"
                    >
                        اذهب إلى مبهير
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * Confirmation Page Wrapper
 * Wraps the content in Suspense boundary for useSearchParams
 */
export default function ConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center h-screen bg-white">
                <div className="h-12 w-12 border-4 border-gray-200 border-t-[#7a2060] rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-semibold text-black">جاري التحميل...</p>
            </div>
        }>
            <ConfirmationContent />
        </Suspense>
    );
}
