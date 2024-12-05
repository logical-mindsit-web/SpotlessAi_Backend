import { Schema as MongooseSchema, model } from 'mongoose'; 

const robotmsgSchema = new MongooseSchema({ 
  robotId: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },

  camera_images: [{ type: String, required: true }],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Robotmsg = model('RobotMsg', robotmsgSchema); 

export default Robotmsg;
