import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const robotSchema = new Schema({
  robotId: { type: String, required: true, unique: true },
  emailId: { type: String, required: true},
  username: { type: String, required: true },
  model: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  IPAddress:{
    type: String,
    required:[true,"Please Provide a valid IP Address"],
  },
  image: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['active', 'inactive', 'maintenance', 'decommissioned'], 
    default: 'active' 
  },
  robotInitializeDate: { type: Date, required: true },
  lastMaintenanceDate: { type: Date, required: true },
  location: { type: String, required: true },
  subLocation: { type: String, required: true },
}, { timestamps: true });

const Robot = mongoose.model('Robot', robotSchema);

export default Robot;
