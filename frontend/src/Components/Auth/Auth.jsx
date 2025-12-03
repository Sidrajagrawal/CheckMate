import AuthNav from "./AuthNav";
import Login from './Login';

function Auth() {
    return (
        <div className='bg-gradient-to-br from-[#0F1729] via-[#1A2332] to-[#293B68] w-screen h-screen overflow-hidden' >
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-full h-[85%] md:w-1/2 md:h-[75%] border-2 border-green-600 rounded-2xl">
                    <AuthNav />

                    <Login/>
                </div>
            </div>
        </div>
    )
}

export default Auth;