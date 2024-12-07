import axios from "axios";
import { Section } from "../interfaces/interfaces";

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

export const getInstructorCourse = async (instructorId : Number , courseId : Number) => {
  try {
      const response = await axiosInstance.get(`/instructor/${instructorId}/courses/${courseId}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
};


export const getInstructorCourses = async (instructorId : Number) => {
  try {
      const response = await axiosInstance.get(`/instructor/${instructorId}/courses`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
};


export const addNewSection = async (course_id : Number, section : Section) => {
  try {
      const response = await axiosInstance.post(`courses/${course_id}/sections` , section);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
};

export const getCourseSections = async (course_id : Number) => {
  try {
      const response = await axiosInstance.get(`/courses/${course_id}/sections`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
};