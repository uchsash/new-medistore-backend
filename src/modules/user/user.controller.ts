import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const getMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId){
            throw new Error("Unauthorized");
        }

        const result = await userService.getMyProfileInService(userId);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile retrieved successfully.",
            data: result
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 401,
            success: false,
            message: "Unauthorized access.",
            data: error
        });
    }
};

const updateMyProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new Error("Unauthorized");

        const result = await userService.updateMyProfileInService(userId, req.body);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Profile updated successfully.",
            data: result
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Failed to update profile.",
            data: error
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersInService();

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Users retrieved successfully.",
            data: result
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Failed to fetch users.",
            data: error
        });
    }
};

const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status){
            throw new Error("Status is required");
        }

        const result = await userService.updateUserStatusInService(id as string, status);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: `User status updated to ${status} successfully!`,
            data: result
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Failed to update user status.",
            data: error
        });
    }
};

export const userController = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    updateUserStatus
    

}