import { DynamoDB } from "aws-sdk";
import updateChatTimeQuery from "../../queries/update-chat-time";
import { logInfo } from "../../../../../../utils/logger";
import { ChatInfo, Patient } from "../../../../../../types/Patient";
import { DynamoDBService } from "../../../..";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateChatTime = async (
  id: string,
  role: string,
  timestamp: string
) => {
  logInfo("Update chat time of the patient in DB", { id, role, timestamp });
  const patient = await DynamoDBService.patients.get(id);
  logInfo("Patient to update", patient);
  const chatPayload: ChatInfo = {
    ...(patient.chatInfo || {}),
    lastMessageSentTimestamp: timestamp,
    lastMessageSentByRole: role,
  };

  logInfo("Updated chat payload data", chatPayload);

  const { Attributes } = await dynamoDb
    .update(updateChatTimeQuery(id, chatPayload))
    .promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
