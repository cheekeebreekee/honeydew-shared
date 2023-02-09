import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { InsurancceInfoPayload } from "../../../../../types/Payload";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  insuranceInfo: InsurancceInfoPayload
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #insurance=:INSURANCE",
    ExpressionAttributeNames: {
      "#insurance": "insurance",
    },
    ExpressionAttributeValues: {
      ":INSURANCE": insuranceInfo,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
