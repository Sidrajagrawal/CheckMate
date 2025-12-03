import { useEffect, useState, useRef } from "react";
import { verifyOtp } from './CallApi';
import LoaderComp from '../Loader/AuthLoader';

function Otp({ email }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);
    const [timer, setTimer] = useState(180);
    const [resendDisabled, setResendDisabled] = useState(true);

    useEffect(() => {
        if (timer <= 0) {
            setResendDisabled(false);
            return;
        }
        const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResend = async () => {
        setTimer(180);
        setResendDisabled(true);
        alert("OTP resent!");
    };

    const handleVerify = async () => {
        const finalOtp = otp.join("");
        if (finalOtp.length !== 6) {
            alert("Please enter complete 6-digit OTP");
            return;
        }
        try {
            setIsLoading(true);
            const result = await verifyOtp(email, finalOtp);
            window.location.reload();
        } catch (err) {
            alert("Invalid OTP");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoaderComp />;

    return (
        <div className="px-8 md:px-16 mt-10 text-center">
            <h1 className="text-4xl text-white">Verify OTP</h1>
            <p className="text-gray-400 mt-2">
                A 6-digit OTP has been sent to{" "}
                <span className="text-green-400">{email}</span>
            </p>

            <div className="flex justify-center gap-4 mt-8">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 bg-[#1A2840] text-white text-center text-xl border-2 border-green-500 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                ))}
            </div>

            <div className="mt-4 text-gray-300 text-lg">
                Time Left: <span className="text-green-400">{formatTime(timer)}</span>
            </div>

            <button
                disabled={resendDisabled}
                onClick={handleResend}
                className={`mt-4 underline text-blue-400 ${resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-blue-300"}`}
            >
                Resend OTP
            </button>

            <div className="flex justify-center mt-6">
                <button
                    onClick={handleVerify}
                    className="px-6 py-3 border-2 border-green-500 text-green-400 rounded-xl hover:bg-green-500 hover:text-white"
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
}

export default Otp;
