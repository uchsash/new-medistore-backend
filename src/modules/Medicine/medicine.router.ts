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

router.patch(
    "/:medId",
    auth(UserRole.seller, UserRole.admin),
    medicineController.updateMedicine
);

router.delete(
    "/:medId",
    auth(UserRole.seller, UserRole.admin),
    medicineController.deleteMedicine
);



export const medicineRouter: Router = router;