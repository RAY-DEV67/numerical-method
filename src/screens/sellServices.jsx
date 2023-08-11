import { PaystackButton } from "react-paystack";
import { useParams } from "react-router-dom";
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
import LoadingSpinner from "../components/spinner";

const Categories = [
  "Assignment & Note Copying",
  "Car Rentals",
  "Cleaning & Household Services",
  "Computer & I.T Services",
  "Dj & Entertainment",
  "Fashion & MakeUp",
  "Hostel Agent",
  "Logistics & Delivery Services",
  "Party, Catering & Event Services",
  "Personal Shopper",
  "Photography & Video Services",
  "Printing",
  "Project Assistance",
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
  const [formIsValid, setformIsValid] = useState(false);

  const [description, setdescription] = useState("");
  const [descriptionError, setdescriptionError] = useState("");

  const [phoneNumber, setphoneNumber] = useState("");
  const [phoneNumberError, setphoneNumberError] = useState("");

  const [instagram, setinstagram] = useState("");
  const [twitter, settwitter] = useState("");

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

    setloadingSubmit(true);

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
      timestamp: new Date(),
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
      <div className="flex flex-col items-center login">
        <h1 className="md:text-[2vw] fixed pt-[15vw] md:pt-[6vw] pb-[4vw] md:pb-[2vw] font-semibold bg-[#013a19] w-[100vw] text-center py-[4px] text-white rounded-b-[30px]">
          Sell Services On UniPlug
        </h1>
        <div
          //   onSubmit={handleSubmit}
          className="w-[90vw] items-center justify-center flex flex-col px-[1rem] pb-[2.5rem] mt-[25vw] md:mt-[15vw]"
        >
          <input
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Your Name"
            className="input text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] bg-transparent rounded-[10px] text-black p-[8px] mt-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          />
          {nameError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {nameError}
            </p>
          )}
          <input
            onChange={(e) => setemail(e.target.value)}
            type="text"
            placeholder="Your Email"
            className="input text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] bg-transparent rounded-[10px] text-black p-[8px] mt-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          />
          {emailError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {emailError}
            </p>
          )}

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="input bg-transparent text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          >
            <option value="">Category</option>
            {Categories.map((categories) => (
              <option key={categories} value={categories}>
                {categories}
              </option>
            ))}
          </select>
          {categoryError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {categoryError}
            </p>
          )}

          <div className="w-[80vw] md:w-[40vw] ">
            <h2 className="font-bold text-[3vw] md:text-[2vw] lg:text-[1.5vw]">
              Add Photo
            </h2>
            <p className="text-[2.5vw] md:text-[1.5vw] lg:text-[1vw]">
              First picture is the title picture
            </p>
            <div className="flex flex-col">
              <div>
                <input
                  className="mt-[1rem] text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos"
                  onChange={(event) => {
                    setfile1(event.target.files[0]);
                  }}
                />
                {image1Error && (
                  <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
                    {image1Error}
                  </p>
                )}
              </div>

              <div>
                <input
                  className="mt-[1rem] text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos2"
                  onChange={(event) => {
                    setfile2(event.target.files[0]);
                    console.log(event.target.files[0]);
                  }}
                />
                {image2Error && (
                  <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
                    {image2Error}
                  </p>
                )}
              </div>

              <div>
                <input
                  className="mt-[1rem] text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
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
                  className="mt-[1rem] text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
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
                  className="mt-[1rem] text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                  type="file"
                  accept="image/png , image/jpg"
                  name="photos5"
                  onChange={(event) => {
                    setfile5(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <p className="text-[2.5vw] md:text-[1.5vw] lg:text-[1vw] mt-[1rem] text-red-600">
              Each picture must not exceed 5MB
            </p>
            <p className="text-[2.5vw] md:text-[1.5vw] lg:text-[1vw] text-red-600">
              Supported formats are *.jpg and *jpeg
            </p>
          </div>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="input bg-transparent text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          >
            <option value="">Select State</option>
            {nigerianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {stateError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {stateError}
            </p>
          )}

          <select
            value={selectedUniversity}
            onChange={handleUniversityChange}
            className="input bg-transparent rounded-[10px] text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] text-black p-[8px] mb-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          >
            <option value="">Select University</option>
            {nigerianUniversities.map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>
          {universityError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {universityError}
            </p>
          )}

          <input
            onChange={(e) => setdescription(e.target.value)}
            type="text"
            placeholder="Description"
            className="input bg-transparent text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] rounded-[10px] text-black p-[8px] mb-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          />
          {descriptionError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {descriptionError}
            </p>
          )}
          <h2 className="text-[3vw] md:text-[2vw] lg:text-[1.5vw] font-bold mb-[8px]">
            YOUR CONTACT DETAILS
          </h2>
          <input
            onChange={(e) => setphoneNumber(e.target.value)}
            type="tel"
            placeholder="Phone Number"
            className="input text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] bg-transparent rounded-[10px] text-black p-[8px] mb-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          />
          {phoneNumberError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {phoneNumberError}
            </p>
          )}
          <input
            onChange={(e) => setinstagram(e.target.value)}
            type="text"
            placeholder="Instagram Handle"
            className="input text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] bg-transparent rounded-[10px] text-black p-[8px] mb-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          />
          <input
            onChange={(e) => settwitter(e.target.value)}
            type="text"
            placeholder="Twitter Handle"
            className="input text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] bg-transparent rounded-[10px] text-black p-[8px] mb-[16px] border-b border-[#00cc00] w-[85vw] md:w-[40vw]"
          />

          {selectedCategory == "" ||
          selectedCategory == "Project Assistance" ||
          selectedCategory == "Cleaning & Household Services" ||
          selectedCategory == "Computer & I.T Services" ||
          selectedCategory == "Logistics & Delivery Services" ||
          selectedCategory == "Printing" ||
          selectedCategory == "Assignment & Note Copying" ||
          selectedCategory == "Personal Shopper" ? (
            <button
              onClick={(e) => {
                handleSubmit(e);
                updateUserInfo();
              }}
              className="bg-[#013a19] flex flex-col items-center justify-center text-white w-[50vw] md:w-[13vw] mt-[16px] rounded-[20px] py-[8px]"
            >
              {loadingSubmit ? <LoadingSpinner /> : "Plug Me"}
            </button>
          ) : null}

          {selectedCategory == "Hostel Agent" ||
          selectedCategory == "Dj & Entertainment" ||
          selectedCategory == "Fashion & MakeUp" ||
          selectedCategory == "Party, Catering & Event Services" ||
          (selectedCategory == "Photography & Video Services" &&
            !submitError) ? (
            <PaystackButton
              className="bg-[#013a19] flex flex-col items-center justify-center text-white w-[50vw] md:w-[13vw] mt-[16px] rounded-[20px] py-[8px]"
              {...fivecomponentProps}
            />
          ) : null}

          {selectedCategory == "Car Rentals" && !submitError ? (
            <PaystackButton
              className="bg-[#013a19] flex flex-col items-center justify-center text-white w-[50vw] md:w-[13vw] mt-[16px] rounded-[20px] py-[8px]"
              {...OnecomponentProps}
            />
          ) : null}

          {submitError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {submitError}
            </p>
          )}
          <p className="md:w-[40vw] text-[2.5vw] md:text-[1.5vw] lg:text-[1vw] mt-[0.5rem] mb-[2rem] text-red-600">
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
