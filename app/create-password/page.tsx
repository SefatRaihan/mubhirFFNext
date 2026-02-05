'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import apiClient from '@/lib/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Form Data Interface
 */
interface PasswordFormData {
    enterNewPassword: string;
    reEnterNewPassword: string;
}

/**
 * Form Errors Interface
 */
interface PasswordFormErrors {
    passwordMatch: string;
    passwordStrength: string;
    apiError: string;
}

/**
 * Create Password API Response
 */
interface CreatePasswordResponse {
    message: string;
    success?: boolean;
}

/**
 * Create Password Page Component
 * 
 * Allows users to set their password after successful OTP verification.
 * After password creation, automatically logs in the user and redirects to packages page.
 */
export default function CreatePasswordPage() {
    const router = useRouter();

    // Get phone number from localStorage
    const getPhoneFromStorage = () => {
        if (typeof window === 'undefined') return '';
        const stored = localStorage.getItem('signupData');
        if (!stored) return '';
        const data = JSON.parse(stored);
        return data.phone || data.mobile_no || data.phoneNumber || '';
    };

    const mobile_no = getPhoneFromStorage();

    // Form state
    const [formData, setFormData] = useState<PasswordFormData>({
        enterNewPassword: '',
        reEnterNewPassword: '',
    });

    // Error state
    const [errors, setErrors] = useState<PasswordFormErrors>({
        passwordMatch: '',
        passwordStrength: '',
        apiError: '',
    });

    // Loading state
    const [loading, setLoading] = useState(false);

    /**
     * Password Validation Regex
     * Requires: 8+ chars, uppercase, lowercase, number, special character
     */
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~]{8,}$/;

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
        if (!mobile_no) {
            setErrors((prev) => ({
                ...prev,
                apiError: 'رقم الهاتف غير موجود. يرجى إعادة التسجيل.',
            }));
            return;
        }

        try {
            setLoading(true);

            const response = await apiClient.post<CreatePasswordResponse>('/createNewPassword', {
                mobile_no,
                password: formData.enterNewPassword,
                password_confirmation: formData.reEnterNewPassword,
            });

            // Check if request was successful (status 200)
            if (response.status === 200) {
                // Password created successfully, now auto-login the user
                try {
                    // Prepare login request using FormData (same as login page)
                    const loginFormData = new FormData();
                    loginFormData.append('login', mobile_no);
                    loginFormData.append('password', formData.enterNewPassword);

                    // Call login API with the credentials
                    const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
                        method: 'POST',
                        body: loginFormData,
                    });

                    const loginData = await loginResponse.json();

                    if (loginResponse.ok && loginData?.token) {
                        // Store auth token in cookies
                        Cookies.set('token', loginData.token, {
                            expires: 1,
                            secure: true,
                            sameSite: 'Strict',
                        });

                        // Store user data if available
                        if (loginData.user) {
                            Cookies.set('user', JSON.stringify(loginData.user), {
                                expires: 1,
                                secure: true,
                                sameSite: 'Strict',
                            });
                        }

                        // Store redirect URL if provided
                        if (loginData.redirect_url) {
                            Cookies.set('redirect_url', loginData.redirect_url, {
                                expires: 1,
                                secure: true,
                            });
                        }

                        // Clear signup data from localStorage
                        localStorage.removeItem('signupData');

                        // Show success toast
                        toast.success('تم إنشاء الحساب!.', {
                            position: 'top-right',
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });

                        // Redirect to packages page after a short delay
                        setTimeout(() => {
                            router.push('/packages');
                        }, 500);
                    } else {
                        // Login failed after password creation
                        throw new Error(loginData?.message || 'Auto-login failed');
                    }
                } catch (loginError: any) {
                    console.error('Auto-login error:', loginError);

                    // Clear signup data
                    localStorage.removeItem('signupData');

                    // If auto-login fails, show info toast
                    toast.info('يرجى المحاولة مرة أخرى', {
                        position: 'top-right',
                        autoClose: 3000,
                    });

                    // Don't redirect to login - let user stay on this page
                    // setTimeout(() => {
                    //     router.push('/login');
                    // }, 500);
                }
            } else {
                setErrors((prev) => ({
                    ...prev,
                    apiError: response.data?.message || 'حدث خطأ ما.',
                }));
            }
        } catch (error: any) {
            console.error('Create password error:', error);

            // Handle API error response
            if (error.response?.data?.message) {
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

    return (
        <div className="bg-white min-h-screen" dir="rtl">
            {/* Toast Container for notifications */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

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
                                تم التحقق من حسابك!
                            </p>
                            <p className="text-[16px] font-medium text-black tracking-[-0.5px] mt-[12px]">
                                يرجى تعيين كلمة مرور لحسابك للبدء!
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
                                    : 'تعيين كلمة المرور والمتابعة'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
