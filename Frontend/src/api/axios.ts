// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// export default api;
// src/api/axios.ts

import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-2-aad9.onrender.com/api/v1",   
  withCredentials: true,
});


export default api;
