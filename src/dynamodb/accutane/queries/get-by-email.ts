import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (email: string): DynamoDB.DocumentClient.ScanInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    FilterExpression: "#email = :EMAIL",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":EMAIL": email,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
