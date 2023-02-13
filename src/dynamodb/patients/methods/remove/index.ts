import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";
import deletePatientQuery from "../../queries/delete";

const dynamoDb = new DynamoDB.DocumentClient();

export const remove = async (id: string) => {
  logInfo("Deleting patient from DB", { id });
  await dynamoDb.delete(deletePatientQuery(id)).promise();
  logInfo("Patient has been deleted successfully");
};
