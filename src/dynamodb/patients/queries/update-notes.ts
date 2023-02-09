import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { PatientNote } from "../../../../../types/Patient";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  notes: PatientNote[]
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #notes=:NOTES",
    ExpressionAttributeNames: {
      "#notes": "notes",
    },
    ExpressionAttributeValues: {
      ":NOTES": notes,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
