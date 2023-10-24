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
import { UserState } from "../App";
import EventsCard from "../components/eventsCard";
import LoadingSpinner from "../components/spinner";

function Events() {
  const state = useContext(UserState);
  console.log(state);

  const [events, setEvents] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    db.collection("Events")
      .where("status", "==", "Active")
      .get()
      .then((collections) => {
        const events = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id };
        });
        setEvents(events);
        setloading(false);
      });
  }, [state]);

  return (
    <div className="bg-white textFont">
      <div
        className={`${
          window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
        } events h-[50vh] rounded-b-[30px] flex flex-col justify-end`}
      >
        <div
          className={`${
            window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
          } bg-black opacity-60 rounded-b-[30px]  h-[100%] -z-2 absolute`}
        ></div>
        <p
          className={`${
            window.innerWidth < 1780
              ? "leading-[6vw] md:leading-[4vw] text-[5vw] md:text-[4vw] lg:text-[3.5vw]"
              : "text-[70px] leading-[70px]"
          } text-white mb-[32px] headingFont relative mx-[16px]  font-semibold w-[60%] md:w-[40%]`}
        >
          Discover Amazing Events Around You!!!🎉
        </p>
      </div>

      <div className="m-[16px]">
        <p
          className={`${
            window.innerWidth < 1780
              ? "text-[5vw] lg:text-[2vw] md:text-[3vw]"
              : "text-[50px]"
          } text-[#013a19] headingFont`}
        >
          Upcoming Events:
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      ) : null}

      {events.map((post, index) => {
        return (
          <div
            key={index}
            className={`${
              window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
            } flex flex-col items-center`}
          >
            <EventsCard product={post} />
          </div>
        );
      })}
    </div>
  );
}

export default Events;
