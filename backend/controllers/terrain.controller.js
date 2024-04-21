const { terrainModel } = require('../models/terrain.model');

// add terrain function
const addTerrain = async (req, res) => {
    
    try {
        // Extract data from the request body
        const { img ,nom, phone, prix, position, open, close, duree, time, date } = req.body;
        console.log("image url : ",img);
        const idRes = req.params.idRes;
        console.log(idRes);
        // Create a new terrain object
        const newTerrain = {
            img,
            nom,
            idRes,
            phone,
            prix,
            position,
            calendrier: {
                open : open,
                close : close,
                duree: duree,
                time : time, 
                date : date,
            },
            status: "Disponible",

        };
        try {
            const result = await terrainModel.create(newTerrain);
            res.status(201).json({ message: "Terrain added successfully", terrain: result });
        } catch (error) {
            console.error("Error adding terrain:", error);
            res.status(500).json({ message: "Failed to add terrain", error: error.message });
        }
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to add terrain", error: error.message });
    }
};
// update terrain function
const updateTerrain = async (req, res, next) => {
    try {
        const terrainId = req.params.terrainId;
        const { img, nom, phone, prix, open, close, duree, time, date, status } = req.body;
        const terrain = await terrainModel.findById(terrainId);
        

        if (!terrain) {
            return res.status(404).json({ message: "Terrain not found" });
        }
        const newTerrain = {
            img,
            nom,
            phone,
            prix,
            calendrier: {
                open : open,
                close : close,
                duree: duree,
                time : time, 
                date : date,  
            },
            status
        };
        Object.assign(terrain, newTerrain);
        const updatedTerrain = await terrain.save();
        res.status(200).json({ message: "Terrain updated successfully", terrain: updatedTerrain });
    } catch (error) {
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
// search terrain function
const searchTerrain = async (req, res) => {
    try {
        // Extract search parameters from query parameters
        const { searchTerm } = req.query; // Use req.query instead of req.params
        // Use a case-insensitive regular expression for the search term
        const regex = new RegExp(searchTerm, 'i');

        // Use the Mongoose model to perform the case-insensitive search
        const searchResults = await terrainModel.find({ nom: { $regex: regex } });

        // Return the search results to the client
        res.status(200).json({ results: searchResults });
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to search for terrain", error: error.message });
    }
};

// list terrain function of a specific responsable
const listTerrain = async (req, res) => { 
    try {
        const respId = req.params.respId;
        // Use the Mongoose model to retrieve all terrain data
        const terrainList = await terrainModel.find({idRes : respId});

        // Return the list of terrain data to the client
        res.status(200).json({ terrainList: terrainList });
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to list terrain", error: error.message });
    }
};
// update calendar function
/* const updateCalendar = async (req, res, next) => {
    try {
        // Extract terrain ID and updated data from request body or parameters
        const respId = req.params.respId;
        const updatedData = req.body;

        // Update all terrains with the provided respId
        const result = await terrainModel.updateMany({ idRes: respId }, {calendrier : updatedData});
        // Check if any terrains were updated
        if (result.nModified === 1) {
            return res.status(404).json({ message: "No terrains found for the provided idRes" });
        }

        // Send a success response
        res.status(200).json({ message: "Terrains updated successfully" });
    } catch (error) {
        // Handle errors if any
        res.status(500).json({ message: "Failed to update terrains", error: error.message });
    }
}; */

const getTerrain = async (req, res) => {
    try {
        // Query MongoDB for all terrain data, sorted by price in ascending order
        const data = await terrainModel.find().sort({ prix: 1 });
        
        // Send sorted data as JSON response
        res.status(200).json({ results: data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getTerrainInfo = async (req, res) => {
    try {
        const idTer = req.params.id;
        // Assuming you have a Mongoose model named terrainModel
        const terrain = await terrainModel.findById(idTer);
        if (!terrain) {
            return res.status(404).json({ message: "Terrain not found" });
        }
        res.status(200).json({ terrain });
    } catch (error) {
        console.error("Error fetching terrain information:", error);
        res.status(500).json({ message: "Failed to fetch terrain information" });
    }
};

// POST action to rate the terrain by a user
const rateTerrain = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const { rating } = req.body;

    try {
        const terrain = await terrainModel.findById(id);
        if (!terrain) {
            return res.status(404).json({ message: "Terrain not found" });
        }

        const existingRatingIndex = terrain.ratings.findIndex(r => r.user.toString() === userId);
        if (existingRatingIndex !== -1) {
            // User already rated, update the existing rating
            terrain.ratings[existingRatingIndex].rating = rating;
        } else {
            // Add a new rating
            terrain.ratings.push({ user: userId, rating });
        }
        await terrain.save();

        // Calculate average rating
        const averageRating = terrain.ratings.reduce((total, r) => total + r.rating, 0) / terrain.ratings.length;

        // Update the terrain with the average rating
        terrain.ratingAvg = averageRating;
        await terrain.save();

        res.status(200).json({ message: "Terrain rated successfully", terrain });
    } catch (error) {
        res.status(500).json({ message: "Failed to rate terrain", error: error.message });
    }
};

// PATCH action to update the rating
const updateTerrainRating = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const { rating } = req.body;

    try {
        const terrain = await terrainModel.findById(id);
        if (!terrain) {
            return res.status(404).json({ message: "Terrain not found" });
        }

        // Find the user's existing rating
        const existingRating = terrain.ratings.find(r => r.user.toString() === userId);
        if (!existingRating) {
            return res.status(400).json({ message: "User has not rated this terrain yet" });
        }

        // Update the user's rating
        existingRating.rating = rating;
        await terrain.save();

        // Calculate average rating
        const averageRating = terrain.ratings.reduce((total, r) => total + r.rating, 0) / terrain.ratings.length;

        // Update the terrain with the average rating
        terrain.ratingAvg = averageRating;
        await terrain.save();

        res.status(200).json({ message: "Terrain rating updated successfully", terrain });
    } catch (error) {
        res.status(500).json({ message: "Failed to update terrain rating", error: error.message });
    }
};

const getUserRate = async (req, res) => {
    const { id, userId } = req.params; // Terrain ID and User ID

    try {
        // Find the terrain by its ID
        const terrain = await terrainModel.findById(id);

        if (!terrain) {
            return res.status(404).json({ message: "Terrain not found" });
        }

        // Find the user's rating for this terrain
        const userRating = terrain.ratings.find(rating => rating.user.toString() === userId);

        if (!userRating) {
            return res.status(404).json({ message: "User has not rated this terrain" });
        }

        res.status(200).json({ userRating });
    } catch (error) {
        res.status(500).json({ message: "Failed to get user's rating", error: error.message });
    }
}



module.exports.terrainController = {
    addTerrain,
    updateTerrain,
    deleteTerrain,
    searchTerrain,
    listTerrain,
    /*updateCalendar,*/
    getTerrain,
    getTerrainInfo,
    rateTerrain, 
    updateTerrainRating,
    getUserRate
};
