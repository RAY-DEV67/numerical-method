import { useContext, useEffect, useState } from "react";
import db from "../../firebase";
import {
  getDocs,
  collection,
  doc,
  where,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { UserId, UserState } from "../App";
import EventsCard from "../components/eventsCard";
import LoadingSpinner from "../components/spinner";
import { useNavigate, useParams } from "react-router-dom";

function EventsDetails() {
  const { eventId } = useParams();
  const userId = useContext(UserId);
  const navigate = useNavigate();

  const [event, setEvent] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    db.collection("Events")
      .where("eventId", "==", eventId)
      .get()
      .then((collections) => {
        const events = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id };
        });
        setEvent(events[0]);
        setloading(false);
      });
  }, [eventId]);

  const handleBuyTicketClick = () => {
    const ticketProps = event;
    if (userId) {
      navigate(`/BuyTickets/${userId}`, { state: ticketProps });
    } else {
      navigate("/Login");
    }
  };
  if (!event.image1) {
    return (
      <div className="flex flex-col items-center bg-transparent">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-white textFont">
      <div>
        <img src={event.image1} className="rounded-b-[30px] sm:hidden" />
        <div className="w-[100vw] h-[65vh] md:h-[80vh] eventCard hidden sm:flex flex-col items-center justify-center">
          <img
            src={event.image1}
            className="rounded-[30px] sm:w-[60vw] sm:h-[60vw] md:w-[50vw] md:h-[50vw] lg:w-[40vw] lg:h-[40vw] mt-[-20px]"
          />
        </div>
        <div className="mx-[16px] pb-[32px] mt-[16px]">
          <h2 className="text-[6vw] font-semibold md:text-[3vw] lg:text-[2vw] sm:text-[4vw]">
            {event.eventName}
          </h2>
          <p className="flex flex-row items-center font-semibold">
            Event Starts By :{" "}
            <p className="ml-[4px] font-normal">{event.startDate}</p>
          </p>
          <p className="flex flex-row items-center font-semibold">
            Event Ends By :{" "}
            <p className="ml-[4px] font-normal">{event.endDate}</p>
          </p>
          <p className=" text-[4vw] md:text-[1.5vw] lg:text-[16px] sm:text-[2.5vw] w-[58vw]">
            📍 {event.eventVenue}
          </p>
          <h3 className="mt-[16px] text-[5vw] font-semibold md:text-[3vw] lg:text-[2vw] sm:text-[4vw]">
            Description:
          </h3>
          <p>{event.eventDescription}</p>

          <button
            onClick={handleBuyTicketClick}
            className="bg-[#013a19] flex flex-col items-center justify-center text-white w-[50vw] md:w-[30vw] lg:w-[20vw] mt-[16px] rounded-[20px] py-[8px]"
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsDetails;
