import { Link } from "react-router-dom";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
function LandingPage() {
  const token = sessionStorage.getItem("token");

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] textFont">
      <div className="relative flex flex-col items-center">
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[6vw] md:text-[2vw]"
              : "text-[40px]"
          } font-semibold`}
        >
          Numerical Method Generator
        </h1>
        <p
          className={`${
            window.innerWidth < 1780
              ? "text-[4vw] md:text-[1.5vw]"
              : "text-[30px]"
          } px-[16px] mt-[16px] lg:w-[1000px] text-center`}
        >
          The Numerical Method Generator is a powerful tool designed for
          students, engineers, and professionals working with complex numerical
          methods. With this app, you can easily generate numerical methods by
          inputting interpolation points. Whether you're solving problems in
          calculus, data fitting, or scientific computing, this app helps you
          create accurate methods for interpolation, extrapolation, and more.
        </p>

        {!token && (
          <div className="flex flex-row gap-x-5 mt-[24px]">
            <Link
              to="/SignUp"
              className={`${
                window.innerWidth < 1780 ? "w-[40vw] md:w-[13vw]" : "w-[200px]"
              } border border-[#019a13] text-[#019a13] rounded-[20px] py-[4px] flex flex-col items-center justify-center`}
            >
              Sign Up
            </Link>
            <Link
              to="/Login"
              className={`${
                window.innerWidth < 1780 ? "w-[40vw] md:w-[13vw]" : "w-[200px]"
              } bg-[#013a19] text-white rounded-[20px] py-[4px] flex flex-col items-center justify-center`}
            >
              Log In
            </Link>
          </div>
        )}
        <Link
          to="/GenerateMethod"
          className={`${
            window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[200px]"
          } bg-[#013a19] mt-[16px] text-white rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
        >
          Generate Method
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import LoadingSpinner from "../components/spinner";
// import { post } from "../utils/api";
// const FractionInputApp = () => {
//   const [groupData, setGroupData] = useState([
//     { numFractions: 0, fractions: [] },
//     { numFractions: 0, fractions: [] },
//     { numFractions: 0, fractions: [] },
//   ]);
//   const [loading, setloading] = useState(false);
//   const handleGroupChange = (groupIndex, field, value) => {
//     const updatedGroups = [...groupData];
//     if (field === "numFractions") {
//       updatedGroups[groupIndex].numFractions = value;
//       updatedGroups[groupIndex].fractions = Array.from(
//         { length: value },
//         () => ({ numerator: "", denominator: "" })
//       );
//     } else {
//       const [fractionIndex, fractionField] = field;
//       updatedGroups[groupIndex].fractions[fractionIndex][fractionField] = value;
//     }
//     setGroupData(updatedGroups);
//   };

//   const handleSubmit = () => {
//     setloading(true);
//     const formattedGroups = groupData.map((group) =>
//       group.fractions.map(
//         (fraction) => `${fraction.numerator}/${fraction.denominator}`
//       )
//     );
//     const data = {
//       interpolation_points: formattedGroups[0],
//       first_derivatives_points: formattedGroups[1],
//       second_derivatives_points: formattedGroups[2],
//       analysis: true,
//     };
//     post(
//       "/generate",
//       data,
//       {},
//       (response) => {
//         console.log(response);
//         // setImageUrl(response.results.stability_region); // Set the image URL
//         // setShowModal(true); // Show the modal
//         setloading(false);
//       },
//       (error) => {
//         console.log("Error", error);
//         setloading(false);
//         alert(error.detail);
//       }
//     );
//   };

//   return (
//     <div>
//       <h1>Fraction Input App</h1>{" "}
//       {groupData.map((group, groupIndex) => (
//         <div key={groupIndex}>
//           <h2>Group {groupIndex + 1}</h2>{" "}
//           <div>
//             <label>How many fractions?</label>{" "}
//             <input
//               type="number"
//               min="0"
//               value={group.numFractions}
//               onChange={(e) =>
//                 handleGroupChange(
//                   groupIndex,
//                   "numFractions",
//                   Number(e.target.value)
//                 )
//               }
//               placeholder="Enter number of fractions"
//             />
//           </div>
//           {group.fractions.map((fraction, fractionIndex) => (
//             <div key={fractionIndex}>
//               <input
//                 type="number"
//                 placeholder={`Numerator ${fractionIndex + 1}`}
//                 value={fraction.numerator}
//                 onChange={(e) =>
//                   handleGroupChange(
//                     groupIndex,
//                     [fractionIndex, "numerator"],
//                     e.target.value
//                   )
//                 }
//               />
//               <span>/</span>
//               <input
//                 type="number"
//                 placeholder={`Denominator ${fractionIndex + 1}`}
//                 value={fraction.denominator}
//                 onChange={(e) =>
//                   handleGroupChange(
//                     groupIndex,
//                     [fractionIndex, "denominator"],
//                     e.target.value
//                   )
//                 }
//               />
//             </div>
//           ))}
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Submit All Fractions</button>
//       <Link
//         onClick={handleSubmit}
//         className={`${
//           window.innerWidth < 1780 ? "w-[50vw] md:w-[13vw]" : "w-[200px]"
//         } bg-[#013a19] mt-[24px] text-white rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
//       >
//         {loading ? <LoadingSpinner /> : "Generate Method"}
//       </Link>
//     </div>
//   );
// };
// export default FractionInputApp;
