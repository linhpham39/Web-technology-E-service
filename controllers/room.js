import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { 
                $push: { rooms: savedRoom._id } 
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
}


export const updateRoom = async(req, res, next) => {
    try {
        //{new: true} is used to return the updated object instead of the original
        //{set: req.body} is used to update the fields taken from request body
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updateRoom);
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async(req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room is deleted successfully!");
    } catch (err) {
        next(err);
    }
}

export const getRoom = async(req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}

export const getRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}



