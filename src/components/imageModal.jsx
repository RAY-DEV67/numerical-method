import React from "react";
import Modal from "react-modal";

// Set the app element for accessibility (only needed once)
Modal.setAppElement("#root");

const ImageModal = ({ isOpen, imageUrl, onClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    overlayClassName="modal-overlay"
    className="modal-content"
  >
    <div className="flex flex-col items-center bg-white h-[430px] md:h-[450px] overflow-y-auto p-4 rounded-lg">
      <h1
        className={`${
          window.innerWidth < 1780 ? "text-[4vw] md:text-[2vw]" : "text-[40px]"
        } font-semibold mb-[16px]`}
      >
        Stability Region
      </h1>
      <img
        src={imageUrl}
        alt="Generated"
        className="max-w-full max-h-[300px] object-contain"
      />
      <button
        onClick={onClose}
        className="bg-red-500 text-white mt-4 px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  </Modal>
);

export default ImageModal;
