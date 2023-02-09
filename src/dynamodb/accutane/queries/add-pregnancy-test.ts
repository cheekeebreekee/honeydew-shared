import { DynamoDB } from "aws-sdk";
import { PregnancyTest } from "src/types/Accutane";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  { photos, createdAt, eSignature, completed }: PregnancyTest
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #pregnancyTest.#photos=:PHOTOS, #pregnancyTest.#createdAt=:CREATED_AT,  #pregnancyTest.#completed=:COMPLETED, #pregnancyTest.#eSignature=:E_SIGNATURE",
    ExpressionAttributeNames: {
      "#pregnancyTest": "pregnancyTest",
      "#photos": "photos",
      "#createdAt": "createdAt",
      "#eSignature": "eSignature",
      "#completed": "completed",
    },
    ExpressionAttributeValues: {
      ":PHOTOS": photos,
      ":CREATED_AT": createdAt,
      ":E_SIGNATURE": eSignature,
      ":COMPLETED": completed,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
