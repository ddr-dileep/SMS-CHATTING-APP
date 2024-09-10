import mongoose, { Document, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    gender: { type: String },
    role: { type: String },
    dob: { type: String },
    isActive: { type: Boolean, default: true },
    dateOfJoin: { type: Date, default: new Date() },
    profilePicture: {
      type: String,
      default:
        "https://mrwallpaper.com/images/high/cute-stitch-profile-picture-2pi7ctlxbr89bv8a.jpg",
      required: true,
    },
    hobbies: [{ type: String }],
    languages: [{ type: String }],
  },
  { timestamps: true }
);

const UserModal = mongoose.model<Iuser>("User", userSchema);
export default UserModal;

interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  dob: { type: String };
  address: string;
  contact: string;
  isActive: boolean;
  dateOfJoin: Date;
  profilePicture: string;
  hobbies: string[];
  languages: string[];
  fullName: string;
}
