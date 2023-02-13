import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../index";
import { TreatmentPlan } from "../../../../types/TreatmentPlan";
import { logInfo } from "../../../../utils/logger";
import updateTreatmentPlanQuery from "../../queries/update";

const dynamoDb = new DynamoDB.DocumentClient();

export const update = async (_treatmentPlan: TreatmentPlan) => {
  logInfo("Updating treatment plan in DB", { _treatmentPlan });
  const treatmentPlan = await DynamoDBService.treatmentPlans.get(
    _treatmentPlan.id
  );
  logInfo("Treatment plan to update", treatmentPlan);
  const updatedTreatmentPlan = {
    ...treatmentPlan,
    ..._treatmentPlan,
  };
  logInfo("Updated treatment plan data", updatedTreatmentPlan);
  const { Attributes } = await dynamoDb
    .update(updateTreatmentPlanQuery(_treatmentPlan.id, updatedTreatmentPlan))
    .promise();
  logInfo("Treatment plan has been updated successfully");
  return Attributes as TreatmentPlan;
};
