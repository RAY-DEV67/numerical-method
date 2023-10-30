import React, { useState, useEffect, useContext } from "react";
import { UserId } from "../App";
import { Link } from "react-router-dom";

const Modal = () => {
  const userId = useContext(UserId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show the modal after 3 seconds
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-80 transition-opacity"></div>

          <div className="fixed top-[20%] left-[10%] inset-0 flex items-center w-[80vw] h-[60vh] justify-center z-50">
            <div className="modal bg-white p-4 rounded-lg shadow-md transition-opacity">
              <span
                className="modal-close text-[4vw] bg-white rounded-full absolute top-0 right-0 px-4 py-2 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <div className="flex flex-col items-center">
                <h2 className="mb-4">
                  Share your funniest/craziest campus experience and stand a
                  chance of winning #5,000 weekly!!! 🎉🥳
                </h2>
                <Link
                  to={userId == "" ? "/Login" : "ShareGist"}
                  className={`${
                    window.innerWidth < 1780
                      ? "w-[50vw] md:w-[13vw]"
                      : "w-[500px]"
                  } bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[16px] rounded-[20px] py-[8px]`}
                >
                  Share Gist
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
