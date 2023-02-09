import { DynamoDB } from "aws-sdk";
import { AccutaneNotification } from "../../../../../../types/AccutaneNotification";
import { logError, logInfo } from "../../../../../../utils/logger";
import getAccutaneNotificationsQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string): Promise<AccutaneNotification> => {
  logInfo("Getting accutane notification record from DB", { id });
  const { Item } = await dynamoDb
    .get(getAccutaneNotificationsQuery(id))
    .promise();

  if (!Item) {
    const message = `Accutane notification record with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo(`Accutane notification record found`, Item);

  return Item as AccutaneNotification;
};
