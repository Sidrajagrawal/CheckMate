import { useState } from 'react';
import Signup from './Signup';
import { loginUser } from './CallApi';
import { useNavigate } from 'react-router-dom';
import LoaderComp from '../Loader/AuthLoader';

function Login() {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(true);
    const [passwordtype, setPasswordType] = useState("password");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const toggleHideShow = () => {
        setPasswordType(prev => (prev === "password" ? "text" : "password"));
    };

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const response = await loginUser(email, password);
            if (response && response.msg) {
                navigate('/');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            const serverMsg = error?.response?.data?.msg;
            if (serverMsg) alert(serverMsg);
            else alert('Login failed. Please try again.');
            console.log('Login Failed:', error);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) return <LoaderComp />;

    return (
        <>
            {toggle ? (
                <div className="px-8 md:px-16 mt-4">
                    <div className="greet-msg">
                        <div className="text-center mt-4 text-4xl text-white">Welcome Back</div>
                        <div className="text-center text-lg text-gray-500">Log in to access </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="text-white text-lg block mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full bg-[#1A2840] border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 border-green-500 transition-colors"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="text-white text-lg block mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={passwordtype}
                                id="password"
                                className="w-full bg-[#1A2840] border-2 focus:border-blue-600 border-green-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors"
                                placeholder="••••••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                onClick={toggleHideShow}
                            >
                                {passwordtype === "password" ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="text-right mb-6">
                        <a href="#" className="text-blue-500 hover:text-blue-400 underline">Forgot Password?</a>
                    </div>

                    <div className="flex justify-center mb-5">
                        <button
                            type="button"
                            className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-green-500 text-green-400 rounded-xl hover:bg-green-500 hover:text-white transition-colors"
                            onClick={handleLogin}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                            Login
                        </button>

                    </div>
                    <div className="text-center mb-6">
                        <button
                            type="button"
                            className="text-blue-500 hover:text-blue-400 underline"
                            onClick={() => setToggle(false)}
                        >
                            Don't have an account? Sign Up
                        </button>
                    </div>
                </div>
            ) : (
                <Signup />
            )}
        </>
    );
}

export default Login;
