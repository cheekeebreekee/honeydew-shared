import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  link: string | null
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #meetingLink=:MEETING_LINK",
    ExpressionAttributeNames: {
      "#meetingLink": "scheduleMeetingLink",
    },
    ExpressionAttributeValues: {
      ":MEETING_LINK": link,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
