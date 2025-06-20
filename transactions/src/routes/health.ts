import express from 'express';

const router = express.Router();

router.get('/api/transactions/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'transactions',
    timestamp: new Date().toISOString()
  });
});

export { router as healthRouter };