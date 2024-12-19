import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      },
      mobileNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"], 
      },
      companyName: { type: String, required: true },
      address: { type: String, required: true },
      bookedDate: { type: Date, required: true, index: true },
      customerBlockedDates: { type: [Date], default: [] },
      status: {
        type: String,
        enum: ['pending', 'conformed', 'rejected'], // Only allows these three values
        default: 'pending', // Default to 'pending' when a session is first created
      }, 
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("DemoBooking", bookingSchema);

export default Booking;