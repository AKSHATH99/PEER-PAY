import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/model/UserModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { serialize } from "cookie";

export async function POST(request) {
    await dbConnect();

    const { email, password } = await request.json();
    // console.log(email,password)

    try {
        // Find user by email
        const user = await User.findOne({ Email: email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentialssss" },
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

        const response =  NextResponse.json(
            { 
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.Name,
                    email: user.Email
                }
            },
            { status: 200 }
        );
        response.headers.set(
            'Set-Cookie',
            serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 1 day
            })
        );

        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}