import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (id: string, status: boolean): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #notifiedAboutUpcomingAppointment=:NOTIFIED",
    ExpressionAttributeNames: {
      "#notifiedAboutUpcomingAppointment": "notifiedAboutUpcomingAppointment",
    },
    ExpressionAttributeValues: {
      ":NOTIFIED": status,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
