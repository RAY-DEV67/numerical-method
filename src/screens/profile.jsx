import { Link } from "react-router-dom";

function Profile() {
  const userId = sessionStorage.getItem("userId");

  return (
    <div>
      <div className="pt-[80px] h-[180px] flex flex-col items-center rounded-b-[60px] bg-[#013a19]">
        <h1 className="text-white headingFont text-[5.5vw] relative">
          Welcome Back 👋
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Link
          to={`/YourProducts/${userId}`}
          className="bg-[#013a19] rounded-[20px] mb-[16px] w-[80vw] h-[23vh] flex flex-col items-center justify-center"
        >
          <p className="text-white text-[4vw]">Your Products</p>
        </Link>
        <Link
          to={`/YourServices/${userId}`}
          className="bg-[#013a19] rounded-[20px] w-[80vw] h-[23vh] flex flex-col items-center justify-center"
        >
          <p className="text-white text-[4vw]">Your Services</p>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
