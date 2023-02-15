import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { Patient } from "../../../types/Patient";
import { logInfo } from "../../../utils/logger";

export default (patient: Patient): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Item: patient,
  };
  logInfo("DynamoDB query", query);
  return query;
};
