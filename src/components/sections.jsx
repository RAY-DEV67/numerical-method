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
              ? "text-[6vw] md:text-[2vw] w-[80vw] md:w-[40vw]"
              : "text-[60px] w-[700px]"
          } headingFont font-bold mt-[16px] text-[#00cc00]`}
        >
          <span class="magic">
            <span class="magic-text">{heading1}</span>
          </span>
        </h1>
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[6vw] md:text-[2vw] w-[80vw] md:w-[40vw]"
              : "text-[60px] w-[700px]"
          } headingFont font-bold mt-[-8px] text-[#00cc00]`}
        >
          <span class="magic">
            <span class="magic-text">{heading2}</span>
          </span>
        </h1>

        <AnimatedDiv type="text" showType="showtext">
          <p
            className={`${
              window.innerWidth < 1780 ? "w-[90vw] md:w-[40vw]" : "w-[700px]"
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
