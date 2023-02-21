import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { TreatmentPlan } from "../../../types/TreatmentPlan";
import { logInfo } from "../../../utils/logger";

export default (treatmentPlan: TreatmentPlan): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.TREATMENT_PLANS_TABLE,
    Item: treatmentPlan,
  };
  logInfo("DynamoDB query", query);
  return query;
};
