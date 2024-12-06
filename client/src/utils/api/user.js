import axios from 'axios';
const host = import.meta.env.VITE_BACKEND_URI;
export const signIn = async (data) => {
  try {
    const response = await axios.post(host + '/user/login', data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const signUp = async (data) => {
  try {
    const response = await axios.post(host + '/user/register', data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
