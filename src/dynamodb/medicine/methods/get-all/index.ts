import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../shared/constants";
import { Medicine } from "../../../../types/Medicine";
import { logInfo } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAll = async (): Promise<Medicine[]> => {
  logInfo("Getting all medicine from DB");
  const { Items } = await dynamoDb.scan({ TableName: ENV.MEDICINE_TABLE }).promise();

  logInfo("Items found count", {
    count: Items?.length,
  });

  return Items as Medicine[];
};
