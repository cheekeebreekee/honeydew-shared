import { DynamoDB } from "aws-sdk";
import { AccutaneTask } from "../../../../types/AccutaneTask";
import { logError, logInfo } from "../../../../utils/logger";
import getAllByPartialCompositeKeyQuery from "../../queries/get-all-by-partial-composite-key";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAllByPartialCompositeKey = async (
  partialCompositeKey: string
): Promise<AccutaneTask[]> => {
  logInfo("Getting all tasks by partial composite key from DB", {
    partialCompositeKey,
  });

  const { Items } = await dynamoDb
    .scan(getAllByPartialCompositeKeyQuery(partialCompositeKey))
    .promise();

  if (!Items?.length) {
    const message = `Failed to get all tasks by partial composite key`;
    logError(message);
  }

  logInfo(`Getting all tasks by partial composite key was successfully`, {
    Items,
  });

  return Items as AccutaneTask[];
};
