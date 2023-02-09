import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { Patient } from "../../../../../types/Patient";
import { logInfo } from "../../../../../utils/logger";

export default (
  user: Patient,
  status: string,
  cancelReason?: string
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id: user.id,
    },
    UpdateExpression: "set #appointmentStatus=:APPOINTMENT_STATUS",
    ExpressionAttributeNames: {
      "#appointmentStatus": "appointmentStatus",
    },
    ExpressionAttributeValues: {
      ":APPOINTMENT_STATUS": [
        {
          status,
          timestamp: Date.now(),
          reason: cancelReason || undefined,
        },
        ...(user.appointmentStatus || []),
      ],
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
