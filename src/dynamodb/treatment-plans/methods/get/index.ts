import { DynamoDB } from "aws-sdk";
import { TreatmentPlan } from "../../../../../../types/TreatmentPlan";
import { logError, logInfo } from "../../../../../../utils/logger";
import getTreatmentPlanQuery from "../../queries/get";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = async (id: string) => {
  logInfo("Getting treatment plan from DB", { id });
  const { Item } = await dynamoDb.get(getTreatmentPlanQuery(id)).promise();

  if (!Item) {
    const message = `Treatment plan with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Treatment plan found", Item);

  return Item as TreatmentPlan;
};
