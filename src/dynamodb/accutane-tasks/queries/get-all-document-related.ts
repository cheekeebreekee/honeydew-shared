import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (documentId: string): DynamoDB.DocumentClient.QueryInput => {
  const query = {
    TableName: ENV.ACCUTANE_TASKS_TABLE,
    FilterExpression: "contains(compositeKey, :DOCUMENT_ID)",
    ExpressionAttributeValues: {
      ":DOCUMENT_ID": documentId,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
