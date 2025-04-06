import {resend} from "@/app/lib/Resend";
import { NextRequest, NextResponse } from "next/server";
import otpStore, { storeOtp } from "@/app/lib/otpStore";
import User from "@/app/model/UserModal";

function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}

export async function POST(request) {
    const { email } = await request.json();
   

    try {

        const existingUser = await User.findOne({Email: email})
        // console.log( "finding usr",existingUser)

        if(existingUser){
            // console.log("yes user exist")
            return NextResponse.json({ message: 'User with this email already exist. Please login ' }, { status: 400 });
        }

        const otp = generateOtp();

        await storeOtp(email , otp);

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'PEERPAY - Email verification',
            react: (
                <div>
                    <p>Your OTP is: <strong>${otp}</strong></p><p>It expires in 5 minutes.</p>
                </div>
            )
        });
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}