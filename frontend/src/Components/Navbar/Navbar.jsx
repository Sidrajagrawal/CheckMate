import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='min-[300px]:h-20 w-full lg:h-16 flex items-center justify-between '>
      <div className="w-1/2 flex items-center">
        <div className='min-[300px]:text-3xl min-[300px]:mx-2 min-[300px]:mt-4 lg:mx-16 text-2xl  text-[#00C084] tracking-wide company-title'>
          <div onClick={() => navigate('/')} className='cursor-pointer'><span >Fact</span><span className='font-bold'>Checker</span></div>
        </div>
        <div className="max-[630px]:hidden w-28 h-9 px-3 pt-1.5 mt-6 lg:-mx-10  company-tag-line bg-[#222E44] rounded-2xl text-white font-medium cursor-pointer">
          <i className="text-green-500 font-bold text-[18px] ri-check-fill "></i> Verified
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 justify-end pr-16">
        <ul className='flex items-center h-full space-x-10 text-[18px] text-[#85AACC] cursor-pointer'>
          <li className='relative group hover:text-white'>
            Transcribe
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </li>
          <li className='relative group hover:text-white' onClick={() => navigate('/about')}>
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className='relative group hover:text-white' onClick={() => navigate('/auth')}>
            LogIn/SignUp
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>
      </div>

      <div className="lg:hidden pr-4 mt-6">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <i className="ri-menu-line text-3xl text-white"></i>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 right-0 w-full bg-[#111827] text-white lg:hidden z-50">
          <ul className="flex flex-col space-y-4 p-5 text-[18px] text-[#85AACC]">
            <li className='hover:text-white'>Transcribe</li>
            <li className='hover:text-white' onClick={() => navigate('/about')}>About</li>
            <li className='hover:text-white' onClick={() => navigate('/auth')}>LogIn / SignUp</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;