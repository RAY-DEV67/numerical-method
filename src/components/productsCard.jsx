import { db } from "../../firebase";
import GenerateTransactionRef from "../helper/generateTransactionRef";

export default function ProductsCard({ product, email, userName }) {
  const updateSubscriptionEndDate = () => {
    // Get the current date
    const currentDate = new Date();

    // Calculate the new subscription end date by adding 1 month
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);

    // Handle cases where the new date doesn't exist (e.g., February 30th)
    if (currentDate.getDate() !== newDate.getDate()) {
      // Adjust to the last day of the previous month
      newDate.setDate(0);
    }

    db.collection("Products")
      .doc(product.id) // Use the appropriate document ID
      .update({ subscriptionEndDate: newDate, notTop: false })
      .then(() => {
        // console.log("Subscription end date updated successfully");
      })
      .catch((error) => {
        // console.error("Error updating subscription end date:", error);
      });
  };

  function makePayment() {
    // Generate a new tx_ref
    const tx_ref = GenerateTransactionRef();

    FlutterwaveCheckout({
      public_key: "FLWPUBK-7e5a1a39e720ebaf3aed7425ead32e6f-X",
      tx_ref: tx_ref,
      amount: 3000,
      currency: "NGN",
      payment_options: "card, mobilemoneyghana, ussd",
      customer: {
        email: email,
        name: userName,
      },
      callback: function (payment) {
        updateSubscriptionEndDate();
      },
    });
  }

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
    <div
      className={`${
        window.innerWidth < 1780 ? " w-[100vw]" : "w-[1780px]"
      } flex flex-row items-center justify-center mb-[16px] textFont`}
    >
      <div
        className={`${
          window.innerWidth < 1780
            ? "w-[85vw]  md:w-[70vw] lg:w-[60vw]"
            : "w-[1000px]"
        } bg-white flex flex-row  py-[8px] border border-[#00cc00] eventCard shadow-lg  rounded-[10px] justify-center items-center`}
      >
        <img
          src={product.image1}
          className={`${
            window.innerWidth < 1780
              ? "md:w-[15vw] lg:w-[10vw]  w-[20vw] "
              : "w-[300px]"
          }  rounded-[10px] object-contain`}
        />
        <div
          className={`${
            window.innerWidth < 1780 ? "md:w-[45vw] w-[50vw]" : "w-[750px]"
          } p-[8px] ml-[16px] `}
        >
          <div
            className={`${
              window.innerWidth < 1780 ? "w-[58vw]" : "w-[950px]"
            } flex-row flex justify-between items-center `}
          >
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[3vw] md:text-[1.5vw]"
                  : "text-[30px]"
              } mb-[8px] `}
            >
              {formatCur(product.price, "en-NG", "NGN")}
            </p>
          </div>

          <p
            className={`${
              window.innerWidth < 1780
                ? "text-[3vw] md:text-[2vw] w-[58vw]"
                : "text-[40px] w-[950px]"
            } mb-[8px] font-semibold`}
          >
            {limitedTitle}
          </p>

          <div
            onClick={makePayment}
            className="bg-[#013a19] w-[150px] py-[4px] rounded-[20px]"
          >
            <p className="text-center text-white text-[3vw] md:text-[2vw]">
              Boost Ad ⚡
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
