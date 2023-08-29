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

function BuyTickets() {
  const location = useLocation();
  const { userId } = useParams();

  const [totalQuantity, settotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketInformation, setTicketInformation] = useState([]);
  const [purchaseError, setpurchaseError] = useState("");
  const [availableQuantity, setavailableQuantity] = useState(0);
  const [quantityError, setquantityError] = useState("");

  const [paymentError, setpaymentError] = useState("");
  const [payWithCard, setpayWithCard] = useState(false);
  const [payWithCredit, setpayWithCredit] = useState(false);
  const [finalTotal, setfinalTotal] = useState();
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

  const publicKey = "pk_test_1ab31e0238e828c92d25ba346af15aa620d4251e";

  const componentProps = {
    email,
    amount: `${totalPrice * 100}`,
    metadata: {
      name,
    },
    publicKey,
    text: "Buy Ticket",
    onSuccess: () => {
      addPurchasedTicket();
      deductAvailableQuantity();
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Wait!!!, don't go!!!!😢"),
  };

  return (
    <div className="bg-white textFont">
      <div>
        <div className="md:text-[2vw]  fixed pt-[15vw] md:pt-[6vw] pb-[4vw] md:pb-[2vw] lg:pb-[0px] font-semibold bg-[#013a19] w-[100vw] text-center py-[4px] text-white rounded-b-[30px]">
        <h1 className="lg:hidden headingFont text-[4vw]">
            <span class="magic">
              <span class="magic-text">Choose Your Ticket</span>
            </span>
          </h1>
        </div>

        <div className="pt-[25vw] md:pt-[13vw] lg:pt-[8vw] flex flex-col items-center">
          <div className="eventCard p-[16px] mt-[16px] rounded-[10px] w-[80vw] md:w-[70vw] lg:w-[40vw] shadow-lg">
            <p className="text-[5vw] md:text-[3vw] lg:text-[2vw] font-semibold">
              {ticketProps.eventName}
            </p>
            <p>{ticketProps.startDate}</p>
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
                className="flex-row w-[80vw] md:w-[70vw] lg:w-[60vw] flex justify-between items-center p-[16px] border border-green-800 rounded-[20px] m-[16px]"
              >
                <div className="">
                  <p className="text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw] mb-[0.5vh]">
                    Ticket Name: {ticket.name}
                  </p>
                  <p className="text-[3vw] lg:text-[2vw] xl:text-[1.5vw] md:text-[2.5vw] mb-[0.5vh]">
                    Price per ticket: {formatCur(ticket.price, "en-NG", "NGN")}
                  </p>
                  <p className="text-[3vw] lg:text-[2vw] xl:text-[1.5vw] md:text-[2.5vw] mb-[0.5vh]">
                    Purchase Limit: {ticket.purchaseLimit}
                  </p>
                  <p className="text-[3vw] lg:text-[2vw] xl:text-[1.5vw] md:text-[2.5vw] mb-[0.5vh]">
                    Tickets Available: {ticket.quantity}
                  </p>
                  <p className="text-[3vw] xl:text-[1.5vw] lg:text-[2vw] md:text-[2.5vw] mb-[0.5vh]">
                    Quantity Ordered: {ticketQuantity}
                  </p>
                  <p className="text-[3vw] xl:text-[1.5vw] lg:text-[2vw] md:text-[2.5vw] mb-[0.5vh]">
                    Total Price: {formatCur(ticketTotalPrice, "en-NG", "NGN")}
                  </p>
                </div>
                <input
                  className={`w-[30vw] pr-[16px] pl-[8px] py-[16px] border rounded border-[#00cc00] mb-[8px]`}
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
          <input
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Your Name"
            className="input text-[3vw] lg:text-[1.5vw] md:text-[2vw] bg-transparent rounded-[10px] text-black p-[8px] mt-[16px] border border-[#00cc00] w-[80vw] md:w-[40vw]"
          />
          {nameError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {nameError}
            </p>
          )}
          <input
            onChange={(e) => setemail(e.target.value)}
            type="text"
            placeholder="Your Email"
            className="input text-[3vw]  lg:text-[1.5vw] md:text-[2vw] bg-transparent rounded-[10px] text-black p-[8px] mt-[16px] border border-[#00cc00] w-[80vw] md:w-[40vw]"
          />
          {emailError && (
            <p className="text-red-500 text-[3vw] md:text-[2vw] lg:text-[1.5vw] mb-[16px]">
              {emailError}
            </p>
          )}
          <input
            onChange={(e) => setphoneNumber(e.target.value)}
            type="text"
            placeholder="Your Phone Number"
            className="input text-[3vw]  lg:text-[1.5vw] md:text-[2vw] bg-transparent rounded-[10px] text-black p-[8px] mt-[16px] border border-[#00cc00] w-[80vw] md:w-[40vw]"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row w-[80vw] md:w-[70vw] justify-between items-center p-[16px] border-y border-green-800 m-[16px]">
            <p>SubTotal</p>
            <p> {formatCur(totalPrice, "en-NG", "NGN")}</p>
          </div>
        </div>

        <div className="flex-col items-center flex">
          {!purchaseError ? (
            <PaystackButton
              className="bg-[#013a19] mb-[32px] flex flex-col items-center justify-center text-white w-[50vw] md:w-[35vw] lg:w-[25vw] mt-[16px] rounded-[20px] py-[8px]"
              {...componentProps}
            />
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
