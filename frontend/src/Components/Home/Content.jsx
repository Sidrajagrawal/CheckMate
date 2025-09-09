import React, { useState, useEffect } from 'react'

const Content = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [magnifierPosition, setMagnifierPosition] = useState(0)

  const texts = [
    'Fact-check YouTube videos and viral images with one click.',
    'See the truth behind the videos and images you trust.',
    'Detect fake news, bias & misinformation — instantly.',
    "Don't just watch. Know what's true."
  ]

  const keywords = {
    'Fact-check': 'text-green-400',
    'truth': 'text-green-400',
    'videos': 'text-blue-400',
    'images': 'text-blue-400',
    'fake news': 'text-red-400',
    'bias': 'text-yellow-400',
    'misinformation': 'text-red-400',
    'true': 'text-green-400'
  }

  const searchWords = ['FACT', 'TRUTH', 'BIAS', 'FAKE', 'REAL', 'CHECK', 'VERIFY']

  const highlightKeywords = (text) => {
    let highlightedText = text

    Object.entries(keywords).forEach(([keyword, className]) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      highlightedText = highlightedText.replace(
        regex,
        `<span class="${className} font-semibold">${keyword}</span>`
      )
    })

    return highlightedText
  }

  // Magnifier animation effect (desktop only)
  useEffect(() => {
    const interval = setInterval(() => {
      setMagnifierPosition(prev => (prev + 1) % searchWords.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentFullText = texts[currentIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1))
        } else {
          setIsDeleting(true)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentFullText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 30 : 80)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting])

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(-12px) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
            transform: scale(1.1);
          }
        }
        @keyframes scan-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
        @keyframes scan-beam {
          0%, 100% { 
            transform: rotate(0deg) scaleY(1);
            opacity: 0.3;
          }
          25% { 
            transform: rotate(90deg) scaleY(1.2);
            opacity: 0.7;
          }
          50% { 
            transform: rotate(180deg) scaleY(1);
            opacity: 0.5;
          }
          75% { 
            transform: rotate(270deg) scaleY(1.2);
            opacity: 0.7;
          }
        }
        @keyframes particle-float {
          0% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% { 
            transform: translateY(-40px) translateX(20px);
            opacity: 0;
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-scan-pulse {
          animation: scan-pulse 3s ease-in-out infinite;
        }
        .animate-scan-beam {
          animation: scan-beam 4s linear infinite;
        }
        .animate-particle-float {
          animation: particle-float 4s ease-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        /* Mobile-specific styles to disable animations */
        @media (max-width: 768px) {
          .animate-float,
          .animate-float-gentle,
          .animate-pulse-glow,
          .animate-scan-pulse,
          .animate-scan-beam,
          .animate-particle-float,
          .animate-spin-slow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Content Container */}
      <div className='min-h-[30vh] md:min-h-[40vh] mx-auto flex flex-col md:flex-row items-center justify-center p-4 md:p-6'>
        
        {/* Desktop Animation Container - Hidden on Mobile */}
        <div className='hidden md:block w-full md:w-[40%] relative'>
          {/* Enhanced Magnifying Glass Animation Container */}
          <div className="magnifier-container relative w-52 h-52 mt-10 mx-auto">

            {/* Floating Search Words */}
            <div className="absolute inset-0 pointer-events-none">
              {searchWords.map((word, index) => (
                <div
                  key={word}
                  className={`absolute text-sm font-bold transition-all duration-1000 ease-in-out ${index === magnifierPosition
                      ? 'opacity-100 scale-110 text-yellow-300 animate-pulse-glow'
                      : 'opacity-40 scale-90'
                    }`}
                  style={{
                    top: `${20 + (index * 25) % 160}px`,
                    left: `${30 + (index * 35) % 120}px`,
                    transform: `rotate(${(index * 45) % 360}deg)`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {word}
                </div>
              ))}
            </div>

            {/* Scanning Light Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none">
              <div className="w-full h-full border-2 border-cyan-400 rounded-full animate-scan-pulse opacity-60"></div>
              <div className="absolute top-2 left-2 w-20 h-20 border border-green-400 rounded-full animate-scan-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Search Beam Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-2 h-32 bg-gradient-to-t from-transparent via-cyan-300 to-transparent animate-scan-beam opacity-70 origin-bottom"></div>
            </div>

            {/* Magnification Focus Ring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-dashed border-green-400 rounded-full animate-spin-slow opacity-50 pointer-events-none"></div>

            {/* Particle Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle-float opacity-70"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Typewriter Text Container - Mobile Optimized */}
        <div className='w-full md:w-[60%] px-2 md:px-4'>
          <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-medium leading-relaxed text-center md:text-left'>
            <span
              dangerouslySetInnerHTML={{
                __html: highlightKeywords(currentText)
              }}
            />
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity ml-0.5`}>
              |
            </span>
          </div>
        </div>

        {/* Mobile Simple Icon - Shown only on mobile as alternative to complex animations */}
       
      </div>
    </>
  )
}

export default Content