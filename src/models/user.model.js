import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    department: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'committee', 'faculty'],
        default: 'faculty',
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,

    verifyToken: String,
    verifyTokenExpiry: Date,
    
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;