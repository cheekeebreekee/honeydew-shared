import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../../constants";
import { Provider } from "../../../../../../types/Provider";
import { logInfo, logWarn } from "../../../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAll = async (): Promise<Provider[]> => {
  logInfo("Getting all providers from DB");
  const { Items } = await dynamoDb
    .scan({ TableName: ENV.PROVIDERS_TABLE })
    .promise();

  if (Items) {
    logInfo("Found providers count", { count: Items.length });
    return Items as Provider[];
  }

  logWarn("No providers found in DB");
  return [];
};
