"use strict";
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export async function sendLoginEmail(email: string, token: string, subject: string) {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.GOOGLE_EMAIL,
      pass: env.GOOGLE_PASS,
    },
  });

  await transporter.sendMail({
    from: '"House Call" <HouseCallAutomatedSystem@housecall.com>',
    to: email,
    subject: subject,
    // text: "Hello world?",
    html: `<p>Click here to activate your account live: http://www.gohousecall.com/verify/${token}</p>
    <p>Click here to activate your account dev: http://localhost:3000/verify/${token}</p>`,
  });

  //activate below to test email in console
  // const info = await transporter.sendMail({
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
