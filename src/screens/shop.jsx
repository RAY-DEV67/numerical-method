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
import GenerateTransactionRef from "../helper/generateTransactionRef";

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

  function makePayment(num, amount) {
    // Generate a new tx_ref
    const tx_ref = GenerateTransactionRef();

    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-cebf85e05f6ff0c8d7d41d8cb00bc8c7-X",
      tx_ref: tx_ref,
      amount: amount,
      currency: "NGN",
      payment_options: "card, mobilemoneyghana, ussd",
      customer: {
        email: email,
        name: userName,
      },
      callback: function (payment) {
        buyPlugs(num);
      },
    });
  }

  return (
    <div className="bg-white textFont">
      <div
        className={`${
          window.innerWidth < 1780
            ? "pt-[18vw] md:pt-[10vw] pb-[4vw] md:pb-[2vw] md:text-[2vw]   w-[100vw] "
            : "pt-[0px] w-[1780px]"
        } lg:pb-[0px] font-semibold text-center py-[4px] text-white rounded-b-[30px]`}
      >
        <h1 className="lg:hidden headingFont text-[5vw]">
          <span class="magic">
            <span class="magic-text">UniPlug Shop</span>
          </span>
        </h1>
      </div>
      <h2
        className={`${
          window.innerWidth < 1780
            ? "text-[4vw] md:text-[3vw] lg:text-[2vw] "
            : "text-[50px]"
        } mx-[16px] lg:mx-[40px] font-semibold`}
      >
        Buy Plugs:
      </h2>
      <p className="mx-[16px]">
        Buy plugs to chat and connect with users on UniPlug
      </p>
      <div
        className={`${
          window.innerWidth < 1780 ? "w-[100vw]" : "w-[1780px]"
        } mb-[16px] flex flex-col items-center `}
      >
        <div
          onClick={() => {
            makePayment(15, 300);
          }}
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] md:w-[80vw] lg:w-[60vw]"
              : "w-[1000px]"
          } bg-[#013a19] cursor-pointer lg:py-[60px] text-white text-center md:py-[48px] py-[40px] mt-[16px] rounded-[20px]`}
        >
          Buy 15 Plugs for #300.00
        </div>

        <div
          onClick={() => {
            makePayment(30, 500);
          }}
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] md:w-[80vw] lg:w-[60vw]"
              : "w-[1000px]"
          } bg-[#013a19] cursor-pointer lg:py-[60px] text-white text-center md:py-[48px] py-[40px] mt-[16px] rounded-[20px]`}
        >
          Buy 30 Plugs for #500.00
        </div>

        <div
          onClick={() => {
            makePayment(50, 700);
          }}
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] md:w-[80vw] lg:w-[60vw]"
              : "w-[1000px]"
          } bg-[#013a19] cursor-pointer lg:py-[60px] text-white text-center md:py-[48px] py-[40px] mt-[16px] rounded-[20px]`}
        >
          Buy 50 Plugs for #700.00
        </div>
      </div>

      <div className="mb-[16px] mt-[40px] mx-[16px]">
        <h2
          className={`${
            window.innerWidth < 1780
              ? "text-[4vw] md:text-[3vw] lg:text-[2vw]"
              : "text-[50px]"
          } lg:mx-[40px] font-semibold`}
        >
          Boost Your Ads:
        </h2>
        <p>
          Boost your ads and get your products in front of more users with
          guaranteed sales for just #3,000 Monthly
        </p>
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
          <ProductsCard
            product={post}
            userId={userId}
            email={email}
            userName={userName}
          />
        </div>
      ))}
    </div>
  );
}

export default Shop;
