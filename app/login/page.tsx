'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Cookies from 'js-cookie';

/**
 * Login Form Data Interface
 */
interface LoginFormData {
    phone: string;
    password: string;
}

/**
 * Login API Response Interface
 */
interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        [key: string]: any;
    };
    redirect_url?: string;
    is_active_package?: boolean | string;
}

/**
 * Login Page Component
 * 
 * Allows users to log in with their email and password.
 * Handles authentication, token storage, and redirects based on user status.
 */
export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get redirect parameters from URL
    const pendingFrom = searchParams.get('from');
    const pendingPlan = searchParams.get('plan');
    const pendingFromTrial = searchParams.get('fromTrial') === 'true';

    // Form state
    const [formData, setFormData] = useState<LoginFormData>({
        phone: '',
        password: '',
    });

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    /**
     * Handle Input Change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Handle Phone Number Change
     */
    const handlePhoneChange = (value: string | undefined) => {
        setFormData(prev => ({ ...prev, phone: value || '' }));
    };

    /**
     * Handle Form Submission
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Create FormData for API request
            const formBody = new FormData();
            formBody.append('login', formData.phone);
            formBody.append('password', formData.password);

            const response = await fetch('https://sat.mubhir.ai/api/login', {
                method: 'POST',
                body: formBody,
            });

            const data: LoginResponse = await response.json();

            if (response.ok) {
                setSuccess(data.message);

                // Save tokens & user info to cookies
                Cookies.set('token', data.token, {
                    expires: 1,
                    secure: true,
                    sameSite: 'Strict',
                });
                Cookies.set('user', JSON.stringify(data.user), {
                    expires: 1,
                    secure: true,
                    sameSite: 'Strict',
                });
                if (data.redirect_url) {
                    Cookies.set('redirect_url', data.redirect_url, {
                        expires: 1,
                        secure: true,
                        sameSite: 'Strict',
                    });
                }

                // Check if user has active package
                const hasActivePackage =
                    data?.is_active_package === true ||
                    data?.is_active_package === 'true';

                if (hasActivePackage && data.redirect_url) {
                    // Before redirecting, remove local cookies for security
                    Cookies.remove('token');
                    Cookies.remove('user');
                    Cookies.remove('redirect_url');

                    // Redirect to sat.mubhir.ai
                    window.location.href = data.redirect_url;
                    return;
                }

                // Otherwise, check cookies and navigate accordingly
                const selectedPlanCookie = Cookies.get('selectedPlan');

                // Redirect priority
                if (pendingFrom === '/ar-checkout') {
                    // Store plan info in cookie for checkout page
                    if (pendingPlan) Cookies.set('selectedPlan', pendingPlan);
                    router.push('/ar-checkout');
                } else if (selectedPlanCookie) {
                    router.push('/ar-checkout');
                } else {
                    router.push('/ar-select-package');
                }
            } else {
                setError(data.message || 'فشل تسجيل الدخول. حاول مرة أخرى.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('حدث خطأ. حاول مرة أخرى لاحقًا.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Set Page Title
     */
    useEffect(() => {
        document.title = 'مبهر - تسجيل الدخول';
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

                        {/* Logo Section */}
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
                            <p className="text-[28px] md:text-4xl font-semibold tracking-[-1.5px]">
                                🔑 سجل دخولك على حسابك في منصة مبهر
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

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
                                        required
                                        className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col">
                                <label
                                    htmlFor="password"
                                    className="mb-1 font-medium text-black"
                                >
                                    كلمة المرور*
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="***********"
                                    required
                                    className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060] text-right"
                                />
                            </div>

                            {/* Forgot Password Link */}
                            <a
                                href="/ar-password-reset"
                                className="text-base font-medium text-[#7a2060] underline inline-block"
                            >
                                نسيت كلمة المرور الخاصة بي
                            </a>

                            {/* Error/Success Messages */}
                            {error && <p className="text-red-600 text-sm">{error}</p>}
                            {success && <p className="text-green-600 text-sm">{success}</p>}

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#7A2060] text-white py-2 rounded-full font-semibold cursor-pointer mt-4 hover:bg-[#5a1848] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                            </button>

                            {/* Signup Button */}
                            <button
                                type="button"
                                onClick={() => router.push('/signup')}
                                className="w-full border border-[#7A2060] text-[#7A2060] py-2 rounded-full font-semibold cursor-pointer hover:bg-[#7A2060] hover:text-white transition-colors"
                            >
                                إنشاء حساب جديد
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
