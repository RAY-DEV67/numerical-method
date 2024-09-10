import formatCur from "../helper/formatPrice";
import GenerateRandomString from "../helper/generateRandomString";
import TicketForm from "../components/ticketForm";
import { useState } from "react";
import { storage, db } from "../../firebase"; // Adjust import as needed
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import LoadingSpinner from "../components/spinner";
import { nigerianStates } from "../json/nigerianStates";
import Input from "../components/input";
import { eventCategories } from "../json/eventCategories";
import { useUserDetailsContext } from "../context/userDetails";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { useParams } from "react-router-dom";

function UploadEvents() {
  const { userUid } = useParams();
  const { accountNumber, accountName, bankName } = useUserDetailsContext();

  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [submitError, setsubmitError] = useState("");
  const [stateError, setstateError] = useState("");
  const [categoryError, setcategoryError] = useState("");
  const [image1, setImage1] = useState(null); // Image state to store the selected image
  const [image1Error, setimage1Error] = useState("");
  const [venue, setvenue] = useState("");
  const [venueError, setvenueError] = useState("");
  const [eventDescription, seteventDescription] = useState("");
  const [updateAccountNumber, setupdateAccountNumber] = useState(
    accountNumber ? accountNumber : ""
  );
  const [updateAccountName, setupdateAccountName] = useState(
    accountName ? accountName : ""
  );
  const [updateBankName, setupdateBankName] = useState(
    bankName ? bankName : ""
  );
  const [eventName, seteventName] = useState("");
  const [eventNameError, seteventNameError] = useState("");
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [tickets, setTickets] = useState([]);
  const [ticketsError, setticketsError] = useState("");
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [selectedState, setselectedState] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [textToCopy, settextToCopy] = useState("");

  const limitedText =
    textToCopy.length > 50 ? textToCopy.substring(0, 50) + "..." : textToCopy;

  //   const handleCopy = async () => {
  //     await Clipboard.setStringAsync(textToCopy);
  //     ToastFunction("success", `Odogwu🙌`, `Copied succesfully🎉`);
  //     setshowModal(false);
  //   };

  const handleAddTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
    setShowTicketForm(false); // Hide the ticket form after adding a ticket
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage1(e.target.files[0]);
    }
  };

  const uploadImage = async (docRef) => {
    if (!image1) {
      alert("No image selected");
      return;
    }

    try {
      const storageRef = ref(storage, `images/${image1.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image1);

      // Monitor the upload process
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress monitoring (optional)
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Image upload error: ", error);
          alert("Failed to upload image. Please try again.");
        },
        async () => {
          // Handle successful uploads
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(docRef, { image1: downloadURL });
          alert("Event Uploaded Successfully");
        }
      );
    } catch (error) {
      console.error("Failed to upload image: ", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const upload = async () => {
    // Reset previous errors and form validation (not shown here for brevity)

    if (
      !eventName ||
      !selectedCategory ||
      !image1 ||
      !selectedState ||
      !venue ||
      tickets.length === 0
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setloadingSubmit(true);

    const eventId = GenerateRandomString(20);

    try {
      const docRef = await addDoc(collection(db, "Events"), {
        category: selectedCategory,
        state: selectedState,
        eventDescription: eventDescription,
        userId: userUid,
        eventName: eventName,
        eventVenue: venue,
        eventId: eventId,
        startDate: startDate.toLocaleString(),
        endDate: endDate.toLocaleString(),
        tickets: tickets,
        timestamp: serverTimestamp(),
        status: "Active",
        searchKeywords:
          `${eventDescription.toLowerCase()} ${eventName.toLowerCase()} ${selectedCategory.toLowerCase()}`.split(
            " "
          ),
      });

      await uploadImage(docRef);
    } catch (error) {
      console.error("Failed to upload event: ", error);
      alert("Failed to upload event.");
    }

    setloadingSubmit(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    upload();
  };

  const handleCategoryChange = (e) => {
    setselectedCategory(e.target.value);
  };

  const handleStateChange = (e) => {
    setselectedState(e.target.value);
  };

  return (
    <div>
      {/* <Heading header="Create An Event" /> */}
      <div className="">
        <div className="flex flex-col items-center">
          <h1 className="lg:hidden headingFont text-[5vw] mt-[18vw] md:mt-[10vw]">
            <span class="magic">
              <span class="magic-text z-1 relative">Upload Event</span>
            </span>
          </h1>
          <div className="mb-[16px]">
            <Input
              onChangeText={(e) => seteventName(e.target.value)}
              type="text"
              placeholder="Event Name"
              error={eventNameError}
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={`${
                window.innerWidth < 1780
                  ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                  : "w-[1000px] text-[40px]"
              } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] border border-[#00cc00]`}
            >
              <option value="">Category</option>
              {eventCategories.map((categories) => (
                <option key={categories} value={categories}>
                  {categories}
                </option>
              ))}
            </select>

            {categoryError ? (
              <div className="mx-[16px]">
                <p className="text-red-400 textFont">{categoryError}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="my-[16px] w-[85vw]">
            <p className="mb-[8px] font-bold textFont">Add Event Artwork</p>
            <input
              className={`${
                window.innerWidth < 1780
                  ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw]"
                  : "text-[40px]"
              } mt-[1rem]`}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              name="photos"
            />

            {image1Error && (
              <p
                className={`${
                  window.innerWidth < 1780
                    ? "text-[3vw] md:text-[2vw] lg:text-[1.5vw]"
                    : "text-[30px]"
                } text-red-500 mb-[16px]`}
              >
                {image1Error}
              </p>
            )}

            <p className="mt-[16px] text-[#00cc00] textFont">
              Picture must not exceed 2mb
            </p>
          </div>

          <div>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className={`${
                window.innerWidth < 1780
                  ? "text-[3.5vw] md:text-[2vw] lg:text-[1.5vw] w-[85vw] md:w-[40vw]"
                  : "w-[1000px] text-[40px]"
              } input bg-transparent rounded-[10px] text-black px-[8px] py-[12px] mt-[16px] border border-[#00cc00]`}
            >
              <option value="">State</option>
              {nigerianStates.map((categories) => (
                <option key={categories} value={categories}>
                  {categories}
                </option>
              ))}
            </select>

            {stateError ? (
              <div className="mx-[16px]">
                <p className="text-red-400 textFont">{stateError}</p>
              </div>
            ) : (
              ""
            )}
          </div>

          <Input
            placeholder="Venue / Address"
            onChangeText={(e) => setvenue(e.target.value)}
            type="text"
            error={venueError}
          />

          <div className="mb-[16px]">
            <Input
              type="text"
              onChangeText={(e) => seteventDescription(e.target.value)}
              placeholder="Give a brief description of your event"
            />
          </div>

          <div className="items-center mb-[8px] w-[85vw]">
            {/* Start Date and Time Picker */}
            <div className="flex flex-row items-center">
              <p className="textFont">Show Starts On:</p>
              <div className="bg-[#00cc00] py-[8px] px-[16px] rounded-[20px] ml-[8px]">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setstartDate(date)} // Update the start date state
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa" // Customize format if needed
                  className="text-white bg-transparent"
                />
              </div>
            </div>

            {/* End Date and Time Picker */}
            <div className="flex flex-row mt-[16px] items-center">
              <p className="textFont">Show Ends On:</p>
              <div className="bg-[#00cc00] py-[8px] px-[16px] rounded-[20px] ml-[8px]">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setendDate(date)} // Update the end date state
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="text-white bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="my-[16px] mx-[24px] textFont font-bold">TICKET DETAILS</p>

        <div className="flex flex-col items-center">
          {ticketsError ? (
            <div className="mx-[16px]">
              <p className="text-red-400 textFont">{ticketsError}</p>
            </div>
          ) : (
            ""
          )}
          {/* Display the tickets data */}
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="border mb-[16px] border-[#00cc00] p-[16px] rounded-[30px] w-[85vw]"
            >
              <p className="mb-[8px] textFont">Ticket Name: {ticket.name}</p>
              <p className="mb-[8px] textFont">Quantity: {ticket.quantity}</p>
              <p className="mb-[8px] textFont">
                Price: {formatCur(ticket.price, "en-NG", "NGN")}
              </p>
              <p className="mb-[8px] textFont">
                Ticket Description: {ticket.ticketDescription}
              </p>
              <p className="mb-[8px] textFont">
                Purchase Limit: {ticket.purchaseLimit}
              </p>
            </div>
          ))}

          {showTicketForm && <TicketForm onAddTicket={handleAddTicket} />}
          {!showTicketForm && (
            <div className="flex flex-col items-center">
              <div className="p-[16] bg-white border border-[#00cc00] rounded-[10px] w-[85vw]">
                <div
                  onClick={() => {
                    setShowTicketForm(true);
                  }}
                >
                  <p className="text-[#00cc00] my-[32px] text-center textFont">
                    Add new ticket +
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-[16px] mx-[24px] font-bold textFont">
          YOUR ACCOUNT DETAILS
        </p>

        <div className="flex flex-col items-center">
          <Input
            onChangeText={setupdateAccountNumber}
            value={updateAccountNumber}
            placeholder="Account Number"
            keyboardType="numeric"
          />

          <Input
            onChangeText={setupdateAccountName}
            value={updateAccountName}
            placeholder="Account Name"
          />
          <Input
            onChangeText={setupdateBankName}
            value={updateBankName}
            placeholder="Bank Name"
          />
          <div
            onClick={(e) => {
              handleSubmit(e);
              updateUserInfo();
            }}
            className="bg-[#013a19] py-[16px] rounded-[40px] w-[60vw] my-[8px] flex flex-col justify-center items-center"
          >
            <p className="text-white text-center textFont">
              {loadingSubmit ? <LoadingSpinner /> : "Get Plugged!!"}
            </p>
          </div>
        </div>

        {submitError ? (
          <p className="text-red-400 mb-[16px] mx-[24px] textFont">
            {submitError}
          </p>
        ) : (
          ""
        )}

        <p className="textFont mx-[24px]">
          By clicking on Post Ad, you accept the Terms of Use, Confirm that you
          will be able to abide by the safety tips.
        </p>
      </div>
    </div>
  );
}

export default UploadEvents;
