import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { ChatInfo } from "../../../types/Patient";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  chatInfo: Partial<ChatInfo>
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #chatInfo=:CHAT_INFO",
    ExpressionAttributeNames: {
      "#chatInfo": "chatInfo",
    },
    ExpressionAttributeValues: {
      ":CHAT_INFO": chatInfo,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
