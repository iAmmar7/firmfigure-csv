import axios from "axios";

// Pass new generated access token here
const token = localStorage.getItem("authToken");

const API_URL =
  process.env.REACT_APP_NODE_ENV === "development"
    ? `${process.env.REACT_APP_PETROMIN_CSV_DEV_BE_URL}/api`
    : `${process.env.REACT_APP_PETROMIN_CSV_PROD_BE_URL}/api`;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
