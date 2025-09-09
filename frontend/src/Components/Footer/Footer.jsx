import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = ({ onScrollToTop }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    console.log('Home clicked, scrolling to top...');
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      // Fallback if no prop is passed
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className='Footer-Div w-full h-[20vh] border-t-2 border-[#1b2936] flex'>
      <div className="footer-logo hidden md:w-[20%] "></div>
      <div className="footer-menu w-[80%] md:w-[80%] text-[#85AACC] ">
        <ul className='flex md:space-x-20 space-x-10 mt-6 md:mt-12 justify-center md:text-lg font-semibold'>
          <li className='hover:text-amber-50 cursor-pointer' onClick={handleHomeClick}>Home</li>
          <li className='hover:text-amber-50 cursor-pointer' onClick={() => navigate('/about')}>About</li>
          <li className='hover:text-amber-50 cursor-pointer' onClick={() => navigate('/contact')}>Contact Us</li>
        </ul>
        <div className='flex justify-center text-sm mt-2 md:mt-5'>
          © 2025 FactCheck.AI All rights reserved
        </div>
      </div>
      <div className="footer-linkedin flex mt-6 md:mt-12 justify-center text-4xl text-[#85AACC] transition ease-in-out duration-300">
        <i className="ri-linkedin-fill hover:text-amber-50 cursor-pointer"></i>
      </div>
    </div>
  )
}

export default Footer