import Version from '../Models/Version-Model.js';
import User from '../Models/User-Model.js';
import Admin from '../Models/Admin-Model.js'; 

// Controller to get version and user/admin details based on email
export const getVersionAndUserByEmail = async (req, res) => {
  try {
    const { email, role } = req.user; // Extract email and role from the access token

    // Get the latest app version
    const latestVersion = await Version.findOne().sort({ createdAt: -1 }); // Fetch the latest version

    let details;

    // Query the appropriate model based on the role
    if (role === 'user') {
      const user = await User.findOne({ email }, 'email manualMapping objectDisinfection');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      details = {
        email: user.email,
        manualMapping: user.manualMapping,
        objectDisinfection: user.objectDisinfection,
      };
    } else if (role === "Hr", "ProjectManager", "AdminController") {
      const admin = await Admin.findOne({ email }, 'email role manualMapping objectDisinfection');
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      details = {
        email: admin.email,
        manualMapping: admin.manualMapping,
        objectDisinfection: admin.objectDisinfection,
      };
    } else {
      return res.status(400).json({ error: 'Invalid role provided in token' });
    }

    // Construct the response data
    const responseData = {
      version: latestVersion ? latestVersion.version : null,
      role, // Include role from token in the response
      details,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching version and details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};