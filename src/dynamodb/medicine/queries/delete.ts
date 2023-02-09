import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (id: string): DynamoDB.DocumentClient.DeleteItemInput => {
  const query = {
    TableName: ENV.MEDICINE_TABLE,
    Key: {
      id,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
