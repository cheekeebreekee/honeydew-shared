import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (email: string): DynamoDB.DocumentClient.ScanInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    FilterExpression: "#email = :EMAIL",
    // FilterExpression: "begins_with(compositeKey, :id)",
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
