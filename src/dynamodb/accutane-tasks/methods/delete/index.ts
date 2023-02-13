import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";
import deleteAccutaneTask from "../../queries/delete";

const dynamoDb = new DynamoDB.DocumentClient();

export const deleteItem = async (id: string, compositeKey: string) => {
  logInfo("Deleting accutane task record in DB", id);
  await dynamoDb.delete(deleteAccutaneTask(id, compositeKey)).promise();
  logInfo("Deleted successfully");
};
