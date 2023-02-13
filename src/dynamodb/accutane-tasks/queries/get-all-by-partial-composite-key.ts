import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (
  partialCompositeKey: string
): DynamoDB.DocumentClient.QueryInput => {
  const query = {
    TableName: ENV.ACCUTANE_TASKS_TABLE,
    FilterExpression: "begins_with(compositeKey, :COMPOSITE_KEY_PARTIAL)",
    ExpressionAttributeValues: {
      ":COMPOSITE_KEY_PARTIAL": partialCompositeKey,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
