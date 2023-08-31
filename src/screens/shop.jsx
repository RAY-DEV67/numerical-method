import { PaystackButton } from "react-paystack";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../../firebase";
import LoadingSpinner from "../components/spinner";
import ProductsCard from "../components/productsCard";
import {
  getDocs,
  collection,
  where,
  query,
  updateDoc,
} from "firebase/firestore";

function Shop() {
  const { userId } = useParams();
  const { userName } = useParams();
  const { email } = useParams();

  const [products, setProducts] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false);
  const [amount, setamount] = useState(0);

  useEffect(() => {
    setLoading(true);
    db.collection("Products")
      .where("userId", "==", userId)
      .get()
      .then((collections) => {
        const products = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id };
        });
        setProducts(products);
        setLoading(false);
      });
  }, [userId]);

  const buyPlugs = async (amountOfPlugs) => {
    const querySnapshot = await getDocs(
      query(collection(db, "Users"), where("userId", "==", userId))
    );
    if (!querySnapshot.empty) {
      const plugMeDoc = querySnapshot.docs.find(
        (doc) => doc.data().userId === userId
      );

      if (plugMeDoc) {
        const oldAvailablePlugs = plugMeDoc.data().availablePlugs;
        const newAvailablePlugs = oldAvailablePlugs + amountOfPlugs;

        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          updateDoc(userRef, {
            availablePlugs: newAvailablePlugs,
          });
        });

        console.log(`SuccessFul ${amountOfPlugs}`);
      } else {
        console.log("No matching document found");
      }
    }
  };

  const publicKey = "pk_test_1ab31e0238e828c92d25ba346af15aa620d4251e";

  const component15Props = {
    email,
    amount: 30000,
    metadata: {
      userName,
    },
    publicKey,
    text: <p className="text-center text-white">Buy 15 Plugs for #300.00 </p>,
    onSuccess: () => {
      buyPlugs(15);
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Wait!!!, don't go!!!!😢"),
  };

  const component30Props = {
    email,
    amount: 50000,
    metadata: {
      userName,
    },
    publicKey,
    text: <p className="text-center text-white">Buy 30 Plugs for #500.00 </p>,
    onSuccess: () => {
      buyPlugs(30);
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Wait!!!, don't go!!!!😢"),
  };

  const component50Props = {
    email,
    amount: 70000,
    metadata: {
      userName,
    },
    publicKey,
    text: <p className="text-center text-white">Buy 50 Plugs for #700.00 </p>,
    onSuccess: () => {
      buyPlugs(50);
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Wait!!!, don't go!!!!😢"),
  };

  return (
    <div className="bg-white textFont">
      <div
        className={`${
          window.innerWidth < 1780
            ? "pt-[18vw] md:pt-[10vw] pb-[4vw] md:pb-[2vw] md:text-[2vw]   w-[100vw] "
            : "pt-[0px] w-[1780px]"
        } fixed  lg:pb-[0px] font-semibold text-center py-[4px] text-white rounded-b-[30px]`}
      >
        <h1 className="lg:hidden headingFont text-[8vw]">
          <span class="magic">
            <span class="magic-text">UniPlug Shop</span>
          </span>
        </h1>
      </div>
      <h2
        className={`${
          window.innerWidth < 1780
            ? "pt-[28vw] md:pt-[18vw] lg:pt-[8vw] text-[4vw] md:text-[3vw] lg:text-[2vw] "
            : "pt-[150px] text-[50px]"
        } mx-[16px] lg:mx-[40px] font-semibold`}
      >
        Buy Plugs:
      </h2>
      <div
        className={`${
          window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
        } mb-[16px] flex flex-col items-center `}
      >
        <PaystackButton
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] md:w-[80vw] lg:w-[60vw]"
              : "w-[1000px]"
          } bg-[#013a19] cursor-pointer lg:py-[60px] md:py-[48px] py-[40px] mt-[16px] rounded-[20px]`}
          {...component15Props}
        />

        <PaystackButton
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] md:w-[80vw] lg:w-[60vw]"
              : "w-[1000px]"
          } bg-[#013a19] cursor-pointer lg:py-[60px] md:py-[48px] py-[40px] mt-[16px] rounded-[20px]`}
          {...component30Props}
        />

        <PaystackButton
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] md:w-[80vw] lg:w-[60vw]"
              : "w-[1000px]"
          } bg-[#013a19] cursor-pointer lg:py-[60px] md:py-[48px] py-[40px] mt-[16px] rounded-[20px]`}
          {...component50Props}
        />
      </div>

      <div className="mb-[16px] mt-[40px] mx-[16px]">
        <h2
          className={`${
            window.innerWidth < 1780
              ? "text-[4vw] md:text-[3vw] lg:text-[2vw]"
              : "text-[50px]"
          } mx-[16px] lg:mx-[40px] font-semibold`}

        >
          Boost Your Ads:
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      ) : null}

      {products.length == 0 && (
        <p className="text-center my-[16px] font-medium">
          You have not uploaded any product on uniplug😢
        </p>
      )}

      {products.map((post, index) => (
        <div key={index} className="w-[100vw] flex flex-row  items-center">
          <ProductsCard product={post} userId={userId} />
        </div>
      ))}
    </div>
  );
}

export default Shop;
