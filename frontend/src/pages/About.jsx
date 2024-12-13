import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-10 px-4">
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="/about_image.png"
            alt="Doctors"
            className="rounded-lg shadow-lg w-full md:w-4/5"
          />
        </div>

        {/* About Us Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">ABOUT US</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto mt-12">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
          WHY CHOOSE US
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Efficiency */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              EFFICIENCY
            </h4>
            <p className="text-gray-600">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          {/* Convenience */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              CONVENIENCE
            </h4>
            <p className="text-gray-600">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>

          {/* Personalization */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              PERSONALIZATION
            </h4>
            <p className="text-gray-600">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
