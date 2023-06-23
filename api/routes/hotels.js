import express from 'express';
import Hotel from '../models/Hotel.js';
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//create
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.put('/:id', verifyAdmin, updateHotel);

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

//GET BY ID
router.get('/find/:id', getHotel);

router.get('/countByCity', countByCity);
//GET ALL
router.get('/', getHotels);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms);

export default router;