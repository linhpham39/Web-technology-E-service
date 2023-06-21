import express from 'express';
import { createRoom, getRoom,getRooms, deleteRoom, updateRoom } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post('/:hotelId', verifyAdmin, createRoom);

//UPDATE
router.put('/:id', verifyAdmin, updateRoom);

//DELETE
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

//GET BY ID
router.get('/:id', getRoom);

//GET ALL
router.get('/', getRooms);

export default router;