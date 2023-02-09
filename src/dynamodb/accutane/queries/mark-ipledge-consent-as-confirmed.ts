import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  accutaneId: string
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id: accutaneId,
    },
    UpdateExpression: "SET #iPledgeConsent.#confirmed=:CONFIRMED",
    ExpressionAttributeNames: {
      "#iPledgeConsent": "iPledgeConsent",
      "#confirmed": "confirmed",
    },
    ExpressionAttributeValues: {
      ":CONFIRMED": true,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
