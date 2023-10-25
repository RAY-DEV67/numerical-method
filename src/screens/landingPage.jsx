import apple from "../assets/apple.png";
import google from "../assets/google.png";
import image1 from "../assets/image1.png";
import Footer from "../components/footer";
import AnimatedDiv from "../components/Animation";
import DownloadNow from "../components/downloadNow";
import Sections from "../components/sections";
import Tick from "../components/tick";

function LandingPage() {

  let index = 0,
    interval = 50000;

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = (star) => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  };

  for (const star of document.getElementsByClassName("magic-star")) {
    setTimeout(() => {
      animate(star);

      setInterval(() => animate(star), 8000);
    }, index++ * (interval / 3));
  }

  return (
    <>
      <div className="bg-gradient-to-r from-green-500 to-green-900 pt-[68px] md:flex md:flex-row-reverse md:justify-between md:items-center">
        <div className="px-[16px]">
          <h1
            className={`${
              window.innerWidth < 1780
                ? "text-[6vw] md:text-[3vw] w-[80vw] md:w-[40vw]"
                : "text-[60px] w-[700px]"
            } headingFont font-bold mt-[16px] text-white`}
          >
            Connecting Students To
          </h1>
          <h1
            className={`${
              window.innerWidth < 1780
                ? "text-[6vw] md:text-[3vw] w-[80vw] md:w-[40vw]"
                : "text-[60px] w-[700px]"
            } headingFont font-bold mt-[-8px] h-[10vh] text-white`}
          >
            <Tick />
          </h1>

          <AnimatedDiv type="text" showType="showtext">
            <p
              className={`${
                window.innerWidth < 1780 ? "w-[90vw] md:w-[20vw]" : "w-[700px]"
              } text-white rounded-[20px] font-semibold`}
            >
              Connecting Naija Campuses,
            </p>
            <p
              className={`${
                window.innerWidth < 1780 ? "w-[90vw] md:w-[20vw]" : "w-[700px]"
              } text-white rounded-[20px] font-semibold`}
            >
              One Student at a Time
            </p>
          </AnimatedDiv>

          <div className="flex-row flex w-[250px] justify-between mt-[16px]">
            <img
              src={apple}
              alt="Download On Apple"
              className={`mt-[16px] ${
                window.innerWidth < 1780 ? "w-[100px] " : "w-[400px]"
              }`}
            />
            <img
              src={google}
              alt="Download On Google"
              className={`mt-[16px] ${
                window.innerWidth < 1780 ? "w-[100px] " : "w-[400px]"
              }`}
            />
          </div>
        </div>

        <div>
          <img src={image1} alt="Download On Google" className={`mt-[16px]`} />
        </div>
      </div>

      <div className="px-[16px]">
        <Sections
          heading1="Nigeria Ultimate Students"
          heading2="Market-Place"
          text=" Whether you need products like clothes and shoes or you are looking for professional service providers,
          UniPlug has you covered!!"
          img="https://res.cloudinary.com/dvl38skbc/image/upload/v1698174065/uniplug/study-group-african-people_w6xwce.jpg"
          className="md:flex md:flex-row md:justify-center md:items-center mt-[50px]"
        />

        <Sections
          heading1="Never Miss A Beat With"
          heading2="UniPlug Events!!"
          text="Discover the hottest events happening around your campus"
          img="https://res.cloudinary.com/dvl38skbc/image/upload/v1693252484/uniplug/events_1_kjj5bt.webp"
          className="md:flex md:flex-row-reverse md:justify-center md:items-center mt-[50px]"
        />

        <Sections
          heading1="Your Gateway To Meaningful"
          heading2="Connections!"
          text="Expand your social circle and make unforgettable memories at your university. 🎓✨"
          img="https://res.cloudinary.com/dvl38skbc/image/upload/v1693252463/uniplug/connections_1_mk9amn.webp"
          className="md:flex md:flex-row md:justify-center md:items-center mt-[50px]"
        />

        <Sections
          heading1="Chat And Communicate With"
          heading2="Fellow Students."
          text=" Share photos, videos, voice messages, or links in a secure way,
          break the language barrier with auto-translation to your
          preferred language."
          img="https://res.cloudinary.com/dvl38skbc/image/upload/v1693252451/uniplug/chatting_1_i59cez.webp"
          className="md:flex md:flex-row-reverse md:justify-center md:items-center mt-[50px]"
        />
        <DownloadNow />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
