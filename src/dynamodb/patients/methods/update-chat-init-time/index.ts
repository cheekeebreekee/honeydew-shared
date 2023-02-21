import { DynamoDB } from "aws-sdk";
import updateChatQuery from "../../queries/update-chat-time";
import { logInfo } from "../../../../utils/logger";
import { ChatInfo, Patient } from "../../../../types/Patient";
import { UpdateChatInitTimestampPayload } from "../../../../types/Payload";
import { DynamoDBService } from "../../../index";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateChatInitTime = async ({
  id,
  identity,
  initTimestamp,
  highlight,
}: UpdateChatInitTimestampPayload) => {
  logInfo("Update chat init time of the patient in DB", {
    id,
    identity,
    initTimestamp,
    highlight,
  });
  const patient = await DynamoDBService.patients.get(id);

  logInfo("Patient to update", patient);

  const chatPayload: ChatInfo = {
    ...(patient.chatInfo || {}),
    [identity]: {
      chatInitTimestamp: initTimestamp || patient.chatInfo?.[identity]?.chatInitTimestamp,
      highlight: highlight || patient.chatInfo?.[identity]?.highlight,
    },
    conversationId: patient.chatInfo?.conversationId as string,
  };

  logInfo("Updated chat payload data", chatPayload);

  const { Attributes } = await dynamoDb.update(updateChatQuery(id, chatPayload)).promise();

  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
