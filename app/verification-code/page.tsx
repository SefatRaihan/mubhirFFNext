'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import apiClient from '@/lib/axios';
import type { SignupFormData } from '@/types/auth';

/**
 * OTP Verification Response Type
 */
interface OtpVerificationResponse {
    success: boolean;
    message: string;
}

/**
 * Register Verify User Response Type
 */
interface RegisterVerifyResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

/**
 * Register Verify User Payload
 */
interface RegisterVerifyPayload {
    mobile_no: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
}

/**
 * Verification Code Page Component
 * 
 * Allows users to verify their phone number by entering the OTP code
 * sent during signup. After successful verification, registers the user
 * and navigates to password creation page.
 */
export default function VerificationCodePage() {
    const router = useRouter();

    // Get phone number from localStorage
    const getPhoneFromStorage = () => {
        if (typeof window === 'undefined') return 'Your phone';
        const stored = localStorage.getItem('signupData');
        if (!stored) return 'Your phone';
        const data = JSON.parse(stored);
        return data.phone || 'Your phone';
    };

    const phone = getPhoneFromStorage();

    // OTP state - 4 digit code
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);

    // Timer state - 2 minutes countdown
    const [timeLeft, setTimeLeft] = useState(120);

    // Loading state
    const [loading, setLoading] = useState(false);

    /**
     * Countdown Timer Effect
     * Decrements timeLeft every second until it reaches 0
     */
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    /**
     * Get Signup Data from localStorage
     */
    const getSignupData = (): SignupFormData | null => {
        if (typeof window === 'undefined') return null;

        const stored = localStorage.getItem('signupData');
        return stored ? JSON.parse(stored) : null;
    };

    /**
     * Build Register Verify Payload
     * Transforms SignupFormData to API-expected format
     * Note: DOB is collected in checkout, not during signup
     */
    const buildRegisterVerifyPayload = (userData: SignupFormData): RegisterVerifyPayload => {
        return {
            mobile_no: userData.phone,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email || '', // Email from signup form
            phone: userData.phone,
            date_of_birth: '2000-01-01', // Placeholder - actual DOB collected in checkout
        };
    };

    /**
     * Handle OTP Input Change
     * Manages single digit input and auto-focus to next field
     */
    const handleChange = (value: string, index: number) => {
        // Only allow digits
        if (!/^\d*$/.test(value)) return;

        // Get last digit entered
        const digit = value.slice(-1);

        // Update OTP array
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        // Auto-focus next input if digit entered and not last input
        if (digit && index < otp.length - 1) {
            const nextInput = document.getElementById(`otp-${index + 2}`);
            if (nextInput) nextInput.focus();
        }
    };

    /**
     * Handle Backspace Key
     * Moves focus to previous input when backspace is pressed on empty field
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index}`);
            if (prevInput) prevInput.focus();
        }
    };

    /**
     * Handle Paste Event
     * Allows pasting full 4-digit OTP code
     */
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        const paste = e.clipboardData.getData('Text').trim();

        // Check if pasted text is exactly 4 digits
        if (/^\d{4}$/.test(paste)) {
            setOtp(paste.split(''));

            // Focus last input
            const lastInput = document.getElementById('otp-4');
            if (lastInput) lastInput.focus();
        }
    };

    /**
     * Format Time as MM:SS
     */
    const formatTime = (seconds: number): string => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    /**
     * Handle Form Submission
     * Verifies OTP and registers user
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const otpValue = otp.join('');

        // Validate OTP length
        if (otpValue.length < 4) {
            alert('يرجى إدخال رمز التحقق المكوّن من 4 أرقام.');
            return;
        }

        // Get signup data from localStorage
        const userData = getSignupData();
        if (!userData) {
            alert('انتهت الجلسة. يرجى التسجيل مرة أخرى.');
            router.push('/signup');
            return;
        }

        setLoading(true);

        try {
            // Step 1: Verify OTP
            const verifyResponse = await apiClient.post<OtpVerificationResponse>('/verifyOtp', {
                mobile_no: userData.phone,
                otp: otpValue,
            });

            // Check HTTP status instead of success field (API doesn't return success field)
            if (verifyResponse.status !== 200 && verifyResponse.status !== 201) {
                alert(verifyResponse.data.message || 'فشل التحقق من الرمز. حاول مرة أخرى.');
                setLoading(false);
                return;
            }

            // Step 2: Register and verify user
            const registerPayload = buildRegisterVerifyPayload(userData);

            const registerResponse = await apiClient.post<RegisterVerifyResponse>(
                '/register-verify-user',
                registerPayload
            );

            // Check HTTP status instead of success field
            if (registerResponse.status !== 200 && registerResponse.status !== 201) {
                // Show backend error message
                const errorMsg =
                    registerResponse.data.message ||
                    (registerResponse.data.errors
                        ? registerResponse.data.errors[Object.keys(registerResponse.data.errors)[0]]?.[0]
                        : 'تعذّر إتمام التحقق النهائي.');

                alert(errorMsg);
                setLoading(false);
                return;
            }

            // Step 3: Success - Navigate to password creation page (phone stored in localStorage)
            router.push('/create-password');

        } catch (error: any) {
            console.error('Verification error:', error);

            // Show user-friendly error message
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('حدث خطأ ما. يرجى المحاولة مرة أخرى.');
            }
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle Resend OTP
     * Generates and sends a new OTP code
     */
    const handleResend = async () => {
        // Reset timer and OTP
        setTimeLeft(120);
        setOtp(['', '', '', '']);

        const userData = getSignupData();
        if (!userData) {
            alert('انتهت الجلسة. يرجى التسجيل مرة أخرى.');
            router.push('/signup');
            return;
        }

        try {
            const response = await apiClient.post('/generateOtp', {
                mobile_no: userData.phone,
            });

            if (response.data.success) {
                alert('تم إرسال رمز تحقق جديد إلى جوالك.');
            } else {
                alert(response.data.message || 'فشل إرسال الرمز. حاول مرة أخرى.');
            }
        } catch (error: any) {
            console.error('Resend OTP error:', error);
            alert('حدث خطأ أثناء إعادة إرسال الرمز.');
        }
    };

    return (
        <div className="bg-white min-h-screen" dir="rtl">
            {/* Main Content Container */}
            <div
                className="text-black m-4 rounded-2xl bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/image/Vector.svg')",
                }}
            >
                <div className="mx-auto px-4 max-w-[500px] w-full p-8">
                    <div className="p-0 md:p-6 flex-1 flex flex-col">

                        {/* Logo and Heading Section */}
                        <div className="text-center mb-[40px]">
                            <div className="flex items-center justify-center">
                                <Image
                                    src="/image/mainLogo.png"
                                    alt="شعار مبهر"
                                    width={100}
                                    height={100}
                                    className="w-[100px] h-[100px]"
                                />
                                <h1 className="text-[66px] md:text-[88px] font-semibold text-[#28235B] tracking-[-0.07em]">
                                    مبهر
                                </h1>
                            </div>
                            <p className="text-[28px] md:text-4xl font-semibold tracking-[-1.5px] mt-4">
                                أدخل الكود المرسل إلى جوالك
                            </p>
                            <p className="text-[16px] font-medium text-black tracking-[-0.5px] mt-[12px]">
                                أرسلنا لك رمز التحقق على رقم جوالك تأكد من إدخاله لإكمال الخطوة
                            </p>
                            <p
                                className="text-[18px] font-medium text-black tracking-[-0.5px] mt-[12px]"
                                dir="ltr"
                            >
                                {phone}
                            </p>
                        </div>

                        {/* Verification Form */}
                        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
                            <div className="flex gap-4 flex-col md:flex-row pb-[16px]" dir="ltr">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="otp"
                                        className="mb-1 text-lg font-medium text-black text-right"
                                    >
                                        ادخل رمز التحقق
                                    </label>

                                    {/* OTP Input Fields */}
                                    <div
                                        className="flex justify-center gap-2 mt-2"
                                        onPaste={handlePaste}
                                    >
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index + 1}`}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                required
                                                onChange={(e) => handleChange(e.target.value, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                className={`w-[100px] h-[48px] bg-white rounded-md text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#7a2060] ${index === 0
                                                    ? 'border-2 border-[#7A2060]'
                                                    : 'border border-[#E6E6E6]'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Timer Display */}
                                    <p className="text-center text-sm text-gray-600 mt-2">
                                        {timeLeft > 0
                                            ? `الرمز صالح لمدة ${formatTime(timeLeft)}`
                                            : 'انتهت صلاحية الرمز. الرجاء إعادة الإرسال.'}
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={timeLeft <= 0 || loading}
                                className={`w-full py-2 rounded-full font-semibold cursor-pointer transition-colors ${timeLeft > 0
                                    ? 'bg-[#7A2060] text-white hover:bg-[#5a1848]'
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? 'جارٍ التحقق...' : 'تأكيد الحساب وتعيين كلمة المرور'}
                            </button>

                            {/* Resend Button */}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={timeLeft > 0}
                                className={`w-full border py-2 rounded-full font-semibold transition-colors ${timeLeft > 0
                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'border-[#7A2060] text-[#7A2060] hover:bg-[#7A2060] hover:text-white'
                                    }`}
                            >
                                إعادة إرسال الرمز
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}