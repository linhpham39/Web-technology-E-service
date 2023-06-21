import Hotel from "../models/Hotel.js";

export const createHotel = async(req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        next(err);
    }
}

export const updateHotel = async(req, res, next) => {
    try {
        //{new: true} is used to return the updated object instead of the original
        //{set: req.body} is used to update the fields taken from request body
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updateHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async(req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel is deleted successfully!");
    } catch (err) {
        next(err);
    }
}

export const getHotel = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getHotels = async(req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}



