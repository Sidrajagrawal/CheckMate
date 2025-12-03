import React, { useState, useEffect } from 'react';
import Chrome from '../../images/Chrome.png';
import ExtentionVideo from '../../Video/Extention.mp4';

const Extension = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    "Instant fact verification",
    "Bias detection",
    "Misinformation alerts",
    "Real-time analysis"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop Version - Your original code with slight modifications */}
      <div className='w-screen h-[100vh] hidden md:block'>
        <div className="windows w-[70%] h-[75%] mt-16 ml-48 border-t-3 border-r-3 border-[#293B68] rounded-4xl">
          <div className="win-items flex">
            <div className="win-search w-[73%] h-14 flex justify-end border-t-2 border-b-2 border-r-2 rounded-4xl mt-8 ml-8 border-[#293B68]">
              <div className="win-search-start mr-6 mt-1.5 text-3xl text-[#293B68]">
                <i className="ri-star-line"></i>
              </div>
            </div>
            <div className="win-ext mt-8 ml-5 w-[50px] text-3xl h-[50px] border-2 rounded-[50%] border-[#293B68]">
              <i className="ri-verified-badge-fill pl-2 text-[#00C084]"></i>
            </div>
            <div className="win-account mt-7 ml-5">
              <i className="ri-account-circle-line ml-2 text-6xl text-[#293B68]"></i>
            </div>
            <div className="win-menubar mt-8 ml-5">
              <i className="ri-more-2-line text-5xl text-[#293B68]"></i>
            </div>
          </div>
          <div className="win-body flex w-[100%] h-[75%]">
            <div className="win-left w-[60%] h-[100%] mt-5 ml-10">
              <div className='text-2xl font-bold text-[#5E606E] mt-6 pl-16'>Chrome Extension</div>
              <div className='text-3xl font-bold text-amber-50 mt-3 pl-16'>FACTCHECK.AI HELPER</div>
              <div className='mt-6 pl-16 text-lg text-[#85AACC]'>Install the FactCheck Helper extension directly in your Chrome <br/> browser and instantly verify facts, detect bias, and spot <br/>  misinformation—without ever leaving the YouTube page.</div>
              <div className='flex mt-20 ml-16 border-2 w-[47%] h-[15%] bg-[#00C084] rounded-2xl cursor-pointer hover:transform hover:scale-105 transition-transform duration-300'>
                <img src={Chrome} alt="Chrome logo" className='w-[35px] h-[35px] mt-3 ml-3'/>
                <span className='mt-4 ml-2 text-lg font-bold'>Add to Chrome</span>
                <span className='mt-4 pt-1 ml-3 w-18 pl-3 mb-4 text-sm bg-[#091548] text-amber-50 font-medium rounded-2xl'>it's Free</span>
              </div>
              <div className='ml-18 w-[44%] h-[25%] rounded-b-2xl bg-[#1F2342] pl-6 pt-4'>
                <div className="flex items-center space-x-1 text-[#FFC107] text-2xl">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                </div>
                <div className="text-[#85AACC] text-sm mt-2">Rated 4.5 out of 5 by 2,500+ users</div>
              </div>
            </div>
            <div className="win-right relative w-[35%] h-[100%] mt-5">
              <div className="absolute -top-4 left-[42%] w-0 h-0 border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-[#1F2342]"></div>
              <div className='w-full h-full rounded-xl overflow-hidden bg-[#1F2342] flex items-center justify-center'>
                  <video src={ExtentionVideo} className='w-full h-full object-cover' loop autoPlay muted></video>             
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - New aesthetic design */}
      <div className={`w-full min-h-screen bg-gradient-to-br from-[#0F1729] via-[#1A2332] to-[#293B68] md:hidden relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#00C084] rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-60 right-8 w-24 h-24 bg-[#FFC107] rounded-full opacity-10 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-40 left-6 w-20 h-20 bg-[#85AACC] rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Header Section */}
        <div className={`relative z-10 pt-16 px-6 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#00C084] to-[#00A876] rounded-full mb-6 shadow-lg">
            <i className="ri-verified-badge-fill text-3xl text-white"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            FACTCHECK.AI
          </h1>
          <p className="text-lg text-[#00C084] font-semibold mb-4">Chrome Extension</p>
          
          {/* Animated Feature Cycling */}
          <div className="h-8 mb-8">
            <p className={`text-[#85AACC] text-base transition-all duration-500 transform ${currentFeature >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              ✨ {features[currentFeature]}
            </p>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className={`relative z-10 px-8 mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative mx-auto max-w-sm">
            {/* Phone Frame */}
            <div className="bg-[#1F2342] rounded-3xl p-2 shadow-2xl border border-[#293B68]">
              <div className="bg-gradient-to-b from-[#2A3441] to-[#1F2342] rounded-2xl overflow-hidden">
                {/* Browser Header */}
                <div className="flex items-center justify-between p-4 bg-[#293B68]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[#FF5F57] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#28CA42] rounded-full"></div>
                  </div>
                  <div className="text-[#85AACC] text-xs">youtube.com</div>
                  <div className="w-6 h-6 bg-[#00C084] rounded-full flex items-center justify-center">
                    <i className="ri-shield-check-fill text-white text-xs"></i>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#00C084] rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[#00C084] text-sm font-medium">Fact Verified</p>
                      <p className="text-[#85AACC] text-xs">This information is accurate</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#0F1729] rounded-lg p-3 border border-[#00C084]/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="ri-information-line text-[#00C084] text-sm"></i>
                      <span className="text-[#00C084] text-xs font-medium">AI Analysis</span>
                    </div>
                    <p className="text-[#85AACC] text-xs leading-relaxed">
                      Content analysis complete. No misinformation detected.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#0F1729] rounded-lg p-2 text-center border border-[#293B68]">
                      <i className="ri-shield-check-line text-[#00C084] text-sm mb-1 block"></i>
                      <span className="text-[#85AACC] text-xs">Safe</span>
                    </div>
                    <div className="bg-[#0F1729] rounded-lg p-2 text-center border border-[#293B68]">
                      <i className="ri-speed-line text-[#FFC107] text-sm mb-1 block"></i>
                      <span className="text-[#85AACC] text-xs">Fast</span>
                    </div>
                    <div className="bg-[#0F1729] rounded-lg p-2 text-center border border-[#293B68]">
                      <i className="ri-eye-line text-[#85AACC] text-sm mb-1 block"></i>
                      <span className="text-[#85AACC] text-xs">Smart</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`relative z-10 px-6 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-8">
            <p className="text-[#85AACC] text-sm mb-6 leading-relaxed">
              Install our Chrome extension and get instant fact-checking, 
              bias detection, and misinformation alerts without leaving your page.
            </p>
            
            {/* Install Button */}
            <button className="w-full max-w-sm mx-auto bg-gradient-to-r from-[#00C084] to-[#00A876] text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center space-x-3">
              <img src={Chrome} alt="Chrome logo" className='w-[35px] h-[35px]  ml-3'/>
              <span>Add to Chrome</span>
              <span className="bg-[#091548] text-xs px-3 py-1 rounded-full">Free</span>
            </button>
            
            {/* Rating */}
            <div className="mt-6 p-4 bg-[#1F2342]/50 backdrop-blur-sm rounded-xl border border-[#293B68]/30">
              <div className="flex items-center justify-center space-x-1 text-[#FFC107] text-lg mb-2">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
              </div>
              <p className="text-[#85AACC] text-xs">Rated 4.5/5 by 2,500+ users</p>
            </div>
          </div>
          
          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: "ri-flash-line", title: "Instant", desc: "Real-time analysis" },
              { icon: "ri-shield-check-line", title: "Secure", desc: "Privacy-focused" },
              { icon: "ri-eye-line", title: "Smart", desc: "AI-powered detection" },
              { icon: "ri-heart-line", title: "Free", desc: "Always free to use" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`bg-[#1F2342]/30 backdrop-blur-sm rounded-xl p-4 border border-[#293B68]/30 text-center transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{animationDelay: `${600 + index * 100}ms`}}
              >
                <i className={`${feature.icon} text-[#00C084] text-2xl mb-2 block`}></i>
                <h3 className="text-white text-sm font-semibold mb-1">{feature.title}</h3>
                <p className="text-[#85AACC] text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Extension;