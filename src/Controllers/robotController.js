import Robot from "../Models/Robot-Model.js";

//get user Robots
export const getRobotsByEmail = async (req, res) => {
  try {
    const { email, role } = req.user; // Assuming email and role are extracted from the verified token
    const queryEmail = req.query.email; // Extract the email query parameter if provided

    let robots;

    if (role === "user") {
      // Fetch robots for a specific user based on their email
      robots = await Robot.find({ emailId: email }).exec();
    } else if (["Hr", "AdminController", "ProjectManage"].includes(role)) {
      // Require query email to fetch robots for privileged roles
      if (!queryEmail) {
        return res.status(400).json({ message: "Query parameter 'email' is required" });
      }
      robots = await Robot.find({ emailId: queryEmail }).exec();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!robots || robots.length === 0) {
      return res.status(404).json({ message: "No robots found" });
    }

    return res.json(robots);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
