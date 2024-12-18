import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignUp } from "./components/signup/index.tsx";
import { Login } from "./components/login/index.tsx";
import { SignupBusinessAccount } from "./components/signupBusinessAccount/index.tsx";
import Layout from "./Layout.tsx";
import { VerifyEmail } from "./components/verifyEmail/index.tsx";
import ForgotPassword from "./components/ForgotPassword/index.tsx";
import { ResetPassword } from "./components/ResetPassword/index.tsx";
import { AuthProvider } from "./Authentication/AuthContext.tsx";
import { InstructorDashboard } from "./components/InstructorDashboard/InstructorDashboard.tsx";
import { CreateCourse } from "./components/CreateCourse/CreateCourse.tsx";
import { InstructorCourses } from "./components/InstructorCourses/InstructorCourses.tsx";
import InstructorCourse from "./components/InstructorCourse/InstructorCourse.tsx";
import { AddLessonContent } from "./components/AddLessonContent/AddLessonContent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/businessAccount",
        element: <SignupBusinessAccount />,
      },
      {
        path: "/verifyEmail",
        element: <VerifyEmail />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/instructor-dashboard",
        element: <InstructorDashboard />,
        children: [
          {
            path: "/instructor-dashboard/createCourse",
            element: <CreateCourse />,
          },
          {
            path: "/instructor-dashboard/courses",
            element: <InstructorCourses />,
          },
          {
            path: "/instructor-dashboard/courses/:courseId",
            element: <InstructorCourse />,
          },
          {
            path: "/instructor-dashboard/addLessonContent/:lessonId",
            element: <AddLessonContent />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
