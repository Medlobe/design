import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  return (
    <nav className=" py-2 px-6 ">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <span
          className="flex justify-center font-extrabold text-2xl"
          onClick={() => navigate("/")}
        >
          <h1>MED</h1>
          <h1 className="text-purple-950">LOBE</h1>
        </span>

        {/* Links - hidden on mobile */}
        <div className="hidden md:flex space-x-8 ">
          <a
            href="/home"
            className="hover:text-purple-950 transition duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-purple-950 transition duration-300"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-purple-950 transition duration-300"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hover:text-purple-950 transition duration-300"
          >
            Contact
          </a>
        </div>


        {/* Buttons for Login/Sign Up or Dashboard if logged in  */}
        {token ? (
          <button
            onClick={() => navigate("/reach")}
            className="border border-purple-950 text-purple-950 hover:bg-purple-950 hover:text-white px-4 py-2 rounded-full font-semibold transition duration-300"
          >
            Dashboard
          </button>
        ) : (
          <div className="hidden md:flex space-x-4 text-white">
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-950  px-4 py-2 rounded-full font-semibold transition duration-300
            hover:bg-transparent hover:border hover:border-purple-950 hover:text-purple-950"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="border border-purple-950 text-purple-950 hover:bg-purple-950 hover:text-white px-4 py-2 rounded-full font-semibold transition duration-300"
            >
              Sign Up
            </button>

          </div>
        )}
        
        <div className="md:hidden">
          <button id="menu-toggle" className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        id="mobile-menu"
        className="md:hidden flex flex-col items-center mt-4 space-y-4"
      >
        <a
          href="#about"
          className=" hover:text-purple-300 transition duration-300"
        >
          About
        </a>
        <a
          href="#services"
          className=" hover:text-purple-300 transition duration-300"
        >
          Services
        </a>
        <a
          href="#contact"
          className=" hover:text-purple-300 transition duration-300"
        >
          Contact
        </a>
        <div className="text-white flex flex-col space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-950  px-4 py-2 rounded-full font-semibold transition duration-300
            hover:bg-transparent hover:border hover:border-purple-950 hover:text-purple-950"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border border-purple-950 text-purple-950 hover:bg-purple-950 hover:text-white px-4 py-2 rounded-full font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
