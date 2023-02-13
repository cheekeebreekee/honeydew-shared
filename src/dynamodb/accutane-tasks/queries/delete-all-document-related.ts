import { DynamoDB } from "aws-sdk";
import { AccutaneTask } from "src/types/AccutaneTask";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (
  tasks: AccutaneTask[]
): DynamoDB.DocumentClient.BatchWriteItemInput => {
  const query = {
    RequestItems: {
      [ENV.ACCUTANE_TASKS_TABLE]: tasks.map((task) => ({
        DeleteRequest: {
          Key: {
            id: task.id,
            compositeKey: task.compositeKey,
          },
        },
      })),
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
