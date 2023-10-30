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
import YourProductsCard from "../components/yourProductsCard";

function YourProducts() {
  const { userId } = useParams();

  const [products, setProducts] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const productsRef = db.collection("Products");
    const queryRef = productsRef.where("userId", "==", userId);

    const unsubscribe = queryRef.onSnapshot((querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(products);
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
            <span class="magic-text">Your Products</span>
          </span>
        </h1>
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
          <YourProductsCard product={post} userId={userId} />
        </div>
      ))}
    </div>
  );
}

export default YourProducts;
