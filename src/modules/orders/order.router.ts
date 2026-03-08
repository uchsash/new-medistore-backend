import express, { Router } from 'express';
import { orderController } from './order.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post(
    "/",
    auth(UserRole.customer),
    orderController.createOrder
);
 
router.get(
    "/my-orders",
    auth(UserRole.customer),
    orderController.getMyOrders
);

router.get(
    "/manage",
    auth(UserRole.seller),
    orderController.getSellerOrders
);


router.get(
    "/admin/all-orders",
    auth(UserRole.admin),
    orderController.getAllOrdersForAdmin
);

router.get(
    "/:orderId",
    auth(UserRole.customer, UserRole.seller, UserRole.admin),
    orderController.getOrderById
);

router.patch(
    "/:orderId",
    auth(UserRole.customer, UserRole.seller, UserRole.admin),
    orderController.updateOrderStatus
);

export const orderRouter: Router = router;