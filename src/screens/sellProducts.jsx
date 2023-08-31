import { useState, useContext, useEffect } from "react";
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
import { UserId } from "../App";
import LoadingSpinner from "../components/spinner";

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
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Kastina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const nigerianUniversities = [
  "Abia State University, Uturu",
  "Abia State Polytechnic",
  "Abia State College of Education",
  "Anambra State Polytechnic",
  "Adamawa State University, Mubi",
  "Adamawa State Polytechnic",
  "Adamawa State College of Education",
  "Adekunle Ajasin University, Akungba",
  "Akwa Ibom State University",
  "Akwa Ibom State Polytechnic",
  "Akwa Ibom State College of Education",
  "Ambrose Alli University, Ekpoma",
  "Achievers University, Owo",
  "Adeleke University, Ede",
  "Afe Babalola University, Ado-Ekiti",
  "African University Of Science And Technology, Abuja",
  "Abubakar Tafari Ali Polytechnic",
  "Akanu Ibiam Federal Polytechnic",
  "Auchi Polytechnic",
  "Abraham Adesanya Polytechnic",
  "Allover Central Polytechnic",
  "Abdul Gusau Polytechnic",
  "Ajayi Crowther University, Ibadan",
  "Al-Hikmah University, Ilorin",
  "Al-Qalam University, Kastina",
  "American University Of Nigeria, Yola",
  "Augustine University",
  "Anchor University, Ayobo",
  "Arthur Javis University, Akpoyubo",
  "Admiralty University, Ibusa",
  "Atiba University, Oyo",
  "Ave Maria University, Piyanko",
  "Al-Istiqama University, Sumaila",
  "Ahman Pategi University",
  "Anan University, Kwall",
  "Al-Ansar University, Maiduguri",
  "Aletheia University, Ago-Iwoye",
  "Amadeus University, Amizi",
  "Azman University",
  "Amaj University, Kwali",
  "Al-Muhibbah Open University, Abuja",
  "Al-Bayan University, Ankpa",
  "Abubakar Tafawa Balewa University",
  "Ahmadu Bello University, Zaria",
  "Alex Ekwueme University, Ndufu-Alike",
  "Air Force Institute of Technology",
  "Adeyemi College of Education",
  "Alvan Ikoku College of Education",
  "Ansar-Ud-Deen College of Education",
  "African Thinkers Community of Inquiry College of Education",
  "Adamu Augie College of Education",
  "Adamu Tafawa Balewa College of Education",
  "Adeniran Ogunsanya College of Education",
  "Aminu Saleh College of Education",
  "Bauchi State University, Gadau",
  "Benue State University, Makurdi",
  "Benue State Polytechnic",
  "Borno State University, Maiduguri",
  "Bayelsa Medical University",
  "Bayelsa State College of Arts and Science",
  "Bamidele Olumilua University of Science and Technology, Ikere",
  "Babcock University",
  "Baze University",
  "Bells University of Technology, Otta",
  "Benson Idahosa University, Benin",
  "Bingham University, New Karu",
  "Bowen University, Iwo",
  "British Canadian University, Obufu",
  "Bayero University",
  "Bilyaminu Othman College of Education",
  "Chukwuemeka Odumegwu Ojukwu University, Uli",
  "Cross River State University of Technology",
  "Confluence University of Science and Technology, Osara",
  "Caleb University",
  "Caritas University",
  "Chrisland University",
  "Convenant University",
  "Crawford University",
  "Cresent University",
  "Christopher University",
  "Crown Hill University",
  "Coal City University",
  "Clifford University",
  "Claretian University of Nigeria",
  "Capital City University",
  "Canadian University of Nigeria, Abuja",
  "Cosmopolitan University Abuja",
  "College of Petroleum and Energy Studies",
  "Citi Polytechnic",
  "College of Agriculture and Animal Science",
  "College of Agriculture, Zuru",
  "College of Agriculture, Kabba",
  "Coastal Polytechnic",
  "College of Agriculture, Lafia",
  "College of Agriculture, Jalingo",
  "College of Education and Legal Studies, Nguru",
  "College of Education, Akamkpa",
  "College of Education, Akwanga",
  "College of Education, Billiri",
  "College of Education, Ekiadolor",
  "College of Education, Gindiri",
  "College of Education, Katsina-Ala",
  "College of Education, Lanlate",
  "College of Education, Oju",
  "College of Education, Waka-Biu",
  "College of Education, Warri",
  "Delta State University, Abraka",
  "Delta State Polytechnic",
  "Delta University of Science and Technology, Ozoro",
  "Dennis Osadebe University, Asaba",
  "Dominican University",
  "Dominion University",
  "Dorben Polytechnic",
  "Divine Polytechnic",
  "Ebonyi State University, Abakaliki",
  "Ebonyi State College of Education",
  "Ekiti State University",
  "Enugu State University of Science and Technology",
  "Enugu State Polytechnic",
  "Enugu State College of Education",
  "Edo State University",
  "Edo State Polytechnic",
  "Edo State College of Education",
  "Enugu State University of Medical and Applied Sciences, Igbo-Eno",
  "Emmanuel Alayande University of Education",
  "Edwin Clark University",
  "Elizade University",
  "Evangel University",
  "Eko University of Medical and Health Sciences Ijaniki",
  "Edusoko University, Bida",
  "European University of Nigeria, Duboyi",
  "Elrazi Medical University",
  "El-Amin University, Minna",
  "Eastern Polytechnic",
  "Ekwenugo Okeke Polytechnic",
  "Federal University of Health Sciences, Ila Orangun",
  "Federal University of Health Sciences, Azare",
  "Federal University of Technology, Ikot abasi",
  "Federal University of Technology, Babura",
  "Federal University of Agriculture, Zuru",
  "Federal University of Agriculture, Abeokuta",
  "Federal University of Health Technology, Otukpo",
  "Federal University, Gasau Zamfara",
  "Federal University, Birnin Kebbi",
  "Federal University, Wukari Taraba",
  "Federal University, Oye-Ekiti",
  "Federal University, Otuoke Bayelsa",
  "Federal University, Lokoja",
  "Federal University, Lafia",
  "Federal University, Kashere",
  "Federal University, Dutsin-Ma",
  "Federal University, Dutse",
  "Federal University of Technology, Owerri",
  "Federal University of Technology, Minna",
  "Federal University of Technology, Akure",
  "Federal University of Petroleum Resources, Effurun",
  "Federal University Gashua, Yobe",
  "Franco British International University",
  "Fountain University, Oshogbo",
  "Federal Polytechnic, Mubi",
  "Foundation College of Technology",
  "Federal Polytechnic, Oko",
  "Federal Polytechnic, Bauchi",
  "Federal Polytechnic, Ekowe Bayelsa",
  "Federal College of Agriculture, Ishiagu",
  "Federal Polytechnic, Ado-Ekiti",
  "Federal School of Dental Technology & Therapy",
  "Federal College of Land Resources Technology, Owerri",
  "Federal Polytechnic, Nekede",
  "Federal College of Forestry Mechanisation",
  "Federal School of Statistics, Manchok",
  "Federal Polytechnic, Bernin-Kebbi",
  "Federal Polytechnic, Idah",
  "Federal Polytechnic, Offa",
  "Federal College of Fisheries and Marine Technology",
  "Federal Polytechnic, Nasarawa",
  "Federal College of Fresh Water Fisheries Technology",
  "Federal College of Wildlife Management",
  "Federal Polytechnic, Bida",
  "Federal Polytechnic, Ilaro",
  "Federal Polytechnic, Ede",
  "Federal College of Animal Health & Production Technology",
  "Federal College of Forestry, Ibadan",
  "Federal Polytechnic, Ayede",
  "Federal College of Forestry, Jos",
  "Federal College of Land Resources Technology, Kuru",
  "Federal Polytechnic, Damaturu",
  "Federal Polytechnic, Namoda",
  "Federal College of Education, Oyo",
  "Federal College of Education, Iwo",
  "Federal College of Education, Asaba",
  "Federal College of Education, Abeokuta",
  "Federal College of Education, Kano",
  "Federal College of Education, Eha-Amufu",
  "Federal College of Education, Okene",
  "Federal College of Education, Gombe",
  "Federal College of Education, Omoku",
  "Federal College of Education, Kontagora",
  "Federal College of Education, Zaria",
  "Federal College of Education, Pankshin",
  "Federal College of Education, Yola",
  "Federal College of Education, Potiskum",
  "Federal College of Education, Akoka",
  "Federal College of Education, Katsina",
  "Federal College of Education, Bichi",
  "Federal College of Education, Obudu",
  "Federal College of Education, Umunze",
  "FCT College of Education",
  "Gombe State University",
  "Gombe State University of Science and Technology",
  "Godfrey Okoye University",
  "Gregory University",
  "Greenfield University",
  "Gerar University of Medical Science",
  "Gateway Polytechnic",
  "Grace Polytechnic",
  "Hillside University of Science and Technology, Okemisi",
  "Hensard University, Toru-Orua",
  "Huda University, Gusau",
  "Havilla University, Nde-Ikom",
  "Hezekiah University",
  "Hallmark University",
  "Heritage Polytechnic",
  "Hussaini Adamu Federal Polytechnic",
  "Hassan Usman Kastina Polytechnic",
  "Havard Wilson College of Education",
  "Ibrahim Badamasi Babangida University",
  "Ignatius Ajuru University of Education",
  "Imo State University",
  "Igbinedion University Okada",
  "Iconic Open University",
  "Interlink Polytechnic",
  "Iwo City Polytechnic",
  "Igbajo Polytechnic",
  "Imo State Technological Skills Acquisition Center",
  "Imo State Polytechnic",
  "Institute of Management Technology",
  "Ibrahim Babangida College of Agriculture",
  "Imo State College of Education",
  "Isa Kaita College of Education",
  "Isaac Jasper Boro College of Education",
  "Institute of Ecumenical Education",
  "Joseph Ayo Babalola University",
  "Jewel University",
  "Jigawa State College of Education",
  "Jigawa State College of Education and Legal Studies",
  "King David Umahi University of Medical Sciences",
  "Khalifa Isiyaku Rabiu University",
  "Khadija University",
  "Karl-Kumm University",
  "Kola Daisi University",
  "Kwararafa University",
  "Kings University, Ode Omu",
  "Kingsley Ozumba Mbadiwe University",
  "Kwara State University",
  "Kebbi State University of Science and Technology",
  "Kano University of Science and Technology",
  "Kaduna State University",
  "Kwara State Polytechnic",
  "Kogi State Polytechnic",
  "Kebbi State Polytechnic",
  "Kano State Polytechnic",
  "Kaduna Polytechnic",
  "Kings Polytechnic",
  "Kano State College of Education and Preliminary Studies",
  "Kaduna State College of Education",
  "Kashim Ibrahim College of Education",
  "Kogi State College of Education",
  "Kwara State College of Education",
  "Ladoke Akintola University of Technology",
  "Lagos State University, Ojo",
  "Lagos State University of Education, ijanikin",
  "Lagos State University of Science and Technology, ikorodu",
  "Landmark University",
  "Lead City University",
  "Legacy University",
  "Lux Mundi University",
  "Lagos City Polytechnic",
  "Modibbo Adama University of Technology",
  "Michael Okpara University of Agriculture",
  "Miva Open University",
  "Mercy Medical University",
  "Maduka University",
  "Muhammad Kamalud University",
  "Margaret Lawrence University",
  "Mewar International University",
  "Maryam Abacha American University of Nigeria",
  "Mudiame University",
  "Maranathan University",
  "Mountain Top University",
  "Micheal & Cecilia Ibru University",
  "Mcpherson University",
  "Madonna University",
  "Moshood Abiola University of Science and Technology",
  "Mai Idris Alooma Polytechnic",
  "Moshood Abiola Polytechnic",
  "Maurid Institute of Management & Technology",
  "Mohammed Abdullahi Wase Polytechnic",
  "Maritime Academy of Nigeria",
  "Micheal Otedola College of Primary Education",
  "Mohammed Goni College of Legal and Islamic Studies",
  "Moje College of Education",
  "Muftau Olanihun College of Education",
  "Niger Delta University",
  "Nasarawa State University",
  "Nile University of Nigeria",
  "Novena University",
  "NOK University",
  "Nigerian British University",
  "Newgate University",
  "NorthWest University",
  "Nigerian University of Technology and Management",
  "National Open University of Nigeria",
  "Nigerian Police Academy, Wudil",
  "Nigerian Defence Academy",
  "Nnamdi Azikiwe University",
  "Nigerian Maritime University, Okerenkoko",
  "Nigerian Army University, Biu",
  "Nigerian Institute of Leather and Science Technology",
  "Nigerian College of Aviation Technology",
  "Nuhu Bamalli Polytechnic",
  "Nasarawa State Polytechnic",
  "Niger State College of Agriculture",
  "Niger State Polytechnic",
  "Novelty Polytechnic",
  "Nigerian Army School of Education",
  "Nana Aisahat Momorial College of Education",
  "Niger State College of Education",
  "Nwafor Orizu College of Education",
  "Obafemi Awolowo University",
  "Oduduwa University",
  "Obong University",
  "Ondo State University of Medical Sciences",
  "Oyo State Technical University",
  "Osun State University",
  "Olabisi Onabanjo University",
  "Ondo State University of Science and Technology",
  "Offer Center Institute of Agriculture",
  "Osun State Polytechnic",
  "Osun State College of Technology",
  "Ogun State College Of Health Technology",
  "Ogun State Institute Of Technology",
  "Our Saviour Institute Of Science and Technology",
  "Prince Abubakar Audu University",
  "Plateau State University",
  "Pan-Atlantic University",
  "Paul University",
  "Precious Cornerstone University",
  "PAMO University of Medical Sciences",
  "Philomath University",
  "PEN Resource University",
  "Peter University",
  "PeaceLand University",
  "Phoenix University",
  "Prime University",
  "Petroleum Training Institute",
  "Plateau State College of Agriculture",
  "Plateau State Polytechnic",
  "Port Harcourt Polytechnic",
  "Piaget College of Education",
  "Rivers State University",
  "Redeemer's University",
  "Renaissance University",
  "Rhema University",
  "Ritman University",
  "Rayhaan University",
  "Shanahan University",
  "Sam Maris University",
  "Saisa University of Medical Sciences and Technology",
  "Sports University",
  "Skyline University",
  "Spiritan University",
  "Summit University",
  "Southwestern University",
  "Samuel Adegboyega University",
  "Salem University",
  "Sa'adatu Rimi University",
  "Shehu Shagari University of Education",
  "Sokoto State University",
  "Sule Lamido University",
  "Tai Solarin University of Education",
  "Taraba State University",
  "Tansian University",
  "Trinity University",
  "TopFaith University",
  "Thomas Adewumi University",
  "The Duke Medical University",
  "Usumanu Danfodiyo University",
  "University of Uyo",
  "University of Port-Harcourt",
  "University of Nigeria, Nsukka",
  "University of Maiduguri",
  "University of Lagos",
  "University of Jos",
  "University of Ilorin",
  "University of Ibadan",
  "University of Calabar",
  "University of Benin",
  "University of Agriculture, Makurdi",
  "University of Abuja",
  "University of the Niger",
  "University of Offa",
  "University of Mkar",
  "University of Ilesa",
  "University of Delta",
  "University of Agriculture and Environmental Sciences",
  "University of Africa, Toru Orua",
  "Umar Musa Yar'Adua University",
  "Veritas University",
  "Vision University",
  "Venite University",
  "Wellspring University",
  "Wesley University",
  "Wigwe University",
  "Western Delta University",
  "West Midlands Open University",
  "Westland Delta University",
  "Yaba College Of Technology",
  "Yobe State University",
  "Yusuf Maitama Sule University",
  "Zamfara State University",
];

