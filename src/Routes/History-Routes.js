import { Router } from "express";
import { singleFiveModeApi,getModeRobotId} from "../Controllers/historyController.js"

const router = Router();
router.post("/historys/save", singleFiveModeApi);
router.get("/historys/get", getModeRobotId);


export default router;
