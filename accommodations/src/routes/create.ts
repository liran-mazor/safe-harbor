import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@liranmazor/ticketing-common';
import { AccommodationModel } from '../models/accommodation';
import { DatabaseConnectionError } from '@liranmazor/ticketing-common';

const router = express.Router();

router.post(
  '/api/accommodations',
  requireAuth,
  [
    body('maxGuests')
      .isInt({ min: 1, max: 20 })
      .withMessage('Max guests must be between 1 and 20'),
    
    body('location.region')
      .notEmpty()
      .withMessage('Region is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Region must be between 2 and 100 characters'),
    
    body('location.city')
      .notEmpty()
      .withMessage('City is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('City must be between 2 and 100 characters'),
    
    body('accessibility')
      .isBoolean()
      .withMessage('Accessibility must be true or false'),

    body('petsAllowed')
      .isBoolean()
      .withMessage('Pets allowed must be true or false')
  ],
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
   const { maxGuests, location, accessibility, petsAllowed } = req.body;

   const accommodationData = {
      hostId: req.currentUser!.id,
      maxGuests: parseInt(maxGuests),
      location: {
      region: location.region.trim(),
      city: location.city.trim()
      },
      accessibility: Boolean(accessibility),
      petsAllowed: Boolean(petsAllowed),
      isAvailable: true
   };

   const accommodation = await AccommodationModel.create(accommodationData);
   
   res.status(201).json(accommodation);
 }
);

export { router as createAccommodationRouter };