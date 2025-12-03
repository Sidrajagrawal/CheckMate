import axios from "axios";

const BASE_API = `http://${window.location.hostname}:8080/api/auth`;

export const loginUser = async (email, password) => {
    try {
        console.log(BASE_API);
        const res = await axios.post(
            `${BASE_API}/login`,
            { email, password },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const registerUser = async (username, email, password, Cpassword) => {
    try {
        const res = await axios.post(`${BASE_API}/register`, {
            username,
            email,
            password,
            Cpassword
        })
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const verifyOtp = async (email, otp) => {
    try {
        const res = await axios.post(`${BASE_API}/verify-otp`, {
            email,
            otp
        })
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}