import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
    },
    employeeId: {
      type: String,
      required: [true, "Please provide an employee ID."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please provide valid email"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a valid phone number"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password cannot be shorter than 8 characters."],
    },
    manualMapping: {
      type: String,
      enum: ["enabled", "disabled"],
    },
    objectDisinfection: {
      type: String,
      enum: ["enabled", "disabled"],
    },
    otp: { type: String },
    forgotPasswordOtp: { type: String },
    isFirstTime: { type: Boolean, default: true },
    isOtpVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["Hr", "ProjectManager", "AdminController"],
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("AdminUser", adminSchema);
export default Admin;
