"use strict";
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";



// async..await is not allowed in global scope, must use a wrapper
export async function sendLoginEmail( email: string ) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 587,
    auth: {
        user: env.GOOGLE_EMAIL,
        pass: env.GOOGLE_PASS
    }
  });

 

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Sending with mutation", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//this is just for testing and causes it to send an email on server start
// sendLoginEmail().catch(console.error);

