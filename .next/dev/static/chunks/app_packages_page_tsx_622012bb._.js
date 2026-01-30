(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/packages/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PackagesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PackagesPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // State
    const [packages, setPackages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedPackage, setSelectedPackage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedExam, setSelectedExam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('sat1');
    // Check if user has used trial (from API)
    const [hasUsedTrial, setHasUsedTrial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Translation mappings (from SelectPackageAr.jsx)
    const titleTranslations = {
        'Monthly Plan': 'الخطة الشهرية',
        '3 Months Plan': 'خطة ٣ أشهر',
        '6 Months Plan': 'خطة ٦ أشهر',
        'Yearly Plan': 'الباقة السنوية'
    };
    const descriptionTranslations = {
        'Perfect for starting your journey': 'استكشف بوتيرتك الخاصة',
        'Ideal for focused preparation': 'مثالي لمواسم الامتحانات',
        'Best for comprehensive prep': 'التنافس على أعلى المستويات',
        'Maximum value for long-term': 'إتقان وتيرة قدرات'
    };
    const pricingTermsTranslations = {
        'monthly': 'شهريًا',
        '3month': 'لمدة ٣ أشهر',
        '6month': 'لمدة ٦ أشهر',
        'yearly': 'لمدة ١٢ شهرًا'
    };
    /**
     * Check trial eligibility from user data (without activating trial)
     */ /**
     * Check trial eligibility from user data (without activating trial)
     */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PackagesPage.useEffect": ()=>{
            const checkTrialEligibility = {
                "PackagesPage.useEffect.checkTrialEligibility": async ()=>{
                    const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('token');
                    if (!token) {
                        // If no token, assume fresh user (eligible for trial) ?? 
                        // Wait, if not logged in, we probably want to show them the trial option to entice them?
                        // The user requirement says: "when user after login go to the packages page then this api will triger"
                        // If not logged in, maybe show trial option by default? The existing code set hasUsedTrial=false (so they see trial).
                        setHasUsedTrial(false);
                        return;
                    }
                    try {
                        // GET request to fetch trial status
                        const response = await fetch(`${("TURBOPACK compile-time value", "https://dev.mubhir.ai/api")}/cms/free-trail`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        // Try to parse JSON response
                        let data;
                        try {
                            data = await response.json();
                        } catch (e) {
                        // Ignore JSON parse errors
                        }
                        if (response.ok) {
                            // Status 200-299: Check isExpired flag
                            // If data is missing for some reason, default to false (safe for 200 OK)
                            setHasUsedTrial(data?.isExpired === true);
                        } else if (response.status === 403) {
                            // Status 403: Forbidden usually means trial is already valid/used or user is not allowed.
                            // The API specifically returns 403 when trial is expired.
                            // So we treat 403 as "Trial Used".
                            setHasUsedTrial(true);
                        } else {
                            // Other errors (500, etc): Fail safe default to false (show trial)
                            setHasUsedTrial(false);
                        }
                    } catch (error) {
                        console.error('Failed to check trial eligibility (network error):', error);
                        setHasUsedTrial(false);
                    }
                }
            }["PackagesPage.useEffect.checkTrialEligibility"];
            checkTrialEligibility();
        }
    }["PackagesPage.useEffect"], []);
    /**
     * Fetch packages from API
     */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PackagesPage.useEffect": ()=>{
            const fetchPackages = {
                "PackagesPage.useEffect.fetchPackages": async ()=>{
                    try {
                        const response = await fetch(`${("TURBOPACK compile-time value", "https://dev.mubhir.ai/api")}/packages`);
                        const json = await response.json();
                        if (json.status === 'success') {
                            // Map packages with Arabic translations
                            const mappedPackages = json.data.map({
                                "PackagesPage.useEffect.fetchPackages.mappedPackages": (pkg)=>({
                                        ...pkg,
                                        title_ar: titleTranslations[pkg.title] || pkg.title,
                                        description_ar: descriptionTranslations[pkg.description] || pkg.description,
                                        pricing_terms_ar: pricingTermsTranslations[pkg.pricing_terms] || pkg.pricing_terms,
                                        price_display: pkg.price
                                    })
                            }["PackagesPage.useEffect.fetchPackages.mappedPackages"]);
                            setPackages(mappedPackages);
                        }
                    } catch (error) {
                        console.error('Error fetching packages:', error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["PackagesPage.useEffect.fetchPackages"];
            fetchPackages();
        }
    }["PackagesPage.useEffect"], []);
    /**
     * Set page title
     */ // useEffect(() => {
    //     document.title = 'مبهر - اختر باقتك';
    // }, []);
    /**
     * Handle proceed to payment
     */ const handleProceedToPayment = ()=>{
        if (!selectedPackage) {
            alert('الرجاء اختيار باقة');
            return;
        }
        const selectedPkg = packages.find((p)=>p.id === selectedPackage);
        if (!selectedPkg) return;
        // Check if user is authenticated
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('token');
        if (!token) {
            // Store selected package and redirect to login
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set('selectedPlan', JSON.stringify(selectedPkg));
            // Set trial flag based on whether user has used trial
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set('fromTrial', hasUsedTrial ? 'false' : 'true');
            router.push('/login');
            return;
        }
        // Navigate to checkout
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set('selectedPlan', JSON.stringify(selectedPkg));
        // Set trial flag: true if user hasn't used trial, false if they have
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set('fromTrial', hasUsedTrial ? 'false' : 'true');
        router.push('/checkout');
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PackagesPage.useEffect": ()=>{
            document.title = 'مبهر - اختر باقتك';
        }
    }["PackagesPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white min-h-screen",
        dir: "rtl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/image/mainLogo.png",
                                    alt: "شعار مبهر",
                                    width: 80,
                                    height: 80,
                                    className: "w-20 h-20"
                                }, void 0, false, {
                                    fileName: "[project]/app/packages/page.tsx",
                                    lineNumber: 209,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-5xl font-bold text-[#28235B] mr-2",
                                    children: "مبهير"
                                }, void 0, false, {
                                    fileName: "[project]/app/packages/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/packages/page.tsx",
                            lineNumber: 208,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-black mb-2",
                            children: "قم بتكوين خطتك"
                        }, void 0, false, {
                            fileName: "[project]/app/packages/page.tsx",
                            lineNumber: 218,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "اختر برامج التحضير للامتحان التي ترغب بها"
                        }, void 0, false, {
                            fileName: "[project]/app/packages/page.tsx",
                            lineNumber: 219,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/packages/page.tsx",
                    lineNumber: 207,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setSelectedExam('sat1'),
                            className: `border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedExam === 'sat1' ? 'border-[#7A2060] bg-[#FFF5FC]' : 'border-gray-300 bg-white'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: selectedExam === 'sat1',
                                        onChange: ()=>setSelectedExam('sat1'),
                                        className: "mt-1 ml-3 w-5 h-5 text-[#7A2060] border-gray-300 rounded focus:ring-[#7A2060]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/packages/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-black",
                                                children: "اختبار قدرات الأول"
                                            }, void 0, false, {
                                                fileName: "[project]/app/packages/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "بالنسبة لكل طالب جامعي محتمل، يُعد هذا الامتحان أساسياً للتعليم العالي"
                                            }, void 0, false, {
                                                fileName: "[project]/app/packages/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/packages/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/packages/page.tsx",
                                lineNumber: 232,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/packages/page.tsx",
                            lineNumber: 225,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-2 border-gray-200 rounded-lg p-4 bg-gray-50 opacity-60 cursor-not-allowed",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        disabled: true,
                                        className: "mt-1 ml-3 w-5 h-5 border-gray-300 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/app/packages/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-gray-500",
                                                children: "اختبار SAT II (قريبًا)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/packages/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400",
                                                children: "للمتخصصين في مجالات محددة والذين يتطلعون إلى صقل مهاراتهم"
                                            }, void 0, false, {
                                                fileName: "[project]/app/packages/page.tsx",
                                                lineNumber: 258,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/packages/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/packages/page.tsx",
                                lineNumber: 250,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/packages/page.tsx",
                            lineNumber: 249,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/packages/page.tsx",
                    lineNumber: 223,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-black text-center mb-4",
                        children: "اختر برامج التحضير للامتحان التي ترغب بها"
                    }, void 0, false, {
                        fileName: "[project]/app/packages/page.tsx",
                        lineNumber: 268,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/packages/page.tsx",
                    lineNumber: 267,
                    columnNumber: 17
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: "جاري تحميل الباقات..."
                    }, void 0, false, {
                        fileName: "[project]/app/packages/page.tsx",
                        lineNumber: 276,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/packages/page.tsx",
                    lineNumber: 275,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8",
                            children: packages.slice(0, 4).map((pkg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>setSelectedPackage(pkg.id),
                                    className: `border-2 rounded-lg p-5 cursor-pointer transition-all ${selectedPackage === pkg.id ? 'border-[#7A2060] bg-[#FFF5FC]' : 'border-gray-300 bg-white'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            checked: selectedPackage === pkg.id,
                                                            onChange: ()=>setSelectedPackage(pkg.id),
                                                            className: "mt-1 ml-3 w-5 h-5 text-[#7A2060] border-gray-300 focus:ring-[#7A2060]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/packages/page.tsx",
                                                            lineNumber: 293,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "text-lg font-bold text-black",
                                                                    children: pkg.title_ar
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/packages/page.tsx",
                                                                    lineNumber: 300,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600",
                                                                    children: pkg.description_ar
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/packages/page.tsx",
                                                                    lineNumber: 303,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/packages/page.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/packages/page.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 41
                                                }, this),
                                                pkg.promotional_badge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap",
                                                    style: {
                                                        backgroundColor: pkg.promotional_badge >= 50 ? '#7A2060' : '#C445A6'
                                                    },
                                                    children: [
                                                        "Save ",
                                                        pkg.promotional_badge,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/packages/page.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/packages/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2",
                                            children: !hasUsedTrial ? // New user - show strikethrough price + trial text side by side
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-baseline gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl font-semibold text-[#671E5A] line-through",
                                                                children: pkg.price_display
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/packages/page.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl font-medium text-gray-400 line-through",
                                                                children: "-SAR"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/packages/page.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl font-semibold text-[#7A2060]",
                                                                children: "تجربة لمدة ٣ أيام"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/packages/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/packages/page.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mt-1",
                                                        children: [
                                                            pkg.pricing_terms_ar,
                                                            " – ادفع ",
                                                            pkg.price_display,
                                                            " SAR عند نهاية الفترة التجريبية"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/packages/page.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true) : // Existing user - show only regular price
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-baseline",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-3xl font-bold text-[#7A2060]",
                                                                children: pkg.price_display
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/packages/page.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl font-bold text-[#7A2060] mr-1",
                                                                children: "ريال سعودي"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/packages/page.tsx",
                                                                lineNumber: 350,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/packages/page.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600 mt-1",
                                                        children: pkg.pricing_terms_ar
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/packages/page.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/app/packages/page.tsx",
                                            lineNumber: 324,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, pkg.id, true, {
                                    fileName: "[project]/app/packages/page.tsx",
                                    lineNumber: 283,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/packages/page.tsx",
                            lineNumber: 281,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleProceedToPayment,
                                disabled: !selectedPackage,
                                className: "bg-[#7A2060] text-white px-12 py-3 rounded-full font-semibold hover:bg-[#5a1848] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                children: "انتقل إلى الدفع"
                            }, void 0, false, {
                                fileName: "[project]/app/packages/page.tsx",
                                lineNumber: 366,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/packages/page.tsx",
                            lineNumber: 365,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/app/packages/page.tsx",
            lineNumber: 204,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/packages/page.tsx",
        lineNumber: 202,
        columnNumber: 9
    }, this);
}
_s(PackagesPage, "S23OGzKJT/2TYecqUGViLbGFnFY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PackagesPage;
var _c;
__turbopack_context__.k.register(_c, "PackagesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_packages_page_tsx_622012bb._.js.map