import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.router";
import { medicineRouter } from "../modules/Medicine/medicine.route";
import { categoryRouter } from "../modules/Category/category.router";

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
    // {
    //     path: "/orders",
    //     route: orderRouter,
    // },
    // {
    //     path: "/users",
    //     route: userRouter,
    // },
    // {
    //     path: "/reviews",
    //     route: reviewRouter,
    // },
];

routerManager.forEach((r) => router.use(r.path, r.route));

export default router;