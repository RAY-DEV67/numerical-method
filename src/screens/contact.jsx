import AnimatedDiv from "../components/Animation";
import DownloadNow from "../components/downloadNow";
import Footer from "../components/footer";

function Contact() {
  const whatsappNumber = "+2347040653485"; // Replace with the desired WhatsApp number
  const recipientEmail = "support@uniplug.ng"; // Replace with the recipient's email address
  const subject = ""; // Replace with the desired email subject
  const body = ""; // Replace with the desired email body

  const handleMailClick = () => {
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="flex flex-col items-center pt-[100px] md:pt-[150px] mx-[32px]">
        <h1
          className={`${
            window.innerWidth < 1780
              ? "text-[10vw] w-[80vw] md:w-[40vw]  md:text-[7vw] lg:text-[5vw] leading-[7vw] md:leading-[3vw]"
              : "w-[750px] text-[80px]"
          } mb-[16px] headingFont font-bold  text-center`}
        >
          <span class="magic">
            <span class="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>

            <span class="magic-text">Get in touch</span>
          </span>
        </h1>
        <p
          className={`${
            window.innerWidth < 1780 ? "lg:w-[30vw]" : "w-[650px]"
          } text-center`}
        >
          We are happy to help. Please contact us if you need help or have any
          questions.
        </p>
      </div>

      <div className="md:flex md:flex-row justify-center items-center mt-[40px]">
        <AnimatedDiv type="text" showType="showtext">
          <div
            className={`${
              window.innerWidth < 1780 ? "md:w-[45vw]" : "w-[700px]"
            } bg-green-50 m-[16px] p-[16px] rounded-[20px]`}
          >
            <h2
              className={`${
                window.innerWidth < 1780
                  ? "text-[6vw] md:text-[4vw]"
                  : "text-[50px]"
              } headingFont font-semibold my-[16px]`}
            >
              Chat with us
            </h2>
            <p className="">
              Have a quick question that needs to be answered? Chat with a
              member of the team on whatsapp.
            </p>
            <p
              onClick={handleWhatsAppClick}
              className="bg-[#013a19] cursor-pointer text-white w-[150px] text-center py-[8px] my-[16px] rounded-[20px]"
            >
              Send Text
            </p>
          </div>
        </AnimatedDiv>

        <AnimatedDiv type="text" showType="showtext">
          <div
            className={`${
              window.innerWidth < 1780 ? "md:w-[45vw]" : "w-[700px]"
            } bg-green-50 m-[16px] p-[16px] rounded-[20px]`}
          >
            <h2
              className={`${
                window.innerWidth < 1780
                  ? "text-[6vw] md:text-[4vw]"
                  : "text-[50px]"
              } headingFont font-semibold my-[16px]`}
            >
              Send us a mail
            </h2>
            <p className="">
              Do you have general questions or need assistance? Please send us a
              quick email and get a response from our team.
            </p>
            <p
              onClick={handleMailClick}
              className="bg-[#013a19] cursor-pointer text-white w-[150px] text-center py-[8px] my-[16px] rounded-[20px]"
            >
              Send Mail
            </p>
          </div>
        </AnimatedDiv>
      </div>

      <DownloadNow />
      <Footer />
    </div>
  );
}

export default Contact;
