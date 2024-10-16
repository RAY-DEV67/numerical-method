import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { ScrollToTop } from "./components/scrollToTop";
import Login from "./screens/login";
import SignUpOne from "./screens/signUpOne";
import { ToastContainer } from "react-toastify";
import Profile from "./screens/profile";
import RequireAuth from "./components/requireAuth";
import ForgotPassword from "./screens/forgotPassword";
import ChangePassword from "./screens/changePassword";

export const NavigateTo = React.createContext();

function App() {
  const [navigateTo, setnavigateTo] = useState("/");

  return (
    <div className="textFont max-w-[1780px]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
        theme="light"
      />
      <NavigateTo.Provider value={{ navigateTo, setnavigateTo }}>
        <Router>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/ChangePassword" element={<ChangePassword />} />
              <Route path="/SignUpOne" element={<SignUpOne />} />
              <Route element={<RequireAuth />}>
                <Route path="/Profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/Login" />} />
              </Route>
            </Routes>
          </ScrollToTop>
        </Router>
      </NavigateTo.Provider>
    </div>
  );
}

export default App;
