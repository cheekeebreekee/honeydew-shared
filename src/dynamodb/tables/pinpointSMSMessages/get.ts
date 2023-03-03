import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "../../../shared";
import { PinpointSMSMessage } from "../../../types/PimnpointSMSMessage";
import { logDebug, logError, logInfo } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const get = async (messageId: string): Promise<PinpointSMSMessage> => {
  logInfo("Getting pinpoint SMS message record from DB", { messageId });

  const query = {
    TableName: config.getSharedValue("pinpointSMSMessagesTable"),
    Key: marshall({
      id: messageId,
    }),
  };

  logDebug("Getting pinpoint SMS message record from DB query", query);

  const { Item } = await dynamoDb.getItem(query);

  if (!Item) {
    const message = `Pinpoint SMS message record with message ID ${messageId} is not found`;
    logError(message);
    throw new Error(message);
  }

  logDebug("Pinpoint SMS message record found", Item);

  return unmarshall(Item) as PinpointSMSMessage;
};
