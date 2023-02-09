import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../../../utils/logger";
import getPatientQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const has = async (id: string) => {
  logInfo("Checking patient existence in DB", { id });
  const { Item } = await dynamoDb.get(getPatientQuery(id)).promise();

  logInfo("Patient existence check", {
    exists: !!Item,
  });
  return !!Item;
};
