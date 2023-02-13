import { DynamoDB } from "aws-sdk";
import { TreatmentPlan } from "../../../../types/TreatmentPlan";
import { logInfo } from "../../../../utils/logger";
import createTreatmentPlanQuery from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (treatmentPlan: TreatmentPlan) => {
  logInfo("Creating treatment plan in DB", treatmentPlan);
  await dynamoDb.put(createTreatmentPlanQuery(treatmentPlan)).promise();
  logInfo("Treatment plan has been created successfully");
};
