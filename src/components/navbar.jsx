import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { NavigateTo } from "../App";

export default function Navbar() {
  const { setnavigateTo } = useContext(NavigateTo);
  const location = useLocation();

  const [showMobile, setshowMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Add a scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col md:items-center textFont ${
        window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
      }`}
    >
      <div
        className={`flex justify-between p-[1rem]  nav ${
          isScrolled ? "glass-background" : "bg-transparent"
        } fixed items-center w-[100vw] pt-[3vh] ${
          window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
        } `}
      >
        <Link
          onClick={() => {
            setnavigateTo("/");
          }}
          to="/"
          className="font-bold"
        >
          NMG
        </Link>

        <div
          onClick={() => {
            setshowMobile(true);
          }}
          className="lg:hidden mr-[1rem] relative"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 -2 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
            fill={
              isScrolled || location.pathname !== "/" ? "#00cc00" : "#ffffff"
            }
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

        <div
          className={`hidden lg:flex justify-between md:items-center md:mr-[1rem] ${
            window.innerWidth < 1780 ? "w-[10vw]" : "w-[1000px]"
          }`}
        >
          <Link
            onClick={() => {
              setnavigateTo("/");
            }}
            to="/"
            className="nav"
          >
            <p
              className={`${
                window.innerWidth < 1780 ? "lg:text-[1.2vw]" : "lg:text-[20px]"
              } font-bold text-[#00cc00]`}
            >
              Home
            </p>
          </Link>

          <Link className="nav">
            <p
              className={`${
                window.innerWidth < 1780 ? "lg:text-[1.2vw]" : "lg:text-[20px]"
              } font-bold text-[#00cc00]`}
            >
              Profile
            </p>
          </Link>
        </div>

        <div
          className={
            showMobile
              ? `bg-[#013a19] nav landing2 h-[100vh] top-0 w-[100vw] flex flex-col items-center justify-center ml-[-1rem] fixed show`
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
          <p
            className="absolute md:text-[2vw] headingfont text-white top-6 nav text-[4vw] left-[85%]"
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
              setnavigateTo("/");
            }}
          >
            <p className="text-[4vw] mb-[1rem] md:text-[2vw] text-white headingfont font-bold">
              Home
            </p>
          </Link>

          <Link className="nav">
            <p className="text-[4vw] md:text-[2vw] text-white mb-[1rem] headingfont font-bold">
              Profile
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
