import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle user signup
export const signupStudentAccount = async (userData: Record<string, any>) => {
  try {
    const response = await axiosInstance.post("/register/student", userData);
    return response.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.response.data.message);
  }
};

export const login = async (loginData : Record<string , any> ) =>{
  try {
    const response = await axiosInstance.post("/login", loginData);
    return response.data;
  } catch (error: any) {
    console.log(error)
    throw new Error(error.response.data.message);
  }
  
}


export const signupInstructorAccount = async (
  userData: Record<string, any>
) => {
  try {
    const response = await axiosInstance.post("/register/instructor", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Signup failed");
  }
};