const Gender = ["Male", "Female"];
const Condition = ["Brand New", "Used"];

function SellProducts() {
  const userUid = useContext(UserId);
  console.log(userUid);

  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");

  const [firstLoading, setfirstLoading] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [submitError, setsubmitError] = useState("");

  const [madeInNigeria, setmadeInNigeria] = useState(false);
  const [handmade, sethandmade] = useState(false);
  const [warranty, setwarranty] = useState(false);
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

  const [phoneNumber, setphoneNumber] = useState("");
  const [phoneNumberError, setphoneNumberError] = useState("");

  const [accountNumber, setaccountNumber] = useState("");
  const [accountNumberError, setaccountNumberError] = useState("");

  const [bankName, setbankName] = useState("");
  const [bankNameError, setbankNameError] = useState("");

  const [accountHolderName, setaccountHolderName] = useState("");
  const [accountHolderNameError, setaccountHolderNameError] = useState("");

  const [instagram, setinstagram] = useState("");
  const [twitter, settwitter] = useState("");
  const [size, setsize] = useState("");

  const [vendorName, setvendorName] = useState("");
  const [vendorLogo, setvendorLogo] = useState("");
  const [vendorNameError, setvendorNameError] = useState("");

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

  const originalPrice = Number(price);
  const calculatedPrice = originalPrice + originalPrice * 0.05; // Calculate 5% of the original price

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  };

  const upload = async () => {
    setcategoryError("");
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
    if (accountNumber === "") {
      setaccountNumberError("Please Enter Your Account Number");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (bankName === "") {
      setbankNameError("Please Enter Your Bank Name");
      setsubmitError("Unsuccessful!! Check form for errors!");
      return;
    }
    if (accountHolderName === "") {
      setaccountHolderNameError("Please Enter The Name On This Bank Account ");
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
    if (vendorName === "") {
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
    if (phoneNumber === "") {
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
      color: color,
      condition: selectedCondition,
      gender: selectedGender,
      size: size,
      vendor: vendorName,
      madeInNigeria: madeInNigeria,
      warranty: warranty,
      handmade: handmade,
      phoneNumber: phoneNumber,
      instagram: instagram,
      twitter: twitter,
      price: calculatedPrice,
      notTop: true,
      userId: userUid,
      availableQuantity: Number(availableQuantity),
      productId: generateRandomString(20),
      timestamp: new Date(),
      blocked: false,
      vendorAccountNumber: accountNumber,
      vendorAccountName: accountHolderName,
      vendorBankName: bankName,
      deliveryOffCampus: Number(deliveryOffCampus),
      deliveryOnCampus: Number(deliveryOnCampus),
      searchKeywords: `${title.toLowerCase()} ${selectedGender.toLowerCase()} ${
        selectedGender === "Male"
          ? "Men"
          : selectedGender === "Female"
          ? "Women"
          : null
      } ${description.toLowerCase()} ${brand.toLowerCase()} ${vendorName?.toLowerCase()} ${selectedCategory?.toLowerCase()}`.split(
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
    if (phoneNumber === "") {
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
          instagram: instagram,
          twitter: twitter,
          phoneNumber: phoneNumber,
          accountNumber: accountNumber,
          bankName: bankName,
          accountName: accountHolderName,
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

  return (
    <div>
      <div className="flex flex-col items-center textFont">
        <h1 className="lg:hidden headingFont text-[8vw] mt-[20vw] md:mt-[10vw]">
          <span class="magic">
            <span class="magic-text z-1 relative">Sell Products On UniPlug</span>
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
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
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
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {universityError}
            </p>
          )}
          <input
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="Product Title"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {titleError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {titleError}
            </p>
          )}
          <input
            onChange={(e) => setbrand(e.target.value)}
            type="text"
            placeholder="Name Of Brand (Optional)"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          <input
            onChange={(e) => setcolor(e.target.value)}
            type="text"
            placeholder="Color Of Product (Optional)"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />

          <select
            value={selectedCondition}
            onChange={handleConditionChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          >
            <option value="">Select Condition</option>
            {Condition.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>

          <select
            value={selectedGender}
            onChange={handleGenderChange}
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          >
            <option value="">Which Gender Is This Product For</option>
            {Gender.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
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
          <input
            onChange={(e) => setsize(e.target.value)}
            type="text"
            placeholder="Size"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          <input
            onChange={(e) => setavailableQuantity(e.target.value)}
            type="text"
            placeholder="Available Quantity (Leave Blank If Unlimited)"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          <input
            onChange={(e) => setvendorName(e.target.value)}
            type="text"
            placeholder="Name Of Vendor"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {vendorNameError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {vendorNameError}
            </p>
          )}
          <p
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                : "text-[40px]"
            } font-bold`}
          >
            Add Vendor Logo
          </p>
          <input
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw] md:w-[40vw]"
                : "text-[40px] w-[1000px]"
            } my-[16px]`}
            type="file"
            accept="image/png , image/jpg"
            name="photos"
            onChange={(event) => {
              setvendorLogo(event.target.files[0]);
            }}
          />

          <div
            className={`${
              window.innerWidth < 1780 ? "w-[80vw] md:w-[40vw]" : "w-[1000px]"
            }  mb-[4px]`}
          >
            <input
              type="checkbox"
              id="Top"
              name="Top"
              className="mr-[0.5rem]"
              onChange={() => {
                setmadeInNigeria(!madeInNigeria);
              }}
            />
            <label
              for="MIN"
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[40px]"
              }  mb-[4px]`}
            >
              Made In Nigeria
            </label>
          </div>
          <div
            className={`${
              window.innerWidth < 1780 ? "w-[80vw] md:w-[40vw]" : "w-[1000px]"
            }  mb-[4px]`}
          >
            <input
              type="checkbox"
              id="Top"
              name="Top"
              className="mr-[0.5rem]"
              onChange={() => {
                sethandmade(!handmade);
              }}
            />
            <label
              for="MIN"
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[40px]"
              }  mb-[4px]`}
            >
              Handmade
            </label>
          </div>
          <div
            className={`${
              window.innerWidth < 1780 ? "w-[80vw] md:w-[40vw]" : "w-[1000px]"
            }  mb-[12px]`}
          >
            <input
              type="checkbox"
              id="Top"
              name="Top"
              className="mr-[0.5rem]"
              onChange={() => {
                setwarranty(!warranty);
              }}
            />
            <label
              for="MIN"
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[40px]"
              }  mb-[4px]`}
            >
              Waranty
            </label>
          </div>

          <input
            onChange={(e) => setdescription(e.target.value)}
            type="text"
            placeholder="Description"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          <input
            onChange={(e) => setprice(e.target.value)}
            type="text"
            placeholder="Price"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {priceError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {priceError}
            </p>
          )}
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
          <input
            onChange={(e) => setdeliveryOnCampus(e.target.value)}
            type="text"
            placeholder="On Campus Delivery Fee (Leave Blank For Free Delivery)"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {deliveryOnCampusError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {deliveryOnCampusError}
            </p>
          )}
          <input
            onChange={(e) => setdeliveryOffCampus(e.target.value)}
            type="text"
            placeholder="Off Campus Delivery Fee (Leave Blank For Free Delivery)"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {deliveryOffCampusError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {deliveryOffCampusError}
            </p>
          )}
          <p
            className={`${
              window.innerWidth < 1780
                ? "text-[2.5vw] md:text-[1.5vw] lg:text-[1vw] md:w-[40vw]"
                : "text-[20px] w-[700px]"
            } mb-[16px] text-red-600`}
          >
            Note: Delivery fees plays a big impact in getting customers, make
            your delivery fee as affordable as possible to attract more
            customers.
          </p>

          <h2
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                : "text-[40px]"
            } font-bold mb-[8px]`}
          >
            YOUR ACCOUNT DETAILS
          </h2>
          <input
            onChange={(e) => setaccountNumber(e.target.value)}
            type="text"
            placeholder="Account Number"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {accountNumberError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {accountNumberError}
            </p>
          )}
          <input
            onChange={(e) => setbankName(e.target.value)}
            type="text"
            placeholder="Bank Name"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {bankNameError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {bankNameError}
            </p>
          )}
          <input
            onChange={(e) => setaccountHolderName(e.target.value)}
            type="text"
            placeholder="Account Name"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {accountHolderNameError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {accountHolderNameError}
            </p>
          )}
          <h2
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                : "text-[40px]"
            } font-bold mb-[8px]`}
          >
            YOUR CONTACT DETAILS
          </h2>
          <input
            onChange={(e) => setphoneNumber(e.target.value)}
            type="tel"
            placeholder="Phone Number"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          {phoneNumberError && (
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[30px]"
              } text-red-500  mb-[16px]`}
            >
              {phoneNumberError}
            </p>
          )}
          <input
            onChange={(e) => setinstagram(e.target.value)}
            type="text"
            placeholder="Instagram Handle"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />
          <input
            onChange={(e) => settwitter(e.target.value)}
            type="text"
            placeholder="Twitter Handle"
            className={`${
              window.innerWidth < 1780
                ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                : "w-[1000px] text-[40px]"
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
          />

          <button
            onClick={(e) => {
              handleSubmit(e);
              updateUserInfo();
            }}
            className={`${
              window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[500px]"
            } bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[16px] rounded-[20px] py-[8px]`}
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
