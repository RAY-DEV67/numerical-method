import phone from "../assets/mockUp.png";
import apple from "../assets/apple.png";
import google from "../assets/google.png";
import Footer from "../components/footer";
import AnimatedDiv from "../components/Animation";

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
      <div className="px-[16px] pt-[56px] bg-[#ffffff] font-[Inter]">
        <div className="md:flex md:flex-row md:justify-center md:items-center mt-[50px]">
          <div className="md:w-[40vw] md:mr-[16px]">
            <h1 className="text-[8vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>
                <span class="magic-text">Nigeria's Ultimate Student</span>
              </span>
            </h1>
            <h1 className="text-[8vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>
                <span class="magic-text">MarketPlace</span>
              </span>
            </h1>

            <AnimatedDiv type="text" showType="showtext">
              <p className="text-[#292929] mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
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
            <h1 className="text-[8vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>
                <span class="magic-text">Never Miss a Beat with</span>
              </span>
            </h1>
            <h1 className="text-[8vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>
                <span class="magic-text">Uniplug Events!</span>
              </span>
            </h1>

            <AnimatedDiv type="text" showType="showtext">
              <p className="text-[#292929] mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
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
            <h1 className="text-[8vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>

                <span class="magic-text"> Your Gateway to Meaningful </span>
              </span>
            </h1>
            <h1 className="text-[8vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>

                <span class="magic-text">Connections!</span>
              </span>
            </h1>

            <AnimatedDiv type="text" showType="showtext">
              <p className="text-[#292929] mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
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
            <h1 className="text-[8vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw] mt-[16px] text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>

                <span class="magic-text"> Chat Communicate with fellow</span>
              </span>
            </h1>
            <h1 className="text-[8vw] headingFont md:text-[3vw] leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw text-[#00cc00]">
              <span class="magic">
                <span class="magic-star">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>

                <span class="magic-text">students.</span>
              </span>
            </h1>

            <AnimatedDiv type="text" showType="showtext">
              <p className="text-[#292929] mt-[24px] w-[90vw] md:w-[40vw] font-semibold">
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
          </AnimatedDiv>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
