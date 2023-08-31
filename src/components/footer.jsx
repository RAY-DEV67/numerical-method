import { Link } from "react-router-dom";
import logo from "../assets/uniPlugLogo.png";

function Footer() {
  const whatsappNumber = "07040653485";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`  ${
        window.innerWidth > 1780 && "w-[1700px]"
      } textFont text-white bg-[#013a19] mt-[40px] rounded-t-[50px] px-[16px] md:flex md:flex-row md:justify-center`}
    >
      <div>
        <img
          src={logo}
          alt="logo"
          className={`${
            window.innerWidth < 1780
              ? "w-[30vw] lg:w-[7vw] md:w-[10vw] md:h-[10vw] h-[30vw]"
              : "w-[200px] h-[200px]"
          }   m-[-20px] md:m-[-5px]`}
        />

        <p
          className={`${
            window.innerWidth < 1780
              ? "w-[70vw] md:w-[40vw] lg:w-[30vw]"
              : "w-[500px]"
          }   mx-[16px] text-[12px] `}
        >
          UniPlug is a student-centric online marketplace facilitating seamless
          buying, selling, and social connections within Nigerian higher
          institutions.
        </p>

        <div
          className={`${
            window.innerWidth < 1780
              ? "w-[25vw] md:w-[15vw] lg:w-[10vw]"
              : "w-[150px]"
          }   my-[16px] flex flex-row justify-between mx-[16px] `}
        >
          <a
            href="https://twitter.com/Enrayy11?t=WhVjQ_3kBVdJrVPYlFGKkQ&s=09 "
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 -4 48 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>Twitter-color</title> <desc>Created with Sketch.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  {" "}
                  <g
                    id="Color-"
                    transform="translate(-300.000000, -164.000000)"
                    fill="#00AAEC"
                  >
                    {" "}
                    <path
                      d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283"
                      id="Twitter"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </a>

          <a
            href="https://instagram.com/uniplugapp?igshid=ZGUzMzM3NWJiOQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <rect
                  x="2"
                  y="2"
                  width="28"
                  height="28"
                  rx="6"
                  fill="url(#paint0_radial_87_7153)"
                ></rect>{" "}
                <rect
                  x="2"
                  y="2"
                  width="28"
                  height="28"
                  rx="6"
                  fill="url(#paint1_radial_87_7153)"
                ></rect>{" "}
                <rect
                  x="2"
                  y="2"
                  width="28"
                  height="28"
                  rx="6"
                  fill="url(#paint2_radial_87_7153)"
                ></rect>{" "}
                <path
                  d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                  fill="white"
                ></path>{" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                  fill="white"
                ></path>{" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                  fill="white"
                ></path>{" "}
                <defs>
                  {" "}
                  <radialGradient
                    id="paint0_radial_87_7153"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
                  >
                    {" "}
                    <stop stop-color="#B13589"></stop>{" "}
                    <stop offset="0.79309" stop-color="#C62F94"></stop>{" "}
                    <stop offset="1" stop-color="#8A3AC8"></stop>{" "}
                  </radialGradient>{" "}
                  <radialGradient
                    id="paint1_radial_87_7153"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
                  >
                    {" "}
                    <stop stop-color="#E0E8B7"></stop>{" "}
                    <stop offset="0.444662" stop-color="#FB8A2E"></stop>{" "}
                    <stop offset="0.71474" stop-color="#E2425C"></stop>{" "}
                    <stop
                      offset="1"
                      stop-color="#E2425C"
                      stop-opacity="0"
                    ></stop>{" "}
                  </radialGradient>{" "}
                  <radialGradient
                    id="paint2_radial_87_7153"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
                  >
                    {" "}
                    <stop offset="0.156701" stop-color="#406ADC"></stop>{" "}
                    <stop offset="0.467799" stop-color="#6A45BE"></stop>{" "}
                    <stop
                      offset="1"
                      stop-color="#6A45BE"
                      stop-opacity="0"
                    ></stop>{" "}
                  </radialGradient>{" "}
                </defs>{" "}
              </g>
            </svg>
          </a>

          <svg
            onClick={handleWhatsAppClick}
            className="cursor-pointer"
            width="30px"
            height="30px"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z"
                fill="#BFC8D0"
              ></path>{" "}
              <path
                d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
                fill="url(#paint0_linear_87_7264)"
              ></path>{" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z"
                fill="white"
              ></path>{" "}
              <path
                d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
                fill="white"
              ></path>{" "}
              <defs>
                {" "}
                <linearGradient
                  id="paint0_linear_87_7264"
                  x1="26.5"
                  y1="7"
                  x2="4"
                  y2="28"
                  gradientUnits="userSpaceOnUse"
                >
                  {" "}
                  <stop stop-color="#5BD066"></stop>{" "}
                  <stop offset="1" stop-color="#27B43E"></stop>{" "}
                </linearGradient>{" "}
              </defs>{" "}
            </g>
          </svg>
        </div>
      </div>

      <div className="flex flex-row">
        <div
          className={`${
            window.innerWidth < 1780
              ? "w-[40vw] md:w-[20vw] h-[170px] md:h-[200px]"
              : "w-[300px] h-[300px]"
          }   m-[16px] bg-green-50 p-[16px] rounded-[20px] flex-col flex justify-between`}
        >
          <h3
            className={`${
              window.innerWidth < 1780
                ? "text-[4vw] md:text-[3vw] lg:text-[2vw]"
                : "text-[50px]"
            }  text-[#292929] font-semibold  headingFont`}
          >
            Company
          </h3>
          <Link to={"/"}>
            <p className="text-[#292929]">Home</p>
          </Link>
          <Link to={"/Contact"}>
            <p className="text-[#292929]">Contact Us</p>
          </Link>
          <Link to={"/SignUpOne"}>
            <p className="text-[#292929]">Sign Up</p>
          </Link>
          <p className="text-[#292929]">Download</p>
        </div>

        <div
          className={`${
            window.innerWidth < 1780
              ? "w-[40vw] md:w-[20vw] h-[170px] md:h-[200px]"
              : "w-[300px] h-[200px]"
          }   m-[16px] bg-green-50 p-[16px] rounded-[20px] flex-col flex justify-between`}
        >
          <h3
            className={`${
              window.innerWidth < 1780
                ? "text-[4vw] md:text-[3vw] lg:text-[2vw]"
                : "text-[50px]"
            }  text-[#292929] font-semibold  headingFont`}
          >
            Legal
          </h3>
          <Link to={"/TermsAndConditions"}>
            <p className="text-[#292929]">Terms & Conditions</p>
          </Link>
          <p className="text-[#292929]">Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
