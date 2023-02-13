import { DynamoDB } from "aws-sdk";
import { AccutaneTask } from "../../../../types/AccutaneTask";
import { logError, logInfo } from "../../../../utils/logger";
import getAccutaneTaskQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string): Promise<AccutaneTask> => {
  logInfo("Getting accutane task record from DB", { id });
  const { Item } = await dynamoDb.get(getAccutaneTaskQuery(id)).promise();

  if (!Item) {
    const message = `Accutane task record with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo(`Accutane task record found`, Item);

  return Item as AccutaneTask;
};
