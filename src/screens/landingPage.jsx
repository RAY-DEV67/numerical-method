import image1 from "../assets/h1.png";
import image2 from "../assets/h2.png";
import image3 from "../assets/h3.png";
import image4 from "../assets/h4.png";
import phone from "../assets/h9.png";
import apple from "../assets/apple.png";
import google from "../assets/google.png";
import Footer from "../components/footer";

function LandingPage() {
  return (
    <>
      <div className="px-[16px] pt-[56px] bg-[#013a19] textFont">
        <div className="md:flex md:flex-row md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:mr-[16px]">
            <h2 className="text-[7vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              Nigeria's Ultimate Student Marketplace
            </h2>
            <p className="text-white mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
              Discover a seamless way to buy and sell within your campus
              community. 🎓Buy textbooks, electronics, fashion, and more,
              hassle-free!
            </p>
          </div>
          <img src={image1} alt="image1" className="mt-[16px] md:w-[40vw]" />
        </div>

        <div className="md:flex md:flex-row-reverse md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:ml-[16px]">
            <h2 className="text-[7vw] md:text-[3vw] headingFont leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              Never Miss a Beat with Uniplug Events!
            </h2>
            <p className="text-white mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
              Discover the hottest events happening around your university
              campus.
            </p>
          </div>
          <img src={image2} alt="image2" className="mt-[16px] md:w-[40vw]" />
        </div>

        <div className="md:flex md:flex-row md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:mr-[16px]">
            <h2 className="text-[7vw] md:text-[3vw] headingFont leading-[7vw] md:leading-[3vw] font-bold w-[90vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              Your Gateway to Meaningful Connections!
            </h2>
            <p className="text-white mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
              Expand your social circle and make unforgettable memories at your
              university. 🎓✨
            </p>
          </div>
          <img src={image3} alt="image3" className="mt-[16px] md:w-[40vw]" />
        </div>

        <div className="md:flex md:flex-row-reverse md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:ml-[16px]">
            <h2 className="text-[7vw] md:text-[3vw] headingFont leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              Chat Communicate with fellow students.
            </h2>
            <p className="text-white mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
              Share photos, videos, voice messages, or links in a secure way,
              break the language barrier with auto-translation to your preferred
              language.
            </p>
          </div>
          <img src={image4} alt="image2" className="mt-[16px] md:w-[40vw]" />
        </div>

        <div className="hidden md:flex md:flex-row md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw]">
            <h2 className="text-[7vw] headingFont md:text-[3vw] leading-9 md:leading-[4vw] font-bold w-[80vw] md:w-[50vw] mt-[16px] text-white">
              Download The App Now
            </h2>
            <img
              src={apple}
              alt="Download On Apple"
              className="mt-[16px] w-[20vw]"
            />
            <img
              src={google}
              alt="Download On Google"
              className="mt-[16px] w-[20vw]"
            />
          </div>
          <img src={phone} alt="uniplug" className="mt-[16px] md:w-[345w]" />
        </div>

        <div className="flex flex-col md:hidden">
          <img src={phone} alt="Uniplug" className="mt-[16px]" />
          <h2 className="text-white text-[6vw] headingFont font-semibold mt-[16px]">
            Download The App Now
          </h2>
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
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
