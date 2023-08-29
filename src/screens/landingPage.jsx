import phone from "../assets/h9.png";
import apple from "../assets/apple.png";
import google from "../assets/google.png";
import Footer from "../components/footer";
import AnimatedDiv from "../components/Animation";

function LandingPage() {
  return (
    <>
      <div className="px-[16px] pt-[56px] bg-[#013a19] textFont">
        <div className="md:flex md:flex-row md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:mr-[16px]">
            <h2 className="text-[7vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              Nigeria's Ultimate Student Marketplace
            </h2>
            <AnimatedDiv type="text" showType="showtext">
              <p className="text-white mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
                Discover a seamless way to buy and sell within your campus
                community. 🎓Buy textbooks, electronics, fashion, and more,
                hassle-free!
              </p>
            </AnimatedDiv>
          </div>
          <img
              src="https://res.cloudinary.com/dvl38skbc/image/upload/v1693252512/uniplug/marketPlace_1_uikr6w.webp"
              alt="image1"
              className="mt-[16px] md:w-[40vw] rounded-[20px]"
            />

        </div>

        <div className="md:flex md:flex-row-reverse md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:ml-[16px]">
            <h2 className="text-[7vw] md:text-[3vw] headingFont leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              Never Miss a Beat with Uniplug Events!
            </h2>
            <AnimatedDiv type="text" showType="showtext">
              <p className="text-white mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
                Discover the hottest events happening around your university
                campus.
              </p>
            </AnimatedDiv>
          </div>
          <img
              src="https://res.cloudinary.com/dvl38skbc/image/upload/v1693252484/uniplug/events_1_kjj5bt.webp"
              alt="image2"
              className="mt-[16px] md:w-[40vw] rounded-[20px]"
            />
        </div>

        <div className="md:flex md:flex-row md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:mr-[16px]">
            <h2 className="text-[7vw] md:text-[3vw] headingFont leading-[7vw] md:leading-[3vw] font-bold w-[90vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              Your Gateway to Meaningful Connections!
            </h2>
            <AnimatedDiv type="text" showType="showtext">
              <p className="text-white mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
                Expand your social circle and make unforgettable memories at
                your university. 🎓✨
              </p>
            </AnimatedDiv>
          </div>
          <img
              src="https://res.cloudinary.com/dvl38skbc/image/upload/v1693252463/uniplug/connections_1_mk9amn.webp"
              alt="image3"
              className="mt-[16px] md:w-[40vw] rounded-[20px]"
            />
        </div>

        <div className="md:flex md:flex-row-reverse md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:ml-[16px]">
            <h2 className="text-[7vw] md:text-[3vw] headingFont leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              Chat Communicate with fellow students.
            </h2>
            <AnimatedDiv type="text" showType="showtext">
              <p className="text-white mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
                Share photos, videos, voice messages, or links in a secure way,
                break the language barrier with auto-translation to your
                preferred language.
              </p>
            </AnimatedDiv>
          </div>
          <img
              src="https://res.cloudinary.com/dvl38skbc/image/upload/v1693252451/uniplug/chatting_1_i59cez.webp"
              alt="image2"
              className="mt-[16px] md:w-[40vw] rounded-[20px]"
            />
        </div>

        <div className="hidden md:flex md:flex-row md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw]">
            <AnimatedDiv type="text" showType="showtext">
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
            </AnimatedDiv>
          </div>
          <AnimatedDiv type="head" showType="showhead">
            <img src={phone} alt="uniplug" className="mt-[16px] md:w-[345w]" />
          </AnimatedDiv>
        </div>

        <div className="flex flex-col md:hidden">
          <div className="flex flex-col items-center">
            <AnimatedDiv type="head" showType="showhead">
              <img src={phone} alt="Uniplug" className="mt-[16px]" />
            </AnimatedDiv>
          </div>
          <AnimatedDiv type="text" showType="showtext">
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
          </AnimatedDiv>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
