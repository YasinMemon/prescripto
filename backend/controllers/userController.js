import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/DoctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "all fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter valid email address" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      message: "registered successfully",
      token,
    });
  } catch (error) {
    console.log("error during user registration", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "all fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email or Password wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "email or password wrong" });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ success: true, message: "Login Successfll", token });
  } catch (error) {
    console.log("error during user login", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    return res.json({ success: true, message: "data sent", userData });
  } catch (error) {
    console.log("error during getting data", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imgFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }
    const parsedAddress = address ? JSON.parse(address) : null;

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });

    if (imgFile) {
      const imgUpload = await cloudinary.uploader.upload(imgUpload.path, {
        resource_type: "image",
      });
      const imgUrl = (await imgUpload).secure_url;

      await userModel.findByIdAndUpdate(userId, { img: imgUrl });
    }

    return res.json({ success: true, message: "udpated successfull" });
  } catch (error) {
    console.log("error during updating user profile", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId);

    if (!docData) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    // delete docData.slots_booked

    await appointmentModel.create({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    });

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    return res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log("error during booking appointment", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointments = await appointmentModel.find({ userId });
    return res.json({ success: true, message: "appointments", appointments });
  } catch (error) {
    console.log("error during fetching appointments ", error.message);
    return res.json({ success: true, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;

    const docData = await doctorModel.findById(docId);

    let slots_booked = docData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ success: true, message: "appointment cancelled" });
  } catch (error) {
    console.log("error during cancel appointments ", error.message);
    return res.json({ success: true, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment
};
