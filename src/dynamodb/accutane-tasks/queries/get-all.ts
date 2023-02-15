import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (keyParticle: string): DynamoDB.DocumentClient.QueryInput => {
  const query = {
    TableName: ENV.ACCUTANE_TASKS_TABLE,
    FilterExpression: "begins_with(compositeKey, :id)",
    ExpressionAttributeValues: {
      ":id": keyParticle,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
