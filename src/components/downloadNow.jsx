import AnimatedDiv from "./Animation";
import phone from "../assets/newMock.png";
import apple from "../assets/apple.png";
import google from "../assets/google.png";

function DownloadNow() {
  return (
    <div className="">
      <div
        className={`${
          window.innerWidth < 1780 ? "lg:w-[100vw]" : "w-[700px]"
        } mt-[32px] rounded-[20px] flex flex-col items-center`}
      >
        <div className="bg-gradient-to-r from-green-500 to-green-900 flex flex-col lg:flex-row items-center py-[16px] w-[80vw] lg:w-[70vw] rounded-[20px]">
          <div className="flex flex-col items-center">
            <h1 className="text-[5vw] headingFont text-center w-[80%] mb-[32px] text-white md:text-[2vw] leading-[7vw] md:leading-[3vw] font-bold md:w-[40vw text-[#00cc00]">
              Where Campus Dreams Comes True
            </h1>
            <h1 className="text-[5vw] caligraphy text-white md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold md:w-[40vw text-[#00cc00]">
              Download The App Now
            </h1>
            <div>
              <img
                src={apple}
                alt="Download On Apple"
                className="mt-[16px] w-[100px] relative z-10"
              />
              <img
                src={google}
                alt="Download On Google"
                className="mt-[16px] w-[100px] relative z-10"
              />
            </div>
          </div>
          <img
            src={phone}
            alt="Uniplug"
            className="w-[80vw] md:left-[50vw] md:absolute md:w-[15vw]  mt-[-100px]"
          />
        </div>
      </div>
    </div>
  );
}

export default DownloadNow;
