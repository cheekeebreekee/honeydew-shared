import { DynamoDB } from "aws-sdk";
import { AccutaneNotification } from "../../../../types/AccutaneNotification";
import { logInfo } from "../../../../utils/logger";
import createAccutaneNotification from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (accutaneNotification: AccutaneNotification) => {
  logInfo("Creating accutane notification in DB", accutaneNotification);
  await dynamoDb.put(createAccutaneNotification(accutaneNotification)).promise();
  logInfo("Created successfully");
};
