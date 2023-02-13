import twilio from "twilio";
import { ENV } from "../constants";

export const twilioClient = twilio(
  ENV.TWILIO_ACCOUNT_SID,
  ENV.TWILIO_AUTH_TOKEN
);
