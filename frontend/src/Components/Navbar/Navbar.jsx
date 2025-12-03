import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckLogin, logoutUser } from './CallNavApi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response.msg);
      setUserData(null);
      navigate("/auth");
    } catch (err) {
      alert("Logout failed, please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const data = await CheckLogin();
      if (data) setUserData(data.user);
    }
    fetchUser();
  }, []);

  return (
    <div className='min-[300px]:h-20 w-full lg:h-16 flex items-center justify-between'>
      <div className="w-1/2 flex items-center">
        <div className='min-[300px]:text-3xl min-[300px]:mx-2 min-[300px]:mt-4 lg:mx-16 text-2xl text-[#00C084] tracking-wide company-title'>
          <div onClick={() => navigate('/')} className='cursor-pointer'>
            <span>Fact</span><span className='font-bold'>Checker</span>
          </div>
        </div>
        <div className="max-[630px]:hidden w-28 h-9 px-3 pt-1.5 mt-6 lg:-mx-10 bg-[#222E44] rounded-2xl text-white font-medium cursor-pointer">
          <i className="text-green-500 font-bold text-[18px] ri-check-fill"></i> Verified
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 justify-end pr-16">
        <ul className='flex items-center h-full space-x-10 text-[18px] text-[#85AACC] cursor-pointer'>
          {userData ? (
            <>
              <li className='flex items-center gap-2 bg-[#1e293b] px-4 py-2 rounded-lg border border-[#334155]'>
                <div className='w-8 h-8 bg-gradient-to-br from-[#00C084] to-[#00a06f] rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                  {userData.email.charAt(0).toUpperCase()}
                </div>
                <span className='text-white font-medium'>{userData.username}</span>
              </li>
              <li
                className='px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 border border-red-500/20'
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          ) : (
            <li className='relative group hover:text-white' onClick={() => navigate('/auth')}>
              LogIn / SignUp
            </li>
          )}        </ul>
      </div>

      <div className="lg:hidden pr-4 mt-6">
        <button onClick={() => navigate('/auth')}>
          <i className="ri-menu-line text-3xl text-white"></i>
        </button>
      </div>

    </div>
  );
};

export default Navbar;
