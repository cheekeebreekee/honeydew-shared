import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";
import deleteCareCoordinatorQuery from "../../queries/delete";

const dynamoDb = new DynamoDB.DocumentClient();

export const remove = async (id: string) => {
  logInfo("Deleting care coordinator", { id });
  await dynamoDb.delete(deleteCareCoordinatorQuery(id)).promise();
  logInfo("Deleted successfully");
};
