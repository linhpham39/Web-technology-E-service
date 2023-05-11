import express from 'express';
import Hotel from '../models/Hotel.js';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';
const router = express.Router();

//create
router.post('/', createHotel);

//UPDATE
router.put('/:id',updateHotel);
//DELETE
router.delete('/:id', deleteHotel);

//GET BY ID
router.get('/:id', getHotel);

//GET ALL
router.get('/', getHotels);


export default router;