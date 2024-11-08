// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        
        <div className="flex flex-col mb-6 md:mb-0">
          <h3 className="text-gray-800 text-lg font-semibold">Medlobe</h3>
          <p className="text-sm mt-2">Our solutions connect you to health professionals quickly and easily. Contact us for more information.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6 md:mb-0">
          <div>
            <h4 className="text-gray-800 font-semibold mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Customers</a></li>
              <li><a href="#" className="hover:text-gray-900">Newsroom</a></li>
              <li><a href="#" className="hover:text-gray-900">Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold mb-2">Industries</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-900">Healthcare</a></li>
              <li><a href="#" className="hover:text-gray-900">Telemedicine</a></li>
              <li><a href="#" className="hover:text-gray-900">AI & Machine Learning</a></li>
              <li><a href="#" className="hover:text-gray-900">Digital Health</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold mb-2">Products</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-900">Teleconsultation Platform</a></li>
              <li><a href="#" className="hover:text-gray-900">Health Records Management</a></li>
              <li><a href="#" className="hover:text-gray-900">AI Health Advisor</a></li>
              <li><a href="#" className="hover:text-gray-900">Wellness Planning</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold mb-2">Get In Touch</h4>
            <ul className="space-y-1">
              <li><a href="mailto:hallo@medlobe.com" className="hover:text-gray-900">hallo@medlobe.com</a></li>
              <li className="flex space-x-2 mt-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div className="container mx-auto mt-8 flex justify-between text-sm border-t border-gray-300 pt-6">
        <p>© 2024 Medlobe, All rights reserved</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-800">Terms & Conditions</a>
          <a href="#" className="hover:text-gray-800">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

  