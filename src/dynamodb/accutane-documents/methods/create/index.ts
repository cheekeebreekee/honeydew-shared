import { DynamoDB } from "aws-sdk";
import { AccutaneDocument } from "../../../../types/AccutaneDocument";
import { logInfo } from "../../../../utils/logger";
import createAccutaneDocument from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (accutaneDocument: AccutaneDocument) => {
  logInfo("Creating accutane document record in DB", accutaneDocument);
  await dynamoDb.put(createAccutaneDocument(accutaneDocument)).promise();
  logInfo("Created successfully");
};
