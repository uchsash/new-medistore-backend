import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
import bcrypt from "bcryptjs";


async function seedAdmin() {
    try {
        if (!process.env.MSDB_ADMIN || !process.env.MSDB_ADMIN_EMAIL) {
            throw new Error("Missing Admin Environment Variables!");
        }

        const password = process.env.MSDB_ADMIN_PASS;
        if (!password) {
            throw new Error("Admin password is not defined in .env file.");
        }

        const hashPassword = await bcrypt.hash(password, 8);

        console.log("--- Admin Seeding Started ---");

        const adminData = {
            name: process.env.MSDB_ADMIN,
            email: process.env.MSDB_ADMIN_EMAIL,
            role: UserRole.admin,
            password: hashPassword,
            emailVerified: true
        }

        console.log("--- Checking Admin Exists or Not ---");
        
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });

        if (existingUser) {
            throw new Error("User already exists!");
        }

        const admin = await prisma.user.create({
            data: adminData
        });

        if(admin){
            console.log("--- Admin Created and Email verified---");
        }

        console.log("--- Success! ---");
    }
    catch (err) {
        console.log(err);
    }
}

seedAdmin();