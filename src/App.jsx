import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./screens/landingPage";
import Navbar from "./components/navbar";
import { ScrollToTop } from "./components/scrollToTop";
import Login from "./screens/login";
import SignUpOne from "./screens/signUpOne";
import SignUpTwo from "./screens/signUpTwo";
import SellProducts from "./screens/sellProducts";
import SellServices from "./screens/sellServices";
import Events from "./screens/events";
import Shop from "./screens/shop";
import db from "../firebase";
import { getDocs, query, collection, where } from "firebase/firestore";

export const UserId = React.createContext();
export const SetUserId = React.createContext();

function App() {
  const [userId, setuserId] = useState("");
  

  return (
    <div className="bg-[#013a19]">
      <UserId.Provider value={userId}>
        <SetUserId.Provider value={setuserId}>
            <Router>
              <ScrollToTop>
                <Navbar />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/SignUpOne" element={<SignUpOne />} />
                  <Route path="/SignUpTwo/:userId" element={<SignUpTwo />} />
                  <Route path="/SellProducts" element={<SellProducts />} />
                  <Route path="/SellServices/:userId/:userName" element={<SellServices />} />
                  <Route path="Events" element={<Events />} />
                  <Route path="/Shop" element={<Shop />} />
                </Routes>
              </ScrollToTop>
            </Router>
        </SetUserId.Provider>
      </UserId.Provider>
    </div>
  );
}

export default App;
