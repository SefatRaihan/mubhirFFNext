'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<{ name?: string; rating?: string; message?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: { name?: string; rating?: string; message?: string } = {};
        if (!name.trim()) newErrors.name = 'الاسم مطلوب';
        if (rating === 0) newErrors.rating = 'التقييم مطلوب';
        if (!message.trim()) newErrors.message = 'الرسالة مطلوبة';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare request data
            const requestData = {
                reviewer_name: name,
                rating: rating,
                content: message,
            };

            const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/review-store`;

            // Log request details
            console.log('=== Review Submission Started ===');
            console.log('Endpoint:', endpoint);
            console.log('Request Data:', requestData);

            // Submit the review to API
            const response = await axios.post(endpoint, requestData);

            // Log response details
            console.log('Response Status:', response.status);
            console.log('Response Data:', response.data);

            if (response.data.status) {
                console.log('✅ Review submitted successfully!');
                console.log('Review ID:', response.data.data?.id);
                console.log('Message:', response.data.message);
                alert('تم إرسال تعليقك بنجاح! سيتم مراجعته قريباً.');

                // Reset form and close modal
                setName('');
                setRating(0);
                setMessage('');
                setErrors({});
                onClose();
            } else {
                console.error('❌ Review submission failed');
                console.error('Response:', response.data);
                alert('حدث خطأ أثناء إرسال التعليق. يرجى المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error('=== Error submitting review ===');
            console.error('Error:', error);
            if (axios.isAxiosError(error)) {
                console.error('Response Status:', error.response?.status);
                console.error('Response Data:', error.response?.data);
                console.error('Request Config:', error.config);
            }
            alert('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsSubmitting(false);
            console.log('=== Review Submission Ended ===');
        }
    };

    const ratingChanged = (newRating: number) => {
        setRating(newRating);
        if (errors.rating) {
            setErrors({ ...errors, rating: undefined });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 left-4 bg-[#671E5A] text-white p-1 rounded-full hover:bg-[#7d2569] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input */}
                                <div>
                                    <label className="block text-right text-sm font-medium text-gray-700 mb-2">
                                        الاسم الكامل*
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (errors.name) setErrors({ ...errors, name: undefined });
                                        }}
                                        placeholder="Khalid al-Mahmood"
                                        className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#671e5a] focus:border-transparent`}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm text-right mt-1">{errors.name}</p>}
                                </div>

                                {/* Star Rating */}
                                <div>
                                    <label className="block text-right text-sm font-medium text-gray-700 mb-2">
                                        تصنيف*
                                    </label>
                                    <div className="flex justify-start gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => ratingChanged(star)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="w-10 h-10"
                                                    fill={star <= rating ? '#671e5a' : 'none'}
                                                    stroke={star <= rating ? '#671e5a' : '#e5e7eb'}
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                                    />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.rating && <p className="text-red-500 text-sm text-right mt-1">{errors.rating}</p>}
                                </div>

                                {/* Message Textarea */}
                                <div>
                                    <label className="block text-right text-sm font-medium text-gray-700 mb-2">
                                        رسالة*
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                            if (errors.message) setErrors({ ...errors, message: undefined });
                                        }}
                                        placeholder="أخبرنا بتفصيلك..."
                                        rows={4}
                                        className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#671e5a] focus:border-transparent resize-none`}
                                    />
                                    {errors.message && <p className="text-red-500 text-sm text-right mt-1">{errors.message}</p>}
                                </div>

                                {/* Submit Button */}
                                {/* <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center gap-3 bg-[#671e5a] text-white font-medium rounded-full px-6 py-4 shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12H21" />
                                        </svg>
                                    </span>
                                    اترك تعليقًا
                                </motion.button> */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className='w-full flex items-center justify-between text-white pr-6 pl-1 py-1 rounded-full disabled:opacity-50 bg-[#671E5A]'>
                                    {isSubmitting ? 'جارٍ الإرسال...' : 'اترك تعليقًا'}
                                    <span className="shrink-0 size-12 grid place-items-center bg-white text-[#671E5A] rounded-full">
                                        {isSubmitting ? (
                                            <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                aria-hidden="true"
                                            >
                                                <path d="M15 5l7 7-7 7"></path>
                                                <path d="M22 12H3"></path>
                                            </svg>
                                        )}
                                    </span>
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
