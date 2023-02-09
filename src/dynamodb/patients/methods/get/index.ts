import { DynamoDB } from "aws-sdk";
import { Patient } from "../../../../../../types/Patient";
import { logError, logInfo } from "../../../../../../utils/logger";
import getPatientQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string) => {
  logInfo("Getting patient from DB", { id });
  const { Item } = await dynamoDb.get(getPatientQuery(id)).promise();

  if (!Item) {
    const message = `Patient with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Patient found", Item);

  return Item as Patient;
};
