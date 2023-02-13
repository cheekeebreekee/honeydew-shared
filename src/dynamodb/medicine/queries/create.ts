import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { Medicine } from "../../../types/Medicine";
import { logInfo } from "../../../utils/logger";

export default (medicine: Medicine): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.MEDICINE_TABLE,
    Item: medicine,
  };
  logInfo("DynamoDB query", query);
  return query;
};
