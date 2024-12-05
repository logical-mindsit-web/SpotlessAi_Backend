import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srinivasanbalakrishan04@gmail.com", // Use environment variable for email user
    pass: "ebfp voxq wggn bpsv", // Use environment variable for email password
  },
});


export const robotemail = async (
  recipient,
  robotId,
  emailId,
  message,
  camera_images
) => {
  try {
    // Convert base64 strings to buffers for camera images
    const imageBuffers = camera_images.map((image, index) => ({
      filename: `camera_image_${index + 1}.jpg`,
      content: Buffer.from(image, "base64"),
      encoding: "base64",
    }));

    // Ensure map_image is defined or remove if not needed
    const map_image = process.env.MAP_IMAGE; // Example way to define map image

    if (map_image) {
      imageBuffers.push({
        filename: "map_image.jpg",
        content: Buffer.from(map_image, "base64"),
        encoding: "base64",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "New Robot Message Created",
      html: `
          <h1>New Robot Message Details</h1>
          <p><strong>Robot ID:</strong> ${robotId}</p>
          <p><strong>Email ID:</strong> ${emailId}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p>Thank you,<br/>By Robot</p>
        `,
      attachments: imageBuffers,
    });

    console.log("Robot message email sent successfully");
  } catch (error) {
    console.error("Error sending robot message email:", error);
    throw error;
  }
};

export default transporter;