import userSchema from "@/schemas/user.schema";
import mongoose from "mongoose";

export interface IUser {
    name?: string;
    gender?: 'male' | "female" | 'other';
    dob?: Date;
    address?: string; // analyze
    email: string;
    phone_number: string;
    password: string;
    status?: 'active' | 'suspended' | "banned"; // analyze
    role?: 'customer' | 'admin'; // analyze
    lastLogin?: Date,
    profile_picture?: string;
    createAt?: Date;
    updateAd?: Date;
    isDelete?: boolean;
    deleteAt?: Date
}

// Define user model
const UserModel = mongoose.model<IUser>("user", userSchema)
export default UserModel