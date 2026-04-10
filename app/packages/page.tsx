'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import apiClient from '@/lib/axios';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-load ToastContainer (~50KB deferred)
const ToastContainer = dynamic(
    () => import('react-toastify').then((mod) => mod.ToastContainer),
    { ssr: false }
);
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// it's shown right now, but when I click any of the pacakge it redirect to the login page, but it have to go to the chaekput page, then what is the problem here

/**
 * Package Interface
 */
interface Package {
    id: number;
    title: string;
    description: string;
    price: string;
    pricing_terms: string;
    terms_per_month: string;
    promotional_badge: number;
    package_type?: string;
    title_ar?: string;
    description_ar?: string;
    price_display?: string;
    pricing_terms_ar?: string;
}

/**
 * Packages API Response
 */
interface PackagesResponse {
    status: string;
    data: Package[];
}

/**
 * Packages Selection Page
 * 
 * Displays available SAT preparation packages with pricing and features.
 * Shows 5-day trial option only for users who haven't used it yet.
 */
export default function PackagesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Read initial exam selection from URL query param (?sat1 or ?sat2)
    const initialExam: 'sat1' | 'sat2' = searchParams.has('sat2') ? 'sat2' : 'sat1';

    // Auto-redirect /packages to /packages?sat1 if no exam param is present
    useEffect(() => {
        if (!searchParams.has('sat1') && !searchParams.has('sat2')) {
            router.replace('/packages?sat1', { scroll: false });
        }
    }, [searchParams, router]);

    // State
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [selectedExam, setSelectedExam] = useState<'sat1' | 'sat2'>(initialExam);

    // Check if user has used trial (from API)
    const [hasUsedTrial, setHasUsedTrial] = useState(false);

    // Trial modal state
    const [showTrialModal, setShowTrialModal] = useState(false);
    const [trialGender, setTrialGender] = useState('');
    const [trialDOBDate, setTrialDOBDate] = useState<Date | null>(null);
    const [trialGrade, setTrialGrade] = useState('');
    const [trialSubmitting, setTrialSubmitting] = useState(false);

    // Result modal state (success/error after API call)
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultType, setResultType] = useState<'success' | 'error'>('success');
    const resultTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-close result modal (2s for error, 5s for success)
    useEffect(() => {
        if (showResultModal) {
            const duration = resultType === 'error' ? 2000 : 5000;
            resultTimerRef.current = setTimeout(() => {
                setShowResultModal(false);
                if (resultType === 'success') {
                    const redirectUrl = Cookies.get('redirect_url');
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        router.push('/');
                    }
                }
            }, duration);
        }
        return () => {
            if (resultTimerRef.current) {
                clearTimeout(resultTimerRef.current);
            }
        };
    }, [showResultModal, resultType, router]);

    // Translation mappings (from SelectPackageAr.jsx)
    const titleTranslations: Record<string, string> = {
        'Monthly Plan': 'الخطة الشهرية',
        '3 Months Plan': 'خطة ٣ أشهر',
        '6 Months Plan': 'خطة ٦ أشهر',
        'Yearly Plan': 'الباقة السنوية',
    };

    const descriptionTranslations: Record<string, string> = {
        'Perfect for starting your journey': 'استكشف بوتيرتك الخاصة',
        'Ideal for focused preparation': 'مثالي لمواسم الامتحانات',
        'Best for comprehensive prep': 'التنافس على أعلى المستويات',
        'Maximum value for long-term': 'إتقان وتيرة قدرات',
    };

    const pricingTermsTranslations: Record<string, string> = {
        'monthly': 'شهريًا',
        '3month': 'لمدة ٣ أشهر',
        '6month': 'لمدة ٦ أشهر',
        'yearly': 'لمدة ١٢ شهرًا',
    };

    const buttonTextTranslations: Record<string, string> = {
        'Monthly Plan': 'ابدأ الخطة الشهرية',
        '3 Months Plan': 'ابدأ خطة ٣ أشهر',
        '6 Months Plan': 'ابدأ خطة ٦ أشهر',
        'Yearly Plan': 'ابدأ الباقة السنوية',
    };



    /**
     * Fetch packages from API
     */
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await apiClient.get('/packages');
                const json: PackagesResponse = response.data;

                if (json.status === 'success') {
                    // Map packages with Arabic translations
                    const mappedPackages = json.data.map((pkg) => ({
                        ...pkg,
                        title_ar: titleTranslations[pkg.title] || pkg.title,
                        description_ar: descriptionTranslations[pkg.description] || pkg.description,
                        pricing_terms_ar: pricingTermsTranslations[pkg.pricing_terms] || pkg.pricing_terms,
                        price_display: pkg.price,
                    }));

                    setPackages(mappedPackages);
                }
            } catch (error) {
                // console.error('Error fetching packages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    /**
     * Set page title
     */
    // useEffect(() => {
    //     document.title = 'مبهر - اختر باقتك';
    // }, []);

    /**
     * Handle free trial button click
     * Calls GET /cms/me to check is_trial status:
     * - is_trial: 0 → show form modal (user hasn't used trial)
     * - is_trial: 1 → show error/cross modal (user already used trial)
     */
    const handleFreeTrialClick = async () => {
        const token = Cookies.get('token');

        if (!token) {
            Cookies.set('fromTrial', 'true', { path: '/' });
            router.push('/login');
            return;
        }

        try {
            const response = await apiClient.get('/cms/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = response.data;

            if (userData.is_trial === 1) {
                // User already used the free trial → show error modal
                setHasUsedTrial(true);
                setResultType('error');
                setShowResultModal(true);
            } else {
                // User hasn't used the free trial → show form modal
                setHasUsedTrial(false);
                setShowTrialModal(true);
            }
        } catch (error) {
            const { toast } = await import('react-toastify');
            toast.error('حدث خطأ. حاول مرة أخرى لاحقًا.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    /**
     * Handle trial modal proceed button
     * Validates form, then calls /cms/free-trail API to check eligibility
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

        // Debug: Log form data
        console.group('%c📋 TRIAL MODAL - Form Data', 'color: #7A2060; font-size: 14px; font-weight: bold;');
        console.log('%cGender:', 'color: #2563eb;', trialGender);
        console.log('%cDate of Birth:', 'color: #2563eb;', formattedDOB);
        console.log('%cGrade:', 'color: #2563eb;', trialGrade);
        console.log('%cToken:', 'color: #2563eb;', token ? token.substring(0, 20) + '...' : 'NOT FOUND');
        console.groupEnd();

        try {
            // Build FormData payload
            const payload = new FormData();
            payload.append('gender', trialGender);
            payload.append('date_of_birth', formattedDOB);
            payload.append('grade', trialGrade);
            payload.append('audience', selectedExam);

            const response = await apiClient.post('/cms/free-trail', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data: any = response.data;

            // Debug: Log API response
            console.group('%c🔍 TRIAL MODAL - API Response', 'color: #7A2060; font-size: 14px; font-weight: bold;');
            console.log('%cStatus:', 'color: #2563eb;', response.status);
            console.log('%cFull Response Data:', 'color: #16a34a; font-weight: bold;');
            console.log(data);
            console.groupEnd();

            // Determine if user has used trial
            let hasUsed = false;

            if (data) {
                if (data.isExpired === true || data.isExpired === 'true' || data.isExpired === 1 || data.isExpired === '1') hasUsed = true;
                if (data.is_expired === true || data.is_expired === 'true' || data.is_expired === 1 || data.is_expired === '1') hasUsed = true;
                if (data.expired === true || data.expired === 'true' || data.expired === 1 || data.expired === '1') hasUsed = true;
                if (data.status === 'expired' || data.status === 'used') hasUsed = true;
                if (data.is_trial === 1 || data.is_trial === '1' || data.is_trial === true) hasUsed = true;
            }

            if (hasUsed) {
                // Trial already used - show error result modal
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

            // Show success result modal (will auto-redirect after 5s)
            setShowTrialModal(false);
            setTrialSubmitting(false);
            setResultType('success');
            setShowResultModal(true);
        } catch (error: any) {
            // Handle 403 status from axios (trial already used)
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
     * Handle selecting a specific package and proceeding to checkout
     */
    const handlePackageSelect = (pkg: Package) => {
        const token = Cookies.get('token');

        Cookies.set('selectedPlan', JSON.stringify(pkg), { path: '/' });
        Cookies.set('fromTrial', hasUsedTrial ? 'false' : 'true', { path: '/' });

        if (!token) {
            router.push('/login');
            return;
        }

        window.location.href = '/checkout';
    };

    /**
     * Handle proceed to payment
     */
    const handleProceedToPayment = () => {
        if (!selectedPackage) {
            alert('الرجاء اختيار باقة');
            return;
        }

        const selectedPkg = packages.find(p => p.id === selectedPackage);
        if (!selectedPkg) return;

        // 🔍 DEBUG: Log all cookies to see what's available
        // console.group('%c🛒 PACKAGES PAGE - Proceed to Payment', 'color: #7A2060; font-size: 14px; font-weight: bold;');
        // console.log('%cAll Cookies:', 'color: #2563eb; font-weight: bold;', document.cookie);
        // console.log('%cCookies.get("token"):', 'color: #16a34a;', Cookies.get('token'));
        // console.groupEnd();

        // Check if user is authenticated
        const token = Cookies.get('token');
        // console.log('%c🔑 Token found:', 'color: #7A2060; font-weight: bold;', token ? 'YES - Going to checkout' : 'NO - Redirecting to login');
        if (!token) {
            // Store selected package and redirect to login
            Cookies.set('selectedPlan', JSON.stringify(selectedPkg));
            // Set trial flag based on whether user has used trial
            Cookies.set('fromTrial', hasUsedTrial ? 'false' : 'true');
            router.push('/login');
            return;
        }

        // Navigate to checkout using full page navigation to ensure cookies are sent
        Cookies.set('selectedPlan', JSON.stringify(selectedPkg), { path: '/' });
        // Set trial flag: true if user hasn't used trial, false if they have
        Cookies.set('fromTrial', hasUsedTrial ? 'false' : 'true', { path: '/' });
        // Use window.location.href for full page navigation (ensures cookies are sent to middleware)
        window.location.href = '/checkout';
    };
    return (
        <div className="bg-white min-h-screen" dir="rtl">
            {/* Main Container */}
            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Image
                            src="/image/mainLogo.png"
                            alt="شعار مبهر"
                            width={80}
                            height={80}
                            className="w-20 h-20"
                            priority
                        />
                        <h1 className="text-5xl font-bold text-[#28235B] mr-2">مبهير</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-2">قم بتكوين خطتك</h2>
                    <p className="text-gray-600">اختر برامج التحضير للامتحان التي ترغب بها</p>
                </div>

                {/* Exam Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* SAT I */}
                    <div
                        onClick={() => {
                            setSelectedExam('sat1');
                            router.replace('/packages?sat1', { scroll: false });
                        }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedExam === 'sat1'
                            ? 'border-[#7A2060] bg-[#FFF5FC]'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        <div className="flex items-start">
                            <input
                                type="radio"
                                name="examType"
                                checked={selectedExam === 'sat1'}
                                onChange={() => {
                                    setSelectedExam('sat1');
                                    router.replace('/packages?sat1', { scroll: false });
                                }}
                                className="mt-1 ml-3 w-5 h-5 accent-[#7A2060] cursor-pointer"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-black">اختبار قدرات الأول</h3>
                                <p className="text-sm text-gray-600">
                                    بالنسبة لكل طالب جامعي محتمل، يُعد هذا الامتحان أساسياً للتعليم العالي
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SAT II */}
                    <div
                        onClick={() => {
                            setSelectedExam('sat2');
                            router.replace('/packages?sat2', { scroll: false });
                        }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedExam === 'sat2'
                            ? 'border-[#7A2060] bg-[#FFF5FC]'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        <div className="flex items-start">
                            <input
                                type="radio"
                                name="examType"
                                checked={selectedExam === 'sat2'}
                                onChange={() => {
                                    setSelectedExam('sat2');
                                    router.replace('/packages?sat2', { scroll: false });
                                }}
                                className="mt-1 ml-3 w-5 h-5 accent-[#7A2060] cursor-pointer"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-black">اختبار دورات التحصيلي</h3>
                                <p className="text-sm text-gray-600">
                                    للمتخصصين في مجالات محددة والذين يتطلعون إلى صقل مهاراتهم
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plan Duration Selection */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-black text-center mb-4">
                        اختر برامج التحضير للامتحان التي ترغب بها
                    </h3>
                </div>



                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">جاري تحميل الباقات...</p>
                    </div>
                ) : (
                    <>
                        {/* Package Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {packages.filter((pkg) => {
                                if (selectedExam === 'sat1') return pkg.package_type === 'SAT 1';
                                if (selectedExam === 'sat2') return pkg.package_type === 'SAT 2';
                                return true;
                            }).map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className="border-2 border-gray-300 bg-white rounded-lg p-5"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-lg font-bold text-black">
                                                {pkg.title_ar}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {pkg.description_ar}
                                            </p>
                                        </div>

                                        {/* Save Badge */}
                                        {pkg.promotional_badge > 0 && (
                                            <span
                                                className="text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                                                style={{
                                                    backgroundColor:
                                                        pkg.promotional_badge >= 50 ? '#7A2060' : '#C445A6',
                                                }}
                                            >
                                                Save {pkg.promotional_badge}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="mb-2">
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-bold text-[#7A2060]">
                                                {pkg.price_display}
                                            </span>
                                            <span className="text-xl font-bold text-[#7A2060] mr-1">
                                                ريال سعودي
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {pkg.pricing_terms_ar}
                                        </p>
                                    </div>

                                    {/* Package CTA Button */}
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePackageSelect(pkg);
                                            }}
                                            className="w-full border border-[#671E5A] text-[#671E5A] hover:bg-[#671E5A] hover:text-white transition py-2 rounded-full font-semibold cursor-pointer"
                                        >
                                            {buttonTextTranslations[pkg.title] || `ابدأ ${pkg.title_ar}`}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Free Trial Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleFreeTrialClick}
                                className="w-full md:w-auto px-6 py-3 border border-[#671E5A] text-[#671E5A] hover:bg-[#671E5A] hover:text-white transition rounded-full font-semibold cursor-pointer"
                            >
                                جرّب مبهر القدرات مجانًا لمدة 3 أيام
                            </button>
                        </div>

                        {/* Proceed to Payment Button */}
                        {/* <div className="flex justify-center">
                            <button
                                onClick={handleProceedToPayment}
                                disabled={!selectedPackage}
                                className="bg-[#7A2060] text-white px-12 py-3 rounded-full font-semibold hover:bg-[#5a1848] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                انتقل إلى الدفع
                            </button>
                        </div> */}
                    </>
                )
                }
            </div>

            {/* Toast Container */}
            <ToastContainer rtl={true} />

            {/* Free Trial Modal */}
            {showTrialModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowTrialModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setShowTrialModal(false)}
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
            {/* Result Modal (Success / Error) */}
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
                                    : 'لا يمكنك استخدام التجربة المجانية أكثر من مرة'}
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
                    animation: circleProgress 5s linear forwards;
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
