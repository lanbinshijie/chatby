import axios, { AxiosInstance } from 'axios';
import { requestFail, responseSuccess, responseFail } from './interceptors';


const fetch: AxiosInstance = axios.create({
  timeout: 60000, // 超时时间一分钟
  baseURL: 'http://localhost:3000/',
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
  // 不携带cookie
  withCredentials: false,
});

fetch.interceptors.request.use((request) => {
  const token = "This is token"
  request.headers.token = token;
  return request;
}, requestFail);
fetch.interceptors.response.use(responseSuccess, responseFail);

export default fetch;