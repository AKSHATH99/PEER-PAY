const otpStore = new Map();

export function storeOtp(email, otp) {
    otpStore.set(email, {otp,
        expiresAt: Date.now() + 5 * 60 * 1000
    });
}       

export function verifyOtp(email, otp) {
    if(!email || !otp) {
        return false;
    }
    const storedOtp = otpStore.get(email);

    if (!storedOtp) {
        return false;
    }

    const validOtp = storedOtp.otp === otp && Date.now() < storedOtp.expiresAt;
    if(validOtp){
        otpStore.delete(email);
    }
    return validOtp;
}