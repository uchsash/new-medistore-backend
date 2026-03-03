import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt, { JwtPayload } from "jsonwebtoken"
import { prisma } from "../lib/prisma";

declare global {
    namespace Express{
        interface Request{
            user?: JwtPayload;
        }
    }
}

export enum UserRole {
    admin = "ADMIN",
    seller = "SELLER",
    customer = "CUSTOMER"
}

const auth = (...roles: UserRole[]) => {
    console.log(roles);
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            //Is token exists?
            //verify token
            //Is decoder user exists?
            //Is user status active?
            // then check role

            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new Error("Token missing or invalid format!");
            }

            const token = authHeader.split(' ')[1];

            if (!token) {
                throw new Error("Token missing!");
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            // console.log("From Decoded", decoded);
            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.userData.email
                }
            });

            if(!userData){
                throw new Error("Unauthorized! Please, login.");
            }

            if(userData.status != "ACTIVE"){
                throw new Error("Account Suspended. Please, contact admin.");
            }

            if(roles.length && !roles.includes(decoded.userData.role)){
               throw new Error("You are not authorized. Please, contact admin.");
            }
            
            req.user = decoded.userData;
            // console.log("From line 63:", req.user);
            next();
        }
        catch (error) {
            next(error);
        }
    }
};

export default auth;