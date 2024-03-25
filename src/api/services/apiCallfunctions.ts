import axios from "axios";
import { getUserCookie } from "../../utils/helperFunctions/getCookie";
import { API_CONSTANT } from "../api-constants/constants";
import axiosHttp from "../axios/axiosInstance";
export const xApiKey = "AkJvsluxONUTQ6HHGwm5aeI4nBoc5hQbzz80Ho10";

const headerForLogin = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "x-api-key": xApiKey, // Custom header
};
const authHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
  headers: {
    "x-api-key": xApiKey,
    Authorization: getUserCookie()?.jwt_token || "",
  },
};
const authHeaderMultiPart: any = {
  "x-api-key": xApiKey,
  Authorization: getUserCookie()?.jwt_token || "",
};
// testing export const getTodos = async () => {
//   const res = await axiosHttp("/postUser/");
//   console.log(res.data, "from front");
//   return res.data;
// };

// export const newTodos =  (newTodo:any) => {
//   return axiosHttp.post("/postUser", newTodo);
// }
//without jwt custom header
export const loginApiCall = (dataParams: any) => {
  return axiosHttp.post(API_CONSTANT.BASE_URL + API_CONSTANT.CAG, dataParams, {
    headers: headerForLogin,
  });
};
// JWT passing header
export const apiCallManager = (dataParams: any) => {
  return axiosHttp.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};

export const getFilesApiCall = (data: any) => {
  return axios.post(
    `${API_CONSTANT.BASE_URL_ENV2}uploadtest/upload?event_type=list-upload-file`,
    data,
    authHeaderMultiPart
  );
};
export const syncFileApiCall = (data: any, fileName: string) => {
  return axios.post(
    `${API_CONSTANT.BASE_URL_ENV2}uploadtest/upload?event_type=start-ingestion-job&file_name=${fileName}`,
    data,
    authHeaderMultiPart
  );
};

export const deleteSelectedFileApiCall = (data: any, records: any) => {
  return axios.post(
    `${API_CONSTANT.BASE_URL_ENV2}uploadtest/upload?event_type=delete-file&id=${records.id}&key=${records.document_name}`,
    data,
    authHeaderMultiPart
  );
};

// export const fileUploadApiCallManager = (dataParams: any, fileName: any) => {
//   return axiosHttp.post(
//     `https://6sc9zcwrf3.execute-api.ap-south-1.amazonaws.com/uploadtest/upload?file_name=${fileName}&event_type=cag-upload-file`,
//     dataParams,
//     authHeaderMultiPart
//   );
// };
export const getTotalChatStats = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const getWeekChatStats = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const getAnsweredQus = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const getUnAnsweredQus = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};

//bot user
export const getTotalUserStats = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const getNewUserStats = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const gettopUser = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
//knowlwdgebase
export const getKnowledgebase = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
// export const getnewKnowledgebase = (dataParams: any) => {
//   return axios.post(
//     API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
//     dataParams,
//     authHeader
//   );
// };
export const gettopBase = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const addUserApiCall = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const updateUserApiCall = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const deleteUserApiCall = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};

export const getChatStats = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const getUsermanageList = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
export const getResetPassword = (dataParams: any) => {
  return axios.post(
    API_CONSTANT.BASE_URL + API_CONSTANT.CAG,
    dataParams,
    authHeader
  );
};
