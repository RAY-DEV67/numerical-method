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
import EventsDetails from "./screens/eventsDetails";
import BuyTickets from "./screens/buyTickets";
import Contact from "./screens/contact";
import TermsAndConditions from "./screens/terms&conditions";
import { ToastContainer } from "react-toastify";

export const UserId = React.createContext();
export const SetUserId = React.createContext();
export const UserState = React.createContext();
export const SetState = React.createContext();
export const UserName = React.createContext();
export const SetUserName = React.createContext();

function App() {
  const [userId, setuserId] = useState("");
  const [userState, setuserState] = useState("");
  const [userName, setuserName] = useState("");

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

      <UserId.Provider value={userId}>
        <SetUserId.Provider value={setuserId}>
          <UserState.Provider value={userState}>
            <SetState.Provider value={setuserState}>
              <UserName.Provider value={userName}>
                <SetUserName.Provider value={setuserName}>
                  <Router>
                    <ScrollToTop>
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/SignUpOne" element={<SignUpOne />} />
                        <Route
                          path="/SignUpTwo/:userId"
                          element={<SignUpTwo />}
                        />
                        <Route
                          path="/SellProducts"
                          element={<SellProducts />}
                        />
                        <Route
                          path="/SellServices/:userId/:userName"
                          element={<SellServices />}
                        />
                        <Route path="Events" element={<Events />} />
                        <Route
                          path="/Shop/:userId/:userName/:email"
                          element={<Shop />}
                        />

                        <Route
                          path="/EventsDetails/:eventId"
                          element={<EventsDetails />}
                        />
                        <Route
                          path="/BuyTickets/:userId"
                          element={<BuyTickets />}
                        />
                        <Route path="/Contact" element={<Contact />} />
                        <Route
                          path="/TermsAndConditions"
                          element={<TermsAndConditions />}
                        />
                      </Routes>
                    </ScrollToTop>
                  </Router>
                </SetUserName.Provider>
              </UserName.Provider>
            </SetState.Provider>
          </UserState.Provider>
        </SetUserId.Provider>
      </UserId.Provider>
    </div>
  );
}

export default App;
