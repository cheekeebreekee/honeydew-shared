import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
  CareCoordinator,
  Provider,
  EnrollmentCoordinator,
  Administrator,
} from "../../../types/Employee";
import { logInfo, logWarn } from "../../../utils/logger";
import { config } from "../../../shared";

const dynamoDb = new DynamoDB({});

export const getAll = async (): Promise<
  Provider[] | CareCoordinator[] | EnrollmentCoordinator[] | Administrator[]
> => {
  logInfo("Getting all employees from DB");

  const { Items } = await dynamoDb.scan({ TableName: config.getSharedValue("employeesTableName") });

  if (Items) {
    logInfo("Found employees count", { count: Items.length });
    return Items.map((it) => unmarshall(it)) as
      | Provider[]
      | CareCoordinator[]
      | EnrollmentCoordinator[]
      | Administrator[];
  }

  logWarn("No employees found in DB");
  return [];
};
