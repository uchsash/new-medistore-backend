import { Request, Response } from "express";
import { categoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";
import paginationAndSortingHelper from "../../helpers/paginationSortingHelper";


const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.createCategoryInService(req.body.name);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Category is created Successfully.",
            data: result
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Category creation failed",
        });
    }
}

const getAllCategory = async (req: Request, res: Response) => {
    try {
        const { sortBy, sortOrder } = paginationAndSortingHelper(req.query);

        const allowedSortFields = ['name', 'createdAt'];
        const finalSortBy = allowedSortFields.includes(sortBy as string) ? sortBy : "name";
        
        const result = await categoryService.getAllCategoryInService(finalSortBy, sortOrder);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Categories fetched successfully.",
            data: result
        });
    } catch (error) {

        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Categories fetched unsuccessful.",
        });
    }
};





export const categoryController = {
    createCategory,
    getAllCategory

}