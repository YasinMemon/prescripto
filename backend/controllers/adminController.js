import doctorModel from "../models/DoctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userSchema.js";

// API for upload a new doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      date,
      slot_booked,
    } = req.body;
    const imgFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      // !available ||
      !fees ||
      !address ||
      // !slot_booked ||
      !imgFile
    ) {
      return res.json({ success: false, message: "all fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imgFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    await doctorModel.create({
      name,
      email,
      password: hashedPassword,
      img: imageUrl,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    });

    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    } else {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({ success: true, message: "Login Successfull", token });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    return res.json({ success: true, message: "done", doctors });
  } catch (error) {
    console.log("error while recieving doctors" + error.message);
    res.json({ success: false, message: error.message });
  }
};

const allAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}).populate("docData");
    // console.log(appointments);
    return res.json({ success: true, message: "done", appointments });
  } catch (error) {
    console.log("error while recieving doctors" + error.message);
    res.json({ success: false, message: error.message });
  }
};

const cancelAppointments = async (req, res) => {};

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: (await users).length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    const docData = JSON.parse(dashData.latestAppointments.docData);
    return res.json({ success:true, dashData, docData});
  } catch (error) {
    console.log("error while admin dashboard" + error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, adminLogin, getAllDoctors, allAppointments, adminDashboard };
