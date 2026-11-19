import Navbar from "@/components/Navber/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar/AnnouncementBar";
import Footer from "@/components/Footer/Footer";

export default function BlogDetailsLoading() {
    return (
        <div className="bg-white font-sans" dir="rtl">
            <header style={{ backgroundColor: "#F2F4F7" }} className="m-4 rounded-2xl overflow-hidden">
                <AnnouncementBar />
                <Navbar />

                <section className="bg-[#F2F4F7] max-w-7xl mx-auto px-4 py-8">
                    {/* Title Skeleton */}
                    <div className="text-center mb-8 space-y-3">
                        <div className="h-10 w-3/4 max-w-2xl bg-gray-300 rounded-lg animate-pulse mx-auto" />
                        <div className="h-8 w-1/2 max-w-lg bg-gray-300 rounded-lg animate-pulse mx-auto" />
                    </div>

                    {/* Image and Author Section Skeleton */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        {/* Title Image Skeleton */}
                        <div className="relative flex-1">
                            <div className="w-full h-[400px] bg-gray-300 rounded-lg shadow-md animate-pulse" />
                        </div>

                        {/* Author Info Skeleton */}
                        <div className="md:w-1/4 flex flex-col justify-between">
                            <div className="flex items-center space-x-3 space-x-reverse mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse" />
                                <div className="space-y-2 mr-3">
                                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
                                    <div className="h-3 w-16 bg-gray-300 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Share buttons skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                                    <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                                    <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>

            {/* Article Content Skeleton */}
            <main className="max-w-4xl mx-auto px-4 py-8 space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-11/12" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3 my-6" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-10/12" />
            </main>

            <Footer />
        </div>
    );
}
