'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import apiClient from '@/lib/axios';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-load ToastContainer (~50KB with styles/animations)
const ToastContainer = dynamic(
    () => import('react-toastify').then((mod) => mod.ToastContainer),
    { ssr: false }
);

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
 * After password creation, automatically logs in the user,
 * then activates the free trial (if not already used) and redirects to dashboard.
 * If trial is already used, redirects to packages page.
 */
export default function CreatePasswordPage() {
    const router = useRouter();

    // Get phone number from localStorage (lazy initializer — only runs once on mount)
    const [mobile_no] = useState(() => {
        if (typeof window === 'undefined') return '';
        const stored = localStorage.getItem('signupData');
        if (!stored) return '';
        try {
            const data = JSON.parse(stored);
            return data.phone || data.mobile_no || data.phoneNumber || '';
        } catch {
            return '';
        }
    });

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

    // ─── Trial Modal State ───
    const [showTrialModal, setShowTrialModal] = useState(false);
    const [trialGender, setTrialGender] = useState('');
    const [trialDOBDate, setTrialDOBDate] = useState<Date | null>(null);
    const [trialGrade, setTrialGrade] = useState('');
    const [trialSubmitting, setTrialSubmitting] = useState(false);

    // ─── Result Modal State (success/error after trial API call) ───
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultType, setResultType] = useState<'success' | 'error'>('success');
    const resultTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-close result modal (2s for error, 5s for success)
    useEffect(() => {
        if (showResultModal) {
            const duration = 2000;
            resultTimerRef.current = setTimeout(() => {
                setShowResultModal(false);
                if (resultType === 'success') {
                    // Redirect to student dashboard
                    const redirectUrl = Cookies.get('redirect_url');
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        router.push('/');
                    }
                } else {
                    // Trial already used → redirect to packages
                    router.push('/packages');
                }
            }, duration);
        }
        return () => {
            if (resultTimerRef.current) {
                clearTimeout(resultTimerRef.current);
            }
        };
    }, [showResultModal, resultType, router]);

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
     * Handle trial modal proceed button
     * Validates form, then calls /cms/free-trail API to activate trial
     */
    const handleTrialProceed = async () => {
        if (!trialGender || !trialDOBDate || !trialGrade) {
            const { toast } = await import('react-toastify');
            toast.error('الرجاء ملء جميع الحقول المطلوبة', {
                position: 'top-right',
                autoClose: 2000,
            });
            return;
        }

        setTrialSubmitting(true);

        const token = Cookies.get('token');

        // Format DOB as DD/MM/YYYY for the API
        const day = String(trialDOBDate.getDate()).padStart(2, '0');
        const month = String(trialDOBDate.getMonth() + 1).padStart(2, '0');
        const year = trialDOBDate.getFullYear();
        const formattedDOB = `${day}/${month}/${year}`;

        try {
            // Build FormData payload
            const payload = new FormData();
            payload.append('gender', trialGender);
            payload.append('date_of_birth', formattedDOB);
            payload.append('grade', trialGrade);

            const response = await apiClient.post('/cms/free-trail', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data: any = response.data;

            // Determine if user has already used trial
            let hasUsed = false;

            if (data) {
                if (data.isExpired === true || data.isExpired === 'true' || data.isExpired === 1 || data.isExpired === '1') hasUsed = true;
                if (data.is_expired === true || data.is_expired === 'true' || data.is_expired === 1 || data.is_expired === '1') hasUsed = true;
                if (data.expired === true || data.expired === 'true' || data.expired === 1 || data.expired === '1') hasUsed = true;
                if (data.status === 'expired' || data.status === 'used') hasUsed = true;
                if (data.is_trial === 1 || data.is_trial === '1' || data.is_trial === true) hasUsed = true;
            }

            if (hasUsed) {
                // Trial already used - show error result modal → will redirect to /packages
                setShowTrialModal(false);
                setTrialSubmitting(false);
                setResultType('error');
                setShowResultModal(true);
                return;
            }

            // Store trial profile data in cookies
            Cookies.set('fromTrial', 'true', { path: '/' });
            Cookies.set('trialGender', trialGender, { path: '/' });
            Cookies.set('trialDOB', formattedDOB, { path: '/' });
            Cookies.set('trialGrade', trialGrade, { path: '/' });

            // Show success result modal (will auto-redirect to dashboard after 5s)
            setShowTrialModal(false);
            setTrialSubmitting(false);
            setResultType('success');
            setShowResultModal(true);
        } catch (error: any) {
            // Handle 403 status (trial already used)
            if (error?.response?.status === 403) {
                setShowTrialModal(false);
                setTrialSubmitting(false);
                setResultType('error');
                setShowResultModal(true);
                return;
            }
            setTrialSubmitting(false);
            const { toast } = await import('react-toastify');
            toast.error('حدث خطأ. حاول مرة أخرى لاحقًا.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
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

                    // Call login API with the credentials (using apiClient for timeout protection)
                    const loginResponse = await apiClient.post('/login', loginFormData);

                    const loginData = loginResponse.data;

                    if (loginData?.token) {
                        // Determine environment for cookie options
                        const isProduction = window.location.protocol === 'https:';
                        const cookieOptions = {
                            expires: 1,
                            path: '/',
                            ...(isProduction && {
                                domain: '.mubhir.ai',
                                secure: true,
                                sameSite: 'Strict' as const,
                            }),
                        };

                        // Store auth token in cookies
                        Cookies.set('token', loginData.token, cookieOptions);

                        // Store user data if available
                        if (loginData.user) {
                            Cookies.set('user', JSON.stringify(loginData.user), cookieOptions);
                        }

                        // Store redirect URL if provided
                        if (loginData.redirect_url) {
                            Cookies.set('redirect_url', loginData.redirect_url, cookieOptions);
                        }

                        // Clear signup data from localStorage
                        localStorage.removeItem('signupData');

                        // Show success toast (disabled for now)
                        // const { toast } = await import('react-toastify');
                        // toast.success('تم إنشاء الحساب!.', {
                        //     position: 'top-right',
                        //     autoClose: 2000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     draggable: true,
                        // });

                        // Check if user already has an active package → go to dashboard
                        const hasActivePackage =
                            loginData?.is_active_package === true ||
                            loginData?.is_active_package === 'true';

                        if (hasActivePackage && loginData.redirect_url) {
                            // User already has active package → redirect to dashboard
                            setTimeout(() => {
                                window.location.href = loginData.redirect_url;
                            }, 500);
                            return;
                        }

                        // Check trial status via /cms/me
                        try {
                            const meResponse = await apiClient.get('/cms/me', {
                                headers: {
                                    Authorization: `Bearer ${loginData.token}`,
                                },
                            });

                            const userData = meResponse.data;

                            if (userData.is_trial === 1) {
                                // User already used the free trial → redirect to packages
                                setTimeout(() => {
                                    router.push('/packages');
                                }, 500);
                            } else {
                                // User hasn't used free trial → show trial modal
                                setLoading(false);
                                setTimeout(() => {
                                    setShowTrialModal(true);
                                }, 600);
                            }
                        } catch {
                            // If /cms/me fails, show the trial modal anyway
                            setLoading(false);
                            setTimeout(() => {
                                setShowTrialModal(true);
                            }, 600);
                        }
                    } else {
                        // Login failed after password creation
                        throw new Error(loginData?.message || 'Auto-login failed');
                    }
                } catch (loginError: any) {
                    // Clear signup data
                    localStorage.removeItem('signupData');

                    // If auto-login fails, show info toast
                    const { toast } = await import('react-toastify');
                    toast.info('يرجى المحاولة مرة أخرى', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            } else {
                setErrors((prev) => ({
                    ...prev,
                    apiError: response.data?.message || 'حدث خطأ ما.',
                }));
            }
        } catch (error: any) {
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
                                    priority
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

            {/* ─── Free Trial Modal (same as packages page) ─── */}
            {showTrialModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowTrialModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => {
                                setShowTrialModal(false);
                                // If user closes modal without submitting, go to packages
                                router.push('/packages');
                            }}
                            className="absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-500 hover:bg-white hover:text-gray-700 transition shadow-sm cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* Gradient Header */}
                        <div className="bg-linear-to-l from-[#7A2060] to-[#28235B] px-6 md:px-8 pt-8 pb-6 text-center">
                            <div className="text-5xl mb-3">🎉</div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                ابدأ رحلتك نحو التفوق مجانًا!
                            </h2>
                            <p className="text-white/80 text-sm">
                                أكمل بياناتك وابدأ تجربتك المجانية لمدة 3 أيام الآن
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="px-6 md:px-8 py-6 space-y-5">
                            {/* Gender & DOB side by side */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Gender */}
                                <div>
                                    <label htmlFor="trialGender" className="flex items-center gap-2 mb-2 font-semibold text-[#28235B] text-right">
                                        <span className="text-lg">👤</span>
                                        الجنس*
                                    </label>
                                    <select
                                        id="trialGender"
                                        value={trialGender}
                                        onChange={(e) => setTrialGender(e.target.value)}
                                        required
                                        className="w-full bg-[#F9F5FB] border-2 border-gray-200 rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-[#7A2060] focus:border-[#7A2060] transition-all"
                                    >
                                        <option value="">اختر الجنس</option>
                                        <option value="male">ذكر</option>
                                        <option value="female">أنثى</option>
                                    </select>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label htmlFor="trialDOB" className="flex items-center gap-2 mb-2 font-semibold text-[#28235B] text-right">
                                        <span className="text-lg">📅</span>
                                        تاريخ الميلاد*
                                    </label>
                                    <DatePicker
                                        selected={trialDOBDate}
                                        onChange={(date: Date | null) => setTrialDOBDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={new Date()}
                                        minDate={new Date('1920-01-01')}
                                        placeholderText="اختر تاريخ الميلاد"
                                        showYearDropdown
                                        showMonthDropdown
                                        dropdownMode="select"
                                        className="custom-datepicker-modal"
                                        withPortal
                                    />
                                </div>
                            </div>

                            {/* Secondary School Grade */}
                            <div>
                                <label htmlFor="trialGrade" className="flex items-center gap-2 mb-2 font-semibold text-[#28235B] text-right">
                                    <span className="text-lg">🎓</span>
                                    المرحلة الثانوية*
                                </label>
                                <select
                                    id="trialGrade"
                                    value={trialGrade}
                                    onChange={(e) => setTrialGrade(e.target.value)}
                                    required
                                    className="w-full bg-[#F9F5FB] border-2 border-gray-200 rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-[#7A2060] focus:border-[#7A2060] transition-all"
                                >
                                    <option value="">حدد الدرجة</option>
                                    <option value="اول ثانوي">اول ثانوي</option>
                                    <option value="ثاني ثانوي">ثاني ثانوي</option>
                                    <option value="ثالث ثانوي">ثالث ثانوي</option>
                                </select>
                            </div>

                            {/* Proceed Button */}
                            <button
                                type="button"
                                onClick={handleTrialProceed}
                                disabled={trialSubmitting}
                                className="w-full bg-linear-to-l from-[#7A2060] to-[#9B3080] text-white py-3.5 rounded-full font-semibold hover:from-[#5a1848] hover:to-[#7A2060] transition-all shadow-lg shadow-[#7A2060]/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-lg"
                            >
                                {trialSubmitting ? 'جاري المعالجة...' : '🚀 ابدأ التجربة المجانية'}
                            </button>

                            {/* Trust Badge */}
                            <p className="text-center text-xs text-gray-400 mt-2">
                                🔒 بياناتك محمية ولن تتم مشاركتها
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Result Modal (Success / Error) ─── */}
            {showResultModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden result-modal-enter`}>
                        {/* Top tinted background area */}
                        <div className={`pt-10 pb-10 flex justify-center ${resultType === 'success' ? 'bg-emerald-50' : 'bg-red-50'
                            }`}>
                            <div className="relative w-32 h-32">
                                {/* Outer pulsing glow rings */}
                                <div className={`absolute inset-0 rounded-full result-glow-ring-1 ${resultType === 'success' ? 'bg-emerald-300' : 'bg-red-300'
                                    }`} />
                                <div className={`absolute inset-0 rounded-full result-glow-ring-2 ${resultType === 'success' ? 'bg-emerald-200' : 'bg-red-200'
                                    }`} />

                                {/* SVG circular progress border */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                                    {/* Background track */}
                                    <circle
                                        cx="64" cy="64" r="58"
                                        fill="none"
                                        stroke={resultType === 'success' ? '#d1fae5' : '#fecaca'}
                                        strokeWidth="5"
                                    />
                                    {/* Animated progress */}
                                    <circle
                                        cx="64" cy="64" r="58"
                                        fill="none"
                                        stroke={resultType === 'success' ? '#10b981' : '#ef4444'}
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        strokeDasharray="364.42"
                                        strokeDashoffset="364.42"
                                        className={resultType === 'error' ? 'result-progress-circle-error' : 'result-progress-circle-success'}
                                    />
                                </svg>

                                {/* Inner icon circle */}
                                <div className={`absolute inset-4 rounded-full flex items-center justify-center shadow-lg ${resultType === 'success'
                                    ? 'bg-linear-to-br from-emerald-400 to-emerald-600'
                                    : 'bg-linear-to-br from-red-400 to-red-600'
                                    }`}>
                                    {resultType === 'success' ? (
                                        <svg className="w-14 h-14 text-white result-icon-animate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="result-check-path" />
                                        </svg>
                                    ) : (
                                        <svg className="w-14 h-14 text-white result-icon-animate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="px-8 pt-5 pb-8 text-center">
                            <h3 className={`text-2xl font-bold mb-2 ${resultType === 'success' ? 'text-emerald-600' : 'text-red-600'
                                }`}>
                                {resultType === 'success'
                                    ? 'تم تفعيل التجربة المجانية بنجاح!'
                                    : 'لقد استخدمت النسخة التجريبية بالفعل'}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {resultType === 'success'
                                    ? 'سيتم تحويلك إلى لوحة التحكم خلال ثوانٍ...'
                                    : 'سيتم تحويلك إلى صفحة الباقات...'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom styles for modal DatePicker & result animations */}
            <style jsx global>{`
                .custom-datepicker-modal {
                    width: 100%;
                    background-color: #F9F5FB;
                    border: 2px solid #e5e7eb;
                    border-radius: 0.75rem;
                    padding: 0.75rem 1rem;
                    text-align: right;
                    font-size: 1rem;
                    cursor: pointer;
                    box-sizing: border-box;
                }
                
                .custom-datepicker-modal:focus {
                    outline: none;
                    border: 2px solid #7a2060;
                    box-shadow: 0 0 0 2px rgba(122, 32, 96, 0.15);
                }
                
                .react-datepicker {
                    font-family: inherit;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                }
                
                .react-datepicker__header {
                    background: linear-gradient(to left, #7a2060, #28235B);
                    border-bottom: none;
                    border-radius: 0;
                    padding-top: 0.75rem;
                }
                
                .react-datepicker__current-month,
                .react-datepicker__day-name {
                    color: white;
                    font-weight: 600;
                }
                
                .react-datepicker__year-select,
                .react-datepicker__month-select {
                    background-color: white;
                    color: #7a2060;
                    font-weight: 600;
                    border: 1px solid rgba(255,255,255,0.4);
                    border-radius: 0.375rem;
                    padding: 0.25rem 0.5rem;
                    cursor: pointer;
                }
                
                .react-datepicker__year-select option,
                .react-datepicker__month-select option {
                    color: #1f2937;
                }
                
                .react-datepicker__day--selected,
                .react-datepicker__day--keyboard-selected {
                    background-color: #7a2060 !important;
                    color: white !important;
                    border-radius: 50%;
                }
                
                .react-datepicker__day:hover {
                    background-color: #f3e8f0;
                    border-radius: 50%;
                }
                
                .react-datepicker__day--disabled {
                    color: #d1d5db;
                }

                .react-datepicker__navigation-icon::before {
                    border-color: white;
                }

                /* Result modal animations */
                @keyframes resultModalEnter {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }

                @keyframes circleProgress {
                    from { stroke-dashoffset: 364.42; }
                    to { stroke-dashoffset: 0; }
                }

                @keyframes iconPop {
                    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
                    60% { transform: scale(1.15) rotate(0deg); }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                @keyframes glowPulse1 {
                    0%, 100% { transform: scale(1.2); opacity: 0.15; }
                    50% { transform: scale(1.35); opacity: 0.25; }
                }

                @keyframes glowPulse2 {
                    0%, 100% { transform: scale(1.45); opacity: 0.08; }
                    50% { transform: scale(1.6); opacity: 0.15; }
                }

                .result-modal-enter {
                    animation: resultModalEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                .result-progress-circle-success {
                    animation: circleProgress 2s linear forwards;
                }

                .result-progress-circle-error {
                    animation: circleProgress 2s linear forwards;
                }

                .result-icon-animate {
                    animation: iconPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
                    opacity: 0;
                }

                .result-glow-ring-1 {
                    animation: glowPulse1 2s ease-in-out infinite;
                }

                .result-glow-ring-2 {
                    animation: glowPulse2 2s ease-in-out 0.5s infinite;
                }
            `}</style>
        </div>
    );
}
