import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  accutaneFlag: boolean
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #isAccutane=:IS_ACCUTANE",
    ExpressionAttributeNames: {
      "#isAccutane": "isAccutane",
    },
    ExpressionAttributeValues: {
      ":IS_ACCUTANE": accutaneFlag,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
