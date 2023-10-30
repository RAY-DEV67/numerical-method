import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavigateTo, SetUserId } from "../App";
import LoadingSpinner from "../components/spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const setuserId = useContext(SetUserId);
  const { navigateTo } = useContext(NavigateTo);

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

      toast("Welcome Back Odogwu🙌🙌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(navigateTo);
    } catch (error) {
      const errorCode = error.code;
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
    <div className="flex flex-col items-center justify-center h-[100vh] textFont">
      <div className="relative flex flex-col items-center">
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[6vw] md:text-[2vw]"
              : "text-[40px]"
          } font-semibold`}
        >
          Welcome to
        </h1>
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[10vw] md:text-[4vw]"
              : "text-[80px]"
          } font-semibold headingFont`}
        >
          <span class="magic">
            <span class="magic-text">UniPlug</span>
          </span>
        </h1>
        <p
          className={`${
            window.innerWidth < 1780
              ? "text-[4vw] md:text-[1.5vw]"
              : "text-[30px]"
          }`}
        >
          Please Log In To Continue
        </p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className={`${
            window.innerWidth < 1780
              ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
              : "w-[1000px] text-[40px]"
          } input bg-transparent rounded-[10px] text-black p-[8px] mt-[24px] mb-[8px] border border-[#00cc00]`}
        />
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
        <button
          onClick={handleLogin}
          className={`${
            window.innerWidth < 1780 ? "w-[33vw] md:w-[13vw]" : "w-[200px]"
          } bg-[#013a19] text-white  mt-[32px] rounded-[20px] py-[8px] flex-col items-center justify-center`}
        >
          {loading ? <LoadingSpinner /> : "Log In"}
        </button>
        {errors && <p className="text-red-500">{errors}</p>}

        <p
          className={`${
            window.innerWidth < 1780
              ? "text-[3vw] md:text-[1.5vw]"
              : "text-[30px]"
          } mt-[16px]`}
        >
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
