'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';

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

    // API Base URL from environment variable
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sat.mubhir.ai/api';

    // State
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [selectedExam, setSelectedExam] = useState<'sat1' | null>('sat1');

    // Check if user has used trial (from API)
    const [hasUsedTrial, setHasUsedTrial] = useState(false);

    // Translation mappings (from SelectPackageAr.jsx)
    const titleTranslations: Record<string, string> = {
        'Monthly Plan': 'الباقة الشهرية',
        '3 Months Plan': 'خطة ٣ أشهر',
        '6 Months Plan': 'خطة ٦ أشهر',
        'Yearly Plan': 'الباقة السنوية',
    };

    const descriptionTranslations: Record<string, string> = {
        'Perfect for starting your journey': 'استكشف بالسرعة التي تناسبك',
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

    /**
     * Check trial eligibility from API
     */
    useEffect(() => {
        const checkTrialEligibility = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setHasUsedTrial(false);
                return;
            }

            try {
                // POST request to check trial eligibility
                const response = await fetch(`${API_BASE_URL}/cms/free-trail`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // If user already used trial, API will indicate it
                    setHasUsedTrial(data.trial_used === true || data.trial_used === 1);
                } else {
                    // If API returns error, assume trial not used
                    setHasUsedTrial(false);
                }
            } catch (error) {
                console.error('Failed to check trial eligibility:', error);
                setHasUsedTrial(false);
            }
        };

        checkTrialEligibility();
    }, []);

    /**
     * Fetch packages from API
     */
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/packages`);
                const json: PackagesResponse = await response.json();

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
                console.error('Error fetching packages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    /**
     * Set page title
     */
    useEffect(() => {
        document.title = 'مبهر - اختر باقتك';
    }, []);

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

        // Check if user is authenticated
        const token = Cookies.get('token');
        if (!token) {
            // Store selected package and redirect to login
            Cookies.set('selectedPlan', JSON.stringify(selectedPkg));
            // Set trial flag based on whether user has used trial
            Cookies.set('fromTrial', hasUsedTrial ? 'false' : 'true');
            router.push('/login');
            return;
        }

        // Navigate to checkout
        Cookies.set('selectedPlan', JSON.stringify(selectedPkg));
        // Set trial flag: true if user hasn't used trial, false if they have
        Cookies.set('fromTrial', hasUsedTrial ? 'false' : 'true');
        router.push('/checkout');
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
                        />
                        <h1 className="text-5xl font-bold text-[#28235B] mr-2">Mubhir</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-2">Configure your plan</h2>
                    <p className="text-gray-600">Select your desired Exam Prep Programs</p>
                </div>

                {/* Exam Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* SAT I */}
                    <div
                        onClick={() => setSelectedExam('sat1')}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedExam === 'sat1'
                            ? 'border-[#7A2060] bg-[#FFF5FC]'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                checked={selectedExam === 'sat1'}
                                onChange={() => setSelectedExam('sat1')}
                                className="mt-1 ml-3 w-5 h-5 text-[#7A2060] border-gray-300 rounded focus:ring-[#7A2060]"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-black">SAT I</h3>
                                <p className="text-sm text-gray-600">
                                    For every college prospect, the essential exam for higher education
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SAT II - Coming Soon */}
                    <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 opacity-60 cursor-not-allowed">
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                disabled
                                className="mt-1 ml-3 w-5 h-5 border-gray-300 rounded"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-gray-500">SAT II (Coming Soon)</h3>
                                <p className="text-sm text-gray-400">
                                    For subject-specific specialists looking to sharpen their skills
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plan Duration Selection */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-black text-center mb-4">
                        Select your desired plan duration
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
                            {packages.slice(0, 4).map((pkg) => (
                                <div
                                    key={pkg.id}
                                    onClick={() => setSelectedPackage(pkg.id)}
                                    className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${selectedPackage === pkg.id
                                        ? 'border-[#7A2060] bg-[#FFF5FC]'
                                        : 'border-gray-300 bg-white'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-start">
                                            <input
                                                type="radio"
                                                checked={selectedPackage === pkg.id}
                                                onChange={() => setSelectedPackage(pkg.id)}
                                                className="mt-1 ml-3 w-5 h-5 text-[#7A2060] border-gray-300 focus:ring-[#7A2060]"
                                            />
                                            <div>
                                                <h4 className="text-lg font-bold text-black">
                                                    {pkg.title_ar}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {pkg.description_ar}
                                                </p>
                                            </div>
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
                                        {!hasUsedTrial ? (
                                            // New user - show strikethrough price + trial text side by side
                                            <>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-3xl font-semibold text-[#671E5A] line-through">
                                                        {pkg.price_display}
                                                    </span>
                                                    <span className="text-xl font-medium text-gray-400 line-through">
                                                        -SAR
                                                    </span>
                                                    <span className="text-2xl font-semibold text-[#7A2060]">
                                                        5 day trial
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {pkg.pricing_terms_ar} - pay {pkg.price_display} SAR at end of trial
                                                </p>
                                            </>
                                        ) : (
                                            // Existing user - show only regular price
                                            <>
                                                <div className="flex items-baseline">
                                                    <span className="text-3xl font-bold text-[#7A2060]">
                                                        {pkg.price_display}
                                                    </span>
                                                    <span className="text-xl font-bold text-[#7A2060] mr-1">
                                                        SAR
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {pkg.pricing_terms_ar}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Proceed to Payment Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleProceedToPayment}
                                disabled={!selectedPackage}
                                className="bg-[#7A2060] text-white px-12 py-3 rounded-full font-semibold hover:bg-[#5a1848] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
