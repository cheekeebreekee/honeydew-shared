import { DynamoDB } from "aws-sdk";
import { AccutaneTask } from "../../../../types/AccutaneTask";
import { logError, logInfo } from "../../../../utils/logger";
import getAllAccutaneTasksQuery from "../../queries/get-all";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAll = async (id: string): Promise<AccutaneTask[]> => {
  logInfo("Getting accutane document record from DB", { id });
  const { Items } = await dynamoDb.scan(getAllAccutaneTasksQuery(id)).promise();

  if (!Items?.length) {
    const message = `Accutane document record with ID ${id} is not found`;
    logError(message);
    return [];
  }

  logInfo(`Accutane document record found`, Items);

  return Items as AccutaneTask[];
};
