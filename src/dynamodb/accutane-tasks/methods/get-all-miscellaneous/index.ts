import { DynamoDB } from "aws-sdk";
import { AccutaneTask } from "../../../../types/AccutaneTask";
import { logError, logInfo } from "../../../../utils/logger";
import getAllMiscellaneousAccutaneTasksQuery from "../../queries/get-all-miscellaneous";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAllMiscellaneous = async (
  employeeId: string,
  patientId?: string,
  documentId?: string
): Promise<AccutaneTask[]> => {
  logInfo("Getting miscellaneos tasks from DB", {
    employeeId,
    patientId,
    documentId,
  });

  const { Items } = await dynamoDb
    .scan(
      getAllMiscellaneousAccutaneTasksQuery(employeeId, patientId, documentId)
    )
    .promise();

  if (!Items?.length) {
    const message = `Miscellaneos tasks wasn't found`;
    logError(message);
    return [];
  }

  logInfo(`Miscellaneos tasks found`, Items);

  return Items as AccutaneTask[];
};
