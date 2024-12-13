import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Add_Doctors({ aToken }) {
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
  const [preview, setPreview] = useState('')

  const backendUri = import.meta.env.VITE_BACKEND_URI;

  const handleDoctorImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctorImg(file);
      setPreview(URL.createObjectURL(file))
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log(doctorImg);
      
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
      formData.append("degree", education);
      formData.append(
        "address",
        JSON.stringify({ line1: address, line2: address2 })
      );
      formData.append("about", about);

      console.log('token from add doctor: ', aToken);
      

      formData.forEach((value, key) => {
        console.log(`${key} : ${value instanceof File ? value.name : value}`);
      });
      
      
      
      const { data } = await axios.post(
        `${backendUri}api/admin/add-doctor`,
        formData,
        {
          headers: {
            // atoken,
            Authorization: `Bearer ${aToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
        className="p-4 bg-white overflow-y-scroll  h-full rounded-md outfit m-[5vh] sm:p-10 font-medium"
      >
        {/* Doctor Image Section */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div>
            <label htmlFor="img">
              <img
                src={preview || "/icons/upload.svg"}
                className="h-24 w-24 rounded-full cursor-pointer object-cover object-top"
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
            <label htmlFor="name" className="block">
              Doctor Name:
            </label>
            <input
              type="text"
              id="name"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              placeholder="Name"
              aria-label="Doctor Name"
            />

            <label htmlFor="email" className="block mt-4">
              Doctor Email:
            </label>
            <input
              type="email"
              id="email"
              value={docEmail}
              onChange={(e) => setDocEmail(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              placeholder="Email"
              aria-label="Doctor Email"
            />

            <label htmlFor="password" className="block mt-4">
              Doctor Password:
            </label>
            <input
              type="password"
              id="password"
              value={docPassword}
              onChange={(e) => setDocPassword(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              placeholder="Password"
              aria-label="Doctor Password"
            />

            <label htmlFor="experience" className="block mt-4">
              Experience:
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
              aria-label="Experience"
            >
              {/* Experience Options */}
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year${
                  i > 0 ? "s" : ""
                }`}</option>
              ))}
            </select>

            <label htmlFor="fees" className="block mt-4">
              Fees:
            </label>
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
          <div>
            <div>
              <label htmlFor="name" className="block">
                Specialization:
              </label>
              <select
                type="text"
                id="specialization"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full lg:w-[400px] rounded-md border border-gray-300
                p-2"
              >
                <option value="General Phision">General Phision</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
              <label htmlFor="email" className="block mt-4">
                Education:
              </label>
              <input
                type="text"
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
                placeholder="Education"
              />

              <label htmlFor="password" className="block mt-4">
                Address:
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full lg:w-[400px] rounded-md border border-gray-300 p-2"
                placeholder="Line 1"
              />

              <input
                type="text"
                id="address2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full mt-4 lg:w-[400px] rounded-md border border-gray-300 p-2"
                placeholder="Line 2"
              />
            </div>
          </div>
          {/* Similar corrections for other fields */}
        </div>
        {/* Submit Button */}
        <div>
          <pre>
          <textarea name="about" id="about" rows='4' className="resize-none w-full mt-4 mr-10 rounded-md border border-gray-300 p-2" placeholder="something about you" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
          </pre>
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </form>
    </>
  );
}

export default Add_Doctors;
