import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import SignUpStepOnePage from "./pages/SignUpStepOne";
import RecoverPasswordPage from "./pages/RecoverPassword";
import ChangePasswordPage from "./pages/ChangePassword";
import SigningLayout from "./pages/SigningLayout";
import ProfilePage from "./pages/ProfileScreen";
import Editprofile from "./pages/EditProfile";
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged, User } from "@firebase/auth";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

const router = createBrowserRouter([
  {
    path: '/', 
    element: (
      <AppWrapper /> 
    ),
    children: [
      {
        path: '',
        element: <SigningLayout/>,
        children: [
          {index: true, element: <SignInPage/>},
          {path: 'sign-up', element: <SignUpStepOnePage/>},
          {path: 'password/recover', element: <RecoverPasswordPage/>},
          {path: 'password/change', element: <ChangePasswordPage/>},
        ]
      },
    ]
  },
  {path: '/home', element: <ProfilePage />},
  {path: '/EditProfile', element: <Editprofile/>},
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

function AppWrapper() {
  const [user, setUser] = useState(null as User | null);
  const [auth] = useAuthentication()


  const loadingUser = user === null;


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    
  }, [auth]);


  if (loadingUser) {
    return <p>Carregandor...</p>; 
   }

  return (
    <AuthProvider value={user}>
      <App />
    </AuthProvider>
  );
}



reportWebVitals();
