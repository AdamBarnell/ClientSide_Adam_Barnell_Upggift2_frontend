import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const register = (email, password) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

export const login = (email, password) => {
  return axios
    .post(`${API_URL}/login`, { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
      }
      return response.data.token;
    });
};

export const getToken = () => {
  return localStorage.getItem("userToken");
};
