import axios from 'axios';
import { backendUrl } from 'src/config';

const customAxios = axios.create({
  baseURL: backendUrl
});

customAxios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'There is an error!'
    )
);

export default customAxios;