import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  fullName: string
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #fullName=:FULL_NAME",
    ExpressionAttributeNames: {
      "#fullName": "full_name",
    },
    ExpressionAttributeValues: {
      ":FULL_NAME": fullName,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
