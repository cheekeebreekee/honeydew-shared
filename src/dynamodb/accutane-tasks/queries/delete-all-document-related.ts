import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { AccutaneTask } from "../../../types";
import { logInfo } from "../../../utils/logger";

export default (tasks: AccutaneTask[]): DynamoDB.DocumentClient.BatchWriteItemInput => {
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
