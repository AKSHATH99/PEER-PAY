import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/model/UserModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(request) {
    await dbConnect();

    const { email, password } = await request.json();

    try {
        // Find user by email
        const user = await User.findOne({ Email: email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return NextResponse.json(
            { 
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    name: user.Name,
                    email: user.Email
                }
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}