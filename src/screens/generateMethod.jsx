import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const GenerateMethod = () => {
  const [code, setCode] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [checkedDerivatives, setCheckedDerivatives] = useState({
    first: false,
    second: false,
    third: false,
  });
  const inputsRef = useRef([]);

  useEffect(() => {
    // Focus on the first input field
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleCheckboxChange = (derivative) => {
    setCheckedDerivatives({
      ...checkedDerivatives,
      [derivative]: !checkedDerivatives[derivative],
    });
  };

  return (
    <div className=" min-h-[100vh] flex flex-col justify-center items-center">
      <div className=" flex-col">
        <div className="text-center">
          <h2
            className={`${
              window.innerWidth < 1780
                ? "text-[5vw] md:text-[2vw]"
                : "text-[40px]"
            } font-semibold`}
          >
            Generate Method
          </h2>

          <div className="flex flex-col items-center justify-start w-[90vw] ">
            <div className="flex flex-row items-center w-[100%] lg:w-[50%] mt-[24px] gap-x-2">
              <p className="text-left mb-[8px]">How Many Stops: </p>
              <input
                className="border border-[#00cc00] text-center h-10 w-10 mx-1 rounded-md"
                // value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength={1}
                type="tel"
              />
            </div>

            <div className="flex items-start mt-[16px] md:mt-[24px] w-[100%] lg:w-[620px] ">
              <p className="text-left mb-[8px] md:mb-[0px]">Hybrid Points: </p>
              <div className="flex justify-start w-[60vw] md:w-[30vw] ml-[4px] gap-y-2 flex-wrap">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    className="border border-[#00cc00] text-center h-8 w-8 mx-1 rounded-md"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    maxLength={1}
                    type="tel"
                    ref={(el) => (inputsRef.current[index] = el)}
                  />
                ))}
              </div>
            </div>

            {/* Derivative Checkboxes */}
            <div className="flex flex-col mt-[16px] space-y-4 w-[100%] lg:w-[50%]">
              <label className="flex items-center">
                1st Derivative:
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={checkedDerivatives.first}
                  onChange={() => handleCheckboxChange("first")}
                />
              </label>
              <label className="flex items-center">
                2nd Derivative:
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={checkedDerivatives.second}
                  onChange={() => handleCheckboxChange("second")}
                />
              </label>
              <label className="flex items-center">
                3rd Derivative:
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={checkedDerivatives.third}
                  onChange={() => handleCheckboxChange("third")}
                />
              </label>
            </div>

            <Link
              to="/GenerateMethod"
              className={`${
                window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[200px]"
              } bg-[#013a19] mt-[24px] text-white rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
            >
              Generate Method
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateMethod;
