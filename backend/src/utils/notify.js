import nodemailer from "nodemailer";
import twilio from "twilio";

const {
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
  TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM,
} = process.env;

let mailer;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  mailer = nodemailer.createTransport({
    host: SMTP_HOST, port: Number(SMTP_PORT||587), secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

let smsClient;
if (TWILIO_SID && TWILIO_AUTH_TOKEN) {
  smsClient = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
}

export async function sendEmailOTP(to, code){
  if (mailer) {
    await mailer.sendMail({
      from: `"ShareRide" <${SMTP_USER}>`,
      to, subject: "Your ShareRide OTP",
      text: `Your OTP is ${code}`,
      html: `<p>Your OTP is <b>${code}</b></p>`,
    });
  } else {
    console.log("[EMAIL MOCK]", to, "OTP:", code);
  }
}

export async function sendSmsOTP(to, code){
  if (smsClient && TWILIO_FROM) {
    await smsClient.messages.create({
      body: `ShareRide OTP: ${code}`, from: TWILIO_FROM, to,
    });
  } else {
    console.log("[SMS MOCK]", to, "OTP:", code);
  }
}
