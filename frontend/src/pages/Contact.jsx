import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 py-10 px-4">
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="/contact_image.png"
            alt="Healthcare Professional"
            className="rounded-lg shadow-lg w-full md:w-4/5"
          />
        </div>

        {/* Contact Information Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">CONTACT US</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              OUR OFFICE
            </h3>
            <p className="text-gray-600">54709 Willms Station</p>
            <p className="text-gray-600">Suite 350, Washington, USA</p>
            <p className="text-gray-600 mt-2">Tel: (415) 555-0132</p>
            <p className="text-gray-600">Email: greatstackdev@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              CAREERS AT PRESCRIPTO
            </h3>
            <p className="text-gray-600 mb-4">
              Learn more about our teams and job openings.
            </p>
            <button className="px-6 py-2 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-100">
              Explore Jobs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
