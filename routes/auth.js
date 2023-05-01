import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('test auth!');
});

router.get('/register', (req, res) => {
    res.send('test register!');
});
export default router;