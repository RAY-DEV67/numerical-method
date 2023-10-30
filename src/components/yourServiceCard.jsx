import { useState } from "react";
import db from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, deleteDoc } from "firebase/firestore";
import ConfirmationModal from "./confirmationModal";

export default function YourServicesCard({ product }) {
  const [loading, setloading] = useState();
  const [showModal, setshowModal] = useState(false);

  const deleteService = async () => {
    setshowModal(false);
    try {
      const userRef = doc(db, "Services", product.id);
      await deleteDoc(userRef);

      toast("Deleted Successfully🙌🙌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };

  const limitedTitle =
    product.description.length > 50
      ? product.description.substring(0, 50) + "..."
      : product.description;

  return (
    <div
      className={`${
        window.innerWidth < 1780 ? " w-[100vw]" : "w-[1780px]"
      } flex flex-row items-center justify-center mb-[16px] textFont`}
    >
      <div
        className={`${
          window.innerWidth < 1780
            ? "w-[85vw]  md:w-[70vw] lg:w-[60vw]"
            : "w-[1000px]"
        } bg-white flex flex-row  py-[8px] border border-[#00cc00] eventCard shadow-lg  rounded-[10px] justify-center items-center`}
      >
        <img
          src={product.image1}
          className={`${
            window.innerWidth < 1780
              ? "md:w-[15vw] lg:w-[10vw]  w-[20vw] "
              : "w-[300px]"
          }  rounded-[10px] object-contain`}
        />
        <div
          className={`${
            window.innerWidth < 1780 ? "md:w-[45vw] w-[50vw]" : "w-[750px]"
          } p-[8px] ml-[16px] `}
        >
          <div
            className={`${
              window.innerWidth < 1780 ? "w-[58vw]" : "w-[950px]"
            } flex-row flex justify-between items-center `}
          >
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[1.5vw]"
                  : "text-[30px]"
              } mb-[8px] `}
            >
              {product.price}
            </p>
          </div>

          <p
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[1.5vw] w-[50vw]"
                : "text-[40px] w-[950px]"
            } mb-[8px] font-semibold`}
          >
            {limitedTitle}
          </p>

          <div
            onClick={() => {
              setshowModal(true);
            }}
            className="bg-red-800 w-[130px] py-[4px] rounded-[20px]"
          >
            <p className="flex flex-col items-center text-white text-[3vw] md:text-[1vw]">
              Delete Service
            </p>
          </div>
        </div>
      </div>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setshowModal}
        type="Service"
        deleteProduct={deleteService}
      />
    </div>
  );
}
