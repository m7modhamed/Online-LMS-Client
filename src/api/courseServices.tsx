import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or any other storage mechanism (sessionStorage, redux store)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

export const createCourse = async (course : Record<string , any>) => {
    try {
        const response = await axiosInstance.post("/courses" , course);
        return response.data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error.response.data.message);
      }
};
