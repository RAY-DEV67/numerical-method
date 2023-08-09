import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LandingPage from "./screens/landingPage";
import Navbar from "./components/navbar";
import { ScrollToTop } from "./components/scrollToTop";
import Login from "./screens/login";
import SignUpOne from "./screens/signUpOne";
import SignUpTwo from "./screens/signUpTwo";

function App() {
  return (
    <div className="bg-[#013a19]">
      <Router>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUpOne" element={<SignUpOne />} />
            <Route path="/SignUpTwo/:userId" element={<SignUpTwo />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;

