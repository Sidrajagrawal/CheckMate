import axios from "axios";

const BASE_API = 'http://localhost:8080/api/auth';

export const CheckLogin = async () => {
  try {
    const res = await axios.get(`${BASE_API}/profile`, {
      withCredentials: true, 
    });
    if (res.status === 200) {
      return res.data; 
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};


export const logoutUser = async () => {
  try {
    const res = await axios.post(`${BASE_API}/logout`, {}, {
      withCredentials: true, 
    });
    return res.data;
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};
