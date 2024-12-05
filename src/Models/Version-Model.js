import { Schema as MongooseSchema, model } from 'mongoose';

// Define the app version schema
const versionforappSchema = new MongooseSchema({
  version: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create the model
const Version = model('AppVersion', versionforappSchema);

export default Version;
