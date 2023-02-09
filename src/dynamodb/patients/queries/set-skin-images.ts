import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { SkinImages } from "../../../../../types/Patient";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  skinImages: SkinImages[]
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #medicalBackground.#skinImages=:SKIN_IMAGES",
    ExpressionAttributeNames: {
      "#skinImages": "skinImages",
      "#medicalBackground": "medicalBackground",
    },
    ExpressionAttributeValues: {
      ":SKIN_IMAGES": skinImages,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
