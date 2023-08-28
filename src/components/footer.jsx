import logo from "../assets/uniPlugLogo.png";

function Footer() {
  return (
    <div className="textFont bg-[#013a19] px-[16px] flex flex-col items-center justify-center">
         <img src={logo} alt="logo" className="w-[30vw] md:w-[10vw] md:h-[10vw] h-[30vw]" />
      <div className="flex">
        <div className="flex mt-[16px]">
          <svg
            height="20"
            viewBox="0 0 24 24"
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
                d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C13.8565 5 15.637 5.7375 16.9497 7.05025C18.2625 8.36301 19 10.1435 19 12Z"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M14.646 9.00002C13.0379 7.58179 10.5975 7.6838 9.11336 9.23129C7.62921 10.7788 7.62921 13.2213 9.11336 14.7688C10.5975 16.3162 13.0379 16.4182 14.646 15"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <p className="text-white">2023 UniPlug</p>
        </div>
        <p className="ml-[16px] text-white mt-[16px]">Privacy Policy</p>
      </div>
    </div>
  );
}

export default Footer;
