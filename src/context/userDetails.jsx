import React, { createContext, useContext, useState, useEffect } from "react";
import {
  query,
  collection,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserId } from "../App";

export const UserDetailsContext = createContext({});

const UserDetailsContextProvider = ({ children }) => {
  const userId = useContext(UserId);

  const [userDetails, setUserDetails] = useState({
    email: "",
    Name: "",
    address: "",
    state: "",
    university: "",
    typeOfAccount: "",
    gender: "",
    credit: 0,
    hasGottenCredit: true,
    phoneNumber: "",
    plugStatus: "",
    tempUserId: "",
    availablePlugs: undefined,
    vendorOnboarded: true,
    accountNumber: "",
    accountName: "",
    bankName: "",
    onCampus: false,
    offCampus: false,
    eventsScreenOnboarded: false,
    plugmeScreenOnboarded: false,
    fetched: false,
    update: undefined,
    loadingUserDetails: false,
    removeCredit: false,
    removeEvents: false,
    profilePicture: "",
    uniTag: "",
    plugMates: [],
    referredBy: "",
  });

  const fetchUserDetails = async () => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      loadingUserDetails: true,
    }));

    try {
      const userRef = collection(db, "Users");
      const q = query(userRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const userDoc = querySnapshot.docs[0].data();
        setUserDetails({
          ...userDoc,
          loadingUserDetails: false,
          fetched: true,
        });
        console.log("update New User Doc");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch the initial user details when the component mounts
    fetchUserDetails();

    // Set up a Firestore listener to listen for changes to the user's document
    const userRef = collection(db, "Users");
    const q = query(userRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Handle updates to the user's document here
        const userDoc = doc.data();
        console.log("updateDoc");
        setUserDetails({
          ...userDoc,
          fetched: true,
        });
      });
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [userId]);

  return (
    <UserDetailsContext.Provider value={userDetails}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetailsContext = () => useContext(UserDetailsContext);

export default UserDetailsContextProvider;
