import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.router";
import { medicineRouter } from "../modules/medicine/medicine.router";
import { categoryRouter } from "../modules/category/category.router";
import { orderRouter } from "../modules/orders/order.router";
import { reviewRouter } from "../modules/reviews/review.router";
import { userRouter } from "../modules/user/user.router";

const router = Router();

const routerManager = [
    {
        path: "/auth",
        route: AuthRouter,
    },
    {
        path: "/medicines",
        route: medicineRouter,
    },
    {
        path: "/categories",
        route: categoryRouter,
    },
    {
        path: "/orders",
        route: orderRouter,
    },
    {
        path: "/users",
        route: userRouter,
    },
    {
        path: "/reviews",
        route: reviewRouter,
    },
];

routerManager.forEach((r) => router.use(r.path, r.route));

export default router;