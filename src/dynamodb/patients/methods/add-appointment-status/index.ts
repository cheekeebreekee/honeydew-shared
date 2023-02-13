import { DynamoDB } from "aws-sdk";
import { Patient } from "../../../../types/Patient";
import { logInfo } from "../../../../utils/logger";
import updateAppointmentStatusQuery from "../../queries/update-appointment-status";

const dynamoDb = new DynamoDB.DocumentClient();

export const addAppointmentStatus = async (
  patient: Patient,
  status: string,
  cancelReason?: string
) => {
  logInfo("Adding appointment status to DB", { patient, status, cancelReason });
  const { Attributes } = await dynamoDb
    .update(updateAppointmentStatusQuery(patient, status, cancelReason))
    .promise();
  logInfo("New appointment status has been added to patient in DB");
  return Attributes as Patient;
};
