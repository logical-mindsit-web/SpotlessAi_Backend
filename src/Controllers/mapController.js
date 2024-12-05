import noMode from "../Models/Map-Model.js";
import sharp from "sharp";

const convertBase64ToBuffer = (base64String) => {
  if (!base64String) {
    throw new Error("Base64 string is required to convert to Buffer.");
  }
  return Buffer.from(base64String, "base64");
};

// save Map
export const saveMappingData = async (req, res) => {
  try {
    const { emailId, robotId, map_image, map_name } = req.body;

    // Collect missing fields
    const missingFields = [];
    if (!emailId) missingFields.push("emailId");
    if (!robotId) missingFields.push("robotId");
    if (!map_image) missingFields.push("map_image");
    if (!map_name) missingFields.push("map_name");

    // If any fields are missing, return a specific error message
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}.`,
      });
    }

    let imageBase64;
    try {
      imageBase64 = convertBase64ToBuffer(map_image);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid map_image format.",
        error: error.message,
      });
    }

    const newMappingData = new noMode({
      emailId,
      robotId,
      map_image: imageBase64,
      map_name,
    });

    await newMappingData.save();

    return res.status(201).json({
      success: true,
      message: "Mapping data saved successfully.",
      data: newMappingData,
    });
  } catch (error) {
    console.error("Error saving mapping data:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving mapping data.",
      error: error.message,
    });
  }
};

// get Map Data
const MAX_IMAGE_SIZE = 500 * 1024;
export const getMappingData = async (req, res) => {
  const { robotId } = req.query;

  if (!robotId) {
    return res.status(400).json({
      success: false,
      message: "robotId is required to retrieve mapping data.",
    });
  }

  try {
    const data = await noMode.find({ robotId });
    if (data.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No mapping data found for robotId:${robotId}.`,
        data: [],
      });
    }

    const mappedData = await Promise.all(
      data.map(async (entry) => {
        let imageBuffer = entry.map_image;

        if (imageBuffer.length > MAX_IMAGE_SIZE) {
          imageBuffer = await sharp(imageBuffer)
            .resize({ width: 1000 })
            .toBuffer();
        }

        const base64Image = imageBuffer.toString("base64");

        return {
          ...entry._doc,
          map_image: `data:image/png;base64,${base64Image}`,
        };
      })
    );

    console.log("Retrieved data:", mappedData);

    return res.status(200).json({
      success: true,
      message: `Data retrieved successfully for robotId: ${robotId}.`,
      data: mappedData,
    });
  } catch (error) {
    console.error("Error retrieving mapping data:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving mapping data.",
      error: error.message,
    });
  }
};

// Get Map Image
export const getMapImage = async (req, res) => {
  try {
    const { robotId, map_name } = req.query;

    // Collect missing fields
    const missingFields = [];
    if (!robotId) missingFields.push("robotId");
    if (!map_name) missingFields.push("map_name");

    // If any fields are missing, return a specific error message
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}.`,
      });
    }

    // Get Map data by robotId and map_name
    const mappingData = await noMode.findOne({ robotId, map_name });

    if (!mappingData) {
      return res.status(404).json({
        success: false,
        message: "Mapping data not found.",
      });
    }

    // Convert Buffer to base64 string for sending in response
    const mapImageBase64 = mappingData.map_image.toString("base64");

    return res.status(200).json({
      success: true,
      message: "Map image retrieved successfully.",
      robotId: mappingData.robotId,
      map_name: mappingData.map_name,
      map_image: mapImageBase64,
    });
  } catch (error) {
    console.error("Error retrieving map image:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving map image.",
      error: error.message,
    });
  }
};

// Delete Map
export const deleteMappingData = async (req, res) => {
  try {
  
    const { robotId, map_name } = req.query;
    console.log("params is ", req.query);

    // Collect missing fields
    const missingFields = [];
    if (!robotId) missingFields.push("robotId");
    if (!map_name) missingFields.push("map_name");

    // If any fields are missing, return a specific error message
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}.`,
      });
    }

    const findAndDeletemapData = await noMode.findOne({
      robotId,
      map_name,
    });
    console.log("deleted datas :", findAndDeletemapData);
    if (!findAndDeletemapData) {
      return res.status(404).json({
        success: false,
        message: `No mapping data found for robotId: ${robotId} and map_name: ${map_name}.`,
      });
    }
    await findAndDeletemapData.deleteOne();
    return res.status(200).json({ message: "data deleted succesfully " });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error in delete api ", error: error.message });
  }
};
