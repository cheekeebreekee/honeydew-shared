import { DynamoDB } from "aws-sdk";
import { AccutaneTask } from "../../../../types/AccutaneTask";
import { logError, logInfo } from "../../../../utils/logger";
import getAllDocumentRelatedTasksQuery from "../../queries/get-all-document-related";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAllDocumentRelated = async (
  documentId: string
): Promise<AccutaneTask[]> => {
  logInfo("Getting document related tasks from DB", {
    documentId,
  });

  const { Items } = await dynamoDb
    .scan(getAllDocumentRelatedTasksQuery(documentId))
    .promise();

  if (!Items?.length) {
    const message = `Document related tasks wasn't found`;
    logError(message);
    return [];
  }

  logInfo(`Document related tasks found`, Items);

  return Items as AccutaneTask[];
};
