import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/model/UserModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export async function POST(request) {
  await dbConnect();

  const { name, email, password, username, phone } = await request.json();
    console.log(name, email, password, username, phone)
  const user = await User.findOne({ Email: email,Phone: phone });
  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const uniqueUsername = await User.findOne({ UserName: username });
  if (uniqueUsername) {
    return NextResponse.json(
      { message: "Username already exists. Try another" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);   

  const newUser = await User.create({
    Name: name,
    Email: email,
    Password: hashedPassword,
    UserName: username,
    Phone: phone,
    isAdmin: false,
    isVerified: true,  
  });

  // Generate JWT token
  const token = jwt.sign(
    { userId: newUser._id, email: newUser.Email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return NextResponse.json(
    { message: "User created successfully", token },
    { status: 201 }
  );
}
