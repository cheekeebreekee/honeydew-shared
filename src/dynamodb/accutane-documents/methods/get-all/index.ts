import { DynamoDB } from "aws-sdk";
import { AccutaneDocument } from "../../../../../../types/AccutaneDocument";
import { logError, logInfo } from "../../../../../../utils/logger";
import getAllAccutaneDocumentsQuery from "../../queries/get-all";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAll = async (id: string): Promise<AccutaneDocument[]> => {
  logInfo("Getting all accutane document records from DB", { id });
  const { Items } = await dynamoDb
    .scan(getAllAccutaneDocumentsQuery(id))
    .promise();

  if (!Items?.length) {
    const message = `Accutane document record with ID ${id} is not found`;
    logError(message);
    return [];
  }

  logInfo(`Accutane document records found`, Items);

  return Items as AccutaneDocument[];
};
