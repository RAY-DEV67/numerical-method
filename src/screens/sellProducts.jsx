import { useState, useContext } from "react";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import {
  addDoc,
  getDocs,
  query,
  collection,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { UserId } from "../App";
import LoadingSpinner from "../components/spinner";
import Input from "../components/input";
import { nigerianUniversities } from "../json/nigerianUniversities";
import { nigerianStates } from "../json/nigerianStates";
import { generateRandomString } from "../helper/generateRandomString";
import { useUserDetailsContext } from "../context/userDetails";

const Categories = [
  "Clothes",
  "Shoes",
  "Hair",
  "Bags",
  "Accessories",
  "Skin Care",
  "Fragrances",
  "Gadgets",
  "Others",
];

const Gender = ["Male", "Female", "Unisex"];
const Condition = ["Brand New", "Used"];
const HairOrigin = ["Any", "Human Hair", "Synthetic"];

function SellProducts() {
  const userUid = useContext(UserId);
  const {
    state,
    university,
    vendorName,
    accountNumber,
    bankName,
    accountName,
    phoneNumber,
    instagram,
    twitter,
  } = useUserDetailsContext();

  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState(state);
  const [selectedUniversity, setSelectedUniversity] = useState(university);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [submitError, setsubmitError] = useState("");
  const [availableQuantity, setavailableQuantity] = useState(100000);
  const [stateError, setstateError] = useState("");
  const [price, setprice] = useState();
  const [priceError, setpriceError] = useState("");
  const [deliveryOnCampus, setdeliveryOnCampus] = useState(0);
  const [deliveryOnCampusError, setdeliveryOnCampusError] = useState("");
  const [deliveryOffCampus, setdeliveryOffCampus] = useState(0);
  const [deliveryOffCampusError, setdeliveryOffCampusError] = useState("");
  const [title, settitle] = useState("");
  const [titleError, settitleError] = useState("");
  const [brand, setbrand] = useState("");
  const [color, setcolor] = useState("");
  const [description, setdescription] = useState("");
  const [phoneNumberForm, setphoneNumberForm] = useState(phoneNumber);
  const [phoneNumberError, setphoneNumberError] = useState("");
  const [accountNumberForm, setaccountNumberForm] = useState(accountNumber);
  const [accountNumberError, setaccountNumberError] = useState("");
  const [bankNameForm, setbankNameForm] = useState(bankName);
  const [bankNameError, setbankNameError] = useState("");
  const [accountHolderName, setaccountHolderName] = useState(accountName);
  const [accountHolderNameError, setaccountHolderNameError] = useState("");
  const [instagramForm, setinstagramForm] = useState(instagram);
  const [twitterForm, settwitterForm] = useState(twitter);
  const [size, setsize] = useState("");
  const [vendorNameForm, setvendorNameForm] = useState(vendorName);
  const [vendorLogo, setvendorLogo] = useState("");
  const [vendorNameError, setvendorNameError] = useState("");
  const [deliveryTime, setdeliveryTime] = useState("");
  const [deliveryTimeError, setdeliveryTimeError] = useState("");
  const [genderError, setgenderError] = useState("");
  const [categoryError, setcategoryError] = useState("");
  const [universityError, setuniversityError] = useState("");
  const [image1Error, setimage1Error] = useState("");
  const [image2Error, setimage2Error] = useState("");
  const [isfile, setfile1] = useState("");
  const [file2, setfile2] = useState("");
  const [file3, setfile3] = useState("");
  const [file4, setfile4] = useState("");
  const [file5, setfile5] = useState("");
  const [url, seturl] = useState("");
  const [hairLength, sethairLength] = useState("");
  const [selectedHairOrigin, setselectedHairOrigin] = useState("");

  const originalPrice = Number(price);
  const calculatedPrice = originalPrice + originalPrice * 0.05; // Calculate 5% of the original price

  const uploadImages = async (docRef) => {
    // Create an array of promises for each image upload
    const imageUploadPromises = [];

    // Define your image file variables (file1, file2, file3, file4, file5)

    // Helper function to upload an image and get the download URL
    const uploadImageAndGetUrl = async (file) => {
      if (!file) return null;

      return new Promise((resolve, reject) => {
        const storageRef = storage.ref(`/images/${file.name}`);
        const imageRef = storageRef.child(file.name);

        imageRef
          .put(file)
          .then((snapshot) => {
            // Image uploaded successfully, get the download URL
            imageRef.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    // Push image upload promises to the array
    imageUploadPromises.push(uploadImageAndGetUrl(isfile));
    imageUploadPromises.push(uploadImageAndGetUrl(file2));
    imageUploadPromises.push(uploadImageAndGetUrl(file3));
    imageUploadPromises.push(uploadImageAndGetUrl(file4));
    imageUploadPromises.push(uploadImageAndGetUrl(file5));

    // Use Promise.all to wait for all uploads to complete
    const imageUrls = await Promise.all(imageUploadPromises);

    // Create an object to store the updated image URLs
    const updatedImages = {
      image1: imageUrls[0] || "",
      image2: imageUrls[1] || "",
      image3: imageUrls[2] || "",
      image4: imageUrls[3] || "",
      image5: imageUrls[4] || "",
    };

    // Update the Firestore document with the image links
    await updateDoc(docRef, updatedImages);
    alert("Service Uploaded Successfully");
  };

  const upload = async () => {
    setcategoryError("");
    setdeliveryTimeError("");
    setimage1Error("");
    setimage2Error("");
    setstateError("");
    setuniversityError("");
    settitleError("");
    setgenderError("");
    setvendorNameError("");
    setpriceError("");
    setphoneNumberError("");
    setsubmitError("");
    setaccountHolderNameError("");
    setbankNameError("");
    setaccountNumberError("");
    setdeliveryOffCampusError("");
    setdeliveryOnCampusError("");

    if (selectedCategory === "") {
      setcategoryError("Please Select A Category");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (isfile === "") {
      setimage1Error("Please Select A Title Image");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (file2 === "") {
      setimage2Error("Please Select An Image");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (selectedState === "") {
      setstateError("Please Select A State");
      setsubmitError("Unsuccessful!! Check form for errors!");

      return;
    }
    if (selectedUniversity === "") {
      setuniversityError("Please Select Your University");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (title === "") {
      settitleError("Please Enter Product Title");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (selectedGender === "") {
      setgenderError("Please Select A Gender");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (vendorNameForm === "") {
      setvendorNameError("Please Enter Your Brand Name");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (price === 0) {
      setpriceError("Please Enter Price");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (isNaN(price)) {
      setpriceError("Price must be a number, remove any commas ',' ");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (isNaN(deliveryOffCampus)) {
      setdeliveryOffCampusError(
        "Price must be a number, remove any commas ',' "
      );
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (isNaN(deliveryOnCampus)) {
      setdeliveryOnCampusError(
        "Price must be a number, remove any commas ',' "
      );
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (deliveryTime == "") {
      setdeliveryTimeError("Please enter a delivery time");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (accountNumberForm === "") {
      setaccountNumberError("Please Enter Your Account Number");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (bankNameForm === "") {
      setbankNameError("Please Enter Your Bank Name");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (accountHolderName === "") {
      setaccountHolderNameError("Please Enter The Name On This Bank Account ");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (phoneNumberForm === "") {
      setphoneNumberError("Please Enter Your Phone Number");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    setloadingSubmit(true);

    const docRef = await addDoc(collection(db, "Products"), {
      category: selectedCategory,
      state: selectedState,
      university: selectedUniversity,
      title: title,
      description: description,
      nameOfBrand: brand,
      color: color ? color.split(",") : [],
      condition: selectedCondition,
      gender: selectedGender,
      size: size ? size.split(",") : [],
      vendor: vendorNameForm,
      phoneNumber: phoneNumberForm,
      instagram: instagramForm,
      twitter: twitterForm,
      price: calculatedPrice,
      notTop: true,
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
      vendorLogo: "",
      userId: userUid,
      availableQuantity: Number(availableQuantity),
      productId: generateRandomString(20),
      timestamp: serverTimestamp(),
      blocked: false,
      vendorAccountNumber: accountNumberForm,
      vendorAccountName: accountHolderName,
      vendorBankName: bankNameForm,
      deliveryOffCampus: Number(deliveryOffCampus),
      deliveryOnCampus: Number(deliveryOnCampus),
      deliveryTime: deliveryTime,
      hairOrigin: selectedHairOrigin,
      hairLength: hairLength ? hairLength.split(",") : [],
      searchKeywords: `${title.toLowerCase()} ${selectedGender.toLowerCase()} ${
        selectedGender === "Male"
          ? "Men"
          : selectedGender === "Female"
          ? "Women"
          : null
      } ${description.toLowerCase()} ${brand.toLowerCase()} ${vendorNameForm?.toLowerCase()} ${selectedCategory?.toLowerCase()}`.split(
        " "
      ),
    });

    // Upload and update images
    await uploadImages(docRef);
    updateUserInfo();
    setloadingSubmit(false);

    if (vendorLogo == null) return;
    seturl("getting link");
    storage
      .ref("/images/" + vendorLogo.name)
      .put(vendorLogo)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(vendorLogo.name)
          .getDownloadURL()
          .then((imgUrl) => {
            updateDoc(docRef, {
              vendorLogo: imgUrl,
            });
          });
      });
  };

  const updateUserInfo = async () => {
    if (phoneNumberForm === "") {
      setphoneNumberError("Please Enter Your Phone Number");
      return;
    }
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Users"), where("userId", "==", userUid))
      );
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "Users", userDoc.id);
        await updateDoc(userRef, {
          instagram: instagramForm,
          twitter: twitterForm,
          phoneNumber: phoneNumberForm,
          accountNumber: accountNumberForm,
          bankName: bankNameForm,
          accountName: accountHolderName,
          vendorName: vendorNameForm,
        });
        setloadingSubmit(false);
      } else {
        // console.log("No matching document found");
      }
    } catch (err) {
      // console.error("Error updating document:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    upload();
  };

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
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

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleConditionChange = (e) => {
    setSelectedCondition(e.target.value);
  };

  const handleHairOriginChange = (e) => {
    setselectedHairOrigin(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col items-center textFont">
        <h1 className="lg:hidden headingFont text-[5vw] mt-[18vw] md:mt-[10vw]">
          <span class="magic">
            <span class="magic-text z-1 relative">Upload Products</span>
          </span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] lg:mt-[10vw] mt-[24px]"
              : "w-[1500px] mt-[150px]"
          } items-center justify-center flex flex-col px-[1rem] pb-[2.5rem]`}
        >
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] my-[16px] border border-[#00cc00]`}
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
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
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
                  ? "text-[4vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[40px]"
              } font-bold`}
            >
              Add Photo
            </h2>
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[1.5vw] lg:text-[1vw]"
                  : "text-[30px]"
              }`}
            >
              First picture is the title picture
            </p>
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[2.5vw] md:text-[1.5vw] lg:text-[1vw] text-red-600"
                  : "text-[30px]"
              }`}
            >
              Select at least 2 images
            </p>
            <div className="flex flex-col">
              <div>
                <input
                  className={`${
                    window.innerWidth < 1780
                      ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw]"
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
                        : "text-[40px]"
                    } mt-[1rem] text-red-500 mb-[16px]`}
                  >
                    {image1Error}
                  </p>
                )}
              </div>

              <div>
                <input
                  className={`${
                    window.innerWidth < 1780
                      ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw]"
                      : "text-[40px]"
                  } mt-[1rem]`}
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos2"
                  onChange={(event) => {
                    setfile2(event.target.files[0]);
                  }}
                />
                {image2Error && (
                  <p
                    className={`${
                      window.innerWidth < 1780
                        ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                        : "text-[40px]"
                    } text-red-500 mb-[16px]`}
                  >
                    {image2Error}
                  </p>
                )}
              </div>

              <div>
                <input
                  className={`${
                    window.innerWidth < 1780
                      ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw]"
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
                      ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw]"
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
                      ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw]"
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
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[16px] border border-[#00cc00]`}
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
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {stateError}
            </p>
          )}

          <select
            value={selectedUniversity}
            onChange={handleUniversityChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[16px] border border-[#00cc00]`}
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
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {universityError}
            </p>
          )}

          <Input
            onChangeText={(e) => settitle(e.target.value)}
            type="text"
            error={titleError}
            placeholder="Product Title"
          />

          <Input
            onChangeText={(e) => setbrand(e.target.value)}
            type="text"
            placeholder="Name Of Brand (Optional)"
          />

          {selectedCategory !== "Skin Care" &&
            selectedCategory !== "Fragrances" && (
              <div>
                <Input
                  onChangeText={(e) => {
                    setcolor(e.target.value);
                  }}
                  type="text"
                  placeholder="Color Of Product (Optional)"
                />

                <p className="text-red-700 mx-[8px] mt-[8px] textFont mb-[16px] text-[12px]">
                  Note: If more than one color is available, seperate the
                  various colors available using a comma ","
                </p>
              </div>
            )}

          {selectedCategory !== "Hair" &&
            selectedCategory !== "Skin Care" &&
            selectedCategory !== "Fragrances" && (
              <select
                value={selectedCondition}
                onChange={handleConditionChange}
                className={`${
                  window.innerWidth < 1780
                    ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                    : "w-[1000px] text-[40px]"
                } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[16px] border border-[#00cc00]`}
              >
                <option value="">Select Condition</option>
                {Condition.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            )}

          {selectedCategory !== "Hair" && selectedCategory !== "Gadgets" && (
            <select
              value={selectedGender}
              onChange={handleGenderChange}
              className={`${
                window.innerWidth < 1780
                  ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                  : "w-[1000px] text-[40px]"
              } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[16px] border border-[#00cc00]`}
            >
              <option value="">Which Gender Is This Product For</option>
              {Gender.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          )}

          {genderError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {genderError}
            </p>
          )}

          {selectedCategory == "" ||
          selectedCategory == "Clothes" ||
          selectedCategory == "Shoes" ||
          selectedCategory == "Bags" ? (
            <div>
              <Input
                onChangeText={(e) => {
                  setsize(e.target.value);
                }}
                type="text"
                placeholder="Size eg: M, L, XL"
              />
              <p className="text-red-700 mb-[16px] mt-[8px] font-[body] px-[14px] text-[12px]">
                Note: If more than one size is available, seperate the various
                sizes available using a comma ","
              </p>
            </div>
          ) : null}

          {selectedCategory == "Hair" && (
            <div>
              <div className="items-center">
                <Input
                  onChangeText={(e) => {
                    sethairLength(e.target.value);
                  }}
                  type="text"
                  placeholder="Wig or Hair Length Eg: 20 inches"
                />
                <p className="text-red-700 m-[4px] font-[body] text-[12px]">
                  Note: If more than one length is available, seperate the
                  various lengths available using a comma ","
                </p>
              </div>

              <select
                value={selectedHairOrigin}
                onChange={handleHairOriginChange}
                className={`${
                  window.innerWidth < 1780
                    ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                    : "w-[1000px] text-[40px]"
                } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[16px] border border-[#00cc00]`}
              >
                <option value="">Hair Origin</option>
                {HairOrigin.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Input
            onChangeText={(e) => setavailableQuantity(e.target.value)}
            type="text"
            placeholder="Available Quantity (Leave Blank If Unlimited)"
          />

          <Input
            onChangeText={(e) => setvendorNameForm(e.target.value)}
            type="text"
            placeholder="Name Of Vendor"
            error={vendorNameError}
            value={vendorNameForm}
          />

          <p
            className={`${
              window.innerWidth < 1780
                ? "text-[4vw] md:text-[2vw] lg:text-[1.5vw]"
                : "text-[40px]"
            } font-bold mt-[16px]`}
          >
            Add Vendor Logo
          </p>
          <input
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] md:w-[40vw]"
                : "text-[40px] w-[1000px]"
            } my-[16px]`}
            type="file"
            accept="image/png , image/jpg"
            name="photos"
            onChange={(event) => {
              setvendorLogo(event.target.files[0]);
            }}
          />

          <Input
            onChangeText={(e) => setdescription(e.target.value)}
            type="text"
            placeholder="Description"
          />

          <Input
            onChangeText={(e) => setprice(e.target.value)}
            type="text"
            placeholder="Price"
            error={priceError}
          />
          {calculatedPrice ? (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } italic text-[#d3d3d3] mb-[16px]`}
            >
              {formatCur(calculatedPrice, "en-NG", "NGN")} (5% Processing fees &
              VAT)
            </p>
          ) : null}

          <Input
            onChangeText={(e) => setdeliveryOnCampus(e.target.value)}
            type="text"
            placeholder="On Campus Delivery Fee (Leave Blank For Free Delivery)"
            error={deliveryOnCampusError}
          />

          <Input
            onChangeText={(e) => setdeliveryOffCampus(e.target.value)}
            type="text"
            placeholder="Off Campus Delivery Fee (Leave Blank For Free Delivery)"
            error={deliveryOffCampusError}
          />

          <Input
            onChangeText={(e) => setdeliveryTime(e.target.value)}
            type="text"
            placeholder="Delivery Time, Eg; 2 Days 0r 1 Day"
            error={deliveryTimeError}
          />

          <p
            className={`${
              window.innerWidth < 1780
                ? "text-[2.5vw] md:text-[1.5vw] lg:text-[1vw] md:w-[40vw]"
                : "text-[20px] w-[700px]"
            } my-[16px] text-red-600`}
          >
            Note: Delivery fees plays a big impact in getting customers, make
            your delivery fee as affordable as possible to attract more
            customers.
          </p>

          <h2
            className={`${
              window.innerWidth < 1780
                ? "text-[4vw] md:text-[2vw] lg:text-[1.5vw]"
                : "text-[40px]"
            } font-bold mb-[8px]`}
          >
            YOUR ACCOUNT DETAILS
          </h2>
          <Input
            onChangeText={(e) => setaccountNumberForm(e.target.value)}
            type="text"
            placeholder="Account Number"
            error={accountNumberError}
            value={accountNumberForm}
          />

          <Input
            onChangeText={(e) => {
              setbankNameForm(e.target.value);
            }}
            type="text"
            placeholder="Bank Name"
            error={bankNameError}
            value={bankNameForm}
          />

          <Input
            onChangeText={(e) => setaccountHolderName(e.target.value)}
            type="text"
            placeholder="Account Name"
            error={accountHolderNameError}
            value={accountHolderName}
          />

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
            error={phoneNumberError}
            value={phoneNumberForm}
          />

          <Input
            onChangeText={(e) => setinstagramForm(e.target.value)}
            type="text"
            placeholder="Instagram Handle"
            value={instagramForm}
          />

          <Input
            onChangeText={(e) => settwitterForm(e.target.value)}
            type="text"
            placeholder="Twitter Handle"
            value={twitterForm}
          />

          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className={`${
              window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[500px]"
            } bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[32px] rounded-[20px] py-[8px]`}
          >
            {loadingSubmit ? <LoadingSpinner /> : "Post Ad"}
          </button>
          {submitError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
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
            does not include any prohibited items.
          </p>
        </form>
      </div>
    </div>
  );
}

export default SellProducts;
