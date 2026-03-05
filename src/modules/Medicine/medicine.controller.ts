import { Request, Response } from "express";
// import paginationAndSortingHelper from "../../helpers/paginationSortingHelper";
import { medicineService } from "./medicine.service";
import sendResponse from "../../utils/sendResponse";
import paginationAndSortingHelper from "../../helpers/paginationSortingHelper";


const createMedicine = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized! Only sellers can create medicine."
            })
        }
        const result = await medicineService.createMedicineInService(req.body, user.id);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Medicine is created successfully.",
            data: result
        });
    }
    catch (error) { 
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Medicine creation failed.",
        });
    }
};

const getAllMedicine = async (req: Request, res: Response) => {
    try {
        //Search
        const { search } = req.query;
        const searchString = typeof search === 'string' ? search : undefined;

        //Sort
        const { page, limit, skip, sortBy, sortOrder } = paginationAndSortingHelper(req.query);
        const allowedSortFields = ['name', 'price', 'manufacturer', 'stock', 'createdAt'];
        const finalSortBy = allowedSortFields.includes(sortBy as string) ? sortBy : "createdAt";

        //Filter by Seller
        const sellerId = req.query.sellerId as string | undefined;

        //Filter by Category
        const categoryId = req.query.categoryId as string | undefined;

        //Main Logic
        const result = await medicineService.getAllMedicineInService({ search: searchString, page, limit, skip, finalSortBy, sortOrder, sellerId, categoryId });
        
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicines are feteched successfully.",
            data: result
        });
    }
    catch (err) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Medicine retrival failed.",
        });
    }
};

const getMyMedicine = async (req: Request, res: Response) => {
    try {
        const currentSellerId = req.user?.id;

        if (!currentSellerId) {
            throw new Error("You must be logged in to view your added medicines.");
        }

        //Search
        const { search } = req.query;
        const searchString = typeof search === 'string' ? search : undefined;

        //Sort
        const { page, limit, skip, sortBy, sortOrder } = paginationAndSortingHelper(req.query);
        const allowedSortFields = ['name', 'price', 'manufacturer', 'stock', 'createdAt'];
        const finalSortBy = allowedSortFields.includes(sortBy as string) ? sortBy : "createdAt";

        //Filter by Category
        const categoryId = req.query.categoryId as string | undefined;

        //Main Logic
        const result = await medicineService.getAllMedicineInService({ search: searchString, page, limit, skip, finalSortBy, sortOrder, sellerId: currentSellerId, categoryId });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicines are feteched successfully.",
            data: result
        });
    }
    catch (err) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Medicine retrival failed.",
        });
    }
};

const getMedicineById = async (req: Request, res: Response) => {
    try {
        const { medId } = req.params;

        if (!medId) {
            throw new Error("Medicine Id is required!");
        }

        const result = await medicineService.getMedicineByIdInService(medId as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicine retrieved by Id successfully.",
            data: result
        });
    }
    catch (err) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Medicine retrive by Id failed.",
        });
    }
};

const updateMedicine = async (req: Request, res: Response) => {
    try {
        const { medId } = req.params;
        const currentSellerId = req.user?.id;
        const currentSellerRole = req.user?.role;

        if (!currentSellerId || !currentSellerRole) {
            throw new Error("You must be logged in to update medicine.");
        }

        const result = await medicineService.updateMedicineInService(medId as string, currentSellerId, currentSellerRole, req.body);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicine updated successfully.",
            data: result
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Medicine update failed.",
        });
    }
};

const deleteMedicine = async (req: Request, res: Response) => {
    try {
        const { medId } = req.params;
        const currentSellerId = req.user?.id;
        const currentSellerRole = req.user?.role;

        if (!currentSellerId || !currentSellerRole) {
            throw new Error("You must be logged in to delete medicine.");
        }

        const result = await medicineService.deleteMedicineInService(medId as string, currentSellerId, currentSellerRole);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Medicine deleted successfully.",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Medicine deletion failed.",
        });
    }
};


export const medicineController = {
    createMedicine,
    getAllMedicine,
    getMyMedicine,
    getMedicineById,
    updateMedicine,
    deleteMedicine
}