import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { Accutane } from "../../../../../types/Accutane";
import { logInfo } from "../../../../../utils/logger";

export default (
  accutane: Partial<Accutane>
): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Item: accutane,
  };
  logInfo("DynamoDB query", query);
  return query;
};
