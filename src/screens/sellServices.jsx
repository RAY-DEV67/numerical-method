import { PaystackButton } from "react-paystack";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../../firebase";
import { storage } from "../../firebase";
import {
  addDoc,
  getDocs,
  query,
  collection,
  where,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import LoadingSpinner from "../components/spinner";
import { nigerianStates } from "../json/nigerianStates";
import { nigerianUniversities } from "../json/nigerianUniversities";
import Input from "../components/input";

const Categories = [
  "Assignment & Note Copying",
  "Car Rentals",
  "Cleaning & Household Services",
  "Computer & I.T Services",
  "Dj & Entertainment",
  "Fashion & MakeUp",
  "Housing Agents",
  "Logistics & Delivery Services",
  "Party, Catering & Event Services",
  "Personal Shopper",
  "Photography & Video Services",
  "Printing",
  "Project Assistance",
];

function SellServices() {
  const { userId } = useParams();
  const { userName } = useParams();

  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [submitError, setsubmitError] = useState("");
  const [stateError, setstateError] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [emailError, setemailError] = useState();
  const [nameError, setnameError] = useState("");
  const [description, setdescription] = useState("");
  const [descriptionError, setdescriptionError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [phoneNumberError, setphoneNumberError] = useState("");
  const [instagram, setinstagram] = useState("");
  const [twitter, settwitter] = useState("");
  const [categoryError, setcategoryError] = useState("");
  const [universityError, setuniversityError] = useState("");
  const [image1Error, setimage1Error] = useState("");
  const [isfile, setfile1] = useState("");
  const [file2, setfile2] = useState("");
  const [file3, setfile3] = useState("");
  const [file4, setfile4] = useState("");
  const [file5, setfile5] = useState("");
  const [url, seturl] = useState("");
  const publicKey = "pk_test_1ab31e0238e828c92d25ba346af15aa620d4251e";

  const fivecomponentProps = {
    email,
    amount: "50000",
    metadata: {
      name,
      phoneNumber,
    },
    publicKey,
    text: "Plug Me (#500)",
    onSuccess: () => {
      handleSubmit();
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Wait!!!, don't go!!!!😢"),
  };

  const OnecomponentProps = {
    email,
    amount: "100000",
    metadata: {
      name,
      phoneNumber,
    },
    publicKey,
    text: "Plug Me (#1000)",
    onSuccess: () => {
      handleSubmit();
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Wait!!!, don't go!!!!😢"),
  };

  const upload = async () => {
    setnameError("");
    setcategoryError("");
    setimage1Error("");
    setstateError("");
    setphoneNumberError("");
    setdescriptionError("");
    setsubmitError("");
    setemailError("");

    if (name === "") {
      setnameError("Please Enter Your Name");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (email === "") {
      setemailError("Please Enter Your Email");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }

    if (selectedCategory === "") {
      setcategoryError("Please Select A Category");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (isfile === "") {
      setimage1Error("Please Select An Image");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (selectedState === "") {
      setstateError("Please Select A State");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (phoneNumber === "") {
      setphoneNumberError("Please Enter Your Phone Number");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (description === "") {
      setdescriptionError("Please Enter Your Service Description");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (selectedUniversity === "") {
      setuniversityError("Please Select A University");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }

    setloadingSubmit(true);

    // Get the current date
    const currentDate = new Date();

    // Calculate the new subscription end date by adding 1 month
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);

    // Handle cases where the new date doesn't exist (e.g., February 30th)
    if (currentDate.getDate() !== newDate.getDate()) {
      // Adjust to the last day of the previous month
      newDate.setDate(0);
    }

    const docRef = await addDoc(collection(db, "Services"), {
      category: selectedCategory,
      state: selectedState,
      university: selectedUniversity,
      nameOfVendor: name,
      description: description,
      phoneNumber: phoneNumber,
      instagram: instagram,
      twitter: twitter,
      price: "Contact for price",
      notTop: true,
      userId: userId,
      timestamp: serverTimestamp(),
      expiryDate: newDate,
      searchKeywords:
        `${description.toLowerCase()} ${userName?.toLowerCase()} ${selectedCategory?.toLowerCase()}`.split(
          " "
        ),
    });
    console.log("Uploaded Successfully");
    setloadingSubmit(false);

    if (isfile == null) return;
    seturl("getting link");
    storage
      .ref("/images/" + isfile.name)
      .put(isfile)
      .on("state_changed", alert("success"), alert, () => {
        storage
          .ref("images")
          .child(isfile.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              image1: imgUrl,
            });
          });
      });

    if (file2 == null) return;
    seturl("getting link");
    storage
      .ref("/images/" + file2.name)
      .put(file2)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(file2.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              image2: imgUrl,
            });
          });
      });

    if (file3 == null) return;
    seturl("getting link");
    storage
      .ref("/images/" + file3.name)
      .put(file3)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(file3.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              image3: imgUrl,
            });
          });
      });

    if (file4 == null) return;
    seturl("getting link");
    storage
      .ref("/images/" + file4.name)
      .put(file4)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(file4.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              image4: imgUrl,
            });
          });
      });

    if (file5 == null) return;
    seturl("getting link");
    storage
      .ref("/images/" + file5.name)
      .put(file5)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(file5.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              image5: imgUrl,
            });
          });
      });
  };

  const updateUserInfo = async () => {
    if (phoneNumber === "") {
      setphoneNumberError("Please Enter Your Phone Number");
      return;
    }
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

        console.log("Document updated successfully");
        setloadingSubmit(false);
      } else {
        console.log("No matching document found");
      }
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  const handleSubmit = async (event) => {
    upload();
    updateUserInfo();
  };

  const handleCategoryChange = (e) => {
    setselectedCategory(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
  };

  useEffect(() => {
    setnameError("");
    setcategoryError("");
    setimage1Error("");
    setstateError("");
    setphoneNumberError("");
    setdescriptionError("");
    setsubmitError("");
    setemailError("");

    if (name === "") {
      setnameError("Please Enter Your Name");
      setsubmitError("Unsuccessful!! Please Enter Your Name!");
      return;
    }
    if (email === "") {
      setemailError("Please Enter Your Email");
      setsubmitError("Unsuccessful!! Please Enter Your Email");
      return;
    }
    if (selectedCategory === "") {
      setcategoryError("Please Select A Category");
      setsubmitError("Unsuccessful!! Please Select A Category");
      return;
    }
    if (isfile === "") {
      setimage1Error("Please Select An Image");
      setsubmitError("Unsuccessful!! Please Select An Image");
      return;
    }
    if (selectedState === "") {
      setstateError("Please Select A State");
      setsubmitError("Unsuccessful!! Please Select A State");
      return;
    }
    if (selectedUniversity === "") {
      setstateError("Please Select A State");
      setsubmitError("Unsuccessful!! Please Select A University");
      return;
    }
    if (phoneNumber === "") {
      setphoneNumberError("Please Enter Your Phone Number");
      setsubmitError("Unsuccessful!! Please Enter Your Phone Number");
      return;
    }
    if (description === "") {
      setdescriptionError("Please Enter Your Service Description");
      setsubmitError("Unsuccessful!! Please Enter Your Service Description");
      return;
    }
  }, [
    phoneNumber,
    description,
    name,
    email,
    selectedCategory,
    isfile,
    selectedState,
    selectedUniversity,
  ]);

  return (
    <div>
      <div className="flex flex-col items-center textFont">
        <h1 className="lg:hidden headingFont text-[5vw] mt-[18vw] md:mt-[10vw]">
          <span class="magic">
            <span class="magic-text z-1 relative">
              Upload Services
            </span>
          </span>
        </h1>
        <div
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] lg:mt-[10vw] mt-[24px]"
              : "w-[1500px] mt-[150px]"
          } items-center justify-center flex flex-col px-[1rem] pb-[2.5rem]`}
        >
          <Input
            onChangeText={(e) => setname(e.target.value)}
            type="text"
            error={nameError}
            placeholder="Your Name"
          />

          <Input
            onChangeText={(e) => setemail(e.target.value)}
            type="text"
            error={emailError}
            placeholder="Your Email"
          />

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          >
            <option value="">Category</option>
            {Categories.map((categories) => (
              <option key={categories} value={categories}>
                {categories}
              </option>
            ))}
          </select>
          {categoryError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[2vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500 mb-[16px]`}
            >
              {categoryError}
            </p>
          )}

          <div
            className={`${
              window.innerWidth < 1780 ? "w-[80vw] md:w-[40vw] " : "w-[1000px]"
            }`}
          >
            <h2
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[40px]"
              } font-bold`}
            >
              Add Photo
            </h2>
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[2.5vw] md:text-[1.5vw] lg:text-[1vw]"
                  : "text-[30px]"
              }`}
            >
              First picture is the title picture
            </p>
            <div className="flex flex-col">
              <div>
                <input
                  className={`${
                    window.innerWidth < 1780
                      ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                      : "text-[40px]"
                  } mt-[1rem]`}
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos"
                  onChange={(event) => {
                    setfile1(event.target.files[0]);
                  }}
                />
                {image1Error && (
                  <p
                    className={`${
                      window.innerWidth < 1780
                        ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                        : "text-[30px]"
                    } text-red-500 mb-[16px]`}
                  >
                    {image1Error}
                  </p>
                )}
              </div>

              <div>
                <input
                  className={`${
                    window.innerWidth < 1780
                      ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                      : "text-[40px]"
                  } mt-[1rem]`}
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos2"
                  onChange={(event) => {
                    setfile2(event.target.files[0]);
                    console.log(event.target.files[0]);
                  }}
                />
              </div>

              <div>
                <input
                  className={`${
                    window.innerWidth < 1780
                      ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                      : "text-[40px]"
                  } mt-[1rem]`}
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos3"
                  onChange={(event) => {
                    setfile3(event.target.files[0]);
                  }}
                />
              </div>

              <div>
                <input
                  className={`${
                    window.innerWidth < 1780
                      ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                      : "text-[40px]"
                  } mt-[1rem]`}
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos4"
                  onChange={(event) => {
                    setfile4(event.target.files[0]);
                  }}
                />
              </div>

              <div>
                <input
                  className={`${
                    window.innerWidth < 1780
                      ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                      : "text-[40px]"
                  } mt-[1rem]`}
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos5"
                  onChange={(event) => {
                    setfile5(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[2.5vw] md:text-[1.5vw] lg:text-[1vw]"
                  : "text-[30px]"
              } mt-[1rem] text-red-600`}
            >
              Each picture must not exceed 5MB
            </p>
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[2.5vw] md:text-[1.5vw] lg:text-[1vw]"
                  : "text-[30px]"
              } text-red-600`}
            >
              Supported formats are *.jpg and *jpeg
            </p>
          </div>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          >
            <option value="">Select State</option>
            {nigerianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {stateError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[2vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500 mb-[16px]`}
            >
              {stateError}
            </p>
          )}

          <select
            value={selectedUniversity}
            onChange={handleUniversityChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          >
            <option value="">Select University</option>
            {nigerianUniversities.map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
          {universityError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[2vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500 mb-[16px]`}
            >
              {universityError}
            </p>
          )}

          <Input
            onChangeText={(e) => setdescription(e.target.value)}
            type="text"
            error={descriptionError}
            placeholder="Description"
          />

          <h2
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                : "text-[40px]"
            } font-bold mb-[8px]`}
          >
            YOUR CONTACT DETAILS
          </h2>

          <Input
            onChangeText={(e) => setphoneNumber(e.target.value)}
            type="text"
            error={phoneNumberError}
            placeholder="Phone Number"
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

          {selectedCategory == "" ||
          selectedCategory == "Cleaning & Household Services" ||
          selectedCategory == "Assignment & Note Copying" ||
          selectedCategory == "Personal Shopper" ? (
            <button
              onClick={(e) => {
                handleSubmit(e);
                updateUserInfo();
              }}
              className={`${
                window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[500px]"
              } bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[16px] rounded-[20px] py-[8px]`}
            >
              {loadingSubmit ? <LoadingSpinner /> : "Plug Me"}
            </button>
          ) : null}

          {selectedCategory == "Project Assistance" ||
          selectedCategory == "Computer & I.T Services" ||
          selectedCategory == "Logistics & Delivery Services" ||
          selectedCategory == "Printing" ||
          selectedCategory == "Dj & Entertainment" ||
          selectedCategory == "Fashion & MakeUp" ||
          selectedCategory == "Party, Catering & Event Services" ||
          (selectedCategory == "Photography & Video Services" &&
            !submitError) ? (
            <PaystackButton
              className={`${
                window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[500px]"
              } bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[16px] rounded-[20px] py-[8px]`}
              {...fivecomponentProps}
            />
          ) : null}

          {selectedCategory == "Car Rentals" ||
          (selectedCategory == "Housing Agents" && !submitError) ? (
            <PaystackButton
              className={`${
                window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[500px]"
              } bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[16px] rounded-[20px] py-[8px]`}
              {...OnecomponentProps}
            />
          ) : null}

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
            you will abide by the safety tips, and declare that this poisting
            does not include any prohibited items{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SellServices;
