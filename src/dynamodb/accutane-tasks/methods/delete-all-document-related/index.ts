import { DynamoDB } from "aws-sdk";
import { AccutaneTask } from "../../../../../../types/AccutaneTask";
import { logError, logInfo } from "../../../../../../utils/logger";
import deleteAllDocumentRelatedTasksQuery from "../../queries/delete-all-document-related";

const dynamoDb = new DynamoDB.DocumentClient();

export const deleteAllDocumentRelated = async (
  tasks: AccutaneTask[]
): Promise<void> => {
  logInfo("Deleting document related tasks from DB", {
    tasks,
  });

  const { UnprocessedItems } = await dynamoDb
    .batchWrite(deleteAllDocumentRelatedTasksQuery(tasks))
    .promise();

  if (UnprocessedItems?.length) {
    const message = `Document related tasks wasn't fully deleted`;
    logError(message, { failedToDeleteTasks: UnprocessedItems });
  }

  logInfo(`Document related tasks delete successfully`, UnprocessedItems);
};
