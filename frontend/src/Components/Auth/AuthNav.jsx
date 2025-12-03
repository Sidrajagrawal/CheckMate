import { useNavigate } from 'react-router-dom';
function AuthNav() {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center">
            <div>
                <div onClick={() => navigate('/')} className='cursor-pointer text-[#00C084] min-[300px]:text-3xl min-[300px]:mx-2 min-[300px]:mt-4  text-2xl'><span >Fact</span><span className='font-bold'>Checker</span></div>
            </div>
            <div className="max-[630px]:hidden w-28 h-9 px-3 pt-1.5 mt-5 company-tag-line bg-[#222E44] rounded-2xl text-white font-medium cursor-pointer">
                <i className="text-green-500 font-bold text-[18px] ri-check-fill "></i> Verified
            </div>
        </div>
    )
}
export default AuthNav;