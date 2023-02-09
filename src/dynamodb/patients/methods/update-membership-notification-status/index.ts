import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { logInfo } from "../../../../../../utils/logger";
import updateMembershipNotificationLevelQuery from "../../queries/update-membership-notification-level";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateMembershipNotificationLevel = async (
  id: string,
  level: number
) => {
  logInfo("Updating membership notification level of the patient in DB", {
    id,
    level,
  });
  const { Attributes } = await dynamoDb
    .update(updateMembershipNotificationLevelQuery(id, level))
    .promise();

  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
