import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { config } from "../../../shared";
import {
  Provider,
  CareCoordinator,
  EnrollmentCoordinator,
  Administrator,
} from "../../../types/Employee";
import { logInfo } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const create = async (
  employee: Provider | CareCoordinator | EnrollmentCoordinator | Administrator
) => {
  logInfo(`Create ${employee.type} employee in DB`, employee);

  const query = {
    TableName: config.getSharedValue("employeesTableName"),
    Item: marshall(employee),
  };

  logInfo("Create employee query", query);

  await dynamoDb.putItem(query);

  logInfo("Provider has been created successfully");
};
