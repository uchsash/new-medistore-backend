import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { categoryController } from './category.controller';


const router = express.Router();


router.post(
    "/",
    auth(UserRole.admin),
    categoryController.createCategory
);

router.get(
    "/",
    categoryController.getAllCategory
);

router.get(
    "/:catId",
    categoryController.getCategoryById
);


export const categoryRouter: Router = router;