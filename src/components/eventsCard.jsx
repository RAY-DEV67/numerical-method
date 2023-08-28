import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserId } from "../App";

export default function EventsCard({ product }) {
  const navigate = useNavigate();
  const userId = useContext(UserId)

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
      <div className="bg-white border border-[#00cc00] eventCard px-[8px] shadow-lg w-[85vw] md:w-[60vw] rounded-[10px] flex flex-row justify-center items-center">
        <img
          src={product.image1}
          className=" rounded-[10px] object-contain w-[20vw] h-[100px] md:w-[10vw]"
        />
        <div className="p-[8px] w-[50vw] ml-[16px] md:w-[45vw]">
          <div className="flex-row flex justify-between items-center w-[58vw]">
            <p className="mb-[8px] text-[3vw] md:text-[1.5vw] lg:text-[16px]">
              {formattedDate} {timePart}
            </p>
          </div>

          <p className="mb-[8px] text-[4vw] md:text-[2vw] lg:text-[1.5vw] font-semibold w-[58vw]">
            {limitedTitle}
          </p>
          <div className="flex flex-row items-center mb-[8px] ">
            <p className=" text-[4vw] md:text-[2vw] lg:text-[1.5vw] w-[58vw]">
              📍 {limitedVenue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// const styles = StyleSheet.create({
//   card: {
//     elevation: 5, // Adjust the elevation value to control the intensity of the box shadow
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 4,
//   },
// });
