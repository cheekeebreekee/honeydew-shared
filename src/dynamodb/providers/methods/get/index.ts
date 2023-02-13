import { DynamoDB } from "aws-sdk";
import { Provider } from "../../../../types/Provider";
import { logError, logInfo } from "../../../../utils/logger";
import getProviderQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string): Promise<Provider> => {
  logInfo("Getting provider from DB", { id });
  const { Item } = await dynamoDb.get(getProviderQuery(id)).promise();

  if (!Item) {
    const message = `Provider with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Provider found", Item);

  return Item as Provider;
};
