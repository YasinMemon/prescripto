import doctorModel from "../models/DoctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

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
      !available ||
      !fees ||
      !address ||
      !slot_booked ||
      !imgFile
    ) {
      return res.json({ success: false, message: "all fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valie email",
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
      email !== process.env.ADMIN_EMAIL &&
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
    console.log("erro while recieving doctors" + error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, adminLogin, getAllDoctors };
