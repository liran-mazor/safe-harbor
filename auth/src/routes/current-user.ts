import express from 'express';

import { currentUser } from '@liranmazor/ticketing-common';

const router = express.Router();

router.get('/api/auth/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };