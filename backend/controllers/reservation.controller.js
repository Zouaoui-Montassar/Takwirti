const { reservationModel } = require('../models/reservation.model');
const UserModel = require('../models/user.model');
const { terrainModel } = require('../models/terrain.model');

// add Reservation function
const addReservation = async (req, res) => {
    try {
        const date  = req.body.date;
        const userId =req.params.partId;
        const terrainId  = req.params.terId;
        const participants = req.body.participants;
        // Check if there is already a reservation for the given terrain at the same time
        const existingReservation = await reservationModel.findOne({ terrain: terrainId, date: { $eq: new Date(date) } });
        if (existingReservation) {
            return res.status(400).json({ message: 'There is already a reservation for the given terrain at the same time' });
        }

        const terrain = await terrainModel.findById(terrainId);
        if (!terrain) {
            return res.status(404).json({ message: 'Terrain not found' });
        }
        dateObject = new Date(date);
        const day = dateObject.toLocaleDateString('en-US', { weekday: 'long' }); // Get current day as string
        console.log(day)
        console.log(terrain.calendrier.date.toLowerCase())
        console.log(day.toLowerCase() === terrain.calendrier.date.toLowerCase())
        if (day.toLowerCase() === terrain.calendrier.date.toLowerCase()) {
            return res.status(400).json({ message: "You can't reserve on this day, this field is already closed" });
        }

        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the new reservation
        const newReservation = new reservationModel({
            user: user,
            terrain: terrain,
            date: new Date(date),
            status: "En cours",
            participants : participants
        });
        await newReservation.save();

        res.status(201).json({ message: "Reservation added successfully", reservation: newReservation });
    } catch (error) {
        res.status(500).json({ message: "Failed to add reservation", error: error.message });
    }
};


// update Reservation function (date)
const updateReservation = async (req, res, next) => {
    try {
        const { reservationId } = req.params;
        const date = req.body.date;
        const participants = req.body.participants;

        // Get the current reservation
        const currentReservation = await reservationModel.findById(reservationId);
        if (!currentReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Check if there is already a reservation for the same terrain at the updated time
        const existingReservation = await reservationModel.findOne({ terrain: currentReservation.terrain, date: { $eq: new Date(date) } });
        if (existingReservation && existingReservation._id.toString() !== reservationId) {
            return res.status(400).json({ message: 'There is already a reservation for the given terrain at the updated time' });
        }

        // Update the reservation
        const updatedReservation = await reservationModel.findByIdAndUpdate(
            reservationId,
            { date: new Date(date),
              participants: participants}
        );

        res.status(200).json({ message: "Reservation updated successfully", reservation: updatedReservation });
    } catch (error) {
        res.status(500).json({ message: "Failed to update reservation", error: error.message });
    }
};


// annuler Reservation function
const annulerReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;

        // Find the reservation by ID
        const reservation = await reservationModel.findById(reservationId);

        // Check if the reservation exists
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // Check if the reservation status is already "Terminée"
        if (reservation.status === "Terminée") {
            return res.status(400).json({ message: "Cannot cancel reservation because it is already 'Terminée'" });
        }

        // Update the reservation status to "Annulée"
        const updatedReservation = await reservationModel.findByIdAndUpdate(
            reservationId,
            { status: "Annulée" }
        );

        res.status(200).json({ message: "Reservation cancelled successfully", reservation: updatedReservation });
    } catch (error) {
        res.status(500).json({ message: "Failed to cancel reservation", error: error.message });
    }
};


// terminer Reservation function
const terminerReservation = async (req, res) => {
    try {
        const currentDate = new Date();
        const pastReservations = await reservationModel.updateMany(
            { date: { $lt: currentDate }, status:'En cours' },
            { $set: { status: 'Terminée' } }
        );
        console.log(`Updated ${pastReservations.modifiedCount} past reservations.`);
    } catch (error) {
        res.status(500).json({ message: "Failed to complete reservation", error: error.message });
    }
};


// search Reservation function par le particulier selon une date si la date n est null affiche tous les reservations
const searchReservation = async (req, res) => {
    try {
        const { partId } = req.params;
        const { date } = req.body;

        let filter = { user: partId };

        // If date is provided, add it to the filter
        if (date) {
            // Convert the date string to a JavaScript Date object
            const searchDate = new Date(date);
            console.log(searchDate);
            // If the searchDate is a valid Date object, add it to the filter
            if (!isNaN(searchDate.getTime())) {
                // Assuming the date field in the reservationModel is named "date"
                filter.date = searchDate;
            }
        }

        // Find reservations based on the filter
        const reservations = await reservationModel.find(filter);
        console.log(reservations)
        res.status(200).json({ reservations });
    } catch (error) {
        res.status(500).json({ message: "Failed to search for reservations", error: error.message });
    }
};


// list reservation function of a specific particulier
const listReservationP = async (req, res) => { 
    try {
        const { partId } = req.params;

        const reservations = await reservationModel.find({ user: partId });

        res.status(200).json({ reservations });
    } catch (error) {
        res.status(500).json({ message: "Failed to list reservations", error: error.message });
    }
};

// list reservation function d'un terrain qui appartient a un specific responsable
const listReservationR = async (req, res) => {
    try {
        const { resId } = req.params;
        // Find terrains belonging to the specific responsible
        const terrains = await terrainModel.find({ idRes: resId });
        // Extract terrain IDs
        const terrainIds = terrains.map(terrain => terrain._id);
        // Find reservations associated with the found terrains
        const reservations = await reservationModel.find({ terrain: { $in: terrainIds } });

        res.status(200).json({ reservations });
    } catch (error) {
        res.status(500).json({ message: "Failed to list reservations", error: error.message });
    }
};


const compterReservation = async (req, res) => {
    try {
        const { resId } = req.params;
        // Find terrains belonging to the specific responsible
        const terrains = await terrainModel.find({ idRes: resId });
        // Extract terrain IDs
        const terrainIds = terrains.map(terrain => terrain._id);
        // Find reservations associated with the found terrains
        const reservations = await reservationModel.find({ terrain: { $in: terrainIds } });
        // Count the number of reservations
        const reservationCount = reservations.length;

        res.status(200).json({ reservationCount });
    } catch (error) {
        res.status(500).json({ message: "Failed to count reservations", error: error.message });
    }
};


// par encore testé
/* const addParticipantsToReservation = async (req, res) => {
    const { reservationId } = req.params;
    const { participantsString } = req.body;

    try {
        const reservation = await reservationModel.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.status !== 'En cours') {
            return res.status(400).json({ message: 'Cannot edit participants for a reservation that is not in progress' });
        }


        const participantsArray = participantsString.split(/\n/); 
        const participantsArray = participantsString.split(/[ \n]+/); ya binethom espace ya kol wehed new line 
        
        reservation.participants.push(...participantsArray);
        await reservation.save();

        res.status(200).json({ message: 'Participants added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; */

const getReservation = async(req, res) => {
    const terrainId = req.params.terrainId 
    const date = req.params.date;
    try {
        const startOfDay = new Date(date);
        console.log(startOfDay)
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const reservations = await reservationModel.find({
            terrain: terrainId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });
        console.log(reservations)
        res.status(200).json({ reservations });
    }catch (error) {
        res.status(500).json({ message: "Failed to search for reservations", error: error.message });
    }
}

const getReservationInfo = async(req, res) => {
    const idReservation = req.params.idRes ;
    try {
        const reservations = await reservationModel.findById(idReservation);
        console.log(reservations);
        res.status(200).json({ reservations });
    }catch (error) {
        res.status(500).json({ message: "Failed to get reservation info", error: error.message });
    };
}


module.exports.reservationController = {
    addReservation,
    updateReservation,
    annulerReservation,
    terminerReservation,
    searchReservation,
    listReservationP,
    listReservationR,
    compterReservation,
    /* addParticipantsToReservation, */
    getReservation,
    getReservationInfo,
};
