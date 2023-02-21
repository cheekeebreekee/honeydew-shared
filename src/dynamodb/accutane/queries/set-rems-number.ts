import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default (id: string, remsNumber: string): DynamoDB.DocumentClient.UpdateItemInput => {
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
