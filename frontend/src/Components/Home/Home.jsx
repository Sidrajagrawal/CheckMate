import React, { useState, useRef } from 'react'
import Navbar from '../Navbar/Navbar'
import Extension from './Extension.jsx'
import Content from './Content.jsx'
import { useNavigate } from "react-router-dom";
import Guide from './Guide.jsx';
import Footer from '../Footer/Footer'
import { CheckLogin } from '../Navbar/CallNavApi.jsx';
import { uploadData } from '../Upload/UploadApi.jsx'
import Toast from '../Notification/Toast.jsx'

const Home = () => {
  const [activeMode, setActiveMode] = useState('youtube')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedData, setUploadedData] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const homeMainRef = useRef(null)

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage({
          file: file,
          preview: e.target.result,
          name: file.name
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleImageUpload(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  const scrollToTop = () => {
    if (homeMainRef.current) {
      homeMainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleUpload = async () => {
    try {
      const res = await CheckLogin();
      console.log(res);
      if (!res || !res.user._id) {
        showToast("Please login first to upload media", "warning");
        return;
      }

      const userId = res.user._id;

      if (activeMode === "youtube" && uploadedData.trim() === "") {
        showToast("Please enter a YouTube link", "warning");
        return;
      }
      if (activeMode === "image" && !selectedImage) {
        showToast("Please select an image to upload", "warning");
        return;
      }
      const result = await uploadData(activeMode, uploadedData, selectedImage, userId);
      showToast(`Media uploaded successfully`, "success");

      navigate(`/result/${result.mediaId}`);
    } catch (err) {
      console.error("Upload failed:", err);
      showToast("Upload failed. Please try again", "error");
    }
  };


  return (
    <div ref={homeMainRef} className='bg-gradient-to-br from-[#0F1729] via-[#1A2332] to-[#293B68] w-screen h-screen overflow-x-hidden overflow-y-auto' >
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

      <div className="navbar">
        <Navbar />
      </div>
      <div className="hero-1 w-full h-[60%] mt-10">
        <Content />

        <div className='form-div flex flex-col md:flex-row w-full h-[91%]'>
          <div className='hidden md:block w-[40%] h-full left-0  relative overflow-hidden'>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute top-32 right-12 w-12 h-12 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-32 left-16 w-16 h-16 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-16 right-8 w-10 h-10 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-60 left-32 w-8 h-8 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-16 right-32 w-14 h-14 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
            </div>

            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="absolute top-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              <div className="absolute top-60 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <div className="absolute bottom-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center opacity-40">
                <div className="relative">
                  <i className="ri-shield-check-line text-9xl text-green-400 mb-4 animate-pulse"></i>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
                </div>
                <div className="text-green-300 text-xl font-bold mb-1">
                  VERIFY
                </div>
                <div className="text-blue-300 text-base font-medium">
                  Trust & Safety
                </div>
                <div className="text-yellow-300 text-sm mt-2 opacity-80">
                  AI-Powered Detection
                </div>
              </div>
            </div>

            <div className="absolute top-24 left-20 opacity-35 animate-float">
              <i className="ri-eye-line text-4xl text-blue-400"></i>
            </div>
            <div className="absolute top-48 right-20 opacity-35 animate-float" style={{ animationDelay: '1s' }}>
              <i className="ri-search-line text-3xl text-green-400"></i>
            </div>
            <div className="absolute bottom-48 left-12 opacity-35 animate-float" style={{ animationDelay: '2s' }}>
              <i className="ri-check-double-line text-4xl text-yellow-400"></i>
            </div>
            <div className="absolute top-36 left-6 opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>
              <i className="ri-radar-line text-3xl text-purple-400"></i>
            </div>
            <div className="absolute bottom-32 right-16 opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
              <i className="ri-bug-line text-2xl text-red-400"></i>
            </div>
            <div className="absolute top-72 right-6 opacity-30 animate-float" style={{ animationDelay: '3s' }}>
              <i className="ri-safe-line text-3xl text-cyan-400"></i>
            </div>

            <div className="absolute top-44 left-4 opacity-20">
              <div className="w-8 h-8 border-2 border-blue-400 rotate-45 animate-spin-slow"></div>
            </div>
            <div className="absolute bottom-24 left-24 opacity-20">
              <div className="w-6 h-6 border-2 border-green-400 animate-pulse"></div>
            </div>
            <div className="absolute top-80 right-12 opacity-20">
              <div className="w-10 h-10 border-2 border-yellow-400 rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="form-content w-full md:w-[60%]  h-full right-0 px-4 md:px-0 md:ml-16">
            <div className="btn mt-1 space-x-4 md:space-x-10 flex justify-center md:justify-start">
              <div className={`w-32 sm:w-36 md:w-42 border-2 rounded-2xl p-2 border-red-500 text-amber-50 hover:text-black hover:bg-red-50 transition-all duration-300 ease-in cursor-pointer ${activeMode === 'youtube'}`} onClick={() => setActiveMode('youtube')}>
                <button className='text-xl sm:text-2xl md:text-3xl'>
                  <i className="ri-youtube-line text-red-700"></i>
                  <span className=''> Youtube</span>
                </button>
              </div>

              {/* <div className={`w-28 sm:w-32 md:w-36 border-2 p-2 rounded-2xl border-blue-400 border-amber-50 text-amber-50 hover:text-black hover:bg-blue-50 transition-all duration-300 ease-in cursor-pointer ${activeMode === 'image'}`} onClick={() => setActiveMode('image')}>
                <button className='text-xl sm:text-2xl md:text-3xl'>
                  <i className="ri-file-image-line text-blue-400"></i>
                  <span className=''> Image</span>
                </button>
              </div> */}
            </div>

            <div className='mt-6 md:mt-10 h-[50%] md:h-[30%]'>
              {activeMode === 'youtube' ? (
                <input
                  type="text"
                  onChange={(e) => setUploadedData(e.target.value)}
                  placeholder='Enter URL Link of YouTube Videos.'
                  className='w-full md:w-[70%] h-[60%] p-2 border-2 border-green-300 rounded-2xl focus:outline-green-300 text-amber-50'
                />
              ) : (
                <div className="image-upload-container w-full md:w-[70%] h-[90%]">
                  {!selectedImage ? (
                    <div
                      className={`border-2 border-dashed rounded-2xl h-full border-blue-400 bg-blue-900/20 border-blue-300 hover:border-blue-400 hover:bg-blue-900/10 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${isDragOver}`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => document.getElementById('file-input').click()}
                    >
                      <div className="text-center px-4">
                        <i className="ri-cloud-upload-line text-4xl md:text-6xl text-blue-400 mb-2 md:mb-4"></i>
                        <p className="text-lg md:text-xl text-blue-200 mb-1 md:mb-2">
                          Drop your image here or click to browse
                        </p>
                        <p className="text-xs md:text-sm text-blue-300">
                          Supports JPG, PNG, GIF, WebP (Max 10MB)
                        </p>
                      </div>
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="uploaded-image-container border-2  border-green-300 rounded-2xl h-full p-4 flex flex-col items-center justify-center relative bg-green-900/10">
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                      >
                        <i className="ri-close-line text-sm md:text-base"></i>
                      </button>
                      <div className="text-center">
                        <i className="ri-file-image-line text-xl md:text-2xl text-green-400 mb-1 md:mb-2"></i>
                        <p className="text-green-200 text-sm md:text-[15px] mb-1">
                          Image Selected
                        </p>
                        <p className="text-blue-200 text-xs md:text-sm font-medium truncate max-w-[150px] md:max-w-[200px] px-2">
                          {selectedImage.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="btn-analysis h-16  md:h-20 flex justify-center md:justify-start">
              <button
                className='border-2 border-[#00C084] lg:font-medium  w-[40%] md:w-[40%] h-12 md:h-16 rounded-2xl text-[15px] md:text-2xl hover:transform hover:scale-105 text-amber-50 hover:bg-[#00C084] hover:text-black transition-all duration-100 ease-in cursor-pointer'
                disabled={activeMode === 'image' && !selectedImage}
                onClick={handleUpload}
              >
                <i className="ri-bubble-chart-line"></i> Analyse Now
              </button>
            </div>
          </div>
        </div>
        <div className="extension">
          <div className="boundary w-full h-0.5 bg-gray-800"></div>
          <Extension></Extension>
          <Guide></Guide>
          <div className='mt-68 md:mt-44'><Footer onScrollToTop={scrollToTop}></Footer></div>
        </div>
      </div>
    </div>
  )
}

export default Home
