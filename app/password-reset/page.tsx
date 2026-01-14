'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

/**
 * Password Reset Page Component
 * 
 * Allows users to initiate password reset by entering their phone number.
 * Sends OTP to the provided phone number for verification.
 */
export default function PasswordResetPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ phone: '' });
    const [loading, setLoading] = useState(false);


    /**
     * Keep phone in sessionStorage if user refreshes
     */
    useEffect(() => {
        if (formData.phone) {
            sessionStorage.setItem('reset_phone', formData.phone);
        }
    }, [formData.phone]);

    /**
     * Handle phone number change
     */
    const handlePhoneChange = (value: string | undefined) => {
        setFormData((prev) => ({ ...prev, phone: value || '' }));
    };

    /**
     * Handle form submission
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.phone) return;

        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generateOtp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile_no: formData.phone }),
            });
            const data = await response.json();

            if (response.ok) {
                // Save phone to sessionStorage
                sessionStorage.setItem('reset_phone', formData.phone);
                // Navigate to verification code page
                router.push('/reset-code');
            } else {
                alert(data?.message || 'فشل في إرسال رمز التحقق');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            alert('حدث خطأ ما. الرجاء المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Set page title
     */
    useEffect(() => {
        document.title = 'مبهر - إعادة تعيين كلمة المرور';
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
                        <div className="text-center mb-[32px]">
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
                                هل نسيت كلمة المرور الخاصة بك؟
                            </p>
                            <p className="text-[16px] font-medium text-black tracking-[-0.5px] mt-[12px]">
                                يرجى إدخال رقم الجوال المرتبط بحسابك
                            </p>
                        </div>

                        {/* Password Reset Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Phone Number Field */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="phone" className="font-medium text-black mb-1">
                                    الجوال*
                                </label>
                                <div className="flex bg-white border border-gray-300 rounded">
                                    <PhoneInput
                                        placeholder="٠١١ ٢٣٤ ٥٦٧٨"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        defaultCountry="SA"
                                        required
                                        className="w-full bg-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !formData.phone}
                                className={`w-full py-2 rounded-full font-semibold cursor-pointer transition-colors ${loading || !formData.phone
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-[#7A2060] text-white hover:bg-[#5a1848]'
                                    }`}
                            >
                                {loading ? 'جاري الإرسال...' : 'إعادة تعيين كلمة المرور'}
                            </button>

                            {/* Login Instead Button */}
                            <button
                                type="button"
                                onClick={() => router.push('/login')}
                                className="w-full border border-[#7A2060] text-[#7A2060] py-2 rounded-full font-semibold cursor-pointer hover:bg-[#7A2060] hover:text-white transition-colors"
                            >
                                تسجيل الدخول بدلا من ذلك
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
