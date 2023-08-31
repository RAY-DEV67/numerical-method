import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserId } from "../App";

export default function EventsCard({ product }) {
  const navigate = useNavigate();
  const userId = useContext(UserId);

  const limitedTitle =
    product.eventName.length > 20
      ? product.eventName.substring(0, 20) + "..."
      : product.eventName;

  const limitedVenue =
    product.eventVenue.length > 40
      ? product.eventVenue.substring(0, 40) + "..."
      : product.eventVenue;

  const originalDateStr = product.startDate;

  // Function to convert date string to formatted date
  function formatDate(dateStr) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const [day, month, year] = dateStr.split("/").map(Number);
    const formattedDate = `${day} ${months[month - 1]}`;
    return formattedDate;
  }

  // Call the function with the original date string
  const formattedDate = formatDate(originalDateStr);
  const timePart = originalDateStr.substring(11);

  console.log(product.eventName);

  return (
    <div
      onClick={() => navigate(`/EventsDetails/${product.eventId}`)}
      className="flex flex-col textFont items-center justify-center mb-[16px] "
    >
      <div
        className={`${
          window.innerWidth < 1780 ? "w-[85vw] md:w-[60vw]" : "w-[1300px] py-[32px] mb-[16px]"
        } bg-white border border-[#00cc00] eventCard px-[8px] shadow-lg rounded-[10px] flex flex-row justify-center items-center `}
      >
        <img
          src={product.image1}
          className={`${
            window.innerWidth < 1780 ? "w-[20vw]  md:w-[10vw]" : "w-[300px]"
          } rounded-[10px] object-contain h-[100px]`}
        />
        <div
          className={`${
            window.innerWidth < 1780 ? "md:w-[45vw] w-[50vw]" : "w-[900px]"
          } p-[8px] ml-[16px] `}
        >
          <div
            className={`${
              window.innerWidth < 1780 ? " w-[58vw]" : "w-[800px]"
            } flex-row flex justify-between items-center`}
          >
            <p
              className={`${
                window.innerWidth < 1780
                  ? " text-[3vw] md:text-[1.5vw]"
                  : "text-[50px]"
              } mb-[8px]`}
            >
              {formattedDate} {timePart}
            </p>
          </div>

          <p
            className={`${
              window.innerWidth < 1780
                ? " text-[4vw] md:text-[2vw] lg:text-[1.5vw] w-[58vw]"
                : "text-[50px] w-[800px]"
            } mb-[8px] mb-[8px] font-semibold`}
          >
            {limitedTitle}
          </p>
          <div className="flex flex-row items-center mb-[8px] ">
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[4vw] md:text-[2vw] lg:text-[1.5vw] w-[58vw]"
                  : "text-[50px] w-[800px]"
              }`}
            >
              📍 {limitedVenue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
