import { DynamoDB } from "aws-sdk";
import { Provider } from "../../../../types/Provider";
import { logInfo } from "../../../../utils/logger";
import createProviderQuery from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (provider: Provider) => {
  logInfo("Create provider in DB", provider);
  await dynamoDb.put(createProviderQuery(provider)).promise();
  logInfo("Provider has been created successfully");
};
