import dotenv from "dotenv";
import { createTransport } from "nodemailer";

dotenv.config()

const transport = createTransport ({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.BREVO_LOGIN,
        pass:process.env.BREVO_PASSWORD
        // user: "nasiruyusuf59@gmail.com",
        // pass:"JzXEfHK9Atd5cwV7"
    }
});

transport.verify((error, success) => {
    if (error) {
     console.log(error);   
    } else {
        console.log(success);
    }
})

export const sendMail = async (from, to, subject, html, replyTo) => {
    return new Promise((resolve, reject) => {
        transport.sendMail({from, to, subject, html, replyTo}, (err, info) => {
            if (err) {
                console.log('Mail error', err)
                return reject (err)
            }
            resolve(info)
        })
    })
};