import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.createUserIntoDB(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User Creation Successful.",
            data: result
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Something went wrong!",
            data: error
        });
    }


}

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginUserIntoDB(req.body);
        
        // Cookie
        res.cookie("token", result.token, {
            secure: false,
            httpOnly: true,
            sameSite: "strict" // strict | none | lax
        })

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User Login Successful.",
            data: result
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Something went wrong!",
            data: error
        });
    }
}


export const AuthController = {
    createUser,
    loginUser
}