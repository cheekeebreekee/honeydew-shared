import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";
import deleteAccutaneDocument from "../../queries/delete";

const dynamoDb = new DynamoDB.DocumentClient();

export const deleteItem = async (id: string, compositeKey: string) => {
  logInfo("Deleting accutane document record in DB", id);
  await dynamoDb.delete(deleteAccutaneDocument(id, compositeKey)).promise();
  logInfo("Deleted successfully");
};
