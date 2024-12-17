import { Schema as MongooseSchema, model } from "mongoose";

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
    enum: ["completed", "Partial"], // Status can only be "completed" or "Partial"
  },
  disinfectionStartTime: {
    type: Date,
    required: true,
  },
  disinfectionEndTime: {
    type: Date,
    required: true,
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
  uvLightTimes: {
    type: [
      {
        startTime: {
          type: Date,
          required: true,
        },
        endTime: {
          type: Date,
          required: true,
        },
      },
    ],
    required: true,
  },
  motionDetectionTimes: {
    type: [
      {
        detectedTime: {
          type: Date,
          required: true,
        },
        resumeTime: {
          type: Date, 
        },
        abortedTime: {
          type: Date, 
        },
      },
    ],
    validate: {
      validator: function (values) {
        return values.every(
          (entry) =>
            (entry.resumeTime && !entry.abortedTime) ||
            (!entry.resumeTime && entry.abortedTime)
        );
      },
      message:
        "Each motion detection event must have either resumeTime or abortedTime, but not both.",
    },
    required: true,
  },
},
{ timestamps: true }
);

const RobotAnalytics = model("RobotAnalytics-2", RobotAnalyticsSchema);

export default RobotAnalytics;