import db from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/uniPlugLogo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getDocs, query, collection, where } from "firebase/firestore";

export default function Navbar() {
  const [showMobile, setshowMobile] = useState(false);
  const [scrolled, setscrolled] = useState();
  const [user, setUser] = useState(null); // Track the user object
  const [userId, setuserId] = useState();
  const [userName, setuserName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const auth = getAuth();

    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setuserId(user.uid);
    });

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setscrolled(true);
      } else {
        setscrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const fetchUserDetails = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Users"), where("userId", "==", userId))
      );
      const UserName = querySnapshot.docs.map((cloths) => {
        return cloths.data().Name;
      });

      setuserName(UserName[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user]);

  return (
    <div className="w-[100vw] flex flex-col md:items-center ">
      <div
        className={`flex justify-between z-50 px-[1rem] fixed items-center w-[100vw] pt-[1vh] "bg-transparent" `}
      >
        <img
          src={logo}
          alt="logo"
          className="w-[20vw] lg:w-[7vw] md:w-[11vw] my-[-4vh] md:my-[-4vh] relative z-10"
        />

        <div
          onClick={() => {
            setshowMobile(true);
          }}
          className="lg:hidden mr-[1rem]"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 -2 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
            fill="#00cc00"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>hamburger 2</title> <desc>Created with Sketch Beta.</desc>{" "}
              <defs> </defs>{" "}
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
                sketch:type="MSPage"
              >
                {" "}
                <g
                  id="Icon-Set-Filled"
                  sketch:type="MSLayerGroup"
                  transform="translate(-310.000000, -1039.000000)"
                  fill="#00cc00"
                >
                  {" "}
                  <path
                    d="M338,1049 L314,1049 C311.791,1049 310,1050.79 310,1053 C310,1055.21 311.791,1057 314,1057 L338,1057 C340.209,1057 342,1055.21 342,1053 C342,1050.79 340.209,1049 338,1049 L338,1049 Z M338,1059 L314,1059 C311.791,1059 310,1060.79 310,1063 C310,1065.21 311.791,1067 314,1067 L338,1067 C340.209,1067 342,1065.21 342,1063 C342,1060.79 340.209,1059 338,1059 L338,1059 Z M314,1047 L338,1047 C340.209,1047 342,1045.21 342,1043 C342,1040.79 340.209,1039 338,1039 L314,1039 C311.791,1039 310,1040.79 310,1043 C310,1045.21 311.791,1047 314,1047 L314,1047 Z"
                    id="hamburger-2"
                    sketch:type="MSShapeGroup"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div className="hidden lg:flex md:items-center md:mr-[1rem]">
          <Link to="/" className="nav">
            <p className={`lg:text-[1.2vw] font-bold text-[#00cc00]`}>Home</p>
          </Link>
          <Link to={user ? "/SellProducts" : "/Login"}>
            <p className={`lg:text-[1.2vw] mx-[1rem] font-bold text-[#00cc00]`}>
              Sell Products
            </p>
          </Link>

          <Link to={user ? `/SellServices/${user.uid}/${userName}` : "/Login"}>
            <p className={`lg:text-[1.2vw] mx-[1rem] font-bold text-[#00cc00]`}>
              Sell Services
            </p>
          </Link>
          <Link to={user ? "/Events" : "/Login"}>
            <p className={`lg:text-[1.2vw] mx-[1rem] font-bold text-[#00cc00]`}>
              Events
            </p>
          </Link>

          <Link to={user ? "/Shop" : "/Login"}>
            <p className={`lg:text-[1.2vw] mx-[1rem] font-bold text-[#00cc00]`}>
              Premium Shop
            </p>
          </Link>
          {!userName && (
            <Link to="/Login">
              <p
                className={`lg:text-[1.2vw] mx-[1rem] font-bold text-[#00cc00]`}
              >
                Login
              </p>
            </Link>
          )}
          <Link to="/SignUpOne" className="nav">
            <p className={`lg:text-[1.2vw] font-bold text-[#00cc00]`}>
              Sign Up
            </p>
          </Link>

          {userName && (
            <p className="bg-[#00cc00] text-white py-[4px] px-[8px] ml-[1rem] rounded-[20px]">
              Hi, {userName} 👋
            </p>
          )}
        </div>

        <div
          className={
            showMobile
              ? `bg-[#013a19] landing2 h-[100vh] top-0 w-[100vw] flex flex-col items-center justify-center ml-[-1rem] fixed show`
              : "bg-[#000009] h-[100vh] no top-0 w-[100vw] flex flex-col items-center justify-center fixed"
          }
        >
          <div
            className={
              showMobile
                ? `overlay-Dark h-[100vh] top-0 w-[100vw] flex flex-col items-center justify-center fixed show`
                : "bg-[#323b0a] h-[100vh] no top-0 w-[100vw] flex flex-col items-center justify-center fixed"
            }
          ></div>
          <img
            src={logo}
            alt="logo"
            className="w-[30vw] absolute -top-3 left-0"
          />
          {userName && (
            <p className="bg-[#00cc00] text-white py-[4px] px-[16px] rounded-[20px] absolute top-[115vw] left-5 text-[4vw]">
              Hi, {userName}👋
            </p>
          )}
          <p
            className="absolute headingfont text-white top-7 nav text-[5vw] left-[85%]"
            onClick={() => {
              setshowMobile(false);
            }}
          >
            X
          </p>
          <Link
            to="/"
            className="nav"
            onClick={() => {
              setshowMobile(false);
            }}
          >
            <p className="text-[5vw] text-white headingfont font-bold">Home</p>
          </Link>
          <Link
            className="nav"
            onClick={() => {
              setshowMobile(false);
            }}
            to={user ? "/SellProducts" : "/Login"}
          >
            <p className="text-[5vw] text-white my-[1rem] headingfont font-bold">
              Sell Products
            </p>
          </Link>

          <Link
            className="nav"
            onClick={() => {
              setshowMobile(false);
            }}
            to={user ? `/SellServices/${user.uid}/${userName}` : "/Login"}
          >
            <p className="text-[5vw] text-white mb-[1rem] headingfont font-bold">
              Sell Services
            </p>
          </Link>
          <Link
            className="nav"
            onClick={() => {
              setshowMobile(false);
            }}
            to={user ? "/Events" : "/Login"}
          >
            <p className="text-[5vw] text-white mb-[1rem] headingfont font-bold">
              Events
            </p>
          </Link>
          <Link
            className="nav"
            onClick={() => {
              setshowMobile(false);
            }}
            to={user ? "/Shop" : "/Login"}
          >
            <p className="text-[5vw] text-white mb-[1rem] headingfont font-bold">
              Premium Shop
            </p>
          </Link>
          {!userName && (
            <Link
              className="nav"
              onClick={() => {
                setshowMobile(false);
              }}
              to="/Login"
            >
              <p className="text-[5vw] text-white mb-[1rem] headingfont font-bold">
                Login
              </p>
            </Link>
          )}

          <Link
            to="/SignUpOne"
            className="nav"
            onClick={() => {
              setshowMobile(false);
            }}
          >
            <p className="text-[5vw] text-white headingfont font-bold">
              Sign Up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
