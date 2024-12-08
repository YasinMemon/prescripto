import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js";

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

    const token = jwt.sign(email, process.env.JWT_SECRET);

    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      message: "registered successfully",
      token,
    });
  } catch (error) {
    console.log("error during doctor registration", error.message);
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

    const token = await jwt.sign(email, process.env.JWT_SECRET);

    return res.json({ success: true, message: "Login Successfll", token });
  } catch (error) {
    console.log("error during doctor login", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };
