import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SetUserId } from "../App";

function Login() {
  const setuserId = useContext(SetUserId);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user.email);
      console.log("UserUid:", user.uid);
      setuserId(user.uid);

      // Store user credentials in localStorage
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({
          email: user.email,
          userId: user.uid,
          hasOnboarded: true,
        })
      );

      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Login failed:", errorMessage, errorCode);

      if (errorCode === "auth/invalid-email") {
        setErrors("Invalid Email Address");
      } else if (errorCode === "auth/user-not-found") {
        setErrors("Incorrect Email Address");
      } else if (errorCode === "auth/wrong-password") {
        setErrors("Incorrect Password");
      } else if (errorCode === "auth/network-request-failed") {
        setErrors("Unable to log in, Check Internet Connection.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] login">
      <div className="absolute h-[100vh] w-[100vw] bg-black opacity-30 z-2"></div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-[5vw] md:text-[2.5vw] font-semibold">Welcome to</h1>
        <h2 className="text-[10vw] md:text-[5vw] font-semibold">UniPlug</h2>
        <p className="text-[4vw] md:text-[2vw]">Please Log In To Continue</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="input bg-transparent rounded-[10px] text-black p-[16px] my-[16px] border-b border-[#00cc00] w-[80vw] md:w-[40vw]"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input rounded-[10px] bg-transparent text-black p-[16px] border-b border-[#00cc00] w-[80vw] md:w-[40vw]"
        />
        <button
          onClick={handleLogin}
          className="bg-[#013a19] text-white w-[33vw] md:w-[13vw] mt-[32px] rounded-[20px] py-[8px]"
        >
          Log In
        </button>
        {errors && <p className="text-red-500">{errors}</p>}

        <p className="text-[3vw] md:text-[1.5vw] mt-[16px]">
          Don't have an account?{" "}
          <Link to="/SignUpOne" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
