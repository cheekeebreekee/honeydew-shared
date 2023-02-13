import { DynamoDB } from "aws-sdk";
import { AccutaneDocument } from "../../../../types/AccutaneDocument";
import { logError, logInfo } from "../../../../utils/logger";
import getAccutaneDocumentQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (
  id: string,
  patientId: string
): Promise<AccutaneDocument> => {
  logInfo("Getting accutane document record from DB", { id, patientId });
  const { Item } = await dynamoDb
    .get(getAccutaneDocumentQuery(id, patientId))
    .promise();

  if (!Item) {
    const message = `Accutane document record with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo(`Accutane document record found`, Item);

  return Item as AccutaneDocument;
};
