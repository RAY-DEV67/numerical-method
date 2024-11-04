import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { post } from "../utils/api";
import LoadingSpinner from "../components/spinner";

const GenerateMethod = () => {
  const token = sessionStorage.getItem("token");
  const [interpolationPoints, setInterpolationPoints] = useState([]);
  const [firstDerivativePoints, setFirstDerivativePoints] = useState([]);
  const [secondDerivativePoints, setsecondDerivativePoints] = useState([]);
  const [loading, setloading] = useState(false);
  const [numberOfInterpolationPoints, setNumberOfInterpolationPoints] =
    useState(0);
  const [numberOfFirstDerivativePoints, setNumberOfFirstDerivativePoints] =
    useState(0);
  const [numberOfSecondDerivativePoints, setNumberOfSecondDerivativePoints] =
    useState(0);
  const [selectedDerivative, setSelectedDerivative] = useState("");
  const inputsRef = useRef([]);

  const handleChangeInterpolationPoints = (index, value) => {
    const newPoints = [...interpolationPoints];
    newPoints[index] = value;
    setInterpolationPoints(newPoints);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleChangeFirstDerivativePoints = (index, value) => {
    const newPoints = [...interpolationPoints];
    newPoints[index] = value;
    setFirstDerivativePoints(newPoints);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleChangeSecondDerivativePoints = (index, value) => {
    const newPoints = [...interpolationPoints];
    newPoints[index] = value;
    setsecondDerivativePoints(newPoints);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleNumberOfPointsChange = (e) => {
    const value = e.target.value;
    setNumberOfInterpolationPoints(value);

    // Only update interpolation points if the value is a valid number
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setInterpolationPoints((prevPoints) => {
        const newPoints = [...prevPoints];
        newPoints.length = numericValue; // Resize array
        return newPoints.fill("", prevPoints.length);
      });
    }
  };

  const handleNumberOfFirstDerivativeChange = (e) => {
    const value = e.target.value;
    setNumberOfFirstDerivativePoints(value);

    // Only update interpolation points if the value is a valid number
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setFirstDerivativePoints((prevPoints) => {
        const newPoints = [...prevPoints];
        newPoints.length = numericValue; // Resize array
        return newPoints.fill("", prevPoints.length);
      });
    }
  };

  const handleNumberOfSecondDerivativeChange = (e) => {
    const value = e.target.value;
    setNumberOfSecondDerivativePoints(value);

    // Only update interpolation points if the value is a valid number
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setsecondDerivativePoints((prevPoints) => {
        const newPoints = [...prevPoints];
        newPoints.length = numericValue; // Resize array
        return newPoints.fill("", prevPoints.length);
      });
    }
  };

  const handleRadioChange = (derivative) => {
    setSelectedDerivative(derivative);
  };

  const generate = () => {
    setloading(true);
    const data = {
      interpolation_points: ["0"],
      first_derivatives_points: ["0", "1/6", "1/3", "1/3", "2/3", "5/6", "2"],
      second_derivatives_points: [],
      analysis: true,
    };

    post(
      "/generate",
      data,
      { Authorization: `Bearer ${token}` },
      (response) => {
        console.log(response);
        setloading(false);
        // navigation.navigate("Login");
      },
      (error) => {
        console.log("Error", error);
        setloading(false);
      }
    );
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
              <p className="text-left mb-[8px]">
                Number Of Interpolation Points:{" "}
              </p>
              <input
                className="border border-[#00cc00] text-center h-10 w-10 mx-1 rounded-md"
                value={numberOfInterpolationPoints}
                onChange={handleNumberOfPointsChange}
                type="tel"
              />
            </div>

            <div className="flex items-start mt-[16px] md:mt-[24px] w-[100%] lg:w-[620px] ">
              <p className="text-left mb-[8px] md:mb-[0px]">
                Interpolation Points:{" "}
              </p>
              <div className="flex justify-start w-[60vw] md:w-[30vw] ml-[4px] gap-y-2 flex-wrap">
                {interpolationPoints.map((digit, index) => (
                  <input
                    key={index}
                    className="border border-[#00cc00] text-center h-8 w-8 mx-1 rounded-md"
                    value={digit}
                    onChange={(e) =>
                      handleChangeInterpolationPoints(index, e.target.value)
                    }
                    maxLength={1}
                    type="tel"
                    ref={(el) => (inputsRef.current[index] = el)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-row items-center w-[100%] lg:w-[50%] mt-[24px] gap-x-2">
              <p className="text-left mb-[8px]">Number Of First Derivative: </p>
              <input
                className="border border-[#00cc00] text-center h-10 w-10 mx-1 rounded-md"
                value={numberOfFirstDerivativePoints}
                onChange={handleNumberOfFirstDerivativeChange}
                type="tel"
              />
            </div>

            <div className="flex items-start mt-[16px] md:mt-[24px] w-[100%] lg:w-[620px] ">
              <p className="text-left mb-[8px] md:mb-[0px]">
                1st Derivative Points:{" "}
              </p>
              <div className="flex justify-start w-[60vw] md:w-[30vw] ml-[4px] gap-y-2 flex-wrap">
                {firstDerivativePoints.map((digit, index) => (
                  <input
                    key={index}
                    className="border border-[#00cc00] text-center h-8 w-8 mx-1 rounded-md"
                    value={digit}
                    onChange={(e) =>
                      handleChangeFirstDerivativePoints(index, e.target.value)
                    }
                    maxLength={1}
                    type="tel"
                    ref={(el) => (inputsRef.current[index] = el)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-row items-center w-[100%] lg:w-[50%] mt-[24px] gap-x-2">
              <p className="text-left mb-[8px]">
                Number Of Second Derivative:{" "}
              </p>
              <input
                className="border border-[#00cc00] text-center h-10 w-10 mx-1 rounded-md"
                value={numberOfSecondDerivativePoints}
                onChange={handleNumberOfSecondDerivativeChange}
                type="tel"
              />
            </div>

            <div className="flex items-start mt-[16px] md:mt-[24px] w-[100%] lg:w-[620px] ">
              <p className="text-left mb-[8px] md:mb-[0px]">
                2nd Derivative Point:{" "}
              </p>
              <div className="flex justify-start w-[60vw] md:w-[30vw] ml-[4px] gap-y-2 flex-wrap">
                {secondDerivativePoints.map((digit, index) => (
                  <input
                    key={index}
                    className="border border-[#00cc00] text-center h-8 w-8 mx-1 rounded-md"
                    value={digit}
                    onChange={(e) =>
                      handleChangeSecondDerivativePoints(index, e.target.value)
                    }
                    maxLength={1}
                    type="tel"
                    ref={(el) => (inputsRef.current[index] = el)}
                  />
                ))}
              </div>
            </div>

            {/* Derivative Checkboxes */}
            <div className="flex flex-row items-center  space-y-4 w-[100%] lg:w-[50%]">
              <p className="mt-[16px] mr-[16px]">Analysis:</p>
              <label className="flex items-center">
                True
                <input
                  type="radio"
                  className="ml-2 mr-[8px]"
                  name="derivative"
                  value="first"
                  checked={selectedDerivative === "first"}
                  onChange={() => handleRadioChange("first")}
                />
              </label>
              <label className="flex items-center">
                False
                <input
                  type="radio"
                  className="ml-2"
                  name="derivative"
                  value="second"
                  checked={selectedDerivative === "second"}
                  onChange={() => handleRadioChange("second")}
                />
              </label>
            </div>

            <Link
              onClick={generate}
              className={`${
                window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[200px]"
              } bg-[#013a19] mt-[24px] text-white rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
            >
              {loading ? <LoadingSpinner /> : "Generate Method"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateMethod;
