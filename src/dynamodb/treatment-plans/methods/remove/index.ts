import { DynamoDB } from "aws-sdk";
import { logInfo } from "../../../../utils/logger";
import deleteTreatmentPlanQuery from "../../queries/delete";

const dynamoDb = new DynamoDB.DocumentClient();

export const remove = async (id: string) => {
  logInfo("Deleting treatment plna from DB");
  await dynamoDb.delete(deleteTreatmentPlanQuery(id)).promise();
  logInfo("Treatment plan has been deleted successfully");
};
