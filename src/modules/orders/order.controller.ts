import { Request, Response } from "express";
import { orderService } from "./order.service";
import paginationAndSortingHelper from "../../helpers/paginationSortingHelper";
import sendResponse from "../../utils/sendResponse";

const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error("Unauthorized")
        };

        const result = await orderService.createOrderInService(userId, req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Order placed successfully.",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Could not place order.",
        });
    }
};

const getMyOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error("Unauthorized.");
        }

        const result = await orderService.getMyOrdersInService(userId);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order history retrieved successfully.",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Order retrive failed.",
        });
    }
};

const getOrderById = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const userId = req.user?.id;
        const userRole = req.user?.role;

        if (!userId || !userRole) {
            throw new Error("Authentication required.");
        }

        const result = await orderService.getOrderByIdInService(orderId as string, userId, userRole);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order details retrieved successfully.",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Order details retrieve failed.",
        });
    }
};

const getSellerOrders = async (req: Request, res: Response) => {
    try {
        const sellerId = req.user?.id;
        if (!sellerId) throw new Error("Unauthorized access.");

        const result = await orderService.getSellerOrdersInService(sellerId);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Seller orders retrieved successfully.",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Failed to fetch Seller's orders.",
        });
    }
};

const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const userId = req.user?.id;
        const userRole = req.user?.role;

        if (!userId || !userRole) {
            throw new Error("Unauthorized");
        }
        if (!orderId) {
            throw new Error("Order doesn't exists.");
        }

        const result = await orderService.updateOrderStatusInService(orderId as string, status, userId, userRole);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: `Order status updated to ${status} successfully.`,
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Order status update failed.",
        });
    }
};

const getAllOrdersForAdmin = async (req: Request, res: Response) => {
    try {

        const { sortBy, sortOrder } = paginationAndSortingHelper(req.query);
        const allowedSortFields = ['status', 'totalAmount', 'createdAt'];
        const finalSortBy = allowedSortFields.includes(sortBy as string) ? sortBy : "status";

        const result = await orderService.getAllOrdersForAdminInService({finalSortBy, sortOrder});

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "All the orders retrieved successfully.",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Failed to fetch all the orders.",
        });
    }
};

export const orderController = {
    createOrder,
    getMyOrders,
    getOrderById,
    getSellerOrders,
    updateOrderStatus,
    getAllOrdersForAdmin
}