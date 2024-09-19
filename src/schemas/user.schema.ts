import { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String},
    gender: { type: String, enum: ["male", "female", "other"], default: 'other' },
    dob: { type: Date },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, unique: true, required: true },
    password: { type: String,required:true },
    status: { String, enum: ["active", "suspended", "banned"], default: "active" },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    lastLogin: { type: Date, default: null },
    profile_picture: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    isDelete: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
})

export default userSchema