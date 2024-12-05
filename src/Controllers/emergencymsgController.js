import Robotmsg from "../Models/Emergencymsg-Model.js";
import { robotemail } from "../utils/emergencymsgmail.js";

// Create a new robot message entry
export const createRobotmsg = async (req, res) => {
  try {
    const { robotId, emailId, message, camera_images } = req.body;

    // Validate required fields
    if (!robotId || !emailId || !message || !camera_images ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    if (!Array.isArray(camera_images) || camera_images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Camera images must be provided as a non-empty array.",
      });
    }

    // Create a new robot message entry
    const newRobotmsg = new Robotmsg({
      robotId,
      emailId,
      message,
      camera_images, // Save array of images
    });

    // Save the robot message entry to the database
    const savedRobotmsg = await newRobotmsg.save();

    // Send email with the robot message details and image attachment
    await robotemail(
    "sithusiva29@gmail.com",
      robotId,
      emailId,
      message,
      camera_images
    );

    res.status(201).json({
      success: true,
      data: savedRobotmsg,
      message: "Robot message created and email sent successfully",
    });
  } catch (error) {
    console.error("Error creating robot message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create robot message",
      error: error.message,
    });
  }
};