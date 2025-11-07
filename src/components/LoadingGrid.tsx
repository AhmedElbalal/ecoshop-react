import React from 'react';

const LoadingGrid: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                {/* Animated Logo */}
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mx-auto mb-8 animate-pulse-slow flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">N</span>
                </div>

                {/* Loading Text */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 animate-pulse">
                    Loading Experience
                </h2>

                {/* Product Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
                        >
                            {/* Image Skeleton */}
                            <div className="w-full h-64 bg-gray-200"></div>

                            {/* Content Skeleton */}
                            <div className="p-6">
                                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

                                <div className="flex justify-between items-center">
                                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                                    <div className="h-10 bg-gray-200 rounded w-24"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading Bar */}
                <div className="mt-12 max-w-md mx-auto">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-700 animate-shimmer bg-[length:200px_100%]"></div>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Preparing your premium shopping experience...</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingGrid;