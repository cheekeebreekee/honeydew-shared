import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { AccutaneNotification } from "../../../types/AccutaneNotification";
import { logInfo } from "../../../utils/logger";

export default (
  accutaneNotification: AccutaneNotification
): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_NOTIFICATIONS_TABLE,
    Item: accutaneNotification,
  };
  logInfo("DynamoDB query", query);
  return query;
};
