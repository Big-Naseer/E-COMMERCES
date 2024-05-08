export function generateRandomNumber(digits){
    const min = Math.pow(10, digits-1)
    const max = Math.pow(10, digits)-1
    return Math.floor(Math.random()* (min-max + 1)+ min)
};

export const generateOTP = (otpLength = 6) => {
    const digits = '0123456789';
    let otp = '';
 
    for (let i = 0; i < otpLength; i++) {
       otp += digits(Math.floor(Math.random() * 10));
    }
    return otp
 };
 
 export const hashOtp = (otp) => {
    const hash = cryptoHash.createHash('sha256');
    hash.update(otp);
    return hash.digest('hex');
 }
 
 export const compareHashedValues = (value, hashedValue) => {
    if (typeof value !== 'string' || typeof hashedValue !== 'string' ) {
       return false
    }
 
    const hash = cryptoHash.createHash('sha256');
    hash.update(value);
    const hashedInput = hash.digest('hex')
    
    return hashedInput === hashedValue
};