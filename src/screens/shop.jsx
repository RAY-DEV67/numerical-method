import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../../firebase";
import LoadingSpinner from "../components/spinner";
import ProductsCard from "../components/productsCard";

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

      <div className="pt-[25vw] mb-[16px] mx-[16px]">
        <h2 className="text-[4vw] font-semibold">Buy Plugs:</h2>
        <div className="bg-[#013a19] py-[32px] mt-[16px] rounded-[20px]">
          <p className="text-center text-white">Buy 15 Plugs for #300.00 </p>
        </div>
        <div className="bg-[#013a19] py-[32px] mt-[16px] rounded-[20px]">
          <p className="text-center text-white">Buy 30 Plugs for #500.00 </p>
        </div>
        <div className="bg-[#013a19] py-[32px] mt-[16px] rounded-[20px]">
          <p className="text-center text-white">Buy 50 Plugs for #700.00 </p>
        </div>
      </div>

      <div className="mb-[16px] mx-[16px]">
        <h2 className="text-[4vw] font-semibold">Boost Your Ads</h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center">
          <LoadingSpinner />
        </div>
      ) : null}

      {products.map((post, index) => (
        <div
          key={index}
          className="w-[100vw] flex flex-row  items-center"
        >
          <ProductsCard product={post} userId={userId} />
        </div>
      ))}
    </div>
  );
}

export default Shop;
