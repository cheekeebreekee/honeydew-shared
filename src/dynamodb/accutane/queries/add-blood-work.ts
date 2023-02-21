import { DynamoDB } from "aws-sdk";
import { BloodWork } from "../../../types";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  { createdAt, completed, confirmed, updatedAt }: BloodWork
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #bloodWork.#createdAt=:CREATED_AT, #bloodWork.#updatedAt=:UPDATED_AT, #bloodWork.#completed=:COMPLETED, #bloodWork.#confirmed=:CONFIRMED",
    ExpressionAttributeNames: {
      "#bloodWork": "bloodWork",
      "#completed": "completed",
      "#confirmed": "confirmed",
      "#createdAt": "createdAt",
      "#updatedAt": "updatedAt",
    },
    ExpressionAttributeValues: {
      ":CREATED_AT": createdAt,
      ":COMPLETED": completed,
      ":CONFIRMED": confirmed,
      ":UPDATED_AT": updatedAt,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
