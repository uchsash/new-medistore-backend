import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { categoryController } from './category.controller';


const router = express.Router();


router.post(
    "/",
    auth(UserRole.seller), //need to change later
    categoryController.createCategory
);


export const categoryRouter: Router = router;