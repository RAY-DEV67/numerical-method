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
                ? "text-[8vw]  sm:text-[4vw] md:text-[3vw]"
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
                ? "text-[3vw] sm:text-[2vw] md:text-[1.5vw]"
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
            } input bg-transparent rounded-[10px] text-black p-[8px] mt-[24px] mb-[8px] border border-[#00cc00]`}
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
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[8px] border border-[#00cc00]`}
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
                  ? "w-[80vw] md:w-[40vw] text-[3vw] md:text-[1.5vw] sm:text-[2vw]"
                  : "w-[1000px] text-[40px]"
              }  mb-[8px]`}
            >
              Where Do You Stay
            </p>
            <div
              className={`${
                window.innerWidth < 1780
                  ? "w-[80vw] sm:w-[60vw] md:w-[40vw]"
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
                    ? "text-[3vw] sm:text-[2vw] md:text-[1.5vw]"
                    : "text-[40px]"
                }  mb-[8px]`}
              >
                Off Campus
              </label>
            </div>
            <div
              className={`${
                window.innerWidth < 1780
                  ? "w-[80vw] sm:w-[60vw] md:w-[40vw]"
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
                    ? "text-[3vw] sm:text-[2vw] md:text-[1.5vw]"
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
            } input bg-transparent rounded-[10px] text-black p-[8px] my-[8px] border border-[#00cc00]`}
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
