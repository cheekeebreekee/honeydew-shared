import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  state: boolean
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #archived=:ARCHIVED",
    ExpressionAttributeNames: {
      "#archived": "archived",
    },
    ExpressionAttributeValues: {
      ":ARCHIVED": state,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
