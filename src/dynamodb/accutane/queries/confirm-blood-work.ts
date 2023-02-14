import { DynamoDB } from "aws-sdk";
import { BloodWork } from "src/types/Accutane";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  confirmed: boolean
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #bloodWork.#updatedAt=:UPDATED_AT, #bloodWork.#confirmed=:CONFIRMED",
    ExpressionAttributeNames: {
      "#bloodWork": "bloodWork",
      "#confirmed": "confirmed",
      "#updatedAt": "updatedAt",
    },
    ExpressionAttributeValues: {
      ":UPDATED_AT": new Date().toISOString(),
      ":CONFIRMED": confirmed,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};