import { prisma } from "../../lib/prisma"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET;


const createUserIntoDB = async (payload : any) => {

    const { password, ...rest } = payload;

    const hashPassword = await bcrypt.hash(password, 8);

    const result = await prisma.user.create({
        data: {
            ...rest,
            email: rest.email.toLowerCase(),
            password: hashPassword
        }
    });
    console.log(result);
    return result;
}

const loginUserIntoDB = async (payload : any) => {

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });

    if(!user){
        throw new Error("User not found!");
    }

    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        image: user.image
    }

    const token = jwt.sign({userData}, secret!, {expiresIn: "3d"});

    return{
        token,
        user
    }
}

export const AuthService = {
    createUserIntoDB,
    loginUserIntoDB   
}