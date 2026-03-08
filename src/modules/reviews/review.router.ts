import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { reviewController } from './review.controller';


const router = express.Router();

router.get(
  "/",
  auth(UserRole.admin),
  reviewController.getAllReviews
);

router.post(
    "/",
    auth(UserRole.customer),
    reviewController.createReview
);


export const reviewRouter: Router = router;