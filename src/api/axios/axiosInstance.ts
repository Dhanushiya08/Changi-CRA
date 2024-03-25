import axios from "axios";
import { API_CONSTANT } from "../api-constants/constants";
import { message } from "antd";
import { clearAllCookies } from "../../utils/helperFunctions/clearAllCookies";

// Create Axios instance
const axiosHttp = axios.create({
  baseURL: API_CONSTANT.BASE_URL,
});

// Request interceptor to add Authorization header
axiosHttp.interceptors.request.use(
  (config) => {
    // config.headers["X-Custom-Header"] = "Custom Header Value";
    // message.success("sent");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosHttp.interceptors.response.use(
  (response: any) => {
    // Add logic here if needed
    if (response?.data?.message == "Token Expired") {
      window.location.href = "/";
      clearAllCookies();
      message.error("session expired");
    }
    if (response?.data?.message == "success") {
      return response;
    } else if (response?.data) {
      return response;
    } else {
      if (response.data.message) {
        message.error(response.data.message);
      }
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
    }
    return Promise.reject(error);
  }
);

export default axiosHttp;
