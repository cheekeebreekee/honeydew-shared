import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";
import deleteMedicineQuery from "../../queries/delete";

const dynamoDb = new DynamoDB.DocumentClient();

export const remove = async (id: string) => {
  logInfo("Deleting medicine from DB", { id });
  await dynamoDb.delete(deleteMedicineQuery(id)).promise();
  logInfo("Medicine deleted successfully");
};
