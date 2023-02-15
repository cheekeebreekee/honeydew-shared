import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (id: string): DynamoDB.DocumentClient.GetItemInput => {
  const query = {
    TableName: ENV.ADMINS_TABLE,
    Key: {
      id,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
