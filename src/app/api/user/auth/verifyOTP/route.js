import { Resend } from "resend";
import { storeOtp, verifyOtp } from "@/app/lib/otpStore";
import User from "@/app/model/UserModal";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const { email, otp } = await request.json();
  const isVerified = await verifyOtp(email, otp);


  try {
    if (isVerified=="timeout") {
      return NextResponse.json(
        { message: "OTP timeout. Resend OTP" },
        { status: 400 }
      );
    }else if(!isVerified){
      return NextResponse.json(
        { message: "Some error while otp verification" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "OTP verified" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error occured while otp verification" }, { status: 500 });
  }
}
