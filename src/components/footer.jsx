export default function Footer() {
    return (
      <footer className="relative bg-gradient-to-r from-purple-950 to-black text-white py-8 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Left Section - Logo and Text */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <h1 className="text-3xl font-extrabold text-white">MEDLOBE</h1>
            <span className="text-purple-300 text-sm md:text-base">Your Health Hub</span>
          </div>
  
          {/* Middle Section - Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-6 items-center">
            <a href="#" className="hover:text-purple-400 transition ease-in-out duration-300">
              About Us
            </a>
            <a href="#" className="hover:text-purple-400 transition ease-in-out duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-400 transition ease-in-out duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-purple-400 transition ease-in-out duration-300">
              Contact
            </a>
          </div>
  
          {/* Right Section - Social Icons */}
          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-purple-400 transition ease-in-out duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition ease-in-out duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition ease-in-out duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
  
        {/* 3D Effect and Copyright */}
        <div className="mt-6 text-center text-sm opacity-60">
          <p>© 2024 MEDLOBE. All rights reserved.</p>
        </div>
  
        {/* Bottom Shadow for 3D Effect */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-black to-purple-950 shadow-lg transform skew-y-6 -z-10"></div>
      </footer>
    );
  }
  