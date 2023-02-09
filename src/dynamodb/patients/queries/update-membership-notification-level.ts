import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  level: number
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #membership.#notificationLevel=:NOTIFICATION_LEVEL",
    ExpressionAttributeNames: {
      "#membership": "membership",
      "#notificationLevel": "notificationLevel",
    },
    ExpressionAttributeValues: {
      ":NOTIFICATION_LEVEL": level,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
