import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/spinner";
import { nigerianStates } from "../json/nigerianStates";
import { nigerianUniversities } from "../json/nigerianUniversities";

const Gender = ["Male", "Female"];

function SignUpTwo() {
  const { userId } = useParams();

  const [selectedState, setSelectedState] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [loading, setloading] = useState();
  const [genderError, setgenderError] = useState("");
  const [universityError, setuniversityError] = useState("");
  const [stateError, setstateError] = useState("");
  const [onCampus, setonCampus] = useState(false);
  const [offCampus, setoffCampus] = useState(false);
  const [campusError, setcampusError] = useState("");

  const navigate = useNavigate();

  const updateAddress = async () => {
    if (selectedState === "") {
      setstateError("State is required");
      return;
    } else {
      setstateError("");
    }
    if (onCampus === false && offCampus === false) {
      setcampusError("Location is required");
      return;
    } else {
      setcampusError("");
    }
    if (onCampus === true && offCampus === true) {
      setcampusError("Select just one location");
      return;
    } else {
      setcampusError("");
    }
    if (selectedGender === "") {
      setgenderError("Gender is required");
      return;
    } else {
      setgenderError("");
    }
    if (selectedUniversity === "") {
      setuniversityError("University is required");
      return;
    } else {
      setuniversityError("");
    }

    setloading(true);

    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Users"), where("userId", "==", userId))
      );
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "Users", userDoc.id);
        await updateDoc(userRef, {
          state: selectedState,
          university: selectedUniversity,
          gender: selectedGender,
          onCampus: onCampus,
          offCampus: offCampus,
        });
        setloading(false);
        toast("Sign Up Successfull🙌🙌", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/Login");
      } else {
        console.log("No matching document found");
      }
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  return (
    <div>
      <div
        className={`${
          window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
        } textFont flex flex-col items-center justify-center h-[100vh] `}
      >
        <div className="relative flex flex-col items-center">
          <h1
            className={`${
              window.innerWidth < 1780
                ? "text-[6vw]  sm:text-[4vw] md:text-[3vw]"
                : "text-[70px]"
            } lg:mt-[32px] font-semibold headingFont`}
          >
            <span class="magic">
              <span class="magic-text">You're Almost There!!</span>
            </span>
          </h1>
          <p
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] sm:text-[2vw] md:text-[1.5vw]"
                : "text-[35px]"
            }`}
          >
            input your Contact Details below.
          </p>

          <select
            value={selectedState}
            onChange={handleStateChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[24px] mb-[8px] border border-[#00cc00]`}
          >
            <option value="">Select State</option>
            {nigerianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {stateError && <p className="text-red-500">{stateError}</p>}

          <select
            value={selectedUniversity}
            onChange={handleUniversityChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] my-[8px] border border-[#00cc00]`}
          >
            <option value="">Select University</option>
            {nigerianUniversities.map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
          {universityError && <p className="text-red-500">{universityError}</p>}

          <div className="my-[16px] ml-[30px]">
            <p
              className={`${
                window.innerWidth < 1780
                  ? "w-[80vw] md:w-[40vw] text-[3.5vw] md:text-[1.5vw] sm:text-[2vw]"
                  : "w-[1000px] text-[40px]"
              }  mb-[8px]`}
            >
              Where Do You Stay
            </p>
            <div
              className={`${
                window.innerWidth < 1780
                  ? "w-[85vw] sm:w-[60vw] md:w-[40vw]"
                  : "w-[1000px]"
              }  mb-[8px]`}
            >
              <input
                type="checkbox"
                id="Top"
                name="Top"
                className="mr-[0.5rem]"
                onChange={() => {
                  setoffCampus(!offCampus);
                }}
              />
              <label
                for="MIN"
                className={`${
                  window.innerWidth < 1780
                    ? "text-[3.5vw] sm:text-[2vw] md:text-[1.5vw]"
                    : "text-[40px]"
                }  mb-[8px]`}
              >
                Off Campus
              </label>
            </div>
            <div
              className={`${
                window.innerWidth < 1780
                  ? "w-[85vw] sm:w-[60vw] md:w-[40vw]"
                  : "w-[1000px]"
              }  mb-[8px]`}
            >
              <input
                type="checkbox"
                id="Top"
                name="Top"
                className="mr-[0.5rem]"
                onChange={() => {
                  setonCampus(!onCampus);
                  console.log(onCampus);
                }}
              />
              <label
                for="MIN"
                className={`${
                  window.innerWidth < 1780
                    ? "text-[3.5vw] sm:text-[2vw] md:text-[1.5vw]"
                    : "text-[40px]"
                }  mb-[8px]`}
              >
                On Campus
              </label>
            </div>
            {campusError && <p className="text-red-500">{campusError}</p>}
          </div>

          <select
            value={selectedGender}
            onChange={handleGenderChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] border border-[#00cc00]`}
          >
            <option value="">Select Gender</option>
            {Gender.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {genderError && <p className="text-red-500">{genderError}</p>}

          <button
            onClick={updateAddress}
            className={`${
              window.innerWidth < 1780 ? "w-[33vw] md:w-[13vw]" : "w-[200px]"
            } bg-[#013a19] text-white  mt-[32px] rounded-[20px] py-[8px] flex-col items-center justify-center`}
          >
            {loading ? <LoadingSpinner/> : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpTwo;
