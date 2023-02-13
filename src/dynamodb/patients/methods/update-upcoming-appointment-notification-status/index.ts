import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { logInfo } from "../../../../utils/logger";
import updateUpcomingAppointmentNotificationStatusQuery from "../../queries/update-upcoming-appointment-notification-status";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateUpcomingAppointmentNotificationStatus = async (
  id: string,
  status: boolean
) => {
  logInfo("Updating patient's upcoming appointment notification status in DB", {
    id,
    status,
  });
  const { Attributes } = await dynamoDb
    .update(updateUpcomingAppointmentNotificationStatusQuery(id, status))
    .promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
