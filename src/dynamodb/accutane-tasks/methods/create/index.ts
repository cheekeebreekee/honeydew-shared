import { DynamoDB } from "aws-sdk";
import { AccutaneTask } from "../../../../../../types/AccutaneTask";
import { logInfo } from "../../../../../../utils/logger";
import createAccutaneTask from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (task: AccutaneTask) => {
  logInfo("Creating accutane task record in DB", task);
  await dynamoDb.put(createAccutaneTask(task)).promise();
  logInfo("Created successfully");
};
