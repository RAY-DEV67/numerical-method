import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      className={`py-[1rem] shadow-md nav bg-[#013a19] rounded-t-[25px] text-center pt-[3vh] ${
        window.innerWidth > 1780 && "w-[1780px]"
      } `}
    >
      <Link
        onClick={() => {
          setnavigateTo("/");
        }}
        to="/"
        className="font-bold text-white"
      >
        Powered by National Open University of Nigeria
      </Link>
    </div>
  );
}
