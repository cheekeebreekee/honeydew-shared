import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (patientId: string): DynamoDB.DocumentClient.QueryInput => {
  const query = {
    TableName: ENV.ACCUTANE_DOCUMENTS_TABLE,
    FilterExpression: "begins_with(compositeKey, :patientId)",
    ExpressionAttributeValues: {
      ":patientId": patientId,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
