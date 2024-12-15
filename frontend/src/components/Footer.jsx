import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-10 mt-10  border-t">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Prescripto</h1>
          <p className="mt-4 text-gray-600 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">COMPANY</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="/home" className="text-gray-600 hover:text-blue-600">Home</a></li>
            <li><a href="/about" className="text-gray-600 hover:text-blue-600">About us</a></li>
            <li><a href="/contact" className="text-gray-600 hover:text-blue-600">Contact us</a></li>
            <li><a href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">GET IN TOUCH</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-600">+1-202-456-7890</li>
            <li className="text-gray-600">memonyasin2007@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t pt-4 text-center text-gray-600 text-sm">
        <p>Copyright &copy; 2024 @Yasin Memon - All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
