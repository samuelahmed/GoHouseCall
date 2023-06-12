"use strict";
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export async function sendLoginEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.GOOGLE_EMAIL,
      pass: env.GOOGLE_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,
    subject: "Sending with mutation",
    text: "Hello world?",
    html: `<b>Click here to activate your account live: http://www.gohousecall/verify/${token}</b>
    <b>Click here to activate your account dev: http://localhost:3000/verify/${token}</b>`,
  });

  //testing stuff
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
