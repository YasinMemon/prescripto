import doctorModel from "../models/DoctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import appointmentModel from '../models/appointmentModel.js'

const changeAvailability = async (req, res) => {
  try {
    const docId = req.body.docId;
    const doc = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(doc, { available: !doc.available });
    res.json({ success: true, message: "availability changed" });
  } catch (error) {
    console.log("error during change availiblity", error.message);
    return res.json({ success: false, message: "something went wrong" });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, message: "all set", doctors });
  } catch (error) {
    console.log("error during change availiblity", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const docLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor)
      return res.json({ success: false, message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "logged in successfull",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log("error during doctor login", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const docAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({docId});

    return res.json({ success:true, appointments});
  } catch (error) {
    console.log("error during fetching doctors appointments", error.message);
    return res.json({ success: false, message: error.message });
  }
}

export { changeAvailability, getDoctors, docLogin, docAppointments };
