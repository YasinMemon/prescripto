import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Add_Doctors({ atoken }) {
  const [doctorImg, setDoctorImg] = useState("");
  const [docName, setDocName] = useState("");
  const [docEmail, setDocEmail] = useState("");
  const [docPassword, setDocPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const backendUri = import.meta.env.VITE_BACKEND_URI;

  const handleDoctorImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setDoctorImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!docName || !docEmail || !docPassword || !fees || !address) {
      return toast.error("Please fill in all required fields.");
    }

    if (!doctorImg) {
      return toast.error("Please upload an image.");
    }

    try {
      const formData = new FormData();
      formData.append("img", doctorImg);
      formData.append("name", docName);
      formData.append("email", docEmail);
      formData.append("password", docPassword);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("speciality", speciality);
      formData.append("education", education);
      formData.append("address", JSON.stringify({ line1: address, line2: address2 }));
      formData.append("about", about);

      const { data } = await axios.post(`${backendUri}api/admin/add-doctor`, formData, {
        headers: { atoken
          // Authorization: `Bearer ${atoken}`,
          // "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form on success
        setDoctorImg("");
        setDocName("");
        setDocEmail("");
        setDocPassword("");
        setExperience("1 Year");
        setFees("");
        setSpeciality("General Physician");
        setEducation("");
        setAddress("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded-md outfit m-[5vh] sm:p-10 font-medium"
      >
        {/* Doctor Image Section */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div>
            <label htmlFor="img">
              <img
                src={doctorImg || "/icons/upload.svg"}
                className="h-24 w-24 rounded-full cursor-pointer object-cover"
                alt="Doctor"
              />
            </label>
            <input onChange={handleDoctorImg} type="file" id="img" hidden />
          </div>
          <div>
            <p className="font-semibold">Upload Doctor Picture</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6">
          {/* Left Column */}
          <div>
            <label htmlFor="name" className="block">Doctor Name:</label>
            <input
              type="text"
              id="name"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              placeholder="Name"
              aria-label="Doctor Name"
            />

            <label htmlFor="email" className="block mt-4">Doctor Email:</label>
            <input
              type="email"
              id="email"
              value={docEmail}
              onChange={(e) => setDocEmail(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              placeholder="Email"
              aria-label="Doctor Email"
            />

            <label htmlFor="password" className="block mt-4">Doctor Password:</label>
            <input
              type="password"
              id="password"
              value={docPassword}
              onChange={(e) => setDocPassword(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              placeholder="Password"
              aria-label="Doctor Password"
            />

            <label htmlFor="experience" className="block mt-4">Experience:</label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              aria-label="Experience"
            >
              {/* Experience Options */}
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year${i > 0 ? "s" : ""}`}</option>
              ))}
            </select>

            <label htmlFor="fees" className="block mt-4">Fees:</label>
            <input
              type="number"
              id="fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              placeholder="Fees"
              aria-label="Fees"
            />
          </div>

          {/* Right Column */}
          {/* Similar corrections for other fields */}
        </div>
        {/* Submit Button */}
        <button type="submit" className="mt-6 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Add Doctor</button>
      </form>
    </>
  );
}

export default Add_Doctors;
