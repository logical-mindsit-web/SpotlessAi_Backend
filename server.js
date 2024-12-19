import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/Database/db.js';
import cors from 'cors';
import bodyParser from "body-parser";


import { verifyToken } from './src/Middleware/authMiddleware.js'; 
import analytics from "./src/Routes/Analytics-Routes.js"
import metadata from "./src/Routes/App-Routes.js";
import authRoutes from './src/Routes/Auth-Routes.js';
import emergencymsg from "./src/Routes/Emergencymsg-Routes.js"
import history from "./src/Routes/History-Routes.js"
import mappost from "./src/Routes/Map-Routes.js"
import profileRoutes from './src/Routes/Profile-Routes.js';
import robotRoutes from './src/Routes/Robot-Routes.js';
import Booking from './src/Models/BookingSession-Model.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(verifyToken); 


//Routes 
app.use('/', analytics);
app.use('/', metadata);
app.use('/', authRoutes);
app.use('/', emergencymsg);
app.use('/modes', history);
app.use('/', mappost);
app.use('/', profileRoutes);
app.use('/', robotRoutes);
app.use('/', Booking);


app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
