import { useState } from 'react';
import Login from './Login';
import { registerUser } from './CallApi';
import Otp from './Otp';
import LoaderComp from '../Loader/AuthLoader';

function Signup() {
    const [toggle, setToggle] = useState(true);
    const [otpToggle, setOtpToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCpassword] = useState("");

    const [passwordtype, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    const toggleHideShow = () => setPasswordType(prev => prev === "password" ? "text" : "password");
    const toggleConfirmHideShow = () => setConfirmPasswordType(prev => prev === "password" ? "text" : "password");

    const handleRegister = async () => {
        try {
            setIsLoading(true);
            if (!username || !email || !password || !Cpassword) {
                setIsLoading(false);
                alert("Fill all fields");
                return;
            }

            if (password !== Cpassword) {
                setIsLoading(false);
                alert("Passwords do not match");
                return;
            }

            const res = await registerUser(username, email, password, Cpassword);
            setOtpToggle(true);
            setIsLoading(false);

        } catch (err) {
            setIsLoading(false);
            alert("Registration failed");
            console.log(err.message);
        }
    };

    if (isLoading) return <LoaderComp />;
    if (otpToggle) return <Otp email={email} />;
    if (!toggle) return <Login />;

    return (
        <div className="px-8 md:px-16 mt-4">
            <div className="greet-msg">
                <div className="text-center mt-4 text-4xl text-white">Create Account</div>
                <div className="text-center text-lg text-gray-500">Join FactCheck to get started.</div>
            </div>

            <div className="mb-6 mt-4">
                <input
                    type="text"
                    className="w-full bg-[#1A2840] border-2 rounded-xl px-4 py-3 text-white border-green-500"
                    placeholder="User Name"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <input
                    type="email"
                    className="w-full bg-[#1A2840] border-2 rounded-xl px-4 py-3 text-white border-green-500"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="relative mb-6">
                <input
                    type={passwordtype}
                    className="w-full bg-[#1A2840] border-2 rounded-xl px-4 py-3 text-white border-green-500"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={toggleHideShow}
                >
                    {passwordtype === "password" ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>)}
                </button>
            </div>

            <div className="relative mb-6">
                <input
                    type={confirmPasswordType}
                    className="w-full bg-[#1A2840] border-2 rounded-xl px-4 py-3 text-white border-green-500"
                    placeholder="Confirm Password"
                    onChange={(e) => setCpassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={toggleConfirmHideShow}
                >
                    {confirmPasswordType === "password" ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>)}
                </button>
            </div>

            <div className="flex justify-center mb-3">
                <button
                    type="button"
                    className="px-6 py-3 border-2 border-green-500 text-green-400 rounded-xl hover:bg-green-500 hover:text-white"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>

            <div className="text-center mb-6">
                <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={() => setToggle(false)}
                >
                    Already have an account? Log In
                </button>
            </div>
        </div>
    );
}

export default Signup;
