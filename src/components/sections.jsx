import AnimatedDiv from "./Animation";

function Sections({ heading1, heading2, text, img, className }) {
  return (
    <div className={className}>
      <div
        className={`${
          window.innerWidth < 1780 ? "md:w-[40vw]" : "w-[700px]"
        }  md:mx-[16px]`}
      >
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[6vw] md:text-[3vw] w-[80vw] md:w-[40vw]"
              : "text-[60px] w-[700px]"
          } headingFont font-bold mt-[16px] text-[#00cc00]`}
        >
          <span class="magic">
            <span class="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span class="magic-text">{heading1}</span>
          </span>
        </h1>
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[6vw] md:text-[3vw] w-[80vw] md:w-[40vw]"
              : "text-[60px] w-[700px]"
          } headingFont font-bold mt-[-16px] text-[#00cc00]`}
        >
          <span class="magic">
            <span class="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span class="magic-text">{heading2}</span>
          </span>
        </h1>

        <AnimatedDiv type="text" showType="showtext">
          <p
            className={`${
              window.innerWidth < 1780
                ? "w-[90vw] md:w-[40vw]"
                : "w-[700px]"
            } bg-gradient-to-r from-green-500 to-green-900 p-[16px] rounded-[20px] mt-[16px] font-semibold text-white`}
          >
            {text}
          </p>
        </AnimatedDiv>
      </div>
      <img
        src={img}
        alt="image"
        className={`${
          window.innerWidth < 1780 ? "md:w-[40vw]" : "w-[700px]"
        } mt-[16px] rounded-[20px]`}
      />
    </div>
  );
}

export default Sections;
