import React, { useState, useEffect } from 'react'
import  Auth  from './Auth.jsx'
import { useNavigate } from 'react-router-dom';

const BackAuth = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const navigate = useNavigate();

  const cards = [
    {
      icon: "🔍",
      title: "Real-Time Fact Checking",
      description: "Instantly verify claims and statements with our advanced AI-powered fact-checking engine",
      gradient: "from-#242627 to-#242627",
      iconBg: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🎯",
      title: "Bias Detection",
      description: "Identify political bias, emotional manipulation, and misleading narratives in any content",
      gradient: "from-#242627 to-#242627",
      iconBg: "from-purple-500 to-pink-500"
    },
    {
      icon: "🌐",
      title: "Multi-Platform Analysis",
      description: "Analyze content from social media, news sites, blogs, and any online source seamlessly",
      gradient: "from-#242627 to-#242627",
      iconBg: "from-green-500 to-emerald-500"
    },
    {
      icon: "⚡",
      title: "Lightning Fast Results",
      description: "Get comprehensive analysis reports in seconds, not minutes or hours",
      gradient: "from-#242627 to-#242627",
      iconBg: "from-yellow-500 to-orange-500"
    },
    {
      icon: "🛡",
      title: "Trusted Sources",
      description: "Cross-reference with verified databases and credible sources for maximum accuracy",
      gradient: "from-#242627 to-#242627",
      iconBg: "from-red-500 to-rose-500"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [cards.length])

  return (
    <div className='w-screen h-screen bg-gradient-to-br from-[#0F1729] via-[#1A2332] to-[#293B68] flex overflow-hidden'>
        <div className="hidden md:block cardMainDiv w-[55%] h-full relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="Card-logo w-full h-[10%] flex relative z-10">
              <div className='text-[18px] text-[#85AACC] cursor-pointer mt-6 ml-8 hover:text-amber-50' onClick={() => navigate('/')}>
                Home
              </div>
              <div className="text-2xl font-bold text-white flex w-full justify-center items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <span>FactCheck</span>
              </div>
            </div>

            <div className="Card-Main-title w-full h-[25%] text-white mt-8 relative z-10">
                <div className='text-center text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight'>
                  Verify Online Content Anywhere
                </div>
                <div className='text-center mt-4 text-gray-300 text-lg px-8'>
                  Analyze facts and expose bias from any device with cutting-edge AI technology
                </div>
            </div>

            <div className="cards w-full h-[65%] flex items-center justify-center relative z-10 px-8">
              <div className="relative w-full max-w-md">
                {/* Cards container */}
                <div className="relative h-64 perspective-1000">
                  {cards.map((card, index) => {
                    const isActive = index === currentCard
                    const isPrev = index === (currentCard - 1 + cards.length) % cards.length
                    const isNext = index === (currentCard + 1) % cards.length
                    
                    let transform = 'translateX(100%) rotateY(45deg) scale(0.8)'
                    let opacity = '0'
                    let zIndex = '0'
                    
                    if (isActive) {
                      transform = 'translateX(0%) rotateY(0deg) scale(1)'
                      opacity = '1'
                      zIndex = '30'
                    } else if (isPrev) {
                      transform = 'translateX(-100%) rotateY(-45deg) scale(0.8)'
                      opacity = '0.3'
                      zIndex = '10'
                    } else if (isNext) {
                      transform = 'translateX(100%) rotateY(45deg) scale(0.8)'
                      opacity = '0.3'
                      zIndex = '10'
                    }

                    return (
                      <div
                        key={index}
                        className="absolute inset-0 transition-all duration-1000 ease-in-out"
                        style={{
                          transform,
                          opacity,
                          zIndex
                        }}
                      >
                        <div className={w-full h-full bg-gradient-to-br ${card.gradient} backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl}>
                          <div className="flex flex-col items-center text-center h-full">
                            {/* Icon */}
                            <div className={w-16 h-16 bg-gradient-to-r ${card.iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300}>
                              <span className="text-2xl">{card.icon}</span>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                              {card.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-gray-200 text-sm leading-relaxed flex-1 flex items-center">
                              {card.description}
                            </p>
                            
                            {/* Decorative element */}
                            <div className="mt-4 flex space-x-2">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                                  style={{ animationDelay: ${i * 0.3}s }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center mt-8 space-x-3">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCard(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentCard 
                          ? 'bg-white shadow-lg scale-125' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Feature stats */}
                <div className="mt-8 flex justify-center space-x-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">5+</div>
                    <div className="text-sm text-gray-400">Features</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-sm text-gray-400">Available</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">Free</div>
                    <div className="text-sm text-gray-400">To Start</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="auth w-full md:w-[45%] h-full bg-white md:rounded-l-4xl">
            <Auth></Auth>
        </div>
    </div>
  )
}

export default BackAuth