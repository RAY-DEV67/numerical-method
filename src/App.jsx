import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LandingPage from "./screens/landingPage";
import Navbar from "./components/navbar";
import { ScrollToTop } from "./components/scrollToTop";
import Login from "./screens/login";
import SignUpOne from "./screens/signUpOne";
import SignUpTwo from "./screens/signUpTwo";
import SellServices from "./screens/sellServices";
import Shop from "./screens/shop";
import EventsDetails from "./screens/eventsDetails";
import BuyTickets from "./screens/buyTickets";
import Events from "./screens/events";
import Contact from "./screens/contact";
import TermsAndConditions from "./screens/terms&conditions";
import { ToastContainer } from "react-toastify";
import UserDetailsContextProvider from "./context/userDetails";
import Profile from "./screens/profile";
import YourProducts from "./screens/yourProducts";
import YourServices from "./screens/yourServices";
import PrivacyPolicy from "./screens/privacyPolicy";
import RequireAuth from "./components/requireAuth";
import UploadEvents from "./screens/uploadEvents";

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
        <UserDetailsContextProvider>
          <Router>
            <ScrollToTop>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUpOne" element={<SignUpOne />} />
                <Route path="/Contact" element={<Contact />} />
                <Route
                  path="/TermsAndConditions"
                  element={<TermsAndConditions />}
                />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route
                  path="/upload-event/:userUid"
                  element={<UploadEvents />}
                />
                <Route
                  path="/Shop/:userId/:userName/:email"
                  element={<Shop />}
                />
                <Route
                  path="/SellServices/:userId/:userName"
                  element={<SellServices />}
                />
                <Route element={<RequireAuth />}>
                  <Route path="/SignUpTwo/:userId" element={<SignUpTwo />} />

                  <Route path="Events" element={<Events />} />

                  <Route path="/EventsDetails" element={<EventsDetails />} />

                  <Route path="/BuyTickets/:userId" element={<BuyTickets />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route
                    path="/YourProducts/:userId"
                    element={<YourProducts />}
                  />
                  <Route
                    path="/YourServices/:userId"
                    element={<YourServices />}
                  />
                  <Route path="*" element={<Navigate to="/Login" />} />
                </Route>
              </Routes>
            </ScrollToTop>
          </Router>
        </UserDetailsContextProvider>
      </NavigateTo.Provider>
    </div>
  );
}

export default App;
