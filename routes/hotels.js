import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

//create
router.post('/', async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        res.status(500).json(err);
    }
});


//UPDATE
router.put('/:id', async (req, res) => {
    try {
        //{new: true} is used to return the updated object instead of the original
        //{set: req.body} is used to update the fields taken from request body
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateHotel);
    }catch(err){
        res.status(500).json(err);
    }
});
//DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel is deleted successfully!");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET BY ID
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(err){
        res.status(500).json(err);
    }
});


export default router;