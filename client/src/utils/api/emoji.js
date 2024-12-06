//http://localhost:5000/emoji/translateT2E
import axios from 'axios';
const host = import.meta.env.VITE_BACKEND_URI;
export const generateEmojiFromText = async (data) => {
  try {
    const response = await axios.post(host + '/emoji/translateT2E', data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
