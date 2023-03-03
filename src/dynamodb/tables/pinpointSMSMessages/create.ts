import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { config } from "../../../shared";
import { logDebug, logInfo } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

type PinpointSMSMessageRecordCreateProps = {
  messageId: string;
  patientId: string;
};

export const create = async ({ messageId, patientId }: PinpointSMSMessageRecordCreateProps) => {
  logInfo(`Create Pinpoint SMS message record in DB`, { messageId, patientId });
  const now = new Date();

  const query = {
    TableName: config.getSharedValue("pinpointSMSMessagesTable"),
    Item: marshall({
      messageId,
      patientId,
      ttl: now.setDate(now.getDate() + 7) / 1000,
    }),
  };

  logDebug("Create patient query", query);

  await dynamoDb.putItem(query);

  logDebug("Pinpoint SMS message record has been created successfully");
};
