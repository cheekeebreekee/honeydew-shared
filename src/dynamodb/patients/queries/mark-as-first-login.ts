import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (id: string): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #firstLogin=:FIRST_LOGIN",
    ExpressionAttributeNames: {
      "#firstLogin": "first_log_in",
    },
    ExpressionAttributeValues: {
      ":FIRST_LOGIN": true,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
