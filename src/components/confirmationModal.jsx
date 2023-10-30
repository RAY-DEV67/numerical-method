import React, { useState, useEffect, useContext } from "react";
import { UserId } from "../App";
import { Link } from "react-router-dom";

const ConfirmationModal = ({
  showModal,
  setShowModal,
  type,
  deleteProduct,
}) => {
  const userId = useContext(UserId);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-80 transition-opacity"></div>

          <div className="fixed top-[20%] left-[10%] inset-0 flex items-center w-[80vw] h-[60vh] justify-center z-50">
            <div className="modal bg-white p-4 rounded-lg shadow-md transition-opacity">
              <div className="flex flex-col items-center">
                <h2 className="mb-4">
                  Are You Sure You Want To Delete This {type} 😢
                </h2>
                <div className="flex flex-row justify-between w-[70%]">
                  <p
                    onClick={deleteProduct}
                    className={`w-[100px] bg-[#013a19] flex flex-col items-center justify-center text-white  mt-[16px] rounded-[20px] py-[8px]`}
                  >
                    Yes
                  </p>
                  <p
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className={`w-[100px] bg-red-800 flex flex-col items-center justify-center text-white  mt-[16px] rounded-[20px] py-[8px]`}
                  >
                    No
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
