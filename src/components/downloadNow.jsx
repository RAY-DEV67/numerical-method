import AnimatedDiv from "./Animation";
import phone from "../assets/mockUp.png";
import phone2 from "../assets/newMockUp3.png";
import apple from "../assets/apple.png";
import google from "../assets/google.png";

function DownloadNow() {
  return (
    <div>
      <div className="hidden mx-[16px] md:flex md:flex-row md:justify-center md:items-center mt-[50px]">
        <div
          className={`${
            window.innerWidth < 1780 ? "md:w-[40vw]" : "w-[700px]"
          } mt-[16px] rounded-[20px]`}
        >
          <AnimatedDiv type="text" showType="showtext">
            <div className={`${
            window.innerWidth < 1780 ? "w-[35vw]" : "w-[600px]"
          } bg-green-50 py-[16px] px-[32px] rounded-[20px]`}>
              <h1 className={`${
                window.innerWidth < 1780
                  ? "md:text-[3vw] md:w-[40vw]"
                  : "text-[60px] w-[700px]"
              } headingFont font-bold mt-[16px] text-[#00cc00]`}>
                <span class="magic">
                  <span class="magic-star">
                    <svg viewBox="0 0 512 512">
                      <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                    </svg>
                  </span>

                  <span class="magic-text"> Download The App Now</span>
                </span>
              </h1>

              <img
                src={apple}
                alt="Download On Apple"
                className={`mt-[16px] ${
                    window.innerWidth < 1780
                      ? "w-[20vw] "
                      : "w-[400px]"
                  }`}
              />
              <img
                src={google}
                alt="Download On Google"
                className={`mt-[16px] ${
                    window.innerWidth < 1780
                      ? "w-[20vw] "
                      : "w-[400px]"
                  }`}
              />
            </div>
          </AnimatedDiv>
        </div>
        <AnimatedDiv type="head" showType="showhead">
          <div className="flex flex-row items-center justify-center">
            <img src={phone} alt="Uniplug" className="" />
            <img
              src={phone2}
              alt="Uniplug"
              className="ml-[-125%] lg:ml-[-600px] mt-[48px]"
            />
          </div>
        </AnimatedDiv>
      </div>

      <div className="flex flex-col md:hidden mx-[16px]">
        <div className="flex flex-col items-center">
          <AnimatedDiv type="head" showType="showhead">
            <div className="flex flex-row items-center justify-center">
              <img src={phone} alt="Uniplug" className="" />
              <img
                src={phone2}
                alt="Uniplug"
                className="ml-[-125%] sm:ml-[-110%] sm:mt-[0px] mt-[48px]"
              />
            </div>
          </AnimatedDiv>
        </div>
        <AnimatedDiv type="text" showType="showtext">
          <div className="bg-green-50 p-[16px] w-[70vw] rounded-[20px]">
            <h1 className="text-[7vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>

                <span class="magic-text"> Download The App Now</span>
              </span>
            </h1>
            <div>
              <img
                src={apple}
                alt="Download On Apple"
                className="mt-[16px] w-[40vw]"
              />
              <img
                src={google}
                alt="Download On Google"
                className="mt-[16px] w-[40vw]"
              />
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </div>
  );
}

export default DownloadNow;