import doctorModel from "../models/DoctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";

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

export { changeAvailability, getDoctors};