import { sendMail } from "../config/mailer.js";

export const emailVerification = async (email, loginID, firstName, lastName) => {
const html = `
<div style="width: 70%; margin: 0 auto; background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif; color: #333; text-align: left; border-radius: 10px;">
       <div style="text-align: center; margin-bottom: 20px;">
           <a href="/" style="color: #09544D; font-size: 38px; font-family: 'roboto-serif'; font-weight: 600; line-height: 44.5px; text-decoration: none;" onclick="return false;" target="_blank">FROG🐸🐸🐸🐸🐸🐸</a>
       </div>

       <h2 style="color: #007bff;">Email Verification</h2>
       <p>Dear ${firstName} ${lastName}</p>
       <p>Thank You for registering with us.</p>
       <p>Please use the ID below to log in </p>
       <h1 style="color: #007bff; font-size: 36px; margin: 10px;">${loginID}</h1>
       <p>Please keep this code secure and do not share it with anyone.</p>
       <p>If you did not make this request, please ignore this email.</p>
       <p>Best Regards,<br>FROG🐸🐸🐸🐸🐸🐸🐸🐸🐸</p>
     </div>
   `;
return await sendMail  (
   'Ecommerce<Frogman@gmail.com>',
   email,
   "Email Verification",
   html,  
   "Anythingcomputer@gmail.com" 
   );
}