import Navbar from "@/components/Navber/Navbar";
import Footer from "@/components/Footer/Footer";

export default function BlogListingLoading() {
    return (
        <div className="bg-white font-sans overflow-x-hidden" dir="rtl">
            <header style={{ backgroundColor: "#f7e8f5" }} className="mb-4 md:m-4 rounded-0 md:rounded-2xl overflow-hidden">
                <Navbar />

                <div className="p-4">
                    <main className="max-w-7xl mx-auto px-4 py-8">
                        {/* Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                مدونات مبهر للطلاب
                            </h1>

                            {/* Search bar skeleton */}
                            <div className="max-w-xl mx-auto">
                                <div className="h-12 bg-white/70 rounded-full animate-pulse shadow-sm" />
                            </div>

                            {/* Category pills skeleton */}
                            <div className="flex flex-wrap justify-center gap-3 mt-6">
                                <div className="h-9 w-16 bg-white/70 rounded-full animate-pulse" />
                                <div className="h-9 w-20 bg-white/70 rounded-full animate-pulse" />
                                <div className="h-9 w-20 bg-white/70 rounded-full animate-pulse" />
                                <div className="h-9 w-28 bg-white/70 rounded-full animate-pulse" />
                            </div>
                        </div>

                        {/* Blog cards skeleton grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
                                    {/* Card image skeleton */}
                                    <div className="h-[240px] bg-gray-200 animate-pulse" />
                                    {/* Card content skeleton */}
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                                        <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </header>

            <Footer />
        </div>
    );
}
