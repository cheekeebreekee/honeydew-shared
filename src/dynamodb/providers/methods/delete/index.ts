import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../../../utils/logger";
import deleteProviderQuery from "../../queries/delete";

const dynamoDb = new DynamoDB.DocumentClient();

export const remove = async (id: string) => {
  logInfo("Delete provider from DB", { id });
  await dynamoDb.delete(deleteProviderQuery(id)).promise();
  logInfo("Provider has been deleted successfully");
};
