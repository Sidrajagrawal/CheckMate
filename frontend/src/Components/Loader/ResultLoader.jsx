import React from "react";

const ResultLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-[#0f1729] via-[#1a2332] to-[#293b68] text-white overflow-hidden relative">
      {/* Background animated gradient lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute top-60 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse delay-150"></div>
        <div className="absolute bottom-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse delay-300"></div>
      </div>

      {/* Central AI Orb */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full bg-cyan-400/10 blur-2xl animate-ping"></div>
        <div className="absolute w-40 h-40 rounded-full border-4 border-cyan-400/30 animate-spin-slow"></div>
        <div className="absolute w-52 h-52 rounded-full border-t-2 border-purple-400/20 animate-spin-slower"></div>
        <div className="text-cyan-400 text-6xl animate-pulse z-10">
          <i className="ri-cpu-line"></i>
        </div>
      </div>

      {/* AI Processing Text */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-cyan-300 tracking-wide animate-pulse">
          AI is Analyzing Your Media...
        </h2>
        <p className="mt-3 text-gray-400 text-sm sm:text-base animate-fade-in">
          Running deep learning models: Transcript Extraction → Claim Detection → Evidence Verification
        </p>
      </div>

      {/* Dots Loading Animation */}
      <div className="mt-8 flex gap-2">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Animated floating icons */}
      <div className="absolute top-16 left-16 text-blue-400 opacity-20 text-3xl animate-float-slow">
        <i className="ri-brain-line"></i>
      </div>
      <div className="absolute bottom-24 right-16 text-purple-400 opacity-20 text-3xl animate-float">
        <i className="ri-ai-generate"></i>
      </div>
      <div className="absolute top-32 right-24 text-cyan-400 opacity-20 text-3xl animate-float delay-200">
        <i className="ri-database-2-line"></i>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slower {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ResultLoader;
