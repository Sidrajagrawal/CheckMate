import React from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
    const icons = {
        success: 'ri-checkbox-circle-line',
        error: 'ri-error-warning-line',
        warning: 'ri-alert-line',
        info: 'ri-information-line',
    };

    const colors = {
        success: 'from-green-500 to-emerald-600',
        error: 'from-red-500 to-rose-600',
        warning: 'from-yellow-500 to-amber-600',
        info: 'from-blue-500 to-cyan-600',
    };

    return (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
            <div
                className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[320px] max-w-md backdrop-blur-sm`}
            >
                <i className={`${icons[type]} text-3xl`}></i>
                <p className="flex-1 text-sm font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                    <i className="ri-close-line text-xl"></i>
                </button>
            </div>
        </div>
    );
};

export default Toast;
