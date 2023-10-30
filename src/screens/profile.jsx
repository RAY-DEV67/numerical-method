import { useContext } from "react";
import { UserId } from "../App";
import { useUserDetailsContext } from "../context/userDetails";
import { Link } from "react-router-dom";

function Profile() {
  const userId = useContext(UserId);
  const { Name } = useUserDetailsContext();

  return (
    <div>
      <div className="pt-[80px] h-[30vh] flex flex-col items-center rounded-b-[60px] bg-[#013a19]">
        <div className="h-[40px] w-[10vw] rounded-[100px] bg-green-900 absolute top-[90px] left-[70vw]"></div>
        <div className="h-[20px] w-[5vw] rounded-[100px]  bg-green-900 absolute top-[10px] left-[80vw]"></div>
        <div className="h-[20px] w-[5vw] rounded-[100px] bg-green-900 absolute top-[90px] left-[30vw]"></div>
        <div className="h-[20px] w-[5vw] rounded-[100px]  bg-green-900 absolute top-[10px] left-[40vw]"></div>
        <h1 className="text-white headingFont text-[5.5vw] relative">
          Welcome Back 👋
        </h1>
        <p className=" text-white mb-[32px] mt-[8px] relative text-[4vw]">
          {Name}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Link
          to={`/YourProducts/${userId}`}
          className="bg-[#013a19] rounded-[20px] mb-[16px] w-[45vw] h-[23vh] flex flex-col items-center justify-center"
        >
          <p className="text-white text-[4vw]">Your Products</p>
        </Link>
        <Link
          to={`/YourServices/${userId}`}
          className="bg-[#013a19] rounded-[20px] w-[45vw] h-[23vh] flex flex-col items-center justify-center"
        >
          <p className="text-white text-[4vw]">Your Services</p>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
