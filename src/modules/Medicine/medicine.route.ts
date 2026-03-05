import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { medicineController } from './medicine.controller';

const router = express.Router();

router.post(
    "/",
    auth(UserRole.seller),
    medicineController.createMedicine
);

router.get(
    "/",
    medicineController.getAllMedicine
);

router.get(
    "/my-medicine",
    auth(UserRole.seller),
    medicineController.getMyMedicine
);

router.get(
    "/:medId",
    medicineController.getMedicineById
);



export const medicineRouter: Router = router;