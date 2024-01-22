import Axios from 'axios';

export const axios = Axios.create({
  baseURL: `${window.origin}/api/`,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
