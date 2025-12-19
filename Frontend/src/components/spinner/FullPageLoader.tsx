import React from "react";

const FullPageLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-6">

                {/* Spinner */}
                <div className="relative h-16 w-16">
                    {/* Base ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-slate-200" />

                    {/* Animated ring */}
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-500" />
                </div>

                {/* Text */}
                <div className="text-center">
                    <p className="text-base font-semibold text-slate-700">
                        Loading your Tasks...
                    </p>
                    <p className="mt-1 text-sm text-slate-400 animate-pulse">
                        Please wait a moment…
                    </p>
                </div>

                {/* Accessibility */}
                <span className="sr-only">Loading</span>
            </div>
        </div>
    );
};

export default React.memo(FullPageLoader);
