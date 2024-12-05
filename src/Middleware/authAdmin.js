import jwt from "jsonwebtoken";
import Admin from '../Models/Admin-Model.js';

export const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from the Authorization header
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid token or admin does not exist." });
    }

    req.admin = admin; // Attach admin details to the request
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

