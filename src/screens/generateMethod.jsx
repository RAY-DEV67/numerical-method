import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Link } from "react-router-dom";
import { post } from "../utils/api";
import LoadingSpinner from "../components/spinner";
import ImageModal from "../components/imageModal"; // Import the modal component

const GenerateMethod = () => {
  const [groupData, setGroupData] = useState([
    { name: "Interpolation", numFractions: 0, fractions: [] },
    { name: "First Derivative Collocation", numFractions: 0, fractions: [] },
    { name: "Second Derivative Collocation", numFractions: 0, fractions: [] },
  ]);
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleGroupChange = (groupIndex, field, value) => {
    const updatedGroups = [...groupData];
    if (field === "numFractions") {
      updatedGroups[groupIndex].numFractions = value;
      updatedGroups[groupIndex].fractions = Array.from(
        { length: value },
        () => ({ numerator: "", denominator: "" })
      );
    } else {
      const [fractionIndex, fractionField] = field;
      updatedGroups[groupIndex].fractions[fractionIndex][fractionField] = value;
    }
    setGroupData(updatedGroups);
  };

  const handleSubmit = async () => {
    setloading(true);
    const formattedGroups = groupData.map((group) => ({
      name: group.name,
      fractions: group.fractions.map(
        (fraction) => `${fraction.numerator}/${fraction.denominator}`
      ),
    }));

    const data = {
      interpolation_points: formattedGroups[0].fractions,
      first_derivatives_points: formattedGroups[1].fractions,
      second_derivatives_points: formattedGroups[2].fractions,
      analysis: true,
    };

    try {
      const apiUrl = "https://grant-89eg.onrender.com/api/v1/generate/"; // Replace with your API URL

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(response);

        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const result = await response.json();
        if (result.status === "error") {
          console.log(result.message);
        } else {
          console.log(result);
          console.log(result.stability_region);
          setImageUrl(result.stability_region); // Set the image URL
          setShowModal(true); // Show the modal
          setloading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MathJaxContext>
      <div className=" min-h-[100vh] flex flex-col justify-center my-[16px] items-center">
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[5vw] md:text-[2vw]"
              : "text-[40px]"
          } font-semibold mt-[16px]`}
        >
          Fraction Input App
        </h1>
        {groupData.map((group, groupIndex) => (
          <div key={groupIndex} className="w-[90vw] mt-[24px]">
            <h2 className="mb-[8px]">{group.name}:</h2>
            <div>
              <label>How many fractions? </label>
              <input
                className="border border-[#00cc00] text-center h-10 w-10 mx-1 rounded-md"
                value={group.numFractions}
                onChange={(e) =>
                  handleGroupChange(
                    groupIndex,
                    "numFractions",
                    Number(e.target.value)
                  )
                }
                type="tel"
              />
            </div>
            <div className="flex flex-row flex-wrap">
              {group.fractions.map((fraction, fractionIndex) => (
                <div
                  key={fractionIndex}
                  className="m-[8px] border border-[#00cc00] h-14 rounded-md w-[6vw] flex flex-col items-center"
                >
                  <input
                    className="text-center text-[14px] w-[5.5vw] h-7 mx-1 rounded-md"
                    value={fraction.numerator}
                    onChange={(e) =>
                      handleGroupChange(
                        groupIndex,
                        [fractionIndex, "numerator"],
                        e.target.value
                      )
                    }
                    type="tel"
                  />
                  <span className="bg-black h-[1px] w-[6vw]"> </span>

                  <input
                    className="text-center text-[14px] w-[5.5vw] h-7 mx-1 rounded-md"
                    value={fraction.denominator}
                    onChange={(e) =>
                      handleGroupChange(
                        groupIndex,
                        [fractionIndex, "denominator"],
                        e.target.value
                      )
                    }
                    type="tel"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Link
          onClick={handleSubmit}
          className={`${
            window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[200px]"
          } bg-[#013a19] my-[24px] text-white rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
        >
          {loading ? <LoadingSpinner /> : "Generate Method"}
        </Link>

        {/* Modal to display the image */}
        <div className="absolute bg-red-400">
          <ImageModal
            isOpen={showModal}
            imageUrl={imageUrl}
            onClose={() => setShowModal(false)}
          />
        </div>
      </div>
    </MathJaxContext>
  );
};

export default GenerateMethod;
