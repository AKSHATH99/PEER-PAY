import { redis } from "./Redis";

export async function storeOtp(email, otp) {
    await redis.set(`otp:${email}`, otp, { ex: 300 });
}       

export async function verifyOtp(email, otp) {
    const storedOtp = await redis.get(`otp:${email}`);
    console.log("ver otp",email)
    console.log("stored>>",storedOtp)
    console.log("mine",otp)
    if(storedOtp==null){
        return "timeout"
    }
    return storedOtp.toString() === otp.toString();
}