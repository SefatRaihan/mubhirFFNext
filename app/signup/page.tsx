'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-phone-number-input/style.css';
import Image from 'next/image';
import Cookies from 'js-cookie';
import apiClient from '@/lib/axios';
import type { SignupFormData, OtpGenerationResponse } from '@/types/auth';

// Lazy-load the heavy PhoneInput component (~100KB+ with country data)
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
    ssr: false,
    loading: () => (
        <input
            className="w-full px-4 py-2 text-right bg-white"
            placeholder="٠١١ ٢٣٤ ٥٦٧٨"
            disabled
        />
    ),
});

/**
 * Signup Page Component
 * 
 * Allows new users to register by providing their personal information.
 * Supports choosing between Qudurat (sat1) and Tahsili (sat2) track with free trial.
 * After successful registration, an OTP is sent to their phone for verification.
 */
export default function SignupPage() {
    const router = useRouter();

    // Exam track selection: 'sat1' = Qudurat, 'sat2' = Tahsili
    const [selectedExam, setSelectedExam] = useState<'sat1' | 'sat2'>('sat1');

    // Initialize selectedExam from cookie or URL params on mount
    useEffect(() => {
        const storedAudience = Cookies.get('trialAudience');
        if (storedAudience === 'sat2' || storedAudience === 'sat1') {
            setSelectedExam(storedAudience);
        } else if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('sat2') || urlParams.get('exam') === 'tahsili') {
                setSelectedExam('sat2');
                Cookies.set('trialAudience', 'sat2', { path: '/' });
            } else {
                Cookies.set('trialAudience', 'sat1', { path: '/' });
            }
        }
    }, []);

    // Form state - stores all user input
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        // Gender and DOB commented out - will be collected in checkout page
        // gender: 'male',
        // dateOfBirth: '',
    });

    // Loading state - shows when form is being submitted
    const [isLoading, setIsLoading] = useState(false);

    // Error state - stores error messages to display to user
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Handle input field changes
     * Updates form data when user types in any field or selects from dropdown
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(previousData => ({
            ...previousData,
            [name]: value,
        }));
    };

    /**
     * Handle exam track radio changes
     * Updates selected exam and syncs to trialAudience cookie
     */
    const handleExamChange = (exam: 'sat1' | 'sat2') => {
        setSelectedExam(exam);
        Cookies.set('trialAudience', exam, { path: '/' });
    };

    /**
     * Handle phone number changes
     * Updates phone number when user selects country or types number
     */
    const handlePhoneChange = (value: string | undefined) => {
        setFormData(previousData => ({
            ...previousData,
            phone: value || '',
        }));
    };

    /**
   * Handle form submission
   * Sends signup data to API and navigates to verification page
   */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload
        setErrorMessage(''); // Clear any previous errors
        setIsLoading(true); // Show loading state

        try {
            // Save form data and chosen exam to localStorage for use in verification page
            localStorage.setItem('signupData', JSON.stringify({
                ...formData,
                selectedExam,
            }));

            // Sync trialAudience cookie to ensure free trial activates for chosen track
            Cookies.set('trialAudience', selectedExam, { path: '/' });

            // Call API to generate OTP
            const response = await apiClient.post<OtpGenerationResponse>('/generateOtp', {
                mobile_no: formData.phone,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                date_of_birth: '', // DOB will be collected in checkout page
            });

            // Check if OTP was generated successfully (API returns 200 with message only)
            if (response.status === 200) {
                // Check if OTP is returned in response (for development/staging)
                if (response.data.otp) {
                    alert(`رمز التحقق هو: ${response.data.otp}`);
                    // console.log('OTP:', response.data.otp);
                }

                // Navigate to verification page (phone stored in localStorage)
                router.push('/verification-code');
            } else {
                // Show error message from API
                setErrorMessage(response.data.message || 'فشل في إرسال رمز التحقق');
            }
        } catch (error: any) {
            // Handle network or server errors
            // console.error('Signup error:', error);

            // Show user-friendly error message
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('حدث خطأ ما. الرجاء المحاولة مرة أخرى.');
            }
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };

    return (
        <div className="bg-white min-h-screen" dir="rtl">
            {/* DatePicker styles commented out - not needed without DOB field */}
            {/* <style jsx global>{`...`}</style> */}

            {/* Main Content Container */}
            <div
                className="text-black m-4 rounded-2xl bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/image/Vector.svg')",
                }}
            >
                <div className="mx-auto px-4 max-w-[550px] w-full p-8">
                    <div className="p-0 md:p-6 flex-1 flex flex-col">

                        {/* Logo and Heading Section */}
                        <div className="text-center mb-[40px]">
                            <div className="flex items-center justify-center gap-2">
                                <Image
                                    src="/image/mainLogo.png"
                                    alt="شعار مبهر"
                                    width={100}
                                    height={100}
                                    className="w-[100px] h-[100px]"
                                    priority
                                />
                                <h1 className="text-[66px] md:text-[88px] font-semibold text-[#28235B] tracking-[-0.07em]">
                                    مبهر
                                </h1>
                            </div>
                            <p className="text-[28px] md:text-4xl font-semibold tracking-[-1.5px] mt-4">
                                {selectedExam === 'sat2'
                                    ? 'سجل في دورة التحضير لاختبار تحصيلي'
                                    : 'سجل في دورة التحضير لاختبار قدرات'}
                            </p>
                            <p className="text-[16px] font-medium text-black tracking-[-0.5px] mt-[12px]">
                                احصل على فحصك المجاني الآن!
                            </p>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Exam Track Radio Selection */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium text-black">
                                    مسار التحضير (يشمل تجربة مجانية)*
                                </label>
                                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="مسار التحضير">
                                    {/* Qudurat Option */}
                                    <label
                                        htmlFor="exam-qudurat"
                                        className={`flex items-center justify-between px-3.5 py-2.5 bg-white border rounded cursor-pointer transition-all duration-200 select-none ${
                                            selectedExam === 'sat1'
                                                ? 'border-[#7A2060] ring-1 ring-[#7A2060] bg-[#fbf5fc]/40'
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <input
                                                type="radio"
                                                id="exam-qudurat"
                                                name="examType"
                                                value="sat1"
                                                checked={selectedExam === 'sat1'}
                                                onChange={() => handleExamChange('sat1')}
                                                className="w-4 h-4 text-[#7A2060] accent-[#7A2060] cursor-pointer"
                                            />
                                            <span className="font-semibold text-sm md:text-base text-black">
                                                قدرات
                                            </span>
                                        </div>
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                                            selectedExam === 'sat1'
                                                ? 'bg-[#7A2060]/10 text-[#7A2060]'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            ٣ أيام مجاناً
                                        </span>
                                    </label>

                                    {/* Tahsili Option */}
                                    <label
                                        htmlFor="exam-tahsili"
                                        className={`flex items-center justify-between px-3.5 py-2.5 bg-white border rounded cursor-pointer transition-all duration-200 select-none ${
                                            selectedExam === 'sat2'
                                                ? 'border-[#7A2060] ring-1 ring-[#7A2060] bg-[#fbf5fc]/40'
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <input
                                                type="radio"
                                                id="exam-tahsili"
                                                name="examType"
                                                value="sat2"
                                                checked={selectedExam === 'sat2'}
                                                onChange={() => handleExamChange('sat2')}
                                                className="w-4 h-4 text-[#7A2060] accent-[#7A2060] cursor-pointer"
                                            />
                                            <span className="font-semibold text-sm md:text-base text-black">
                                                تحصيلي
                                            </span>
                                        </div>
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                                            selectedExam === 'sat2'
                                                ? 'bg-[#7A2060]/10 text-[#7A2060]'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            ٣ أيام مجاناً
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* First Name and Last Name Row */}
                            <div className="flex gap-4 flex-col md:flex-row">
                                {/* First Name Field */}
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="mb-1 font-medium text-black"
                                    >
                                        الاسم الأول*
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="أحمد"
                                        required
                                        className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                    />
                                </div>

                                {/* Last Name Field */}
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="lastName"
                                        className="mb-1 font-medium text-black"
                                    >
                                        اسم العائلة*
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="جليل"
                                        required
                                        className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                    />
                                </div>
                            </div>

                            {/* Phone Number Field */}
                            <div className="flex flex-col">
                                <label htmlFor="phone" className="mb-1 font-medium text-black">
                                    الجوال*
                                </label>
                                <div className="flex bg-white border border-gray-300 rounded">
                                    <PhoneInput
                                        placeholder="٠١١ ٢٣٤ ٥٦٧٨"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        defaultCountry="SA"
                                        countries={['SA']}
                                        required
                                        className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-1 font-medium text-black">
                                    البريد الإلكتروني*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="example@email.com"
                                    required
                                    className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                />
                            </div>

                            {/* Information Text */}
                            <p className="text-base text-gray-500 text-center">
                                سنرسل إليك كلمة مرور لمرة واحدة (OTP) إلى رقم هاتفك للتحقق من حسابك.
                            </p>

                            {/* Error Message Display */}
                            {errorMessage && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-center">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#7A2060] text-white py-2 rounded-full font-semibold cursor-pointer hover:bg-[#5a1848] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'جاري التسجيل...' : 'التسجيل'}
                            </button>

                            {/* Login Button */}
                            <button
                                type="button"
                                onClick={() => router.push('/login')}
                                className="w-full border border-[#7A2060] text-[#7A2060] py-2 rounded-full font-semibold cursor-pointer hover:bg-[#7A2060] hover:text-white transition-colors"
                            >
                                تسجيل الدخول
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
