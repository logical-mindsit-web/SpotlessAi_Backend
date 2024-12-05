import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srinivasanbalakrishan04@gmail.com",
    pass: "ebfp voxq wggn bpsv"
  },
});

export const sendOtpEmail = async (recipient, otp) => {
  try {
    await transporter.sendMail({
      from:"srinivasanbalakrishan04@gmail.com",
      to: recipient,
      subject: "Your OTP for verification",
      html: `<h1>Hello,</h1> <p>Your OTP code is <b>${otp}</b>. This code will expire in 2 minutes.</p>
       <p>Best regards,
       <br/> Your team</p>`,
    });
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

export default transporter;
