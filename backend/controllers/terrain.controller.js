const { terrainModel } = require('../models/terrain.model');

// add terrain function
const addTerrain = async (req, res) => {
    try {
        // Extract data from the request body
        const { nom, idRes, phone, prix, position, open, close, duree, dayOff, configDayOff } = req.body;

        // Create a new terrain object
        const newTerrain = {
            nom,
            idRes,
            phone,
            prix,
            position,
            calendrier: {
                open,
                close,
                duree,
                dayOff: dayOff || [], // Ensure dayOff is an array or provide an empty array as default
                configDayOff: configDayOff || [] // Ensure configDayOff is an array or provide an empty array as default
            }
        };

        // Insert the new terrain object into the collection
        const result = await terrainModel.create(newTerrain);

        // Send a success response with the inserted terrain object
        res.status(201).json({ message: "Terrain added successfully", terrain: result });
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to add terrain", error: error.message });
    }
};



// update terrain function
const updateTerrain = async (req, res, next) => {
    try {
        // Extract terrain ID and updated data from request body or parameters
        const terrainId = req.params.terrainId;
        const updatedData = req.body;

        // Find the terrain object by ID
        const terrain = await terrainModel.findById(terrainId);

        if (!terrain) {
            // If terrain with the provided ID is not found, return a 404 error
            return res.status(404).json({ message: "Terrain not found" });
        }

        // Update the found terrain object with the provided data
        Object.assign(terrain, updatedData);

        // Save the updated terrain object to the database
        const updatedTerrain = await terrain.save();

        // Send a success response with the updated terrain object
        res.status(200).json({ message: "Terrain updated successfully", terrain: updatedTerrain });
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to update terrain", error: error.message });
    }
};

// delete terrain function
const deleteTerrain = async (req, res) => {
    try {
        // Extract terrain ID from request body or parameters
        const terrainId = req.params.terrainId;

        // Use the Mongoose model to find the terrain object by ID
        const terrain = await terrainModel.findById(terrainId);
        console.log(terrain);
        if (!terrain) {
            // If terrain with the provided ID is not found, return a 404 error
            return res.status(404).json({ message: "Terrain not found" });
        }

        // Delete the terrain object from the database
        await terrain.deleteOne();

        // Send a success response
        res.status(200).json({ message: "Terrain deleted successfully" });
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to delete terrain", error: error.message });
    }
};
/*
// search terrain function
const searchTerrain = async (req, res) => {
    try {
        // Extract search parameters from request body or query parameters
        const { searchTerm } = req.body; // Assuming searchTerm is the parameter to search for

        // Use the Mongoose model to perform the search
        const searchResults = await Terrain.find({ $text: { $search: searchTerm } });

        // Return the search results to the client
        res.status(200).json({ results: searchResults });
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to search for terrain", error: error.message });
    }
};

// list terrain function
const listTerrain = async (req, res) => {
    try {
        // Use the Mongoose model to retrieve all terrain data
        const terrainList = await Terrain.find();

        // Return the list of terrain data to the client
        res.status(200).json({ terrainList: terrainList });
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to list terrain", error: error.message });
    }
};

//?affiche calendar function
const calendar = async (req, res, next) => {

};

// update calendar function
const updateCalendar = async (req, res, next) => {

};*/
module.exports.terrainController = {
    addTerrain,
    updateTerrain,
    deleteTerrain,
    //searchTerrain,
    //listTerrain,
    //calendar,
    //updateCalendar
};
