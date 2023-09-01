import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import LoadingSpinner from "../components/spinner";

function SignUpOne() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userId, setuserId] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");

  const [confirmEmail, setconfirmEmail] = useState("");
  const [confirmEmailError, setconfirmEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");

  const [firstName, setfirstName] = useState("");
  const [firstNameError, setfirstNameError] = useState("");

  const docRef = collection(db, "Users");

  const addNewUser = async (user, email) => {
    setLoading(true);
    try {
      const newDoc = await addDoc(docRef, {
        Name: firstName,
        state: "",
        university: "",
        gender: "",
        userId: user,
        email: email,
        phoneNumber: "",
        instagram: "",
        twitter: "",
        TypeOfAccount: "",
        address: "",
        availablePlugs: 10,
        credit: 0,
        hasgottencredit: false,
        accountNumber: "",
        accountName: "",
        bankName: "",
        timestamp: new Date(),
        totalTicketsRevenue: 0,
        totalProductsRevenue: 0,
        plugStatus: "",
        blocked: false,
        onCampus: false,
        offCampus: false,
        homeScreenOnboarded: false,
        eventsScreenOnboarded: false,
        plugmeScreenOnboarded: false,
        vendorOnboarded: false,
      });
      console.log("Added new User");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setconfirmPasswordError("Passwords do not match");
      return;
    }
    if (email !== confirmEmail) {
      setconfirmEmailError("Emails Do Not Match");
      return;
    }
    if (firstName === "") {
      setfirstNameError("Please Enter Your Name");
      return;
    }
    setLoading(true);
    setconfirmPasswordError("");
    setemailError("");
    setpasswordError("");
    setfirstNameError("");
    setconfirmEmailError("");
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      addNewUser(user.uid, user.email);
      navigate(`/SignUpTwo/${user.uid}`);
      setuserId(user.uid);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Registration failed:", errorMessage, errorCode);
      if (errorCode === "auth/invalid-email") {
        setemailError("Invalid Email Address");
      } else if (errorCode === "auth/email-already-in-use") {
        setemailError("Email is already in use");
      } else if (errorCode === "auth/missing-password") {
        setpasswordError("Please set password");
      } else if (errorCode === "auth/weak-password") {
        setpasswordError("Password should be at least 6 characters long");
      }
    }

    setLoading(false);
  };

  return (
    <div
      className={`${
        window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
      } textFont flex flex-col items-center justify-center h-[100vh] `}
    >
      <div className="relative flex flex-col items-center mt-[32px]">
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[6vw] md:text-[2vw]"
              : "text-[50px]"
          } font-semibold`}
        >
          Welcome to
        </h1>
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[10vw] md:text-[4vw]"
              : "text-[70px]"
          } font-semibold headingFont`}
        >
          <span class="magic">
            <span class="magic-text">UniPlug</span>
          </span>
        </h1>
        <p
          className={`${
            window.innerWidth < 1780
              ? "text-[3vw] md:text-[1.5vw] lg:text-[1.2vw]"
              : "text-[30px]"
          }`}
        >
          Lets get you started, input your details below.
        </p>
        <input
          onChange={(e) => setfirstName(e.target.value)}
          type="text"
          placeholder="Name"
          className={`${
            window.innerWidth < 1780
              ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
              : "w-[1000px] text-[40px]"
          } input bg-transparent rounded-[10px] text-black p-[8px] my-[8px] border border-[#00cc00]`}
        />
        {firstNameError && <p className="text-red-500">{firstNameError}</p>}

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className={`${
            window.innerWidth < 1780
              ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
              : "w-[1000px] text-[40px]"
          } input bg-transparent rounded-[10px] text-black p-[8px] my-[8px] border border-[#00cc00]`}
        />
        {emailError && <p className="text-red-500">{emailError}</p>}

        <input
          onChange={(e) => setconfirmEmail(e.target.value)}
          type="text"
          placeholder="Retype Email"
          className={`${
            window.innerWidth < 1780
              ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
              : "w-[1000px] text-[40px]"
          } input bg-transparent rounded-[10px] text-black p-[8px] my-[8px] border border-[#00cc00]`}
        />
        {confirmEmailError && (
          <p className="text-red-500">{confirmEmailError}</p>
        )}

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className={`${
            window.innerWidth < 1780
              ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
              : "w-[1000px] text-[40px]"
          } input bg-transparent rounded-[10px] text-black p-[8px] my-[8px] border border-[#00cc00]`}
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          className={`${
            window.innerWidth < 1780
              ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
              : "w-[1000px] text-[40px]"
          } input bg-transparent rounded-[10px] text-black p-[8px] my-[8px] border border-[#00cc00]`}
        />
        {confirmPasswordError && (
          <p className="text-red-500">{confirmPasswordError}</p>
        )}
        <button
          onClick={handleSignUp}
          className={`${
            window.innerWidth < 1780 ? "w-[33vw] md:w-[13vw]" : "w-[200px]"
          } bg-[#013a19] text-white mt-[16px] rounded-[20px] py-[8px] flex-col items-center justify-center`}
        >
          {loading ? <LoadingSpinner /> : "          Continue"}
        </button>

        <p
          className={`${
            window.innerWidth < 1780
              ? "text-[3vw] md:text-[1.5vw] lg:text-[1.2vw]"
              : "text-[30px]"
          }  mt-[8px]`}
        >
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpOne;
