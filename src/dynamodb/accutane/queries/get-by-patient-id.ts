import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (patientId: string): DynamoDB.DocumentClient.QueryInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    KeyConditionExpression: "#patientId = :ID",
    ExpressionAttributeNames: {
      "#patientId": "patientId",
    },
    ExpressionAttributeValues: {
      ":ID": patientId,
    },
    IndexName: "patientIdIndex",
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
