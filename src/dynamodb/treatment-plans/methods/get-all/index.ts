import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../shared/constants";
import { TreatmentPlan } from "../../../../types/TreatmentPlan";
import { logInfo } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAll = async () => {
  logInfo("Getting all treatment plans from DB");
  const { Items } = await dynamoDb
    .scan({ TableName: ENV.TREATMENT_PLANS_TABLE })
    .promise();

  logInfo("Found treatment plans count", {
    count: Items?.length,
  });

  return Items as TreatmentPlan[];
};
