import { PaystackButton } from "react-paystack";
import { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getDoc,
  query,
  collection,
  where,
  addDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import db from "../../firebase";
import GenerateTransactionRef from "../helper/generateTransactionRef";
import Input from "../components/input";

function BuyTickets() {
  const location = useLocation();
  const { userId } = useParams();

  const [totalQuantity, settotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketInformation, setTicketInformation] = useState([]);
  const [purchaseError, setpurchaseError] = useState("");
  const [name, setname] = useState("");
  const [nameError, setnameError] = useState("");
  const [email, setemail] = useState("");
  const [emailError, setemailError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  // Access the props passed through the navigate function
  const ticketProps = location.state;

  // Function to update the quantity for a specific ticket
  const updateTicketQuantity = (ticketIndex, quantity) => {
    setTicketInformation((prevInformation) => {
      const newInformation = [...prevInformation];
      newInformation[ticketIndex] = {
        name: ticketProps.tickets[ticketIndex].name,
        quantity: parseInt(quantity) || 0,
        availableQuantity: ticketProps.tickets[ticketIndex].quantity,
      };
      console.log(ticketInformation);
      return newInformation;
    });
  };

  // Calculate the total price whenever the ticket information changes
  useEffect(() => {
    let total = 0;
    ticketInformation.forEach((ticket) => {
      const ticketPrice = ticketProps.tickets.find(
        (t) => t.name === ticket.name
      ).price;
      total += ticketPrice * ticket.quantity;
    });
    setTotalPrice(total);
  }, [ticketInformation, ticketProps.tickets]);

  useEffect(() => {
    let total = 0;
    console.log("Ticketx", ticketInformation);
    ticketInformation.forEach((ticket) => {
      const ticketAvailableQuantity = ticketProps.tickets.find(
        (t) => t.name === ticket.name
      ).quantity;
      total += ticketAvailableQuantity - ticket.quantity;
    });
    settotalQuantity(total);
  }, [ticketInformation, ticketProps.tickets]);

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const OrdersDocRef = collection(db, "EventTickets");

  const addPurchasedTicket = async () => {
    try {
      const newDoc = await addDoc(OrdersDocRef, {
        userId: userId,
        eventId: ticketProps.eventId,
        postId: ticketProps.id,
        image1: ticketProps.image1,
        eventName: ticketProps.eventName,
        ticketInformation: ticketInformation,
        totalPrice: totalPrice,
        category: ticketProps.category,
        hostUserId: ticketProps.userId,
        venue: ticketProps.eventVenue,
        startDate: ticketProps.startDate,
        endDate: ticketProps.endDate,
        state: ticketProps.state,
        hostPhoneNumber: ticketProps.hostPhoneNumber,
        customerName: name,
        customerPhoneNumber: phoneNumber,
        timestamp: new Date(),
        searchKeywords: `${name.toLowerCase()}`.split(" "),
      });

      console.log("order Added");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(ticketProps.id);

  const deductAvailableQuantity = async () => {
    try {
      // Fetch the document from the Events collection
      const eventDocRef = doc(db, "Events", ticketProps.id);
      const eventDocSnapshot = await getDoc(eventDocRef);

      if (eventDocSnapshot.exists()) {
        const eventDocData = eventDocSnapshot.data();
        const eventTickets = eventDocData.tickets;

        console.log("eventTickets:", eventTickets); // Log eventTickets to check its content

        // Update the availableQuantity for each ticket based on the ordered quantity
        ticketInformation.forEach((ticket) => {
          const orderedQuantity = ticket.quantity;
          const correspondingTicket = eventTickets.find(
            (t) => t.name === ticket.name
          );

          if (correspondingTicket) {
            const previousQuantity = correspondingTicket.quantity || 0;
            const newQuantity = previousQuantity - orderedQuantity;

            // Update the ticket's availableQuantity
            correspondingTicket.quantity = newQuantity;
            correspondingTicket.ticketsPurchased =
              (correspondingTicket.ticketsPurchased || 0) + orderedQuantity;
          }
        });

        console.log("Updated eventTickets:", eventTickets); // Log updated eventTickets
        // Update the Events document with the modified tickets
        await updateDoc(eventDocRef, {
          tickets: eventTickets,
        });
      } else {
        console.log("No matching document found for the clicked item");
      }
    } catch (err) {
      console.error("Error updating document:", err);
    }

    const querySnapshot = await getDocs(
      query(collection(db, "Users"), where("userId", "==", ticketProps.userId))
    );
    if (!querySnapshot.empty) {
      const plugMeDoc = querySnapshot.docs.find(
        (doc) => doc.data().userId === ticketProps.userId
      );

      if (plugMeDoc) {
        const oldTotalEventsRevenue = plugMeDoc.data().totalTicketsRevenue;
        const newTicketsRevenue = oldTotalEventsRevenue + totalPrice;

        querySnapshot.forEach((doc) => {
          const userRef = doc.ref;
          updateDoc(userRef, {
            totalTicketsRevenue: newTicketsRevenue,
          });
        });
        console.log("Update Successful");
      } else {
        console.log("No matching document found");
      }
    } else {
      console.log("No matching document found for the clicked item");
    }
  };

  const hasQuantityGreaterThan5 = ticketInformation
    .map((obj) => obj.quantity > 5)
    .some(Boolean);

  const hasQuantityGreaterThan = ticketInformation
    .map((obj) => obj.quantity > obj.availableQuantity)
    .some(Boolean);

  useEffect(() => {
    setpurchaseError("");
    console.log(hasQuantityGreaterThan);
    console.log(hasQuantityGreaterThan5);

    if (hasQuantityGreaterThan5) {
      setpurchaseError("Please Select a valid quantity");
      return;
    }
    if (hasQuantityGreaterThan) {
      setpurchaseError("Quantity is more than Available Quantity");
      return;
    }
    if (totalPrice === 0) {
      setpurchaseError("Please Enter Quantity");
      return;
    }
    if (name === "") {
      setpurchaseError("Please Enter Your Name");
      return;
    }
    if (email === "") {
      setpurchaseError("Please Enter Your Email");
      return;
    }
  }, [ticketInformation, name, email, totalPrice]);

  function makePayment(amount) {
    // Generate a new tx_ref
    const tx_ref = GenerateTransactionRef();

    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-cebf85e05f6ff0c8d7d41d8cb00bc8c7-X",
      tx_ref: tx_ref,
      amount: totalPrice,
      currency: "NGN",
      payment_options: "card, mobilemoneyghana, ussd",
      customer: {
        email: email,
        name: name,
      },
      callback: function () {
        addPurchasedTicket();
        deductAvailableQuantity();
      },
    });
  }

  return (
    <div className="textFont">
      <div>
        <h1 className="lg:hidden headingFont text-[4vw] mx-[16px] pt-[20vw] md:mt-[10vw]">
          <span class="magic">
            <span class="magic-text text-center">Choose Your Ticket</span>
          </span>
        </h1>

        <div
          className={`${
            window.innerWidth < 1780
              ? "w-[90vw] lg:mt-[10vw] mt-[24px]"
              : "w-[1780px] mt-[150px]"
          } items-center justify-center flex flex-col px-[1rem] pb-[2.5rem]`}
        >
          <div
            className={`${
              window.innerWidth < 1780
                ? "w-[80vw] md:w-[70vw] lg:w-[40vw]"
                : "w-[700px]"
            } eventCard p-[16px] mt-[16px] rounded-[10px] shadow-lg `}
          >
            <p
              className={`${
                window.innerWidth < 1780
                  ? "text-[5vw] md:text-[3vw] lg:text-[2vw] "
                  : "text-[50px]"
              } font-semibold`}
            >
              {ticketProps.eventName}
            </p>
            <p className={`${window.innerWidth > 1780 && "text-[40px]"}`}>
              {ticketProps.startDate}
            </p>
          </div>
        </div>

        {ticketProps.tickets.map((ticket, index) => {
          const ticketInfo = ticketInformation.find(
            (t) => t.name === ticket.name
          );
          const ticketQuantity = ticketInfo ? ticketInfo.quantity : 0;
          const ticketTotalPrice = ticket.price * ticketQuantity;

          return (
            <div className="flex flex-col items-center">
              <div
                key={index}
                className={`${
                  window.innerWidth < 1780
                    ? "w-[85vw] md:w-[70vw] lg:w-[60vw] "
                    : "width-[1300px]"
                } flex-row  flex justify-between items-center p-[16px] border border-green-800 rounded-[20px] m-[16px]`}
              >
                <div className="">
                  <p
                    className={`${
                      window.innerWidth < 1780
                        ? "text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw]"
                        : "text-[35px]"
                    } mb-[0.5vh]`}
                  >
                    Ticket Name: {ticket.name}
                  </p>
                  <p
                    className={`${
                      window.innerWidth < 1780
                        ? "text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw]"
                        : "text-[35px]"
                    } mb-[0.5vh]`}
                  >
                    Price per ticket: {formatCur(ticket.price, "en-NG", "NGN")}
                  </p>
                  <p
                    className={`${
                      window.innerWidth < 1780
                        ? "text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw]"
                        : "text-[35px]"
                    } mb-[0.5vh]`}
                  >
                    Purchase Limit: {ticket.purchaseLimit}
                  </p>
                  <p
                    className={`${
                      window.innerWidth < 1780
                        ? "text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw]"
                        : "text-[35px]"
                    } mb-[0.5vh]`}
                  >
                    Tickets Available: {ticket.quantity}
                  </p>
                  <p
                    className={`${
                      window.innerWidth < 1780
                        ? "text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw]"
                        : "text-[35px]"
                    } mb-[0.5vh]`}
                  >
                    Quantity Ordered: {ticketQuantity}
                  </p>
                  <p
                    className={`${
                      window.innerWidth < 1780
                        ? "text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw]"
                        : "text-[35px]"
                    } mb-[0.5vh]`}
                  >
                    Total Price: {formatCur(ticketTotalPrice, "en-NG", "NGN")}
                  </p>
                </div>
                <input
                  className={`${
                    window.innerWidth < 1780 ? "w-[30vw] " : "w-[300px]"
                  } pr-[16px] pl-[8px] py-[16px] border rounded border-[#00cc00] mb-[8px]`}
                  placeholder={`Quantity, max-${ticket.purchaseLimit}`}
                  onChange={(text) =>
                    updateTicketQuantity(index, text.target.value)
                  }
                  keyboardType="numeric"
                  // value={ticketQuantity}
                />
              </div>
            </div>
          );
        })}
        <div className="flex-col items-center flex">
          <Input
            onChangeText={(e) => setname(e.target.value)}
            type="text"
            error={nameError}
            placeholder="Your Name"
          />

          <Input
            onChangeText={(e) => setemail(e.target.value)}
            type="text"
            error={emailError}
            placeholder="Your Email"
          />

          <Input
            onChangeText={(e) => setphoneNumber(e.target.value)}
            type="text"
            placeholder="Your Phone Number"
          />
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`${
              window.innerWidth < 1780
                ? "w-[80vw] md:w-[70vw] m-[16px]"
                : "w-[1000px] text-[40px] mt-[64px]"
            } flex flex-row justify-between items-center p-[16px] border-y border-green-800`}
          >
            <p>SubTotal</p>
            <p> {formatCur(totalPrice, "en-NG", "NGN")}</p>
          </div>
        </div>

        <div className="flex-col items-center flex">
          {!purchaseError ? (
            <button
              onClick={makePayment}
              className={`${
                window.innerWidth < 1780
                  ? "w-[50vw] md:w-[35vw] lg:w-[25vw]"
                  : "w-[400px] h-[50px]"
              } bg-[#013a19] mt-[16px] rounded-[20px] py-[8px] mb-[32px] flex flex-col items-center justify-center text-white `}
            >
              Buy Ticket
            </button>
          ) : null}
          <p className="text-center text-red-600 text-[3vw] md:text-[2vw] lg:text-[1.5vw] font-semibold">
            {purchaseError}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuyTickets;
