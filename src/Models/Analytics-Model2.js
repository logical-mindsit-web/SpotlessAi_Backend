import { Schema as MongooseSchema, model } from "mongoose";

// Regular expression to validate hh:mm:ss format in 24-hour time
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

// Reusable time validation function
const validateTime = (value) => timeRegex.test(value);

const RobotAnalyticsSchema = new MongooseSchema({
  robotId: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  mode: {
    type: String,
    default: "AutoDisinfection", // Set mode to AutoDisinfection by default
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["completed", "abort"], // Status can only be "completed" or "abort"
  },
  disinfectionStartTime: {
    type: String,
    required: true,
    validate: {
      validator: validateTime,
      message: (props) => `${props.value} is not a valid time format (hh:mm:ss)!`,
    },
  },
  disinfectionEndTime: {
    type: String,
    required: true,
    validate: {
      validator: validateTime,
      message: (props) => `${props.value} is not a valid time format (hh:mm:ss)!`,
    },
  },
  disinfectionTimeTakenSeconds: {
    type: Number, // Time taken in seconds
    required: true,
  },
  batteryUsageInPercentage: {
    type: Number, // Example: 30
    required: true,
  },
  uvLightUsageInSeconds: {
    type: Number, // Time in seconds
    required: true,
  },
  motorRuntimeInSeconds: {
    type: Number, // Time in seconds
    required: true,
  },
  distanceTravelledInMeters: {
    type: Number, // Distance in meters, supports decimal values
    required: true,
  },
});

const RobotAnalytics = model("RobotAnalytics-2", RobotAnalyticsSchema);

export default RobotAnalytics;