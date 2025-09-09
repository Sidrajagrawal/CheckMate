import React from 'react'

const Guide = () => {
  return (
    <div className='Main-Guide-Div w-[95vw] md:w-[60vw] ml-2 mt-5 md:ml-54 h-[150vh] md:-mt-18'>
      <div className="Guide-title text-xl md:text-4xl mt-2 font-bold text-amber-50 leading-10 md:leading-15">
        How to Verify the Truth Behind Online Content in Seconds ?
      </div>
      <div className="Guide-des mt-2 md:mt-8 text-[#85AACC] text-md ">
        <p className='leading-7 md:leading-10'>
          With the FactCheck Analyzer, it’s now possible to effortlessly verify facts, detect bias, and uncover misinformation in any YouTube video or viral image  directly from your browser. Known as one of the most powerful AI-based content verifiers, FactCheck lets you highlight misleading, manipulated, or emotionally charged content in seconds, so you can watch with full confidence and clarity.
        </p>
        <p className='mt-6 md:mt-12 leading-7 md:leading-10'>
          Every day, millions of people watch videos without knowing what's fact and what's fiction. Whether it’s political content, opinionated commentary FactCheck helps you see through the noise. With just a link or image upload, our tool reveals the truth behind the content all without popups, distractions, or misinformation of its own.
        </p>
      </div>
      <div className="Guide-how-title text-xl md:text-4xl mt-8 md:mt-16 font-bold text-amber-50">
        How to use?
      </div>
      <div className="Guide-how-des md:mt-8 md:text-lg text-[#85AACC] leading-7 md:leading-12">
        <p className=''>Verifying content is simple and fast. Just follow these steps:</p>
        <p className=''>1. Go to YouTube and copy the link of any video you want to verify.</p>
        <p className=''>2. Paste it into the FactCheck Analyzer on our website.</p>
        <p className=''>3. Within seconds, you’ll see the full transcript, and we’ll highlight all biased, misleading, or manipulated segments in red and yellow.</p>
        <p className=''>4. For images, just upload your file — and our system will extract the text and scan for misinformation instantly.</p>
        <p className=''>5. That’s it. No need to downloads videos, no ads — just fast, clean fact-checking.</p>
      </div>
      <div className="Guide-why mt-5 md:mt-10">
        <div className="Guide-why-title text-lg md:text-4xl font-bold text-amber-50">
          Why FactCheck?
        </div>
        <div className="Guide-why-des mt-4 md:text-lg text-[#85AACC] leading-7 md:leading-10">
          FactCheck is the ad-free, AI-powered content analysis platform designed to make the internet more trustworthy. With a user-friendly design and deep language models under the hood, it’s perfect for students, researchers, journalists, or anyone who wants the truth behind what they see.
          Stay informed. Stay aware. Stay ahead with FactCheck.
        </div>
      </div>
    </div>
  )
}

export default Guide