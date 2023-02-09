import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (id: string, updatedTime: number) => {
  logInfo("Query input", { id, updatedTime });
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #ttl=:TTL",
    ExpressionAttributeNames: {
      "#ttl": "ttl",
    },
    ExpressionAttributeValues: {
      ":TTL": updatedTime,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
