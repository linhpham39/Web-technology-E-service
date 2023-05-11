import express from 'express';
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user.js';

const router = express.Router();

//UPDATE
router.put('/:id',updateUser);

//DELETE
router.delete('/:id', deleteUser);

//GET BY ID
router.get('/:id', getUser);

//GET ALL
router.get('/', getUsers);

export default router;