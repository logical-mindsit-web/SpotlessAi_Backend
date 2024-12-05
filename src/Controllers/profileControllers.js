import User from "../Models/User-Model.js";
import Admin from "../Models/Admin-Model.js";

//get both admin and user details
export const getprofileDetails = async (req, res) => {
  try {
    const { email, role } = req.user; // Extract email and role from the verified token

    if (role === "user") {
      // Fetch user details if role is "User"
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userDetails = {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        organizationName: user.organizationName,
        role: user.role,
        otp: user.otp,
        forgotPasswordOtp: user.forgotPasswordOtp,
        isFirstTime: user.isFirstTime,
        isOtpVerified: user.isOtpVerified,
        primaryContact: user.primaryContact,
        locations: user.locations,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return res.status(200).json(userDetails);
    } else if (["Hr", "ProjectManager", "AdminController"].includes(role)) {
      // Fetch full admin details for other roles
      const adminData = await Admin.findOne({ email });

      if (!adminData) {
        return res.status(404).json({
          success: false,
          message: "Admin not found with the provided email.",
        });
      }

      const adminDetails = {
        name: adminData.name,
        email: adminData.email,
        phoneNumber: adminData.phoneNumber,
        employeeId: adminData.employeeId,
        role: adminData.role,
        manualMapping: adminData.manualMapping,
        objectDisinfection: adminData.objectDisinfection,
        otp: adminData.otp,
        forgotPasswordOtp: adminData.forgotPasswordOtp,
        isFirstTime: adminData.isFirstTime,
        isOtpVerified: adminData.isOtpVerified,
        createdAt: adminData.createdAt,
        updatedAt: adminData.updatedAt,
      };

      return res.status(200).json(adminDetails);
    } else {
      // Role not recognized
      return res.status(403).json({ message: "Access denied. Invalid role." });
    }
  } catch (error) {
    console.error("Error fetching details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user's phone number
export const updateUserPhoneNumber = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the authenticated user
    const { phoneNumber } = req.body; // Extract new phone number from request body

    // Validate the phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      return res
        .status(400)
        .json({ message: "Please provide a valid phone number" });
    }

    // Update user's phone number
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { phoneNumber },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Phone number updated successfully",
      phoneNumber: updatedUser.phoneNumber,
    });
  } catch (error) {
    console.error("Error updating phone number:", error);
    res.status(500).json({ message: "Server error" });
  }
};
