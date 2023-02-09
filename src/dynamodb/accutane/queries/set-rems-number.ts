import { DynamoDB } from "aws-sdk";
import { BloodWork } from "src/types/Accutane";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  remsNumber: string
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #remsNumber=:REMS_NUMBER",
    ExpressionAttributeNames: {
      "#remsNumber": "remsNumber",
    },
    ExpressionAttributeValues: {
      ":REMS_NUMBER": remsNumber,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
