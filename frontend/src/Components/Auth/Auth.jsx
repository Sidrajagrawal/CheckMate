import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [LoginActive, setLoginActive] = useState(true);
  const [RegisterActive, setRegisterActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = () => {
    setLoginActive(true)
    setRegisterActive(false)
  }

  const handleSignup = () => {
    setLoginActive(false)
    setRegisterActive(true)
  }

  return (
    <div className='h-full w-full border-2'>
      <div className='md:hidden text-[18px] text-black cursor-pointer font-bold ml-4 mt-2 hover:text-[#FE5B13]' onClick={() => navigate('/')}>Home</div>
      <div className="auth-title w-full h-[10%] mt-20 md:mt-40 text-center text-3xl font-bold">
        {LoginActive ? (
          <div>Login to your account</div>
        ) : (
          <div>Create an account</div>
        )}
      </div>

      <div className="auth-btn w-full h-[10%] flex justify-center space-x-10 text-lg font-medium">
        <button onClick={handleLogin} className='border-2 w-35 h-14 mt-2 rounded-xl cursor-pointer hover:text-white hover:bg-black' >
          <i className="ri-login-box-line"></i> Log In
        </button>
        <button
          onClick={handleSignup} className='border-2 w-35 h-14 mt-2 rounded-xl cursor-pointer hover:text-white hover:bg-black' >
          <i className="ri-user-add-line"></i> Sign Up
        </button>
      </div>
      <div className="auth-form w-full h-[55%]">
        {LoginActive ? (
          <div className='flex flex-col ml-8 md:ml-46'>
            <input type="email" placeholder="Email" className='mt-5 bg-[#F4F8F9] rounded-xl p-2 w-80 shadow-sm' />
            <div className='w-88 bg-white mt-4 rounded-xl flex items-center relative'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-80 bg-[#F4F8F9] rounded-xl p-2 shadow-sm pr-10'  />
              <i className={ri-eye${showPassword ? '-off' : ''}-line text-black text-xl absolute right-3 cursor-pointer} onClick={() => setShowPassword(!showPassword)}></i>
            </div>

            <div className='mt-8 ml-1 bg-[#FE5B13] w-80 p-3 rounded-2xl cursor-pointer text-center text-white font-medium text-lg hover:transform hover:scale-101 transition ease-in-out duration-300'>
              Submit
            </div>
          </div>
        ) : (
          <div className='flex flex-col ml-8 md:ml-46'>
            <input type="email" placeholder="Email" className='mt-5 bg-[#F4F8F9] rounded-xl p-2 w-80 shadow-sm' />
            <input type="text" placeholder="First Name" className='mt-2 w-80 bg-[#F4F8F9] rounded-xl p-2 shadow-sm' />
            <input type="text" placeholder="Last Name" className='mt-2 w-80 bg-[#F4F8F9] rounded-xl p-2 shadow-sm' />
            <div className='w-88 bg-white mt-2 rounded-xl flex items-center relative'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-80 bg-[#F4F8F9] rounded-xl p-2 shadow-sm pr-10' />
              <i className={ri-eye${showPassword ? '-off' : ''}-line text-black text-xl absolute right-3 cursor-pointer} onClick={() => setShowPassword(!showPassword)} ></i>
            </div>

            <div className='w-88 bg-white mt-2 rounded-xl flex items-center relative'>
              <input type={showConfirm ? 'text' : 'password'} placeholder='Confirm Password' className='w-80 bg-[#F4F8F9] rounded-xl p-2 shadow-sm pr-10'/>
              <i className={ri-eye${showConfirm ? '-off' : ''}-line text-black text-xl absolute right-3 cursor-pointer}onClick={() => setShowConfirm(!showConfirm)} ></i>
            </div>

            <div>
              <input type="checkbox" className='mt-4 mr-2' />
              I accept the terms and conditions.
            </div>

            <div className='mt-8 ml-1 bg-[#FE5B13] w-80 p-3 rounded-2xl cursor-pointer text-center text-white font-medium text-lg hover:transform hover:scale-101 transition ease-in-out duration-300'>
              Submit
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Auth