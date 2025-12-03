import { useState, useEffect } from 'react';

const LoaderComp = () => {
    const [dots, setDots] = useState('');
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center items-center z-50">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">
                        Fact<span className="text-emerald-400">Checker</span>
                    </span>
                    <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                        <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-xs text-emerald-400 font-medium">Verified</span>
                    </div>
                </div>
            </div>
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative bg-slate-800/50 border-2 border-emerald-500/30 rounded-full p-6">
                    <svg className="w-16 h-16 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
            </div>
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-xl font-semibold text-white">
                    Verifying your credentials{dots}
                </h2>
                <p className="text-sm text-slate-400">
                    Securing your session
                </p>
            </div>
            <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full animate-[loading_1.5s_ease-in-out_infinite]">
                </div>
            </div>

            <style>{`
                @keyframes loading {
                    0% {
                        width: 0%;
                        margin-left: 0%;
                    }
                    50% {
                        width: 75%;
                        margin-left: 0%;
                    }
                    100% {
                        width: 0%;
                        margin-left: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoaderComp;