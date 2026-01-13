'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/**
 * Password Form Data Interface
 */
interface PasswordFormData {
    enterNewPassword: string;
    reEnterNewPassword: string;
}

/**
 * Password Form Errors Interface
 */
interface PasswordFormErrors {
    passwordMatch: string;
    passwordStrength: string;
    apiError: string;
}

/**
 * Create New Password Page Component
 * 
 * Allows users to create a new password after OTP verification during password reset flow.
 */
export default function CreateNewPasswordPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<PasswordFormData>({
        enterNewPassword: '',
        reEnterNewPassword: '',
    });
    const [errors, setErrors] = useState<PasswordFormErrors>({
        passwordMatch: '',
        passwordStrength: '',
        apiError: '',
    });
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');

    // API Base URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sat.mubhir.ai/api';

    /**
     * Password Validation Regex
     * Requires: 8+ chars, uppercase, lowercase, number, special character
     */
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~]{8,}$/;

    /**
     * Get phone from sessionStorage on mount
     */
    useEffect(() => {
        const resetPhone = sessionStorage.getItem('reset_phone');
        if (resetPhone) {
            setPhone(resetPhone);
        } else {
            // If no phone found, redirect back to password reset
            alert('انتهت الجلسة. الرجاء البدء من جديد.');
            router.push('/password-reset');
        }
    }, [router]);

    /**
     * Handle Input Change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear errors when user types
        setErrors({ passwordMatch: '', passwordStrength: '', apiError: '' });
    };

    /**
     * Handle Form Submission
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors: PasswordFormErrors = {
            passwordMatch: '',
            passwordStrength: '',
            apiError: '',
        };
        let valid = true;

        // Validate password match
        if (formData.enterNewPassword !== formData.reEnterNewPassword) {
            newErrors.passwordMatch = 'كلمات المرور غير متطابقة.';
            valid = false;
        }

        // Validate password strength
        if (!passwordRegex.test(formData.enterNewPassword)) {
            newErrors.passwordStrength =
                'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام وأحرف خاصة.';
            valid = false;
        }

        setErrors(newErrors);
        if (!valid) return;

        // Validate phone number exists
        if (!phone) {
            setErrors((prev) => ({
                ...prev,
                apiError: 'انتهت الجلسة. الرجاء البدء من جديد.',
            }));
            setTimeout(() => router.push('/password-reset'), 2000);
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/createNewPassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mobile_no: phone,
                    password: formData.enterNewPassword,
                    password_confirmation: formData.reEnterNewPassword,
                }),
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }

            const data = await response.json();

            if (response.ok) {
                // Clear session storage
                sessionStorage.removeItem('reset_phone');
                sessionStorage.removeItem('verified_otp');

                // Show success message
                alert('تم إعادة تعيين كلمة المرور بنجاح! يرجى تسجيل الدخول.');

                // Navigate to login page
                router.push('/login');
            } else {
                setErrors((prev) => ({
                    ...prev,
                    apiError: data?.message || 'حدث خطأ ما.',
                }));
            }
        } catch (error: any) {
            console.error('Reset password error:', error);

            // Handle JSON parsing errors
            if (error.message === 'Server returned non-JSON response') {
                setErrors((prev) => ({
                    ...prev,
                    apiError: 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.',
                }));
            } else if (error.response?.data?.message) {
                setErrors((prev) => ({
                    ...prev,
                    apiError: error.response.data.message,
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    apiError: 'خطأ في الشبكة. يرجى المحاولة مرة أخرى.',
                }));
            }
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
                            <p className="text-[28px] md:text-4xl font-semibold tracking-[-1.5px] leading-[45px]">
                                إعادة تعيين كلمة المرور
                            </p>
                            <p className="text-[16px] font-medium text-black tracking-[-0.5px] mt-[12px]">
                                أدخل كلمة مرور جديدة لحسابك
                            </p>
                        </div>

                        {/* Password Creation Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Enter New Password */}
                            <div className="flex flex-col w-full">
                                <label
                                    htmlFor="enterNewPassword"
                                    className="mb-1 font-medium text-black"
                                >
                                    أدخل كلمة مرور جديدة*
                                </label>
                                <input
                                    type="password"
                                    id="enterNewPassword"
                                    name="enterNewPassword"
                                    value={formData.enterNewPassword}
                                    onChange={handleChange}
                                    placeholder="********"
                                    required
                                    className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                />
                                {errors.passwordStrength && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.passwordStrength}
                                    </p>
                                )}
                            </div>

                            {/* Re-enter New Password */}
                            <div className="flex flex-col">
                                <label
                                    htmlFor="reEnterNewPassword"
                                    className="mb-1 font-medium text-black"
                                >
                                    أعد إدخال كلمة مرور جديدة*
                                </label>
                                <input
                                    type="password"
                                    id="reEnterNewPassword"
                                    name="reEnterNewPassword"
                                    value={formData.reEnterNewPassword}
                                    onChange={handleChange}
                                    placeholder="********"
                                    required
                                    className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                />
                                {errors.passwordMatch && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.passwordMatch}
                                    </p>
                                )}
                            </div>

                            {/* Password Requirements Info */}
                            <p className="text-base text-gray-500">
                                يجب أن تتكون كلمة المرور من 8 أحرف على الأقل مع أحرف كبيرة
                                وصغيرة وأرقام وأحرف خاصة
                            </p>

                            {/* API Error Display */}
                            {errors.apiError && (
                                <p className="text-red-500 text-sm">{errors.apiError}</p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#7A2060] text-white py-2 rounded-full font-semibold cursor-pointer hover:bg-[#5a1848] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? 'جاري الحفظ...'
                                    : 'إعادة تعيين كلمة المرور'}
                            </button>

                            {/* Back to Login */}
                            <button
                                type="button"
                                onClick={() => router.push('/login')}
                                className="w-full text-[#7A2060] py-2 font-medium underline"
                            >
                                العودة إلى تسجيل الدخول
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
