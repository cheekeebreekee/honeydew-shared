import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { Provider } from "../../../types/Provider";
import { logInfo } from "../../../utils/logger";

export default (provider: Provider): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.PROVIDERS_TABLE,
    Item: provider,
  };
  logInfo("DynamoDB query", query);
  return query;
};
