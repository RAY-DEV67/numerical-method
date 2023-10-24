import React from "react";

const Input = ({ onChangeText, placeholder, error, type }) => {
  return (
    <div>
      <div>
        <input
          placeholder={placeholder}
          onChange={onChangeText}
          type={type}
          className={`${
            window.innerWidth < 1780
              ? "text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
              : "w-[1000px] text-[40px]"
          } input bg-transparent textFont rounded-[10px] text-black p-[8px] my-[16px] border-b border-[#00cc00]`}
        />
      </div>
      {error && (
        <p
          className={`${
            window.innerWidth < 1780
              ? "text-[2vw] md:text-[2vw] lg:text-[1.5vw]"
              : "text-[30px]"
          } text-red-500  mb-[16px] textFont`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
