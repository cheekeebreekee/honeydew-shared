import { DynamoDB } from "aws-sdk";
import { Accutane } from "../../../../../../types/Accutane";
import { logInfo } from "../../../../../../utils/logger";
import createAccutane from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (accutane: Partial<Accutane>) => {
  logInfo("Creating accutane record in DB", accutane);
  await dynamoDb.put(createAccutane(accutane)).promise();
  logInfo("Created successfully");
};
