import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { UnsupportedPatient } from "../../../types/Patient";
import { logInfo } from "../../../utils/logger";

export default (
  unsupportedPatient: UnsupportedPatient
): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.UNSUPPORTED_USERS_TABLE,
    Item: unsupportedPatient,
  };
  logInfo("DynamoDB query", query);
  return query;
};
