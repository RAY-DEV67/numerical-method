import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/spinner";
import Footer from "../components/footer";

const FractionInputApp = () => {
  const [groupData, setGroupData] = useState([
    { name: "Interpolation", numFractions: 0, fractions: [] },
    { name: "First Derivative Collocation", numFractions: 0, fractions: [] },
    { name: "Second Derivative Collocation", numFractions: 0, fractions: [] },
  ]);

  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'done', 'error'
  const [requestTime, setRequestTime] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots((prevDots) =>
          prevDots.length < 3 ? prevDots + "." : ""
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

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
      setLoading(true);
      setStatus("loading");
      setResponseMessage(null);

      const startTime = Date.now(); // Record request time
      setRequestTime(startTime);

      const apiUrl = "https://grant-89eg.onrender.com/api/v1/generate/";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const endTime = Date.now(); // Record response time
      setResponseTime(endTime);
      setElapsedTime((endTime - startTime) / 1000); // Calculate elapsed time in seconds

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === "error") {
        setStatus("error");
        alert(result.message);
      } else {
        setResponseMessage(result.results);
        setStatus("done");
        console.log(elapsedTime);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Function to convert response to LaTeX format
  const convertResponseToLaTeX = () => {
    if (!responseMessage) return "";
    return responseMessage.join("\n");
  };

  // Function to trigger LaTeX file download
  const downloadLaTeXFile = () => {
    const latexContent = convertResponseToLaTeX();
    const blob = new Blob([latexContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "response.tex";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MathJaxContext>
      <div>
        <div className=" min-h-[100vh] flex flex-col justify-start pt-[80px] px-[16px] items-start">
          <h1
            className={`${
              window.innerWidth < 1780
                ? "text-[5.5vw] md:text-[2vw]"
                : "text-[40px]"
            } font-semibold my-[16px] w-[80vw]`}
          >
            Numerical Method Generator App
          </h1>
          {groupData.map((group, groupIndex) => (
            <div className="mb-[24px]" key={groupIndex}>
              <h2>{group.name}</h2>
              <label>HOW MANY POINTS?</label>
              <input
                className="border border-[#00cc00] text-center h-10 w-10 mx-1 rounded-md"
                min="0"
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
              <div className="flex flex-row flex-wrap">
                {group.fractions.map((fraction, fractionIndex) => (
                  <div className="flex flex-row items-end">
                    <div
                      key={fractionIndex}
                      className="m-[8px] border border-[#00cc00] h-14 rounded-md w-[6vw] md:w-[25px] flex flex-col items-center"
                    >
                      <input
                        className="text-center text-[14px] w-[5.5vw] md:w-[23px] h-7 mx-1 rounded-md"
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
                      <span className="bg-black h-[1px] w-[6vw] md:w-[25px]">
                        {" "}
                      </span>

                      <input
                        className="text-center text-[14px] w-[5.5vw] md:w-[23px] h-7 mx-1 rounded-md"
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
                    <p>,</p>
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

          {loading && <div style={{ color: "red" }}>Loading{loadingDots}</div>}
          {status === "done" && <div style={{ color: "green" }}>Done!</div>}
          {status === "error" && (
            <div style={{ color: "red" }}>Error occurred!</div>
          )}

          {requestTime && (
            <div>
              Request Sent At: {new Date(requestTime).toLocaleTimeString()}
            </div>
          )}
          {responseTime && (
            <div>
              Response Received At:{" "}
              {new Date(responseTime).toLocaleTimeString()}
            </div>
          )}
          {elapsedTime !== null && <div>Time Taken: {elapsedTime} seconds</div>}

          {responseMessage && (
            <div>
              <h3>Response:</h3>
              {responseMessage.map((equation, index) => (
                <MathJax key={index}>
                  <div>{`\\(${equation}\\)`}</div>
                </MathJax>
              ))}
              {/* Download Button */}

              <Link
                onClick={downloadLaTeXFile}
                className={`${
                  window.innerWidth < 1780
                    ? "w-[50vw] md:w-[13vw]"
                    : "w-[200px]"
                } bg-[#013a19] my-[24px] text-white rounded-[20px] py-[8px] flex flex-col items-center justify-center`}
              >
                Download LaTeX File
              </Link>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </MathJaxContext>
  );
};

export default FractionInputApp;
