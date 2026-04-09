import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const sendSMS = async ({ phone, message }) => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    throw new Error("Twilio credentials are missing");
  }

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log(`SMS sent to ${phone}`);
  } catch (error) {
    console.error(`Failed to send SMS to ${phone}:`, error.message);
    throw new Error("SMS sending failed");
  }
};

export default sendSMS;