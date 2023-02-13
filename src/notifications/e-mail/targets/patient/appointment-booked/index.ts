import { SES } from "aws-sdk";
import { Patient } from "../../../../../types/Patient";
import { logInfo } from "../../../../../utils/logger";
import { DynamoDBService } from "../../../../../dynamodb";
import { appointmentBoookedEmailTemplate } from "../../../templates/appointment-booked";

const sesPublisher = new SES({ region: "us-east-1" });

export const appointmentBooked = async (patient: Patient) => {
  logInfo("Sending email message to patient about booked appointment");
  const provider = await DynamoDBService.providers.get(patient.provider_id);
  logInfo("Provider to notify");
  const query = appointmentBoookedEmailTemplate(patient, provider);

  await sesPublisher.sendEmail(query).promise();
  logInfo("Email message sent successfully");
};
