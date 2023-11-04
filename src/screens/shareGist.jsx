import image from "../assets/check.png";
import { useState, useContext} from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import LoadingSpinner from "../components/spinner";
import Input from "../components/input";
import { useUserDetailsContext } from "../context/userDetails";
import { generateRandomString } from "../helper/generateRandomString";
import { UserId } from "../App";
import Modal from "../components/modal";

function ShareGist() {
  const userId = useContext(UserId);
  const { university, phoneNumber, profilePicture, Name, uniTag } =
    useUserDetailsContext();
  const [showModal, setShowModal] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [submitError, setsubmitError] = useState("");
  const [description, setdescription] = useState("");
  const [descriptionError, setdescriptionError] = useState("");
  const [phoneNumberForm, setphoneNumberForm] = useState(phoneNumber);
  const [instagram, setinstagram] = useState("");
  const [twitter, settwitter] = useState("");

  const postGist = async () => {
    setloadingSubmit(true);
    try {
      const docRef = await addDoc(collection(db, "Campus Gist"), {
        gist: description,
        images: [],
        timestamp: serverTimestamp(),
        gistId: generateRandomString(20),
        authorProfilePicture: profilePicture,
        authorUserId: userId,
        authorName: Name,
        authorUniTag: uniTag,
        likes: 0,
        bookmarkedBy: [],
        likesBy: [],
        commentsLikesBy: [],
        subCommentsLikesBy: [],
        comments: [],
        subComments: [],
        authorUniversity: university,
        searchKeywords:
          `${description.toLowerCase()} ${Name.toLowerCase()}`.split(" "),
      });
      updateUserInfo();
      setShowModal(true);
      // Clear the input field and selected images
      setdescription("");
    } catch (error) {
      // console.error("Error posting gist:", error);
    }
  };

  const updateUserInfo = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Users"), where("userId", "==", userId))
      );
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "Users", userDoc.id);
        await updateDoc(userRef, {
          instagram: instagram,
          twitter: twitter,
          phoneNumber: phoneNumber,
        });
        setloadingSubmit(false);
      } else {
        // console.log("No matching document found");
      }
    } catch (err) {
      // console.error("Error updating document:", err);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center textFont">
        <h1 className="lg:hidden headingFont text-[5vw] mt-[18vw] md:mt-[10vw]">
          <span class="magic">
            <span class="magic-text z-1 relative">Share Campus Gist</span>
          </span>
        </h1>
        <div
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] lg:mt-[10vw] mt-[24px]"
              : "w-[1500px] mt-[150px]"
          } items-center justify-center flex flex-col px-[1rem] pb-[2.5rem]`}
        >
          <textarea
            rows="4" // Set the number of visible rows
            cols="50" // Set the number of visible columns
            value={description} // Bind the value to the state
            onChange={(e) => setdescription(e.target.value)} // Attach an onChange event handler
            placeholder="Drop your story" // Optional placeholder text
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] lg:text-[1.5vw] md:text-[2vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[16px] border border-[#00cc00] `}
          />

          {descriptionError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px] textFont`}
            >
              {descriptionError}
            </p>
          )}

          <h2
            className={`${
              window.innerWidth < 1780
                ? "text-[4vw] md:text-[2vw] lg:text-[1.5vw]"
                : "text-[40px]"
            } font-bold mb-[8px] mt-[16px]`}
          >
            YOUR CONTACT DETAILS
          </h2>

          <Input
            onChangeText={(e) => setphoneNumberForm(e.target.value)}
            type="text"
            placeholder="Phone Number"
            value={phoneNumberForm}
          />

          <Input
            onChangeText={(e) => setinstagram(e.target.value)}
            type="text"
            placeholder="Instagram Handle"
          />

          <Input
            onChangeText={(e) => settwitter(e.target.value)}
            type="text"
            placeholder="Twitter Handle"
          />
          <button
            onClick={() => {
              setdescriptionError("");
              if (description === "") {
                setdescriptionError("Please Enter Your Story");
                setsubmitError("Unsuccessful!! Check for errors!");
                return;
              }
              postGist();
            }}
            className={`${
              window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[500px]"
            } bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[32px] rounded-[20px] py-[8px]`}
          >
            {loadingSubmit ? <LoadingSpinner /> : "Share Gist"}
          </button>

          {submitError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500 mb-[16px]`}
            >
              {submitError}
            </p>
          )}
          <p
            className={`${
              window.innerWidth < 1780
                ? "md:w-[40vw] text-[2.5vw] md:text-[1.5vw] lg:text-[1vw]"
                : "text-[30px] w-[800px]"
            } mt-[0.5rem] mb-[2rem] text-red-600`}
          >
            By Clicking on Post Ad, you accept the Terms of Use, Confirm that
            you will abide by the safety tips.
          </p>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        image={image}
        text="Your Campus Story Was Sent Successfully🥳🎉, We Would Get In Touch With You💚"
      />
    </div>
  );
}

export default ShareGist;
