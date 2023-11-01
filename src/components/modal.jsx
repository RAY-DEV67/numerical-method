import React, { useState, useEffect, useContext } from "react";
import { NavigateTo } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useUserDetailsContext } from "../context/userDetails";

const Modal = ({ showModal, setShowModal, image, text, ctaText }) => {
  const { university } = useUserDetailsContext();
  const { setnavigateTo } = useContext(NavigateTo);
  const navigate = useNavigate();

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-80 transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="fixed top-[20%] left-[10%] inset-0 flex items-center w-[80vw] h-[60vh] justify-center z-50">
            <div className="modal bg-white p-4 rounded-lg shadow-md transition-opacity">
              <span
                className="modal-close text-[4vw] md:text-[2vw] bg-white rounded-full absolute mt-[8px] right-5 px-4 py-2 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <div className="flex flex-col items-center">
                <img src={image} alt="Image" />

                <h2 className="mb-4 mt-[16px] text-center">{text}</h2>
                {ctaText === "Share Gist" && (
                  <Link
                    onClick={() => {
                      setnavigateTo("/ShareGist");
                    }}
                    to={university == "" ? "/Login" : "/ShareGist"}
                    className={`${
                      window.innerWidth < 1780
                        ? "w-[50vw] md:w-[13vw]"
                        : "w-[500px]"
                    } bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[16px] rounded-[20px] py-[8px]`}
                  >
                    {ctaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
