import RobotAnalytics from "../Models/Analytics-Model2.js"; 

export const saveRobotAnalytics2 = async (req, res) => {
  try {
    const {
      robotId,
      emailId,
      model,
      date,
      mode,
      status,
      disinfectionStartTime,
      disinfectionEndTime,
      disinfectionTimeTakenSeconds,
      batteryStartPercentage,
      batteryEndPercentage,
      batteryUsageInPercentage,
      uvLightUsageInSeconds,
      motorRuntimeInSeconds,
      distanceTravelledInMeters,
    } = req.body;

    // Create a new instance of RobotAnalytics
    const robotAnalytics = new RobotAnalytics({
      robotId,
      emailId,
      model,
      date,
      mode,
      status,
      disinfectionStartTime,
      disinfectionEndTime,
      disinfectionTimeTakenSeconds,
      batteryStartPercentage,
      batteryEndPercentage,
      batteryUsageInPercentage,
      uvLightUsageInSeconds,
      motorRuntimeInSeconds,
      distanceTravelledInMeters,
    });

    // Save the data to the database
    const savedData = await robotAnalytics.save();

    res.status(201).json({
      message: "Robot Analytics data saved successfully",
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving Robot Analytics data",
      error: error.message,
    });
  }
};