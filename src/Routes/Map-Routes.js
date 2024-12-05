import { Router } from "express";
import { saveMappingData, getMappingData ,getMapImage ,deleteMappingData} from "../Controllers/mapController.js"

const router = Router();

//post the map
router.post("/map-mappings/save", saveMappingData);

//get map data
router.get("/get-map-data", getMappingData);

//get particular map Image
router.get("/map-image",  getMapImage);

//delte map
router.delete("/delete-map-data",deleteMappingData)

export default router;

