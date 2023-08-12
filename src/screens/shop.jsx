import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../../firebase";
import LoadingSpinner from "../components/spinner";
import EventsCard from "../components/eventsCard";
// import ProductsCard, { EcommerceCard } from "../components/productsCard";
import TopCard from "../components/productsCard";

function Shop() {
  const { userId } = useParams();

  const [products, setProducts] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="bg-white">
      <h1 className="md:text-[2vw] fixed pt-[15vw] md:pt-[6vw] pb-[4vw] md:pb-[2vw] font-semibold bg-[#013a19] w-[100vw] text-center py-[4px] text-white rounded-b-[30px]">
        UniPlug Shop
      </h1>
      <div className="pt-[25vw] flex flex-col items-center">
        <h2>Boost Your Ads</h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      ) : null}

      {/* {products.map((post, index) => (
        <div key={index} className="w-[100vw] bg-red-300 flex flex-row  items-center">
          <ProductsCard product={post} userId={userId}/>
        </div>
      ))} */}

      {products.map((post, index) => {
        return (
          <div key={index} className="flex flex-row bg-blue-200">
            <div className="bg-red-300 my-[16px]">
                <p>{post.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Shop;
