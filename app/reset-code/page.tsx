'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/**
 * Reset Verification Code Page Component
 * 
 * Allows users to enter 4-digit OTP code sent to their phone for password reset verification.
 * Includes countdown timer and auto-submit functionality.
 */
export default function ResetCodePage() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [phone, setPhone] = useState('');
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);


    /**
     * Get phone from sessionStorage on mount
     */
    useEffect(() => {
        const resetPhone = sessionStorage.getItem('reset_phone');
        if (resetPhone) {
            setPhone(resetPhone);
        } else {
            // If no phone found, redirect back to password reset
            router.push('/password-reset');
        }
    }, [router]);

    /**
     * Countdown timer
     */
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    /**
     * Format time as MM:SS
     */
    const formatTime = (seconds: number) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    /**
     * Handle OTP input change
     */
    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const digit = value.slice(-1);
        const copy = [...otp];
        copy[index] = digit;
        setOtp(copy);

        // Auto move to next input
        if (digit && index < otp.length - 1) {
            const next = document.getElementById(`otp-${index + 2}`);
            next?.focus();
        }

        // Auto submit when 4 digits are entered
        if (index === 3 && digit && copy.join('').length === 4) {
            setTimeout(() => {
                document.getElementById('verify-submit')?.click();
            }, 0);
        }
    };

    /**
     * Handle backspace key
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prev = document.getElementById(`otp-${index}`);
            prev?.focus();
        }
    };

    /**
     * Handle paste
     */
    const handlePaste = (e: React.ClipboardEvent) => {
        const paste = e.clipboardData.getData('Text').trim();
        if (/^\d{4}$/.test(paste)) {
            setOtp(paste.split(''));
            const last = document.getElementById('otp-4');
            last?.focus();
        }
    };

    /**
     * Verify OTP
     */
    const verifyOtp = async (otpValue: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verifyOtp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mobile_no: phone,
                    otp: otpValue,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // OTP verified, navigate to reset password page
                sessionStorage.setItem('verified_otp', otpValue);
                router.push('/reset-password');
            } else {
                alert(data?.message || 'فشل في التحقق من الرمز. حاول مرة أخرى.');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            alert('حدث خطأ. حاول مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!phone) {
            alert('انتهت الجلسة. الرجاء إدخال رقم الجوال مرة أخرى.');
            router.push('/password-reset');
            return;
        }

        const otpValue = otp.join('');
        if (otpValue.length < 4) {
            alert('الرجاء إدخال رمز مكون من 4 أرقام.');
            return;
        }

        await verifyOtp(otpValue);
    };

    /**
     * Resend OTP
     */
    const handleResend = async () => {
        if (!phone) {
            alert('انتهت الجلسة. الرجاء إدخال رقم الجوال مرة أخرى.');
            router.push('/password-reset');
            return;
        }

        try {
            setResending(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generateOtp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile_no: phone }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('تم إرسال رمز جديد إلى جوالك.');
                setOtp(['', '', '', '']);
                setTimeLeft(120);
                // Focus first input
                setTimeout(() => document.getElementById('otp-1')?.focus(), 50);
            } else {
                alert(data?.message || 'فشل في إعادة إرسال الرمز. حاول مرة أخرى.');
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            alert('حدث خطأ أثناء إعادة إرسال الرمز.');
        } finally {
            setResending(false);
        }
    };

    /**
     * Set page title
     */
    useEffect(() => {
        document.title = 'مبهر - رمز التحقق';
    }, []);

    return (
        <div className="bg-white min-h-screen" dir="rtl">
            {/* Main Content Container */}
            <div
                className="text-black m-4 rounded-2xl bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/image/Vector.svg')" }}
            >
                <div className="mx-auto px-4 max-w-[500px] w-full p-8">
                    <div className="p-0 md:p-6 flex-1 flex flex-col">

                        {/* Logo and Header Section */}
                        <div className="text-center mb-[40px]">
                            <div className="flex items-center justify-center">
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
                            <p className="text-[28px] md:text-4xl font-semibold tracking-[-1.5px]">
                                أدخل الكود المرسل إلى جوالك
                            </p>
                            {phone && (
                                <p className="text-[16px] font-medium text-black tracking-[-0.5px] mt-[12px]" dir="ltr">
                                    {phone}
                                </p>
                            )}
                        </div>

                        {/* OTP Verification Form */}
                        <form onSubmit={handleSubmit} className="space-y-4" dir="ltr">
                            <div className="flex gap-4 flex-col md:flex-row pb-[16px]">
                                <div className="flex flex-col w-full">
                                    <label className="mb-1 text-lg font-medium text-black text-right">
                                        ادخل رمز التحقق
                                    </label>

                                    {/* OTP Input Boxes */}
                                    <div className="flex justify-center gap-2 mt-2" onPaste={handlePaste}>
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

                                    {/* Timer */}
                                    <p className="text-center text-sm text-gray-600 mt-2">
                                        {timeLeft > 0
                                            ? `الرمز صالح لمدة ${formatTime(timeLeft)}`
                                            : 'انتهت صلاحية الرمز. الرجاء إعادة الإرسال.'}
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                id="verify-submit"
                                type="submit"
                                disabled={timeLeft <= 0 || loading}
                                className={`w-full py-2 rounded-full font-semibold cursor-pointer ${timeLeft > 0 && !loading
                                    ? 'bg-[#7A2060] text-white'
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? 'جارٍ التحقق...' : 'تأكيد الحساب وتعيين كلمة المرور'}
                            </button>

                            {/* Resend Button */}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={timeLeft > 0 || resending}
                                className={`w-full border py-2 rounded-full font-semibold ${timeLeft > 0 || resending
                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'border-[#7A2060] text-[#7A2060]'
                                    }`}
                            >
                                {resending ? 'جاري الإرسال...' : 'إعادة إرسال الرمز'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
