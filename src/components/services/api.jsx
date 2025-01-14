import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})


  export const createUser = async (userData) => {
    try {
      const response = await API.post("/users/", userData);
      return response.data; 
    } catch (error) {
      throw error.response?.data || error.message; 
    }
  };

  export const loginUser = async (userData) => {
    // por implementar
  }