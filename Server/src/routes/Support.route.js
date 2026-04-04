import express from 'express';
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.json({ message: 'Support routes' });
});

export default router;