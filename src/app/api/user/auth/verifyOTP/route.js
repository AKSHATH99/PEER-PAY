import { Resend } from "resend";
import { storeOtp, verifyOtp } from "@/app/lib/otpStore";
import User from "@/app/model/UserModal";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export  async function POST(request) {
  const { email, otp } = await request.json();
  const isVerified = verifyOtp(email, otp);

  return NextResponse.json(
    { message: "OTP verified" },
    { status: 200 }
  );
}
