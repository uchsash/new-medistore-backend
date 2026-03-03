import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {

    const result = await AuthService.createUserIntoDB(req.body);
    res.status(201).json({
        success: true,
        message: "User Creation Successful.",
        data: result
    })
}

const loginUser = async (req: Request, res: Response) => {

    const result = await AuthService.loginUserIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "User Login Successful.",
        data: result
    })
}


export const AuthController = {
    createUser,
    loginUser
}