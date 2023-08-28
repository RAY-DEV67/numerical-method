import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";

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
      console.log("User registered:", user.email);
      console.log("User registered:", user.uid);
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
    <div className="h-[100vh] bg-[#013a19] w-[100vw] textFont flex flex-col items-center login justify-center">
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-[4vw] md:text-[2vw] font-semibold">Welcome to</h1>
        <h2 className="text-[8vw] md:text-[4vw] font-semibold">UniPlug</h2>
        <p className="text-[3vw] md:text-[1.5vw]">
          Lets get you started, input your details below.
        </p>
        <input
          onChange={(e) => setfirstName(e.target.value)}
          type="text"
          placeholder="Name"
          className="input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00] w-[80vw] md:w-[40vw]"
        />
        {firstNameError && <p className="text-red-500">{firstNameError}</p>}

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="input bg-transparent rounded-[10px] text-black p-[8px] mb-[16px] border-b border-[#00cc00] w-[80vw] md:w-[40vw]"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}

        <input
          onChange={(e) => setconfirmEmail(e.target.value)}
          type="text"
          placeholder="Retype Email"
          className="input bg-transparent rounded-[10px] text-black p-[8px] mb-[16px] border-b border-[#00cc00] w-[80vw] md:w-[40vw]"
        />
        {confirmEmailError && (
          <p className="text-red-500">{confirmEmailError}</p>
        )}

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input rounded-[10px] bg-transparent mb-[16px] text-black p-[8px] border-b border-[#00cc00] w-[80vw] md:w-[40vw]"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          className="input rounded-[10px] bg-transparent text-black p-[8px] border-b border-[#00cc00] w-[80vw] md:w-[40vw]"
        />
        {confirmPasswordError && (
          <p className="text-red-500">{confirmPasswordError}</p>
        )}
        <button
            onClick={handleSignUp}
          className="bg-[#013a19] text-white w-[33vw] md:w-[13vw] mt-[32px] rounded-[20px] py-[8px]"
        >
          Continue
        </button>
        {/* {errors && <p className="text-red-500">{errors}</p>} */}

        <p className="text-[3vw] md:text-[1.5vw] mt-[16px]">
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
