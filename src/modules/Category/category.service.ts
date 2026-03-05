import { prisma } from "../../lib/prisma";


const createCategoryInService = async (name: string) => {
    const result = await prisma.category.create({
        data: {
            name
        }
    });

    return result;
};

const getAllCategoryInService = async (sortBy: string, sortOrder: string) => {
    const result = await prisma.category.findMany({
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            _count: {
                select: {
                    medicines: true
                }
            }
        }
    });

    return result;
};

const getCategoryByIdInService = async (catId: string, sortBy: string, sortOrder: string) => {
    const result = await prisma.category.findUniqueOrThrow({
        where: {
            id: catId
        },
        include: {
            medicines: {
                orderBy: {
                    [sortBy]: sortOrder
                }
            },
            _count: {
                select: {
                    medicines: true
                }
            }
        }
    });

    return result;
};

export const categoryService = {
    createCategoryInService,
    getAllCategoryInService,
    getCategoryByIdInService
}