import RobotAnalytics from "../Models/Analytics-Model.js";

// Controller function to save robot analytics data
export const saveRobotAnalytics = async (req, res) => {
  try {
    const {
      robotId,
      emailId,
      model,
      batteryPercentage,
      motordistanceCovered,
      analytics: {
        batteryRunningTime: { startingTime: batteryStartTime, endingTime: batteryEndTime },
        motorRunningTime: { startingTime: motorStartTime, endingTime: motorEndTime },
        uvLightRunningTime: { startingTime: uvLightStartTime, endingTime: uvLightEndTime },
      },
      detectionDetails,
    } = req.body;

    // Create a new instance of RobotAnalytics
    const robotAnalytics = new RobotAnalytics({
      robotId,
      emailId,
      model,
      batteryPercentage,
      motordistanceCovered,
      analytics: {
        batteryRunningTime: {
          startingTime: batteryStartTime,
          endingTime: batteryEndTime
        },
        motorRunningTime: {
          startingTime: motorStartTime,
          endingTime: motorEndTime
        },
        uvLightRunningTime: {
          startingTime: uvLightStartTime,
          endingTime: uvLightEndTime
        },
      },
      detectionDetails, 
    });

    // Save the robot analytics data to the database
    await robotAnalytics.save();

    return res.json({ message: "Robot analytics saved successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

