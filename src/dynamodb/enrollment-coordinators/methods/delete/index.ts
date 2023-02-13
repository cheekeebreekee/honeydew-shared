import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";
import deleteEnrollmentCoordinatorQuery from "../../queries/delete";

const dynamoDb = new DynamoDB.DocumentClient();

export const remove = async (id: string) => {
  logInfo("Deleting enrollment coordinator", { id });
  await dynamoDb.delete(deleteEnrollmentCoordinatorQuery(id)).promise();
  logInfo("Deleted successfully");
};
