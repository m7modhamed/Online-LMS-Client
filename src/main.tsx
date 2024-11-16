import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import { SignUp } from './components/signup/index.tsx'
import { Login } from './components/login/index.tsx'
import { SignupBusinessAccount } from './components/signupBusinessAccount/index.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/signup",
        element : <SignUp/>
      },
      {
        path: "/login",
        element : <Login/>
      },
      {
        path : "/businessAccount",
        element : <SignupBusinessAccount/>
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}  />
  </StrictMode>,
)
