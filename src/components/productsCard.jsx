import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserId } from "../App";

export default function ProductsCard({ product, userId }) {
  const navigate = useNavigate();

  const limitedTitle =
    product.title.length > 50
      ? product.title.substring(0, 50) + "..."
      : product.title;

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return (
    <div className="flex flex-row items-center justify-center w-[100vw] mb-[16px] textFont">
      <div className="bg-white flex flex-row w-[85vw] py-[8px] border border-[#00cc00] eventCard shadow-lg md:w-[70vw] lg:w-[60vw] rounded-[10px] justify-center items-center">
        <img
          src={product.image1}
          className=" rounded-[10px] object-contain w-[20vw] h-[100px] md:w-[15vw] lg:w-[10vw]"
        />
        <div className="p-[8px] w-[50vw] ml-[16px] md:w-[45vw]">
          <div className="flex-row flex justify-between items-center w-[58vw]">
            <p className="mb-[8px] text-[3vw] md:text-[1.5vw]">
              {formatCur(product.price, "en-NG", "NGN")}
            </p>
          </div>

          <p className="mb-[8px] text-[3vw] md:text-[2vw] font-semibold w-[58vw]">
            {limitedTitle}
          </p>

          <div className="bg-[#013a19] w-[150px] py-[4px] rounded-[20px]">
            <p className="text-center text-white">Boost Ad ⚡</p>
          </div>
        </div>
      </div>
    </div>
  );
}
