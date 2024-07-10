import axios from "axios";
import { getDataFromCookie, setDataFromCookie } from "@/helpers/cookie";

const http = axios.create({
  baseURL: "https://ecomapi.ilyosbekdev.uz",
  headers: {
    Authorization: `Bearer ${getDataFromCookie("access_token")}`,
  },
});

// async function refreshAccessToken() {
//   try {
//     const storedRefreshToken = getDataFromCookie("refresh_token");

//     if (!storedRefreshToken) {
//       throw new Error("Refresh token not found in cookie");
//     } else {
//       const response = await axios.get(
//         `https://store.go-clothes.uz/v1/token/${storedRefreshToken}`
//       );
//       const { access_token, refresh_token } = response.data;
//       setDataFromCookie("access_token", access_token);
//       setDataFromCookie("refresh_token", refresh_token);
//       return access_token;
//     }
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     throw error;
//   }
// }

http.interceptors.request.use((config) => {
  const accessToken = getDataFromCookie("access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const accessToken = await refreshAccessToken();
//         if (accessToken) {
//           originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//           return http(originalRequest);
//         }
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default http;
