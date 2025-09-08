import { connectDB } from "@/db/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { firstName, lastName, department, role, email, password } = reqBody;

        if (!firstName || !lastName || !department || !role || !email || !password) {
            return NextResponse.json({ message: "Please provide all the fields" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            department,
            role,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        return NextResponse.json({ message: "Created user successfully", success: true, newUser }, { status: 201 });

    } catch (err: any) {
        return NextResponse.json({ message: "Server Error! ", error: err.message }, { status: 500 });
    }
}