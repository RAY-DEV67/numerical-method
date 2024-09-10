import React, { useState } from "react";
import Input from "./input";

const purchaseLimits = [1, 2, 3, 4, 5];

const TicketForm = ({ onAddTicket }) => {
  const [ticketName, setTicketName] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [purchaseLimit, setpurchaseLimit] = useState();
  const [ticketDescription, setticketDescription] = useState("");

  const originalPrice = Number(ticketPrice);
  const calculatedPrice = originalPrice + originalPrice * 0.05; // Calculate 5% of the original price

  const handleAddTicket = () => {
    // Check if any of the fields are empty
    if (
      !ticketName ||
      !ticketQuantity ||
      !ticketPrice ||
      !purchaseLimit ||
      !ticketDescription
    ) {
      alert("Please fill all the fields");
      return;
    }

    // Create the ticket object
    const ticket = {
      name: ticketName,
      purchaseLimit: parseInt(purchaseLimit),
      quantity: parseInt(ticketQuantity),
      price: parseFloat(calculatedPrice),
      ticketDescription: ticketDescription,
      ticketsPurchased: 0,
    };

    // Add the ticket to the parent component
    onAddTicket(ticket);

    // Reset the form fields
    setTicketName("");
    setTicketQuantity("");
    setTicketPrice("");
    setpurchaseLimit("");
  };

  const handlePurchaseLimitChange = (e) => {
    setpurchaseLimit(e.target.value);
  };

  return (
    <div className="flex-col items-center">
      <Input
        placeholder="Ticket Name e.g Regular"
        type="text"
        onChangeText={(e) => setTicketName(e.target.value)}
      />

      <Input
        placeholder="Ticket Quantity"
        type="number"
        onChangeText={(e) => setTicketQuantity(e.target.value)}
      />
      <Input
        placeholder="Ticket Price. Type 0 if its a free show"
        type="number"
        onChangeText={(e) => setTicketPrice(e.target.value)}
      />

      <Input
        placeholder="Ticket Description / Benefits"
        type="text"
        onChangeText={(e) => setticketDescription(e.target.value)}
      />

      <select
        value={purchaseLimit}
        onChange={handlePurchaseLimitChange}
        className={`${
          window.innerWidth < 1780
            ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
            : "w-[1000px] text-[40px]"
        } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[16px] border border-[#00cc00]`}
      >
        <option value="">Purchase Limit</option>
        {purchaseLimits.map((purchaseLimits) => (
          <option key={purchaseLimits} value={purchaseLimits}>
            {purchaseLimits}
          </option>
        ))}
      </select>

      <div className="flex flex-col items-center">
        <div className="px-[16] my-[16px] bg-[#013a19] w-[60vw] border border-[#00cc00] rounded-[10px]">
          <div
            onClick={() => {
              handleAddTicket();
            }}
          >
            <p className="text-white my-[16px] text-[3vw] text-center textFont">
              Add ticket +
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TicketForm);
