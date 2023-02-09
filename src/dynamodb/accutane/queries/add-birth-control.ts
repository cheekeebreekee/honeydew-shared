import { DynamoDB } from "aws-sdk";
import { BirthControl } from "src/types/Accutane";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  { primaryForm, secondaryForm, createdAt, completed }: BirthControl
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #birthControl.#primaryForm=:PRIMARY_FORM, #birthControl.#secondaryForm=:SECONDARY_FORM, #birthControl.#completed=:COMPLETED, #birthControl.#createdAt=:CREATED_AT",
    ExpressionAttributeNames: {
      "#birthControl": "birthControl",
      "#createdAt": "createdAt",
      "#primaryForm": "primaryForm",
      "#secondaryForm": "secondaryForm",
      "#completed": "completed",
    },
    ExpressionAttributeValues: {
      ":PRIMARY_FORM": primaryForm,
      ":SECONDARY_FORM": secondaryForm,
      ":CREATED_AT": createdAt,
      ":COMPLETED": completed,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
