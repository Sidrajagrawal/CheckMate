import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Contact = () => {
    return (
        <div className='bg-gradient-to-br from-[#0F1729] via-[#1A2332] to-[#293B68] min-h-screen overflow-x-hidden flex flex-col'>
            <Navbar />
            <div className='flex flex-1 justify-center px-4 py-10'>
                <div className='w-full max-w-4xl'>
                    <h1 className='text-5xl font-bold text-white mb-6'>Got Any Question?</h1>

                    <p className='text-lg text-white mb-2'>
                        All information received will always remain confidential
                    </p>

                    <p className='text-md text-[#85AACC] mb-10'>
                        We’re here to help and answer any questions you might have. Choose the appropriate category from the menu and your request will be directed to the right person.
                    </p>

                    <div className='w-full bg-[#283141] rounded-3xl p-8 shadow-lg'>
                        <div className='w-[95%] h-full ml-1 mr-1   md:bg-[#122050] md:p-10 md:rounded-3xl md:shadow-xl'>
                            <div className='md:flex mt-1 text-xl text-[#85AACC]'>
                                <label htmlFor="" className='ml-4'>Name</label>
                                <label htmlFor="" className=' hidden md:block md:ml-96'>Email</label>
                            </div>
                            <div className='md:flex mt-4'>
                                <input type="text" placeholder='Name' className='bg-[#070A33] text-[#85AACC] ml-4 w-[250px] mb-4 p-4 rounded-2xl shadow-xl'/>
                                <label htmlFor="" className='block md:hidden mb-4 mt-1 ml-4 text-xl text-[#85AACC]'>Email</label>
                                <input type="email" placeholder='Email' className=' ml-4 md:ml-45  bg-[#070A33] text-[#85AACC] w-[250px] mb-4 p-4 rounded-2xl shadow-xl'/>
                            </div>
                            <div>
                                <div className='mb-4'><label htmlFor="" className='ml-4 text-xl text-[#85AACC]'>Reason</label></div>
                                <div> 
                                    <select name="" id=""className='w-[90%] bg-[#070A33] text-[#85AACC] mb-4 p-4 rounded-xl ml-4 focus:outline-none shadow-xl'> 
                                        <option value="">General Contact</option>
                                        <option value="">Feedback</option>
                                        <option value="">Feature Request</option>
                                        <option value="">Bug Report</option>
                                    </select>
                                </div>
                                <div>
                                    <div className='mb-4'><label htmlFor="" className='ml-4 text-xl text-[#85AACC]'>Title</label></div>
                                    <div ><input type="text" placeholder='Enter message Title'className='bg-[#070A33] text-[#85AACC] ml-4 mb-4 p-4 shadow-xl rounded-2xl w-[90%]'/></div>
                                </div>
                                <div>
                                    <div className='mb-4'><label htmlFor="" className='ml-4 text-xl text-[#85AACC]'>Message</label></div>
                                    <div >
                                        <textarea name="" id="" cols="30" placeholder='Enter your message' rows="10" className='bg-[#070A33] shadow-xl text-[#85AACC] ml-4 mb-4 p-4 rounded-lg w-[90%]'></textarea>
                                    </div>
                                </div>
                                <div>
                                    <button className='ml-4 w-[150px] h-[50px] rounded-2xl text-xl font-medium text-white hover:bg-[#04A07A] hover:text-black cursor-pointer bg-[#00C084]'><i class="ri-send-plane-fill"></i> Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Contact
