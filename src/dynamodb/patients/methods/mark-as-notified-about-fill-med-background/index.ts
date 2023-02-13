import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { logInfo } from "../../../../utils/logger";
import updateMedBackgroundFillingNotificationStatusQuery from "../../queries/update-med-background-filling-notification-status";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateMedBackgroundFillingNotificationStatus = async (
  id: string,
  status: boolean
) => {
  logInfo(
    "Update med background filling notification status of the patient in DB",
    { id, status }
  );
  const { Attributes } = await dynamoDb
    .update(updateMedBackgroundFillingNotificationStatusQuery(id, status))
    .promise();
  logInfo("Patient has been successfully updated in DB");
  return Attributes as Patient;
};
