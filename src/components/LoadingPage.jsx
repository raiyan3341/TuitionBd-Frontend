// src/components/Shared/LoadingPage.jsx
import React from 'react';

const LoadingPage = () => {
    return (
        // Full screen overlay with a high z-index
        <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-[100]">
            <div className="flex flex-col items-center">
                {/* DaisyUI Spinner */}
                <span className="loading loading-spinner loading-lg text-primary text-5xl"></span>
                <p className="mt-4 text-lg font-medium text-gray-600">Loading your data...</p>
            </div>
        </div>
    );
};

export default LoadingPage;