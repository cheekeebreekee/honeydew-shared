import { DynamoDB } from "aws-sdk";
import { CareCoordinator, Provider, EnrollmentCoordinator, Administrator } from "../../../../types/Employee";
import { logInfo, logWarn } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const getAll = (tableName: string) => async (): Promise<Provider[] | CareCoordinator[] | EnrollmentCoordinator[] | Administrator[]> => {
  logInfo("Getting all employees from DB");

  const { Items } = await dynamoDb
    .scan({ TableName: tableName })
    .promise();

  if (Items) {
    logInfo("Found employees count", { count: Items.length });
    return Items as Provider[] | CareCoordinator[] | EnrollmentCoordinator[] | Administrator[];
  }

  logWarn("No employees found in DB");
  return [];
};
