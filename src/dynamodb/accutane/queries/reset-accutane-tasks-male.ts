import { DynamoDB } from "aws-sdk";
import { Accutane, BirthControl } from "src/types/Accutane";
import { Patient } from "src/types/Patient";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (
  accutane: Accutane
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id: accutane.id,
    },
    UpdateExpression:
      "set #bloodWork.#updatedAt=:UPDATED_AT, #bloodWork.#completed=:COMPLETED, #isOnboarding=:IS_ONBOARDING",
    ExpressionAttributeNames: {
      "#bloodWork": "bloodWork",
      "#updatedAt": "updatedAt",
      "#completed": "completed",
      "#isOnboarding": "isOnboarding",
    },
    ExpressionAttributeValues: {
      ":UPDATED_AT": new Date().toISOString(),
      ":COMPLETED": false,
      ":IS_ONBOARDING": false,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
