import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { TreatmentPlan } from "../../../../../types/TreatmentPlan";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  { name, groups }: TreatmentPlan
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.TREATMENT_PLANS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #name=:NAME, #groups=:GROUPS",
    ExpressionAttributeNames: {
      "#name": "name",
      "#groups": "groups",
    },
    ExpressionAttributeValues: {
      ":NAME": name,
      ":GROUPS": groups,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
