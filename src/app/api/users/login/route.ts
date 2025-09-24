import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/database";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

const generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
}

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({ message: "Please provide both fields." }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found!" }, { status: 404 });
        }

        const isUser = await bcryptjs.compare(password, user.password);
        if (!isUser) {
            return NextResponse.json({ message: "Incorrect password!" }, { status: 400 });
        }

        // creating a token
        const tokenPayload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email
        }

        const token = generateToken(tokenPayload);

        const response = NextResponse.json({ message: "Login successfull", success: true, user }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}