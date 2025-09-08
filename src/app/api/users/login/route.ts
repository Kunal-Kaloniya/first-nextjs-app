import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/database";
import bcryptjs from "bcryptjs";

connectDB();

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

        return NextResponse.json({ message: "Login successfull", success: true, user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}