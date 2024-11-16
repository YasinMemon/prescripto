import mongoose, { mongo } from "mongoose";
import profilePic from "./profilepic";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: profilePic
  },
  address: {
    type: Object,
    default: {line1 : '', line2: ''}
  },
  gender: {
    type: String,
    default: 'not selected' 
  },
  dob: {
    type: String,
    default: 'not selected',
  },
  phone: {
    type: String,
    default: "0000000000"
  }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;