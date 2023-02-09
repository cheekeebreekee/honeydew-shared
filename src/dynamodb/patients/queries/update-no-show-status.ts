import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  status: boolean
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #isAppointmentSkipped=:IS_APPOINTMENT_SKIPPED",
    ExpressionAttributeNames: {
      "#isAppointmentSkipped": "isAppointmentSkipped",
    },
    ExpressionAttributeValues: {
      ":IS_APPOINTMENT_SKIPPED": status,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
