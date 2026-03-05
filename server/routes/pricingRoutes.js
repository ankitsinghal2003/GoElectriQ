import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get all pricing' });
});

router.get('/:cabType', (req, res) => {
  res.json({ success: true, message: 'Get pricing by cab type' });
});

export default router;