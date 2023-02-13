import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (patientId: string): DynamoDB.DocumentClient.ScanInput => {
  const query = {
    TableName: ENV.ACCUTANE_NOTIFICATIONS_TABLE,
    FilterExpression: "#patientId = :ID",
    ExpressionAttributeNames: {
      "#patientId": "patientId",
    },
    ExpressionAttributeValues: {
      ":ID": patientId,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
