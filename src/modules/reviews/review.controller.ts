import { Request, Response } from "express";
import { reviewServices } from "./review.service";
import sendResponse from "../../utils/sendResponse";

const createReview = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const result = await reviewServices.createReviewInService(userId, req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Review posted successfully.",
            data: result
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Review posting failed.",
            data: error
        });
    }
};

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await reviewServices.getAllReviewsInService();
    sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Reviews retrieved successfully.",
            data: result
        });
  } catch (error) {
    sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Review retrieval failed.",
            data: error
        });
  }
};


export const reviewController = {
    createReview,
    getAllReviews

}