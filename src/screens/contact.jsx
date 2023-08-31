import AnimatedDiv from "../components/Animation";
import DownloadNow from "../components/downloadNow";
import Footer from "../components/footer";

function Contact() {
  const whatsappNumber = "07040653485"; // Replace with the desired WhatsApp number
  const recipientEmail = "henryekene8@gmail.com"; // Replace with the recipient's email address
  const subject = "Hello from React"; // Replace with the desired email subject
  const body = "This is the email body."; // Replace with the desired email body

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
      <div className="flex flex-col items-center mt-[100px] md:mt-[150px] mx-[32px]">
        <h1 className="text-[10vw] mb-[16px] headingFont md:text-[7vw] lg:text-[5vw] text-center leading-[7vw] md:leading-[3vw] font-bold w-[80vw] md:w-[40vw text-[#00cc00]">
          <span class="magic">
            <span class="magic-star">
              <svg viewBox="0 0 512 512">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>

            <span class="magic-text">Get in touch</span>
          </span>
        </h1>
        <p className="text-center lg:w-[30vw]">
          We are happy to help. Please contact us if you need help or have any
          questions.
        </p>
      </div>

      <div className="md:flex md:flex-row justify-center items-center mt-[40px]">
        
      <AnimatedDiv type="text" showType="showtext">
      <div className="bg-green-50 m-[16px] p-[16px] rounded-[20px] md:w-[45vw]">
          <h2 className="text-[6vw] md:text-[4vw] headingFont font-semibold my-[16px]">
            Chat with us
          </h2>
          <p className="">
            Have a quick question that needs to be answered? Chat with a member
            of the team on whatsapp.
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
        <div className="bg-green-50 m-[16px] p-[16px] rounded-[20px] md:w-[45vw]">
          <h2 className="text-[6vw] font-semibold my-[16px] md:text-[4vw] headingFont">
            Send us a mail
          </h2>
          <p className="">
            Do you have general questions or need assistance? Please send us a
            quick email and get a response from our team.
          </p>
          <p onClick={handleMailClick} className="bg-[#013a19] cursor-pointer text-white w-[150px] text-center py-[8px] my-[16px] rounded-[20px]">
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
