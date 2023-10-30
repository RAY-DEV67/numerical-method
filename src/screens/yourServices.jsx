import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../../firebase";
import LoadingSpinner from "../components/spinner";
import YourServicesCard from "../components/yourServiceCard";

function YourServices() {
  const { userId } = useParams();

  const [services, setservices] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const servicesRef = db.collection("Services");
    const queryRef = servicesRef.where("userId", "==", userId);

    const unsubscribe = queryRef.onSnapshot((querySnapshot) => {
      const services = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setservices(services);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return (
    <div>
      <div
        className={`${
          window.innerWidth < 1780
            ? "pt-[18vw] md:pt-[10vw] pb-[4vw] md:pb-[2vw] md:text-[2vw]   w-[100vw] "
            : "pt-[0px] w-[1780px]"
        } lg:pb-[0px] font-semibold text-center py-[4px] text-white rounded-b-[30px]`}
      >
        <h1 className="lg:hidden headingFont text-[5vw]">
          <span class="magic">
            <span class="magic-text">Your Services</span>
          </span>
        </h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      ) : null}

      {services.length == 0 && (
        <p className="text-center my-[16px] font-medium">
          You have not uploaded any service on uniplug😢
        </p>
      )}

      {services.map((post, index) => (
        <div key={index} className="w-[100vw] flex flex-row  items-center">
          <YourServicesCard product={post} userId={userId} />
        </div>
      ))}
    </div>
  );
}

export default YourServices;
