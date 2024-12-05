import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define sub-location schema
const subLocationSchema = new Schema({
  name: { type: String, required: true },
});

// Define location schema with address fields
const locationSchema = new Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    town: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
  },
  subLocations: [subLocationSchema],
});

// Define user schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a valid phone number"],
    },
    IPAddress:{
      type: String,
      required:[true,"Please Provide a valid IP Address"],
    },
    organizationName: {
      type: String,
      required: [true, "Please provide a valid organization name"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password cannot be shorter than 8 characters."],
    },
    manualMapping: {
      type: String,
      enum: ['enabled', 'disabled'],
    },
    objectDisinfection: {
      type: String,
      enum: ['enabled', 'disabled'],
    },
    otp: { type: String },
    forgotPasswordOtp: { type: String },
    isFirstTime: { type: Boolean, default: true },
    isOtpVerified: { type: Boolean, default: false },
    primaryContact: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    locations: [locationSchema],
    role: {
      type: String,
      default: "user", 
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Userdata", userSchema);
export default User;