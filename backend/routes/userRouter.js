import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment
} from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", userAuth, getProfile);
userRouter.post("/update", upload.single("img"), userAuth, updateProfile);
userRouter.post("/book", userAuth, bookAppointment);
userRouter.get("/appointments", userAuth, listAppointment);
userRouter.post('/cancel', userAuth, cancelAppointment)

export default userRouter;
