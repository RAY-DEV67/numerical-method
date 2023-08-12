// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserId } from "../App";

// export default function ProductsCard({ product, userId }) {
//   const navigate = useNavigate();

//   const limitedTitle =
//     product.title.length > 20
//       ? product.title.substring(0, 20) + "..."
//       : product.title;

//   const formatCur = function (value, locale, currency) {
//     return new Intl.NumberFormat(locale, {
//       style: "currency",
//       currency: currency,
//     }).format(value);
//   };

//   return (
//     <div className="flex flex-row items-center justify-center mb-[16px] ">
//       <div className="bg-white border border-[#00cc00] eventCard shadow-lg w-[30vw] md:w-[60vw] rounded-[10px] justify-center items-center">
//         <img
//           src={product.image1}
//           className=" rounded-[10px] object-contain w-[40vw] md:w-[15vw]"
//         />
//         <div className="p-[8px] w-[75vw] md:w-[45vw]">
//           <div className="flex-row flex justify-between items-center w-[58vw]">
//             <p className="mb-[8px] text-[3vw] md:text-[1.5vw]">
//             {formatCur(product.price, "en-NG", "NGN")}
//             </p>
//           </div>

//           <p className="mb-[8px] text-[3vw] md:text-[2vw] font-semibold w-[58vw]">
//             {limitedTitle}
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

export default function TopCard(props) {
  const { post } = props;
  return (
    <div className="topcard lg:w-[25vw] w-[45vw] border-y border-[#fc5810] rounded-[10px]">
      <div className="relative">
        <img
          src={post.image1}
          alt="Product"
          className="w-[44vw] h-[200px] object-contain rounded-[10px]"
          onClick={() => {
            // setProductsId(post.id);
            navigate(`/Buy/Products/${post.category}/${post.id}`);
            // setProducts("Top-Shoes");
          }}
        />
      </div>

      <div className="text-left mx-[0.5rem] mt-[0.5rem] flex justify-between">
        <h1 className="text-sm">{post.title}</h1>
      </div>

      
     
    </div>
  );
}
