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
      .where("state", "==", state)
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
    <div className="bg-white">
      <div className="events w-[100vw] h-[50vh] rounded-b-[30px] flex flex-col justify-end ">
        <div className="bg-black opacity-60 rounded-b-[30px] w-[100vw] h-[100%] -z-2 absolute"></div>
        <p className="text-white mb-[32px] relative mx-[16px] text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-semibold w-[60%] md:w-[40%] ">
          Discover Amazing Events Around You!!!🎉
        </p>
      </div>

      <div className="m-[16px]">
        <p className="text-[4vw] text-black lg:text-[2vw] md:text-[3vw]">Upcoming Events:</p>
      </div>

      {loading ? <div className="flex flex-col items-center">
        <LoadingSpinner />
      </div> : null}

      {events.map((post, index) => {
        return (
          <div
            key={index}
            className="w-[100vw] flex flex-col items-center"
          >
            <EventsCard product={post} />
          </div>
        );
      })}
    </div>
  );
}

export default Events;
