import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import db from "../../firebase";
import LoadingSpinner from "../components/spinner";
import Input from "../components/input";

function SignUpOne() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  const [uniTag, setuniTag] = useState("");
  const [uniTagError, setuniTagError] = useState("");

  const docRef = collection(db, "Users");

  const checkUniTagExists = async (tag) => {
    const usersRef = db.collection("Users");

    // Query the database to check if the tag already exists
    const querySnapshot = await usersRef.where("uniTag", "==", tag).get();

    return !querySnapshot.empty; // Return true if the tag exists, otherwise false
  };

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
        availablePlugs: 5,
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
        profilePicture: "",
        uniTag: uniTag.toLowerCase(),
        payForFriend: 0,
        plugMates: [],
        verified: false,
        vendorName: "",
        referredBy: "",
        searchKeywords: `${firstName.toLowerCase()}`.split(" "),
      });

      console.log("Added new User");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    setconfirmPasswordError("");
    setemailError("");
    setpasswordError("");
    setfirstNameError("");
    setconfirmEmailError("");
    setuniTagError("");

    if (firstName === "") {
      setfirstNameError("Please Enter Your Name");
      return;
    }
    if (email === "") {
      setemailError("Please Enter Your Email");
      return;
    }
    if (confirmEmail === "") {
      setconfirmEmailError("Please Retype Your Email");
      return;
    }
    if (uniTag === "") {
      setuniTagError("Please Enter A UserName");
      return;
    }
    if (password === "") {
      setpasswordError("Please Enter Your Password");
      return;
    }
    if (password !== confirmPassword) {
      setconfirmPasswordError("Passwords do not match");
      return;
    }
    if (email !== confirmEmail) {
      setconfirmEmailError("Emails Do Not Match");
      return;
    }
    setLoading(true);

    // Check if the uniTag already exists
    const tagExists = await checkUniTagExists(uniTag.toLowerCase());

    if (tagExists) {
      setuniTagError("Uni-Tag already exists. Please choose a different one.");
      setLoading(false);
      return;
    }

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
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
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
      } textFont flex flex-col items-center pt-[68px]`}
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
              ? "text-[4vw] md:text-[1.5vw] lg:text-[1.2vw]"
              : "text-[30px]"
          }`}
        >
          Lets get you started, input your details below.
        </p>

        <Input
          onChangeText={(e) => setfirstName(e.target.value)}
          type="text"
          error={firstNameError}
          placeholder="Name"
        />

        <Input
          onChangeText={(e) => setEmail(e.target.value)}
          type="text"
          error={emailError}
          placeholder="Email"
        />

        <Input
          onChangeText={(e) => setconfirmEmail(e.target.value)}
          type="text"
          error={confirmEmailError}
          placeholder="Retype Email"
        />

        <Input
          onChangeText={(e) => setuniTag(e.target.value)}
          type="text"
          error={uniTagError}
          placeholder="Choose a username (Uni-Tag)"
        />

        <Input
          onChangeText={(e) => setPassword(e.target.value)}
          type="text"
          error={passwordError}
          placeholder="Password"
        />

        <Input
          onChangeText={(e) => setConfirmPassword(e.target.value)}
          type="text"
          error={confirmPasswordError}
          placeholder="Confirm Password"
        />

        <button
          onClick={handleSignUp}
          className={`${
            window.innerWidth < 1780 ? "w-[33vw] md:w-[13vw]" : "w-[200px]"
          } bg-[#013a19] text-white mt-[16px] rounded-[20px] py-[8px] flex-col items-center justify-center`}
        >
          {loading ? <LoadingSpinner /> : "Continue"}
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
