'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { CheckoutFormData } from '@/types/auth';

/**
 * Checkout Page Component
 * 
 * Handles both free trial and paid package checkout flows.
 * Pre-fills email and phone from signup (read-only).
 * Collects DOB, gender, and school grade.
 * Disables coupon for trial users.
 * 
 * UPDATED: Now uses /cms/tap/pay for both free trial and paid flows
 */
export default function CheckoutPage() {
    const router = useRouter();


    // State
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<CheckoutFormData>({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postCode: '',
        dateOfBirth: '',
        gender: '',
        secondarySchoolGrade: '',
    });
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountId, setDiscountId] = useState<number | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [fromTrial, setFromTrial] = useState(false);
    const [dateOfBirthDate, setDateOfBirthDate] = useState<Date | null>(null);
    const [autoRenew, setAutoRenew] = useState(false); // Auto-renew subscription checkbox
    const [isTrial, setIsTrial] = useState(false); // Backend is_trial: 0 = can get trial, 1 = used trial
    const [hasStudentProfile, setHasStudentProfile] = useState(false); // If user already filled profile info

    /**
     * Load user data and selected plan
     */
    useEffect(() => {
        const loadData = async () => {
            // Check authentication
            const token = Cookies.get('token');
            if (!token) {
                router.push('/login');
                return;
            }

            // Get selected plan from cookie
            const planCookie = Cookies.get('selectedPlan');
            if (planCookie) {
                try {
                    const plan = JSON.parse(planCookie);
                    setSelectedPlan(plan);
                } catch (e) {
                    console.error('Failed to parse selected plan:', e);
                }
            }

            // Check if this is a trial flow
            const trialCookie = Cookies.get('fromTrial');
            setFromTrial(trialCookie === 'true');

            // Fetch user data from API
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cms/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const userData = await response.json();
                    // Check if student profile is already filled (from previous checkout)
                    const hasGender = userData.gender && userData.gender.trim() !== '';
                    const hasDOB = userData.date_of_birth && userData.date_of_birth.trim() !== '';
                    const hasGrade = userData.grade && userData.grade.trim() !== '';
                    const profileComplete = hasGender && hasDOB && hasGrade;
                    setHasStudentProfile(profileComplete);

                    setFormData(prev => ({
                        ...prev,
                        email: userData.email || '',
                        phone: userData.phone || '',
                        firstName: userData.first_name || '',
                        lastName: userData.last_name || '',
                        address: userData.address || '',
                        city: userData.city || '',
                        postCode: userData.post_code || '',
                        // Pre-fill student profile if exists
                        gender: userData.gender || '',
                        dateOfBirth: userData.date_of_birth || '',
                        secondarySchoolGrade: userData.grade || '',
                    }));

                    // Parse and set date of birth for DatePicker if exists
                    if (userData.date_of_birth) {
                        console.log('[CHECKOUT] Parsing DOB:', userData.date_of_birth);
                        let dob: Date | null = null;

                        // Try format: dd/MM/yyyy (e.g., "15/03/2000")
                        if (userData.date_of_birth.includes('/')) {
                            const parts = userData.date_of_birth.split('/');
                            if (parts.length === 3) {
                                dob = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                            }
                        }
                        // Try format: yyyy-MM-dd (e.g., "2000-03-15")
                        else if (userData.date_of_birth.includes('-')) {
                            const parts = userData.date_of_birth.split('-');
                            if (parts.length === 3) {
                                // Check if first part is year (4 digits) or day
                                if (parts[0].length === 4) {
                                    dob = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                                } else {
                                    // Format: dd-MM-yyyy
                                    dob = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                                }
                            }
                        }
                        // Try parsing as ISO string
                        else {
                            dob = new Date(userData.date_of_birth);
                        }

                        if (dob && !isNaN(dob.getTime())) {
                            console.log('[CHECKOUT] Parsed DOB successfully:', dob);
                            setDateOfBirthDate(dob);
                        } else {
                            console.log('[CHECKOUT] Could not parse DOB');
                        }
                    }

                    // Set is_trial from user data: 0 = can get trial, 1 = used trial
                    setIsTrial(userData.is_trial === 1 || userData.is_trial === true);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [router]);

    /**
     * Set page title
     */
    useEffect(() => {
        document.title = 'مبهر - إتمام الدفع';
    }, []);

    /**
     * Handle input change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Handle date change
     */
    const handleDateChange = (date: Date | null) => {
        setDateOfBirthDate(date);
        if (date) {
            // Format as DD/MM/YYYY to match backend expectation
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formatted = `${day}/${month}/${year}`;
            setFormData(prev => ({ ...prev, dateOfBirth: formatted }));
        }
    };

    /**
     * Apply coupon code
     */
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error('الرجاء إدخال رمز القسيمة', { position: 'top-right', autoClose: 2000 });
            return;
        }

        if (!selectedPlan?.id) {
            toast.error('الرجاء اختيار باقة أولاً', { position: 'top-right', autoClose: 2000 });
            return;
        }

        try {
            const token = Cookies.get('token');

            // Log input values
            // console.log('🎟️ Applying Coupon:');
            // console.log('  - Coupon Code:', couponCode.trim());
            // console.log('  - Package ID:', selectedPlan.id);
            // console.log('  - Package Title:', selectedPlan.title_ar || selectedPlan.title_en);

            // Prepare form data
            const formData = new FormData();
            formData.append('discount_code', couponCode.trim());
            formData.append('package_id', selectedPlan.id.toString());

            // console.log('📤 Sending request to:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/cms/apply-discount`);

            // Call apply-discount API
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/cms/apply-discount`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // console.log('📥 API Response:', response.data);

            // Check if API returned discount amount
            // Response structure: {success: true, data: {discount_id: 3, discount_amount: 22.35, ...}}
            if (response.data?.success && response.data?.data?.discount_amount) {
                const discountData = response.data.data;
                // console.log('✅ Discount applied successfully!');
                // console.log('  - Discount ID:', discountData.discount_id);
                // console.log('  - Discount Code:', discountData.discount_code);
                // console.log('  - Discount Type:', discountData.discount_type);
                // console.log('  - Discount Value:', discountData.discount_value);
                // console.log('  - Discount Amount:', discountData.discount_amount, 'SAR');
                // console.log('  - Final Amount:', discountData.final_amount, 'SAR');

                setDiscount(Number(discountData.discount_amount));
                setDiscountId(discountData.discount_id || null);
                toast.success('تم تطبيق القسيمة بنجاح!', { position: 'top-right', autoClose: 2000 });
            } else if (response.data?.discount) {
                // Fallback for different response format
                // console.log('✅ Discount applied:', response.data.discount, 'SAR');
                setDiscount(Number(response.data.discount));
                setDiscountId(response.data.discount_id || null);
                toast.success('تم تطبيق القسيمة بنجاح!', { position: 'top-right', autoClose: 2000 });
            } else if (response.data?.discount_amount) {
                // Another fallback
                // console.log('✅ Discount applied:', response.data.discount_amount, 'SAR');
                setDiscount(Number(response.data.discount_amount));
                setDiscountId(response.data.discount_id || null);
                toast.success('تم تطبيق القسيمة بنجاح!', { position: 'top-right', autoClose: 2000 });
            } else {
                // console.log('⚠️ No discount amount in response, but request succeeded');
                // console.log('Response data:', response.data);
                toast.success('تم تطبيق القسيمة بنجاح!', { position: 'top-right', autoClose: 2000 });
            }
        } catch (error: any) {
            console.error('❌ Coupon application error:', error);
            console.error('Error response:', error.response?.data);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || 'رمز القسيمة غير صالح';
            toast.error(errorMessage, { position: 'top-right', autoClose: 2000 });
        }
    };

    /**
     * Handle form submission
     * UPDATED: Always uses /cms/tap/pay API for both free trial and paid flows
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/login');
                return;
            }

            // Calculate is_auto_subscribe and is_only_free based on 3 scenarios:
            // Scenario 1: Auto-pay ON + is_trial=0 → is_auto_subscribe=1, is_only_free=0
            // Scenario 2: Auto-pay OFF + is_trial=0 → is_auto_subscribe=0, is_only_free=1
            // Scenario 3: is_trial=1 (used trial) → is_auto_subscribe=0, is_only_free=0
            let isAutoSubscribe: number;
            let isOnlyFree: number;

            if (!isTrial && autoRenew) {
                // Scenario 1: User can get trial + wants auto-subscribe
                isAutoSubscribe = 1;
                isOnlyFree = 0;
            } else if (!isTrial && !autoRenew) {
                // Scenario 2: User can get trial + does NOT want auto-subscribe
                isAutoSubscribe = 0;
                isOnlyFree = 1;
            } else {
                // Scenario 3: User already used trial - payment required
                isAutoSubscribe = 0;
                isOnlyFree = 0;
            }

            // Save order data to localStorage for confirmation page
            const orderData = {
                fromTrial,
                selectedPlan,
                discount,
                autoRenew,
                isTrial, // Backend is_trial value
                isAutoSubscribe, // For callback API
                isOnlyFree, // For callback API
                ...formData,
            };
            localStorage.setItem('checkoutData', JSON.stringify(orderData));

            // Prepare form data for /cms/tap/pay API
            const payload = new FormData();
            payload.append('package_id', selectedPlan?.id || '0');

            // Calculate final amount (apply discount if any)
            const originalPrice = selectedPlan?.price || 0;
            const finalAmount = Math.max(0, Number(originalPrice) - discount).toFixed(2);

            /**
             * Payment logic based on backend is_trial field:
             * 
             * is_trial = 0 (false): User CAN get free trial (hasn't used it)
             * is_trial = 1 (true): User has USED the free trial
             * 
             * Scenarios:
             * 1. Auto-pay ON + is_trial == false (0): is_auto_subscribe = 1, NO amount
             * 2. Auto-pay OFF + is_trial == false (0): is_auto_subscribe = 0, NO amount
             * 3. is_trial == true (1): Amount must be sent
             */
            if (!isTrial) {
                // User can get free trial - NO amount sent regardless of autoRenew
                payload.append('is_auto_subscribe', autoRenew ? '1' : '0');
                // No amount appended - user gets free trial
            } else {
                // User already used trial - MUST send amount
                payload.append('is_auto_subscribe', '0');
                payload.append('amount', finalAmount);
            }

            payload.append('first_name', formData.firstName);
            payload.append('last_name', formData.lastName);
            payload.append('email', formData.email);
            payload.append('phone', formData.phone);
            payload.append('date_of_birth', formData.dateOfBirth);
            payload.append('gender', formData.gender);
            payload.append('grade', formData.secondarySchoolGrade);
            payload.append('endpoint', 'confirmation');

            // Add discount information if coupon was applied
            if (discountId !== null && discount > 0) {
                payload.append('discount_id', discountId.toString());
                payload.append('discount_amount', discount.toString());
            }

            // 🔍 Enhanced Debug Console for Checkout Payment
            console.group('%c💳 CHECKOUT PAYMENT DEBUG', 'color: #7A2060; font-size: 16px; font-weight: bold;');

            // Scenario Detection
            const scenarioNumber = !isTrial ? (autoRenew ? 1 : 2) : 3;
            const scenarioDesc = {
                1: 'Auto-pay ON + is_trial=0 → FREE TRIAL (No Amount)',
                2: 'Auto-pay OFF + is_trial=0 → FREE TRIAL (No Amount)',
                3: 'is_trial=1 → PAYMENT REQUIRED (Amount Sent)'
            };

            console.log('%c📋 ACTIVE SCENARIO: #' + scenarioNumber, 'color: #28235B; font-size: 14px; font-weight: bold;');
            console.log('%c' + scenarioDesc[scenarioNumber as keyof typeof scenarioDesc], 'color: #671E5A; font-style: italic;');

            console.group('%c🔑 Key Variables', 'color: #2563eb; font-weight: bold;');
            console.table({
                'is_trial (Backend)': { value: isTrial, meaning: isTrial ? '1 = User USED free trial' : '0 = User CAN get trial' },
                'autoRenew (Checkbox)': { value: autoRenew, meaning: autoRenew ? 'User wants auto-subscribe' : 'User does NOT want auto-subscribe' },
                'fromTrial (Cookie)': { value: fromTrial, meaning: fromTrial ? 'Came from trial flow' : 'Came from paid flow' }
            });
            console.groupEnd();

            console.group('%c📤 API Payload Sent', 'color: #16a34a; font-weight: bold;');
            const apiPayload: Record<string, any> = {
                'package_id': selectedPlan?.id || '0',
                'is_auto_subscribe': !isTrial ? (autoRenew ? '1' : '0') : '0',
                'first_name': formData.firstName,
                'last_name': formData.lastName,
                'email': formData.email,
                'phone': formData.phone,
                'date_of_birth': formData.dateOfBirth,
                'gender': formData.gender,
                'grade': formData.secondarySchoolGrade,
                'endpoint': 'confirmation'
            };

            // Add amount only if isTrial is true
            if (isTrial) {
                apiPayload['amount'] = finalAmount + ' SAR';
            } else {
                apiPayload['amount'] = '❌ NOT SENT (Free Trial)';
            }

            // Add discount if applied
            if (discountId !== null && discount > 0) {
                apiPayload['discount_id'] = discountId;
                apiPayload['discount_amount'] = discount + ' SAR';
            }
            console.table(apiPayload);
            console.groupEnd();

            console.group('%c💵 Price Calculation', 'color: #ea580c; font-weight: bold;');
            console.table({
                'Original Price': originalPrice + ' SAR',
                'Discount Applied': discount > 0 ? '-' + discount + ' SAR' : 'None',
                'Final Amount': !isTrial ? '0 SAR (Free Trial)' : finalAmount + ' SAR',
                'Payment Required': isTrial ? '✅ YES' : '❌ NO'
            });
            console.groupEnd();

            console.groupEnd(); // End main group

            // Call /cms/tap/pay API for both free trial and paid flows
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cms/tap/pay`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: payload,
            });

            const data = await response.json();

            if (!response.ok) {
                // Show detailed error message from API
                const errorMsg = data.errors
                    ? Object.entries(data.errors).map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`).join('\n')
                    : data.message || 'فشل إنشاء الدفع';

                console.error('API Error Response:', data);
                alert(`خطأ في الدفع:\n${errorMsg}`);
                setSubmitting(false);
                return;
            }

            // Check response type:
            // - If free trial activated: {message: "Free trail activated.", status: true}
            // - If payment required: {charge: {data: {transaction: {url: "..."}}}}

            if (data.message === 'Free trail activated.' && data.status === true) {
                // Free trial was activated - redirect to confirmation page
                router.push('/confirmation');
            } else if (data.charge?.data?.transaction?.url) {
                // Payment required - redirect to payment gateway
                window.location.href = data.charge.data.transaction.url;
            } else {
                // Unexpected response format
                console.error('Unexpected response format:', data);
                alert('حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.');
                setSubmitting(false);
            }

        } catch (error) {
            console.error('Checkout error:', error);
            alert('حدث خطأ. حاول مرة أخرى لاحقًا.');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">جاري التحميل...</p>
            </div>
        );
    }

    const packagePrice = selectedPlan?.price || selectedPlan?.price_numeric || 99;
    const packageTitle = selectedPlan?.title_ar || selectedPlan?.title_en || 'الباقة المختارة';
    const pricingTerms = selectedPlan?.pricing_terms_ar || 'شهريًا';

    return (
        <div className="bg-white min-h-screen" dir="rtl">
            {/* Toast Notification Container */}
            <ToastContainer rtl={true} />

            {/* Custom styles for react-datepicker */}
            <style jsx global>{`
                .custom-datepicker {
                    width: 100%;
                    background-color: white;
                    border: 1px solid #d1d5db;
                    border-radius: 0.25rem;
                    padding: 0.5rem 1rem;
                    text-align: right;
                    font-size: 1rem;
                    cursor: pointer;
                    height: 38px;
                    box-sizing: border-box;
                }
                
                .custom-datepicker:focus {
                    outline: none;
                    border: 2px solid #7a2060;
                    box-shadow: 0 0 0 1px #7a2060;
                }
                
                .react-datepicker {
                    font-family: inherit;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .react-datepicker__header {
                    background-color: #7a2060;
                    border-bottom: none;
                    border-radius: 0.5rem 0.5rem 0 0;
                    padding-top: 0.75rem;
                }
                
                .react-datepicker__current-month,
                .react-datepicker__day-name {
                    color: white;
                }
                
                /* Year and Month dropdown text color */
                .react-datepicker__year-select,
                .react-datepicker__month-select {
                    background-color: white;
                    color: #7a2060;
                    font-weight: 600;
                    border: 1px solid #7a2060;
                    border-radius: 0.25rem;
                    padding: 0.25rem;
                    cursor: pointer;
                }
                
                .react-datepicker__year-select option,
                .react-datepicker__month-select option {
                    color: #1f2937;
                }
                
                .react-datepicker__day--selected,
                .react-datepicker__day--keyboard-selected {
                    background-color: #7a2060;
                    color: white;
                }
                
                .react-datepicker__day:hover {
                    background-color: #f3e8f0;
                }
                
                .react-datepicker__day--disabled {
                    color: #d1d5db;
                }
            `}</style>

            {/* Main Container */}
            <div className="max-w-6xl mx-auto py-8">

                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Image
                            src="/image/mainLogo.png"
                            alt="شعار مبهر"
                            width={80}
                            height={80}
                            className="w-20 h-20"
                        />
                        <h1 className="text-5xl font-bold text-[#28235B] mr-2">مبهر</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-black">الدفع</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Form Fields */}
                    <div className="flex-1 space-y-6">

                        {/* Contact Information */}
                        <section>
                            <h3 className="text-xl font-bold text-black mb-4"> معلومات الاتصال </h3>

                            <div className="space-y-4">
                                {/* Email (Read-only) */}
                                <div>
                                    <label htmlFor="email" className="block mb-1 font-medium text-black">
                                        بريد إلكتروني*
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-600 cursor-not-allowed"
                                    />
                                </div>

                                {/* Phone (Read-only) */}
                                <div>
                                    <label htmlFor="phone" className="block mb-1 font-medium text-black">
                                        هاتف*
                                    </label>
                                    <div className="bg-gray-100 border border-gray-300 rounded px-4 py-2">
                                        <PhoneInput
                                            value={formData.phone}
                                            onChange={() => { }} // No-op since field is disabled
                                            disabled
                                            defaultCountry="SA"
                                            className="w-full text-gray-600 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Billing Information */}
                        <section>
                            {/* <h3 className="text-xl font-bold text-black mb-4">معلومات الفواتير</h3> */}

                            <div className="space-y-4">
                                {/* First Name & Last Name */}
                                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block mb-1 font-medium text-black">
                                            الاسم الأول*
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A2060]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-1 font-medium text-black">
                                            اسم العائلة*
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A2060]"
                                        />
                                    </div>
                                </div> */}

                                {/* Address */}
                                {/* <div>
                                    <label htmlFor="address" className="block mb-1 font-medium text-black">
                                        عنوان*
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A2060]"
                                    />
                                </div> */}

                                {/* City & Post Code */}
                                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block mb-1 font-medium text-black">
                                            مدينة*
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A2060]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="postCode" className="block mb-1 font-medium text-black">
                                            شفرة البريد*
                                        </label>
                                        <input
                                            type="text"
                                            id="postCode"
                                            name="postCode"
                                            value={formData.postCode}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A2060]"
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </section>

                        {/* Student Profile Information - Show for all, disabled if already filled */}
                        <section>
                            <h3 className="text-xl font-bold text-black mb-4">معلومات الملف الشخصي للطالب</h3>

                            <div className="space-y-4">
                                {/* Gender & Date of Birth */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="gender" className="block mb-1 font-medium text-black">
                                            جنس{!hasStudentProfile && '*'}
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required={!hasStudentProfile}
                                            disabled={hasStudentProfile}
                                            className={`w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A2060] ${hasStudentProfile ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white'}`}
                                        >
                                            <option value="">اختر الجنس</option>
                                            <option value="male">ذكر</option>
                                            <option value="female">أنثى</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="dateOfBirth" className="block mb-1 font-medium text-black">
                                            تاريخ الميلاد{!hasStudentProfile && '*'}
                                        </label>
                                        <DatePicker
                                            selected={dateOfBirthDate}
                                            onChange={handleDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            maxDate={new Date()}
                                            minDate={new Date('1920-01-01')}
                                            placeholderText="اختر تاريخ الميلاد"
                                            required={!hasStudentProfile}
                                            disabled={hasStudentProfile}
                                            showYearDropdown
                                            showMonthDropdown
                                            dropdownMode="select"
                                            className={hasStudentProfile ? 'custom-datepicker disabled-datepicker' : 'custom-datepicker'}
                                        />
                                    </div>
                                </div>

                                {/* Secondary School Grade */}
                                <div>
                                    <label htmlFor="secondarySchoolGrade" className="block mb-1 font-medium text-black">
                                        المرحلة الثانوية{!hasStudentProfile && '*'}
                                    </label>
                                    <select
                                        id="secondarySchoolGrade"
                                        name="secondarySchoolGrade"
                                        value={formData.secondarySchoolGrade}
                                        onChange={handleChange}
                                        required={!hasStudentProfile}
                                        disabled={hasStudentProfile}
                                        className={`w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A2060] ${hasStudentProfile ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-white'}`}
                                    >
                                        <option value="">حدد الدرجة</option>
                                        <option value="اول ثانوي">اول ثانوي</option>
                                        <option value="ثاني ثانوي">ثاني ثانوي</option>
                                        <option value="ثالث ثانوي">ثالث ثانوي</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Coupon & Summary */}
                    <div className="w-full lg:w-96 space-y-6">

                        {/* Coupon Code */}
                        <section className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-black mb-2">رمز القسيمة</h3>
                            <p className="text-sm text-gray-600 mb-4">أدخل الرمز</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="flex-1 bg-white border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-[#7A2060]"
                                />
                                <button
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    className="px-6 py-2 border border-[#7A2060] text-[#7A2060] rounded-full hover:bg-[#7A2060] hover:text-white transition"
                                >
                                    تطبيق الكود
                                </button>
                            </div>
                        </section>

                        {/* Order Summary */}
                        <section>
                            <h3 className="text-lg font-bold text-black mb-4">ملخص الطلب</h3>



                            {/* Summary Box */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                {/* Package Name - Outside Box */}
                                <p className="font-semibold text-black mb-3">{packageTitle}</p>
                                <div className="space-y-3">
                                    {fromTrial ? (
                                        /* Free Trial Layout */
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">تجربة لمدة ٣ أيام</span>
                                                <span className="font-semibold">0.00 ريال سعودي</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">بعد فترة تجربة لمدة ٣ أيام</span>
                                                <span className="font-semibold">{Number(packagePrice).toFixed(2)} ريال سعودي*</span>
                                            </div>
                                            {/* Referral Discount for Trial (if coupon applied) */}
                                            {discount > 0 && (
                                                <div className="flex justify-between items-center text-green-600">
                                                    <span>خصم الإحالة</span>
                                                    <span>-{discount.toFixed(2)} ريال سعودي</span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        /* Paid Package Layout */
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Total</span>
                                                <span className="font-semibold">{Number(packagePrice).toFixed(2)} ريال سعودي</span>
                                            </div>

                                            {/* Referral Discount (if coupon applied) */}
                                            {discount > 0 && (
                                                <div className="flex justify-between items-center text-green-600">
                                                    <span>خصم الإحالة</span>
                                                    <span>-{discount.toFixed(2)} ريال سعودي</span>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Divider */}
                                    <div className="border-t border-gray-200 my-4"></div>

                                    {/* Order Total */}
                                    <div className="flex justify-between items-center font-semibold text-[16px]">
                                        <span>{fromTrial ? `إجمالي المبلغ المستحق الآن (1)` : `إجمالي الطلب (1)`}</span>
                                        <span>{fromTrial ? '0.00' : (Number(packagePrice) - discount).toFixed(2)} ريال سعودي</span>
                                    </div>

                                    {/* After Trial Total (if trial and discount applied) */}
                                    {fromTrial && discount > 0 && (
                                        <div className="flex justify-between items-center font-semibold text-[16px] text-green-600">
                                            <span>المبلغ بعد التجربة (مع الخصم)</span>
                                            <span>{(Number(packagePrice) - discount).toFixed(2)} ريال سعودي</span>
                                        </div>
                                    )}

                                    {/* Note */}
                                    <p className="text-xs text-gray-500 mt-4">
                                        {fromTrial
                                            ? '*يتطلب الوصول الكامل المستمر خطة تحضير امتحان مدفوعة'
                                            : `*قد يتم خصم ${(Number(packagePrice) - discount).toFixed(2)} ريال سعودي تلقائيًا بعد ${pricingTerms}`}
                                    </p>
                                </div>
                            </div>

                            {/* Auto-Renew Checkbox - Only for Free Trial Users */}
                            {fromTrial && (
                                <div className="mt-6">
                                    <label className="flex justify-start gap-2 cursor-pointer border-2 border-[#671E5A] rounded-lg p-4 hover:bg-gray-50 transition bg-[#FEF6FD]">
                                        <input
                                            type="checkbox"
                                            checked={autoRenew}
                                            onChange={(e) => setAutoRenew(e.target.checked)}
                                            className="w-5 h-5 border-gray-300 rounded focus:ring-[#671E5A] cursor-pointer"
                                            style={{ accentColor: '#671E5A' }}
                                        />
                                        <span className="text-black font-medium">
                                            الاشتراك التلقائي بعد انتهاء الفترة التجريبية
                                        </span>
                                    </label>
                                </div>
                            )}


                            {/* Buttons */}
                            <div className="space-y-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-[#7A2060] text-white py-3 rounded-full font-semibold hover:bg-[#5a1848] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'جاري المعالجة...' : 'عملية شراء كاملة'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push('/packages')}
                                    className="w-full border border-[#7A2060] text-[#7A2060] py-3 rounded-full font-semibold hover:bg-[#FFF5FC] transition"
                                >
                                    تغيير الباقة
                                </button>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    );
}